import { ID } from '@/services/ant-design-pro';
import { Modal } from 'antd';
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  Key,
  useImperativeHandle,
  useState,
} from 'react';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { Role } from '@/services/ant-design-pro/user/user';
import { authRoleApi, updateAuthRoleApi } from '@/services/ant-design-pro/user';
import styles from './UserAuth.less';

export interface UserAuthRefProps {
  showModel: () => void;
  hideModel: () => void;
}

interface PropsType {
  userId: ID;
}

const UserAuthModal: ForwardRefRenderFunction<UserAuthRefProps, PropsType> = (props, ref) => {
  const { userId } = props;
  // ----------table开始------------
  const columns: ProColumns<Role>[] = [
    {
      title: '角色编号',
      dataIndex: 'roleId',
      ellipsis: true,
      align: 'center',
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
      ellipsis: true,
    },
    {
      title: '权限字符',
      dataIndex: 'roleKey',
      ellipsis: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      ellipsis: true,
    },
  ];
  const [selectedRowIds, setSelectRowIds] = useState<Key[]>([]);
  const getTableData = async () => {
    const { data } = await authRoleApi(userId);
    setSelectRowIds(data.user.roles.map((item) => item.roleId));
    return {
      data: data.roles,
      success: true,
    };
  };
  // ----------table结束------------

  // ---------modal开始------------
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const hideModal = () => {
    setIsModalOpen(false);
  };
  const handleOk = () => {
    console.log(selectedRowIds, userId);
    updateAuthRoleApi({ userId: userId, roleIds: selectedRowIds.join(',') });
    hideModal();
  };
  useImperativeHandle(ref, () => ({
    showModel: showModal,
    hideModel: hideModal,
  }));
  // ---------modal结束------------

  return (
    <Modal
      title="分配角色"
      destroyOnClose={true}
      open={isModalOpen}
      onOk={handleOk}
      width={'45%'}
      onCancel={hideModal}
    >
      <ProTable
        className={styles.myTable}
        columns={columns}
        search={false}
        options={false}
        params={{ userId }}
        request={() => getTableData()}
        pagination={false}
        rowKey="roleId"
        rowSelection={{
          selectedRowKeys: selectedRowIds,
          onChange(selectedRowKeys) {
            setSelectRowIds(selectedRowKeys);
          },
        }}
        tableAlertRender={() => {
          return false;
        }}
      ></ProTable>
    </Modal>
  );
};

export default forwardRef(UserAuthModal);
