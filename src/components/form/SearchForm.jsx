import React, { useState } from 'react';
import { Form, Input, Select, Button, DatePicker, Row, Col } from 'antd';
const { Option } = Select;
import './index.less';
import WrappedFormItem from './WrappedFormItem';
const RangePicker = DatePicker.RangePicker;
const renderComponent = (item) => {
  const { type, name, labelName, fieldProps, labelStyle } = item;
  switch (type) {
    case 'input':
      return (
        <WrappedFormItem
          name={name}
          label={
            <span
              style={{
                ...labelStyle,
              }}
            >
              {labelName}
            </span>
          }
        >
          <Input />
        </WrappedFormItem>
      );
    case 'select':
      return (
        <WrappedFormItem
          name={name}
          label={
            <span
              style={{
                ...labelStyle,
              }}
            >
              {labelName}
            </span>
          }
        >
          <Select style={{ width: fieldProps?.width || '100%' }} {...fieldProps} />
        </WrappedFormItem>
      );
    case 'DatePicker':
      return (
        <WrappedFormItem
          name={name}
          label={
            <span
              style={{
                ...labelStyle,
              }}
            >
              {labelName}
            </span>
          }
        >
          <DatePicker style={{ width: fieldProps?.width || '100%' }} {...fieldProps} />
        </WrappedFormItem>
      );
    case 'RangePicker':
      return (
        <WrappedFormItem
          name={name}
          label={
            <span
              style={{
                ...labelStyle,
              }}
            >
              {labelName}
            </span>
          }
        >
          <RangePicker style={{ width: fieldProps?.width || '100%' }} {...fieldProps} />
        </WrappedFormItem>
      );
    default:
      return (
        <WrappedFormItem
          name={name}
          label={
            <span
              style={{
                ...labelStyle,
              }}
            >
              {labelName}
            </span>
          }
        >
          <Input />
        </WrappedFormItem>
      );
  }
};
const Demo = ({ labelStyle = {}, span, searchColumns, searchFormRef, toolBarRender }) => {
  console.log('searchColumns', searchColumns);

  const onFinish = (values) => {
    console.log('Received values from form: ', values);
  };

  const checkPrice = (_, value) => {
    if (value.number > 0) {
      return Promise.resolve();
    }

    return Promise.reject(new Error('Price must be greater than zero!'));
  };
  const formArr = (arr, span) => {
    let arr2 = [];
    let tempArr = [];
    for (let i = 0; i < arr.length / span; i++) {
      arr2.push(arr.slice(i * span, span * (i + 1)));
    }

    console.log('arr2', arr2);
    return arr2;
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
            <div key={`${index1}searchColumns`} className={'custom-row'}>
              {searchColumns &&
                item1.map((item, index) => {
                  return (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={`${index}searchColumns`} className={'custom-col'}>
                      {renderComponent(item)}
                    </div>
                  );
                })}
              {index1 == Math.ceil(searchColumns.length / span) - 1 ? (
                <div key={`action`} className={'custom-col'}>
                  <WrappedFormItem>
                    {toolBarRender ? toolBarRender.map((item) => item) : null}
                  </WrappedFormItem>
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
