import { getConfigKeyApi } from '@/services/ant-design-pro/config';
import { getDictByType } from '@/services/ant-design-pro/dict';
import {
  addUserApi,
  getDeptTreeApi,
  getUserApi,
  updateUserApi,
} from '@/services/ant-design-pro/user';
import { Post, Role } from '@/services/ant-design-pro/user/user';
import {
  ActionType,
  ModalForm,
  ProFormInstance,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormTreeSelect,
} from '@ant-design/pro-components';
import { message } from 'antd';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';

export type UserModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  userId: string | number | null;
  actionRef: MutableRefObject<ActionType | undefined>;
};
export type UserFormType = {
  userName?: string;
  nickName?: string;
  email?: string;
  phonenumber?: string;
  sex?: string;
  password?: string;
  status?: string;
  remark?: string;
  postIds?: number[] | string[];
  roleIds?: number[] | string[];
  deptId?: number | string;
};

const UserModal: React.FC<UserModalProps> = (props: UserModalProps) => {
  const { isModalOpen, setIsModalOpen, userId, actionRef } = props;
  const formRef = useRef<ProFormInstance<UserFormType>>();
  const [defaultPassword, setDefaultPassword] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);

  const getUser = async (): Promise<UserFormType> => {
    const { data } = await getUserApi(userId);
    setPosts([...data.posts]);
    setRoles([...data.roles]);
    return {
      nickName: data.user?.nickName,
      userName: data.user?.userName,
      email: data.user?.email,
      phonenumber: data.user?.phonenumber,
      sex: data.user?.sex,
      status: data.user?.status,
      remark: data.user?.remark,
      postIds: data.postIds,
      roleIds: data.roleIds,
      deptId: data.user?.deptId,
    };
  };

  useEffect(() => {
    getUser();
    getConfigKeyApi('sys.user.initPassword').then((res) => {
      setDefaultPassword(res.msg);
    });
  }, []);

  return (
    <>
      <ModalForm<UserFormType>
        title={userId ? '编辑用户' : '新建用户'}
        open={isModalOpen}
        formRef={formRef}
        onFinish={async (values) => {
          console.log(formRef.current?.getFieldsValue());
          formRef.current?.validateFields();
          if (!userId) {
            await addUserApi(values);
          } else {
            await updateUserApi({ ...values, userId });
          }
          actionRef.current?.reload();
          message.success('操作成功');
          return true;
        }}
        layout={'horizontal'}
        grid={true}
        onOpenChange={setIsModalOpen}
        // params={{ userId: userId }}
        request={getUser}
        autoFocusFirstInput
        modalProps={{
          destroyOnClose: true,
        }}
        rowProps={{ gutter: 16 }}
      >
        <ProFormText
          colProps={{ md: 12, xl: 12 }}
          rules={[{ required: true, message: '请输入用户昵称' }]}
          name="nickName"
          label="用户昵称"
        />
        <ProFormTreeSelect
          colProps={{ md: 12, xl: 12 }}
          name="deptId"
          label="归属部门"
          allowClear
          request={async () => {
            const { data } = await getDeptTreeApi();
            return data;
          }}
          fieldProps={{
            fieldNames: {
              value: 'id',
            },
          }}
        />
        <ProFormText
          colProps={{ md: 12, xl: 12 }}
          rules={[{ pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: '请输入正确的手机号码' }]}
          name="phonenumber"
          label="手机号码"
        />
        <ProFormText
          colProps={{ md: 12, xl: 12 }}
          rules={[{ type: 'email', message: '请输入正确的邮箱地址' }]}
          name="email"
          label="邮箱"
        />
        {userId ? (
          <span style={{ display: 'none' }}>
            <ProFormText
              colProps={{ md: 12, xl: 12 }}
              rules={[{ required: true, message: '请输入用户名称' }]}
              name="userName"
              label="用户名称"
            />
          </span>
        ) : (
          <ProFormText
            colProps={{ md: 12, xl: 12 }}
            rules={[{ required: true, message: '请输入用户名称' }]}
            name="userName"
            label="用户名称"
          />
        )}

        {userId ? (
          <span style={{ display: 'none' }}>
            <ProFormText.Password
              initialValue={defaultPassword}
              colProps={{ md: 12, xl: 12 }}
              rules={[{ required: true, message: '请输入用户密码' }]}
              name="password"
              label="用户密码"
            />
          </span>
        ) : (
          <ProFormText.Password
            initialValue={defaultPassword}
            colProps={{ md: 12, xl: 12 }}
            rules={[{ required: true, message: '请输入用户密码' }]}
            name="password"
            label="用户密码"
          />
        )}
        <ProFormSelect
          colProps={{ md: 12, xl: 12 }}
          name="sex"
          label="用户性别"
          request={async () => {
            const { data } = await getDictByType('sys_user_sex');
            return data.map((item) => {
              return {
                label: item.dictLabel,
                value: item.dictValue,
              };
            });
          }}
        />
        <ProFormRadio.Group
          colProps={{ md: 12, xl: 12 }}
          name="status"
          label="状态"
          initialValue={'0'}
          options={[
            { label: '正常', value: '0' },
            { label: '停用', value: '1' },
          ]}
        />
        <ProFormSelect
          colProps={{ md: 12, xl: 12 }}
          name="postIds"
          label="岗位"
          request={async () => {
            return posts.map((item) => ({
              label: item.postName,
              value: item.postId,
            }));
          }}
          fieldProps={{ mode: 'multiple' }}
        />
        <ProFormSelect
          colProps={{ md: 12, xl: 12 }}
          name="roleIds"
          label="岗位"
          request={async () => {
            return roles.map((item) => ({
              label: item.roleName,
              value: item.roleId,
            }));
          }}
          fieldProps={{ mode: 'multiple' }}
        />
        <ProFormTextArea name="remark" label="备注" placeholder="请输入备注" />
      </ModalForm>
    </>
  );
};

export default UserModal;
