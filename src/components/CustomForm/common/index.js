import {
  Cascader,
  Checkbox,
  DatePicker,
  Input,
  InputNumber,
  Radio,
  Rate,
  Select,
  Slider,
  Switch,
  TimePicker,
  Tree,
  TreeSelect,
} from 'antd';
import classNames from 'classnames';
import WrappedFormItem from '../components/CustomWrappedFormItem';
import CustomInput from '../CustomInputSelect';
import CustomUpload from '../CustomIUpload';
import './index.less';
const { TextArea } = Input;
const RangePicker = DatePicker.RangePicker;

const renderRequired = (fieldProps) =>
  fieldProps?.required && <span style={{ color: 'red' }}>*</span>;

const renderLabel = (fieldProps, labelStyle, labelName) => (
  <span className="custom-label-container">
    {fieldProps?.justify && renderRequired(fieldProps)}
    <span
      className={classNames(fieldProps?.justify ? 'custom-label' : '')}
      style={{
        ...labelStyle,
      }}
    >
      {!fieldProps?.justify && renderRequired(fieldProps)}
      {labelName}
    </span>
  </span>
);
/**
 *
 * @param {*} item
 * @returns
 */
export const renderFormComponent = (item) => {
  const {
    type,
    name,
    labelName,
    fieldProps,
    labelStyle,
    disabled,
    readonly,
    suffix,
    inline = false,
    style = {},
    inlineStyle = {},
  } = item;
  let styles = { width: fieldProps?.width || '100%' };

  let readonlySyle = readonly
    ? { backgroundColor: '#fff', cursor: 'default', color: '#0E2949' }
    : {};
  styles = Object.assign(styles, readonlySyle, style);
  switch (type) {
    case 'Input':
      return (
        <WrappedFormItem
          name={name}
          rules={fieldProps?.rules || []}
          label={renderLabel(fieldProps, labelStyle, labelName)}
        >
          <Input suffix={suffix} style={{ ...styles }} disabled={!!disabled} {...fieldProps} />
        </WrappedFormItem>
      );
    case 'InputSelect':
      return (
        <WrappedFormItem
          name={name}
          rules={fieldProps?.rules || []}
          label={renderLabel(fieldProps, labelStyle, labelName)}
        >
          <CustomInput style={{ ...styles }} disabled={!!disabled} {...fieldProps} />
        </WrappedFormItem>
      );
    case 'Cascader':
      return (
        <WrappedFormItem
          name={name}
          rules={fieldProps?.rules || []}
          label={renderLabel(fieldProps, labelStyle, labelName)}
        >
          <Cascader style={{ ...styles }} disabled={!!disabled} {...fieldProps} />
        </WrappedFormItem>
      );
    case 'Upload':
      return (
        <WrappedFormItem
          name={name}
          inline={inline}
          inlineStyle={inlineStyle}
          rules={fieldProps?.rules || []}
          label={renderLabel(fieldProps, labelStyle, labelName)}
        >
          <CustomUpload style={styles} {...fieldProps} />
        </WrappedFormItem>
      );
    case 'InputNumber':
      return (
        <WrappedFormItem
          name={name}
          rules={fieldProps?.rules || []}
          label={renderLabel(fieldProps, labelStyle, labelName)}
        >
          <InputNumber
            placeholder={fieldProps.placeholder || ''}
            style={styles}
            disabled={!!disabled}
            {...fieldProps}
          />
        </WrappedFormItem>
      );
    case 'TextArea':
      return (
        <WrappedFormItem
          name={name}
          rules={fieldProps?.rules || []}
          label={renderLabel(fieldProps, labelStyle, labelName)}
        >
          <TextArea style={styles} disabled={!!disabled} {...fieldProps} />
        </WrappedFormItem>
      );
    case 'Select':
      return (
        <WrappedFormItem
          name={name}
          rules={fieldProps?.rules || []}
          label={renderLabel(fieldProps, labelStyle, labelName)}
        >
          <Select disabled={!!disabled} style={styles} {...fieldProps} />
        </WrappedFormItem>
      );
    case 'Checkbox':
      return (
        <WrappedFormItem
          name={name}
          rules={fieldProps?.rules || []}
          label={renderLabel(fieldProps, labelStyle, labelName)}
        >
          <Checkbox.Group disabled={!!disabled} style={styles} {...fieldProps} />
        </WrappedFormItem>
      );
    case 'Radio':
      return (
        <WrappedFormItem
          name={name}
          rules={fieldProps?.rules || []}
          label={renderLabel(fieldProps, labelStyle, labelName)}
        >
          <Radio.Group disabled={!!disabled} style={styles} {...fieldProps} />
        </WrappedFormItem>
      );
    case 'Tree':
      return (
        <WrappedFormItem
          name={name}
          rules={fieldProps?.rules || []}
          label={renderLabel(fieldProps, labelStyle, labelName)}
        >
          <Tree disabled={!!disabled} style={styles} {...fieldProps} />
        </WrappedFormItem>
      );
    case 'TreeSelect':
      return (
        <WrappedFormItem
          name={name}
          rules={fieldProps?.rules || []}
          label={renderLabel(fieldProps, labelStyle, labelName)}
        >
          <TreeSelect disabled={!!disabled} style={styles} {...fieldProps} />
        </WrappedFormItem>
      );
    case 'Rate':
      return (
        <WrappedFormItem
          name={name}
          rules={fieldProps?.rules || []}
          label={renderLabel(fieldProps, labelStyle, labelName)}
        >
          <Rate disabled={!!disabled} style={styles} {...fieldProps} />
        </WrappedFormItem>
      );
    case 'Switch':
      return (
        <WrappedFormItem
          name={name}
          rules={fieldProps?.rules || []}
          label={renderLabel(fieldProps, labelStyle, labelName)}
        >
          <Switch disabled={!!disabled} style={styles} {...fieldProps} />
        </WrappedFormItem>
      );
    case 'Slider':
      return (
        <WrappedFormItem
          name={name}
          rules={fieldProps?.rules || []}
          label={renderLabel(fieldProps, labelStyle, labelName)}
        >
          <Slider disabled={!!disabled} style={styles} {...fieldProps} />
        </WrappedFormItem>
      );
    case 'TimePicker':
      return (
        <WrappedFormItem
          name={name}
          rules={fieldProps?.rules || []}
          label={renderLabel(fieldProps, labelStyle, labelName)}
        >
          <TimePicker disabled={!!disabled} style={styles} {...fieldProps} />
        </WrappedFormItem>
      );
    case 'DatePicker':
      return (
        <WrappedFormItem
          name={name}
          rules={fieldProps?.rules || []}
          label={renderLabel(fieldProps, labelStyle, labelName)}
        >
          <DatePicker disabled={!!disabled} style={styles} {...fieldProps} />
        </WrappedFormItem>
      );
    case 'RangePicker':
      return (
        <WrappedFormItem
          name={name}
          rules={fieldProps?.rules || []}
          label={renderLabel(fieldProps, labelStyle, labelName)}
        >
          <RangePicker disabled={!!disabled} style={styles} {...fieldProps} />
        </WrappedFormItem>
      );
    default:
      return (
        <WrappedFormItem
          name={name}
          rules={fieldProps?.rules || []}
          label={renderLabel(fieldProps, labelStyle, labelName)}
        >
          <Input style={styles} disabled={!!disabled} {...fieldProps} />
        </WrappedFormItem>
      );
  }
};

export const formArr = (arr, span) => {
  let arr2 = [];
  let tempArr = [];
  for (let i = 0; i < arr.length / span; i++) {
    arr2.push(arr.slice(i * span, span * (i + 1)));
  }

  return arr2;
};
