import useTheme from '@/hooks/useTheme';
import {
  changeStatus,
  delUserApi,
  getDeptTreeApi,
  getUserListApi,
  resetUserPasswordApi,
} from '@/services/ant-design-pro/user';
import { UserParams, UserResult, UserTree } from '@/services/ant-design-pro/user/user';
import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  KeyOutlined,
  PlusOutlined,
  SafetyOutlined,
  SearchOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import {
  Button,
  Col,
  Input,
  message,
  Modal,
  Popconfirm,
  Row,
  Space,
  Switch,
  Table,
  Tooltip,
  Tree,
} from 'antd';
import React, { Key, useEffect, useMemo, useRef, useState } from 'react';
import { debounce } from 'lodash';
import { getDictByType } from '@/services/ant-design-pro/dict';
import UserModal from './component/UserModal';
import UploadFile, { UploadRefProps } from '@/components/upload/index';
import { download } from '@/services/ant-design-pro/api';
import { getConfigKeyApi } from '@/services/ant-design-pro/config';
import { history } from '@umijs/max';

const User: React.FC = () => {
  const [treeData, setTreeData] = useState<UserTree[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectTreeId, setSelectTreeId] = useState<Key>();
  const token = useTheme();

  // ------------modal表单开始-----------
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateUserId, setUpdateUserId] = useState<number | string | null>('');
  // ------------modal表单开始-----------

  // ----------侧边部门树开始------------
  const getUserTree = async () => {
    const { data } = await getDeptTreeApi();
    setTreeData(data);
  };
  const searchHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const filterTreeData = (data: UserTree[], searchValue: string): UserTree[] => {
    return data
      .map((item) => {
        const children = item.children ? filterTreeData(item.children, searchValue) : [];
        if (item.label.includes(searchValue) || children.length > 0) {
          return { ...item, children };
        }
        return null;
      })
      .filter((item) => item !== null) as UserTree[];
  };
  const filteredTreeData = useMemo(
    () => filterTreeData(treeData, searchValue),
    [treeData, searchValue],
  );
  const onTreeSelect = (selectedKeys: Key[]) => {
    setSelectTreeId(selectedKeys[0]);
  };
  // ----------侧边部门树结束------------

  // -------------表格开始--------------
  const actionRef = useRef<ActionType>();
  const [selectRowIds, setSelectRowIds] = useState<Key[]>([]);
  const onStatusChange = (checked: boolean, record: UserResult) => {
    Modal.confirm({
      centered: true,
      content: `确定${checked ? '启用' : '禁用'}【${record.userName}】用户吗？`,
      cancelText: '取消',
      okText: '确定',
      onCancel() {
        message.info('取消操作');
      },
      onOk: async () => {
        const { code, msg } = await changeStatus({
          status: `${checked ? '0' : '1'}`,
          userId: record.userId,
        });
        if (code === 200) {
          actionRef.current?.reload();
          message.success(msg);
        }
      },
    });
  };
  const columns: ProColumns<UserResult>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
      align: 'center',
    },
    {
      title: '用户名称',
      dataIndex: 'userName',
      ellipsis: true,
    },
    {
      title: '用户昵称',
      dataIndex: 'nickName',
      ellipsis: true,
      search: false,
    },
    {
      title: '部门',
      dataIndex: ['dept', 'deptName'],
      search: false,
    },
    {
      title: '手机号码',
      dataIndex: 'phonenumber',
      search: false,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      request: async () => {
        const { data } = await getDictByType('sys_normal_disable');
        return data.map((item) => {
          return {
            label: item.dictLabel,
            value: item.dictValue,
          };
        });
      },
      render: (_, record) => (
        <Switch
          checked={record.status === '0'}
          onChange={(checked) => onStatusChange(checked, record)}
        />
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateRange',
      hideInTable: true,
      colSize: 1.3,
      search: {
        transform: (value) => {
          return {
            params: {
              beginTime: value[0],
              endTime: value[1],
            },
          };
        },
      },
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      align: 'center',
      render: (text, record: UserResult) =>
        record.admin ? (
          <></>
        ) : (
          <Space style={{ color: token.colorPrimary }}>
            <Tooltip title="编辑">
              <EditOutlined
                onClick={() => {
                  setUpdateUserId(record.userId);
                  setIsModalOpen(true);
                }}
                style={{ cursor: 'pointer' }}
              />
            </Tooltip>
            <Tooltip title="删除">
              <Popconfirm
                title="删除用户"
                description={`确定删除【${record.nickName}】用户吗？`}
                onConfirm={() => {
                  delUserApi(record.userId).then((res) => {
                    actionRef.current?.reload();
                    message.success(res.msg);
                  });
                }}
                okText="确定"
                cancelText="取消"
              >
                <DeleteOutlined style={{ cursor: 'pointer' }} />
              </Popconfirm>
            </Tooltip>
            <Tooltip title="重置密码">
              <Popconfirm
                title="重置用户密码"
                description={`确定重置【${record.nickName}】用户的密码吗？`}
                onConfirm={async () => {
                  const { msg } = await getConfigKeyApi('sys.user.initPassword');
                  resetUserPasswordApi({ userId: record.userId, password: msg }).then(() => {
                    message.success('密码重置成功');
                  });
                }}
                okText="确定"
                cancelText="取消"
              >
                <KeyOutlined style={{ cursor: 'pointer' }} />
              </Popconfirm>
            </Tooltip>
            <Tooltip title="分配角色">
              <SafetyOutlined
                onClick={() => {
                  console.log(record);

                  history.push({
                    pathname: `/system/user-auth/role/${record.userId}`,
                  });
                }}
                style={{ cursor: 'pointer' }}
              />
            </Tooltip>
          </Space>
        ),
    },
  ];

  const onDelete = () => {
    if (selectRowIds?.length === 0) {
      message.error('请选择一条数据');
      return;
    }
    Modal.confirm({
      centered: true,
      content: `确定删除所选的${selectRowIds.length}用户吗？`,
      cancelText: '取消',
      okText: '确定',
      onCancel() {
        message.info('取消操作');
      },
      onOk: async () => {
        delUserApi(selectRowIds).then((res) => {
          actionRef.current?.reload();
          message.success(res.msg);
        });
      },
    });
  };

  async function getTableDate(
    params?: UserParams & {
      pageSize?: number;
      current?: number;
      keyword?: string;
    },
  ) {
    const queryParams = {
      ...params,
    };
    const data = await getUserListApi({ ...queryParams });
    return {
      data: data.rows,
      success: true,
      total: data.total,
    };
  }
  // -------------表格结束--------------

  // -----------upload modal开始---------
  const uploadRef = useRef<UploadRefProps>(null);
  // -----------upload modal结束---------

  useEffect(() => {
    getUserTree();
  }, []);

  return (
    <PageContainer breadcrumbRender={false}>
      <Row gutter={10}>
        <Col xs={24} sm={24} md={10} lg={8} xl={5}>
          <div
            style={{
              backgroundColor: token.colorBgBase,
              padding: '10px',
              borderRadius: token.borderRadius,
            }}
          >
            <Input
              style={{ marginBottom: '10px' }}
              prefix={<SearchOutlined />}
              onChange={debounce(searchHandle, 100)}
              placeholder="请输入部门名称"
            />
            {treeData.length > 0 && (
              <Tree
                defaultExpandAll={true}
                fieldNames={{ title: 'label', key: 'id' }}
                treeData={filteredTreeData}
                onSelect={onTreeSelect}
              />
            )}
          </div>
        </Col>
        <Col xs={24} sm={24} md={14} lg={16} xl={19}>
          <ProTable<UserResult>
            columns={columns}
            actionRef={actionRef}
            rowKey="userId"
            params={{ deptId: selectTreeId }}
            request={(params) => getTableDate(params)}
            rowSelection={{
              selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
              preserveSelectedRowKeys: true,
            }}
            tableAlertRender={({ selectedRowKeys }) => {
              console.log(selectedRowKeys);
              setSelectRowIds(selectedRowKeys);
              return false;
            }}
            search={{
              labelWidth: 'auto',
              span: {
                xs: 24,
                sm: 24,
                md: 12,
                lg: 8,
                xl: 5,
                xxl: 5,
              },
            }}
            options={{
              fullScreen: true,
            }}
            pagination={{
              defaultPageSize: 10,
              pageSizeOptions: [10, 20, 50, 100],
              showSizeChanger: true,
              showQuickJumper: true,
              position: ['bottomCenter'],
            }}
            scroll={{ x: 1200 }}
            // dateFormatter="string"
            headerTitle="用户表格"
            toolBarRender={() => [
              <Button
                key="button"
                icon={<PlusOutlined />}
                onClick={() => {
                  setIsModalOpen(true);
                  setUpdateUserId(null);
                }}
                type="primary"
              >
                新增
              </Button>,
              <Button
                key="button"
                icon={<DeleteOutlined />}
                onClick={onDelete}
                type="primary"
                danger
              >
                删除
              </Button>,
              <Button
                key="button"
                icon={<UploadOutlined />}
                onClick={() => {
                  uploadRef.current?.showModel();
                }}
              >
                导入
              </Button>,
              <Button
                key="button"
                icon={<DownloadOutlined />}
                onClick={() => {
                  download('/system/user/export', {}, `user_${new Date().getTime()}.xlsx`);
                }}
              >
                导出
              </Button>,
            ]}
          />
        </Col>
      </Row>
      <UserModal
        userId={updateUserId}
        actionRef={actionRef}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <UploadFile
        accept=".xls, .xlsx"
        template="/system/user/importTemplate"
        action="/system/user/importData"
        ref={uploadRef}
      />
    </PageContainer>
  );
};

export default User;
