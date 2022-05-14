import { Form, Input, Select, Button, DatePicker, Row, Col } from 'antd';
const { Option } = Select;
import WrappedFormItem from '../components/WrappedFormItem';
const RangePicker = DatePicker.RangePicker;
export const renderFormComponent = (item) => {
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
