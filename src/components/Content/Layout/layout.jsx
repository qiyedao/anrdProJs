import React from 'react';
import './index.less';

const Content = ({ children }) => {
  console.log('location', location);
  let noPaddingPath = ['/welcome'];
  const isNO = noPaddingPath.includes(location.pathname);
  return (
    <div
      className={
        isNO ? 'custom-content-layout-container-noPadding' : 'custom-content-layout-container'
      }
    >
      {children}
    </div>
  );
};
export default Content;
