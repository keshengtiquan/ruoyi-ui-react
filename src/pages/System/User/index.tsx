import { getDeptTreeApi } from '@/services/ant-design-pro/user';
import { UserTree } from '@/services/ant-design-pro/user/user';
import { PageContainer } from '@ant-design/pro-components';
import { Col, Row, Tree } from 'antd';
import React, { useEffect, useState } from 'react';

const User: React.FC = () => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [treeData, setTreeData] = useState<UserTree[]>([]);

  const onExpand = (newExpandedKeys: React.Key[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  const getUserTree = async () => {
    const { data } = await getDeptTreeApi();
    setTreeData(data);
  };

  useEffect(() => {
    getUserTree();
  }, []);

  return (
    <PageContainer>
      <Row gutter={{ xs: 0, sm: 0, md: 10, lg: 10 }}>
        <Col xs={24} sm={24} md={10} lg={8} xl={5}>
          <div>
            <Tree
              onExpand={onExpand}
              expandedKeys={expandedKeys}
              autoExpandParent={autoExpandParent}
              fieldNames={{ title: 'label', key: 'id' }}
              treeData={treeData}
            />
          </div>
        </Col>
        <Col xs={24} sm={24} md={14} lg={16} xl={19}>
          <div style={{ backgroundColor: 'blue' }}>456</div>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default User;
