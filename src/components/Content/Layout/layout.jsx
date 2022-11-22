import classNames from 'classnames';
import './index.less';
const Content = ({ children }) => {
  let noPaddingPath = ['/welcome'];
  let noBgColor = ['/welcome'];
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
