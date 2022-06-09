import React from 'react';
import CustomBtn from './CustomBtn';
export default ({ onClick }) => {
  return (
    <CustomBtn
      onClick={() => {
        onClick();
      }}
      text="详情"
    />
  );
};
