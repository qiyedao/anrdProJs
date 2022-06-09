import classNames from 'classnames';
import React from 'react';
import './index.less';
const Content = ({ children }) => {
  let noPaddingPath = ['/welcome'];
  let noBgColor = ['/material/info/detail', '/supply/admin/detail', '/supply/market/detail'];
  const isNOPadding = noPaddingPath.includes(location.pathname);
  const isNOBg = noBgColor.includes(location.pathname);

  return (
    <div className={classNames(isNOPadding ? 'custom-layout-wrapper-p0' : 'custom-layout-wrapper')}>
      <div
        className={classNames(
          'custom-content-layout-container',
          isNOBg ? 'custom-content-layout-container-noBg' : '',
        )}
      >
        {children}
      </div>
    </div>
  );
};
export default Content;
