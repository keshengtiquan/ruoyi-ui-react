import { baseUrl } from '@/services/ant-design-pro';
import { download } from '@/services/ant-design-pro/api';
import { getLocalStorage } from '@/utils/tool';
import { InboxOutlined } from '@ant-design/icons';
import { Checkbox, message, Modal, Upload, UploadProps } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import React, { forwardRef, ForwardRefRenderFunction, useImperativeHandle, useState } from 'react';

export interface UploadRefProps {
  showModel: () => void;
  hideModel: () => void;
}

interface PropsType {
  accept: string;
  action: string;
  template: string;
  multiple?: boolean;
  directory?: boolean;
}

const UploadFile: ForwardRefRenderFunction<UploadRefProps, PropsType> = (props, ref) => {
  const { accept, action, template, multiple = false, directory = false } = props;

  // ---------modal开始------------
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const hideModal = () => {
    setIsModalOpen(false);
  };
  const handleOk = () => {
    hideModal();
  };
  const handleCancel = () => {
    hideModal();
  };
  useImperativeHandle(ref, () => ({
    showModel: showModal,
    hideModel: hideModal,
  }));
  // ---------modal结束------------

  // ---------upload开始-------------
  const [updateSupport, setUpdateSupport] = useState<boolean>(false);
  const onUpdateSupportChange = (e: CheckboxChangeEvent) => {
    setUpdateSupport(e.target.checked);
  };
  const { Dragger } = Upload;
  const uploadProps: UploadProps = {
    name: 'file',
    accept,
    multiple,
    directory,
    action: `${baseUrl}${action}?updateSupport=${updateSupport}`,
    headers: { Authorization: 'Bearer ' + getLocalStorage('token') },
    onChange({ file, fileList }) {
      const { status } = file;
      if (status === 'done') {
        hideModal();
        fileList.forEach((item) => {
          Modal.info({
            title: '导入结果',
            content: <div dangerouslySetInnerHTML={{ __html: item.response.msg }}></div>,
          });
        });
      } else if (status === 'error') {
        message.error(`${file.name} 上传失败！`);
      }
    },
  };
  const downloadTemplat = () => {
    download(template, {}, `user_template_${new Date().getTime()}.xlsx`);
  };
  // ---------upload结束-------------

  return (
    <Modal
      title="上传文件"
      destroyOnClose={true}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Dragger {...uploadProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">点击或将文件拖动到此区域上传</p>
        <p className="ant-upload-hint">支持上传单个或多个文件，单个文件大小建议5M以内</p>
      </Dragger>
      <div style={{ textAlign: 'center', fontSize: '12px', marginTop: '10px' }}>
        <Checkbox style={{ fontSize: '12px' }} onChange={onUpdateSupportChange}>
          是否更新已存在的数据
        </Checkbox>
        <div>
          仅允许导入{accept}格式文件。<a onClick={downloadTemplat}>下载模板</a>
        </div>
      </div>
    </Modal>
  );
};

export default forwardRef(UploadFile);
