import { Form } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { formArr, renderFormComponent } from '../common';
import CustomModal from '../components/Modal/CustomModal';

import styles from './index.less';
export default ({
  visible,
  values,
  title,
  valuesKey = 'id',
  columns = [],
  onSubmit,
  toolBarRender,
  span,
  onCancel,
  rowStyle,
  colStyle,
  formProps = {},
  modalProps = {},
}) => {
  const formRef = useRef();
  const [confirmLoading, setConfirmLoading] = useState(false);
  console.log('values', values);
  useEffect(() => {
    formRef?.current?.setFieldsValue(values);
  }, [values]);
  return (
    <CustomModal
      title={`${values && values[valuesKey] ? '编辑' : '新增'}${title || ''}`}
      visible={visible}
      confirmLoading={confirmLoading}
      onSubmit={() => {
        formRef.current
          .validateFields()
          .then(async (val) => {
            setConfirmLoading(true);
            const status = await onSubmit(val);
            console.log('status', status);
            setConfirmLoading(!status);
          })
          .catch((err) => {});
      }}
      onCancel={() => {
        formRef?.current.resetFields();
        onCancel();
      }}
      {...modalProps}
    >
      <Form ref={formRef} {...formProps}>
        <div>
          {formArr(columns, span || 1).map((item1, index1) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <div key={`${index1}columns`} style={rowStyle} className={styles['custom-row']}>
                {columns &&
                  item1.map((item, index) => {
                    return (
                      // eslint-disable-next-line react/no-array-index-key
                      <div
                        key={`${index}columns`}
                        style={colStyle}
                        className={styles['custom-col']}
                      >
                        {renderFormComponent(item)}
                      </div>
                    );
                  })}
              </div>
            );
          })}

          {toolBarRender ? (
            <div style={modalProps?.footerStyle}>
              {toolBarRender ? toolBarRender.map((item) => item) : null}
            </div>
          ) : null}
        </div>
      </Form>
    </CustomModal>
  );
};
