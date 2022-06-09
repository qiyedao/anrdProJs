import React from 'react';
import CustomIcon from '../assets/del.png';
import CustomBtn from './CustomBtn';
export default ({ onClick, disabled }) => {
  return (
    <CustomBtn
      disabled={disabled}
      textStyle={{ color: 'rgba(232, 37, 52, 1)' }}
      onClick={() => {
        onClick();
      }}
      icon={CustomIcon}
      text="删除"
    />
  );
};
