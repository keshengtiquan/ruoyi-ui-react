import useTheme from '@/hooks/useTheme';
import { getDeptTreeApi, getUserListApi } from '@/services/ant-design-pro/user';
import { UserParams, UserResult, UserTree } from '@/services/ant-design-pro/user/user';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Col, Input, Row, Tree } from 'antd';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { debounce } from 'lodash'


const User: React.FC = () => {
  const [treeData, setTreeData] = useState<UserTree[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const token = useTheme()

  // ----------侧边部门树开始------------
  const getUserTree = async () => {
    const { data } = await getDeptTreeApi();
    setTreeData(data);
  };
  const searchHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }
  const filterTreeData = (data: UserTree[], searchValue: string): UserTree[] => {
    return data
      .map(item => {
        const children = item.children ? filterTreeData(item.children, searchValue) : [];
        if (item.label.includes(searchValue) || children.length > 0) {
          return { ...item, children };
        }
        return null;
      })
      .filter(item => item !== null) as UserTree[];
  };
  const filteredTreeData = useMemo(() => filterTreeData(treeData, searchValue), [treeData, searchValue]);
  // ----------侧边部门树结束------------

  // -------------表格开始--------------
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<UserResult>[] = [
    {
      title: '用户编码',
      dataIndex: 'userId',
      ellipsis: true,
      search: false,
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
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
        transform: (value) => {
          return {
            params: {
              beginTime: value[0],
              endTime: value[1],
            }
          };
        },
      },
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
    },
  ];
  async function getTableDate(params: UserParams & {
    pageSize?: number;
    current?: number;
    keyword?: string;
  }) {
    const data = await getUserListApi({ ...params })
    return {
      data: data.rows,
      success: true,
      total: data.total
    }
  }

  // -------------表格结束--------------

  useEffect(() => {
    getUserTree();
  }, []);

  return (
    <PageContainer breadcrumbRender={false}>
      <Row gutter={10}>
        <Col xs={24} sm={24} md={10} lg={8} xl={5}>
          <div style={{ backgroundColor: token.colorBgBase, padding: '10px', borderRadius: token.borderRadius }}>
            <Input style={{ marginBottom: '10px' }} prefix={<SearchOutlined />} onChange={debounce(searchHandle, 100)} placeholder="请输入部门名称" />
            {
              treeData.length > 0 && <Tree
                defaultExpandAll={true}
                fieldNames={{ title: 'label', key: 'id' }}
                treeData={filteredTreeData}
              />
            }
          </div>
        </Col>
        <Col xs={24} sm={24} md={14} lg={16} xl={19}>
          <ProTable<UserResult>
            columns={columns}
            actionRef={actionRef}
            // cardBordered
            rowKey="userId"
            request={(params) => getTableDate(params)}
            search={{
              labelWidth: 'auto',
              span: {
                xs: 24,
                sm: 24,
                md: 12,
                lg: 8,
                xl: 6,
                xxl: 6,
              },
            }}
            options={{
              fullScreen: true
            }}
            pagination={{
              pageSize: 10,
            }}
            dateFormatter="string"
            headerTitle="用户表格"
            toolBarRender={() => [
              <Button
                key="button"
                icon={<PlusOutlined />}
                onClick={() => { }}
                type="primary"
              >
                新增
              </Button>
            ]}
          />
        </Col>
      </Row>
    </PageContainer>
  );
};

export default User;
