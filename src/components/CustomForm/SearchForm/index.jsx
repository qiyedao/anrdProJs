import { formArr, renderFormComponent } from '@/components/CustomForm/common/index';
import { Form, Select } from 'antd';
import CustomWrappedFormItem from '../components/CustomWrappedFormItem';
import styles from './index.less';
const { Option } = Select;
const Demo = ({ span, searchColumns, searchFormRef, toolBarRender }) => {
  const onFinish = (values) => {
    console.log('Received values from form: ', values);
  };

  const checkPrice = (_, value) => {
    if (value.number > 0) {
      return Promise.resolve();
    }

    return Promise.reject(new Error('Price must be greater than zero!'));
  };

  return (
    <Form
      ref={searchFormRef}
      name="customized_form_controls"
      layout="inline"
      onFinish={onFinish}
      initialValues={{
        price: {
          number: 0,
          currency: 'rmb',
        },
      }}
    >
      <div>
        {formArr(searchColumns, span || 3).map((item1, index1) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <div key={`${index1}searchColumns`} className={styles['custom-row']}>
              {searchColumns &&
                item1.map((item, index) => {
                  return (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={`${index}searchColumns`} className={styles['custom-col']}>
                      {renderFormComponent(item)}
                    </div>
                  );
                })}
              {index1 == Math.ceil(searchColumns.length / span) - 1 ? (
                <div key={`action`} className={styles['custom-col']}>
                  <CustomWrappedFormItem>
                    {toolBarRender ? toolBarRender.map((item) => item) : null}
                  </CustomWrappedFormItem>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </Form>
  );
};

export default Demo;
