import React, { useState } from 'react';
import ShowOrEditUpload from '../showOrEditUpload';
const CustomUpload = ({
  value = {},
  onChange,
  disabled = false,
  style,
  isButton,
  length = 1,
  showUploadList,
  accept,
  info,
}) => {
  const [currentVal, setCurretVal] = useState({});

  const triggerChange = (changedValue) => {
    console.log('changedValue', changedValue, 'value', value);
    onChange?.({
      ...value,
      ...changedValue,
    });
  };
  const uploadChange = (val) => {
    setCurretVal(val);
    triggerChange(val);
  };
  return (
    <span>
      <ShowOrEditUpload
        showUploadList={showUploadList}
        style={style}
        disabled={disabled}
        isButton={isButton}
        length={length}
        info={info}
        accept={accept}
        url={value?.filePath || currentVal?.filePath}
        setUploadUrl={(values) => {
          uploadChange(values);
        }}
        deleteUploadUrl={() => {
          uploadChange({});
        }}
      />
    </span>
  );
};

export default CustomUpload;
