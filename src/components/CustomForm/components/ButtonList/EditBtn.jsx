import React from 'react';
import CustomIcon from '../assets/edit.png';
import CustomBtn from './CustomBtn';
export default ({ onClick, disabled }) => {
  return (
    <CustomBtn
      disabled={disabled}
      onClick={() => {
        onClick();
      }}
      icon={CustomIcon}
      text="编辑"
    />
  );
};
