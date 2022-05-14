import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import './index.less';
export default ({
  children,
  onSubmit,
  okText,
  cancelText,
  okStyle,
  cancelStyle,
  onCancel,
  footer,
  visible,
  title,
  closable,
  footerStyle,
  headerStyle,
  contentStyle,
  confirmLoading,
  bodyStyle,
}) => {
  const renderButton = () => {
    if (footer) {
      return footer;
    } else {
      return [
        <Button
          loading={confirmLoading || false}
          onClick={() => {
            onSubmit && onSubmit();
          }}
          key={'ok'}
          type="primary"
          style={okStyle || { marginRight: 16, width: 75 }}
        >
          {okText ? okText : '确定'}
        </Button>,
        <Button
          onClick={() => {
            onCancel && onCancel();
          }}
          key={'cancel'}
          style={cancelStyle || { width: 75 }}
        >
          {cancelText ? cancelText : '取消'}
        </Button>,
      ];
    }
  };
  return (
    <Modal
      footer={null}
      closable={closable || false}
      closeIcon={<div>hello</div>}
      visible={visible}
      bodyStyle={bodyStyle || { padding: 16 }}
    >
      <div className="custom-modal-header" style={headerStyle || {}}>
        <div>{title}</div>
        <div>hello</div>
      </div>
      <div style={contentStyle || {}}>{children}</div>
      <div style={footerStyle || { display: 'flex', justifyContent: 'center' }}>
        {renderButton()}
      </div>
    </Modal>
  );
};
