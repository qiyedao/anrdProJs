import { Button, Modal } from 'antd';
import classNames from 'classnames';
import React from 'react';
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
  rightTitle,
  closable,
  footerStyle,
  headerStyle,
  contentStyle,
  confirmLoading,
  bodyStyle,
  headerBorder = false,
  footerBorder = false,
  titleStyle,
  rigitTitleStyle,

  width,
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
          style={okStyle || { marginRight: 16 }}
        >
          {okText ? okText : '确定'}
        </Button>,
        <Button
          onClick={() => {
            onCancel && onCancel();
          }}
          key={'cancel'}
          style={cancelStyle || {}}
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
      visible={visible}
      bodyStyle={bodyStyle || {}}
      width={width || 520}
      onCancel={() => {
        if (footer && footer.length == 0) {
          onCancel();
        }
      }}
    >
      <div
        className={classNames(
          'custom-modal-header',
          headerBorder ? 'custom-modal-header-border' : '',
        )}
        style={headerStyle || {}}
      >
        <div style={titleStyle || {}}>{title}</div>
        <div style={rigitTitleStyle || {}} className={classNames('custom-title-right')}>
          {rightTitle}
        </div>
      </div>
      <div style={contentStyle || {}}>{children}</div>
      <div
        className={classNames(
          'custom-modal-footer',
          footerBorder ? 'custom-modal-footer-border' : '',
        )}
        style={footerStyle || {}}
      >
        {renderButton()}
      </div>
    </Modal>
  );
};
