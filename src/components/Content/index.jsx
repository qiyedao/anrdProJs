import RightContent from '@/components/RightContent';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useIntl } from 'umi';
import './index.less';
import ContentLayout from './Layout/layout';
const ignoreBreadCrumb = ['/welcome'];
const ignoreLayout = ['/console/home/home'];
const Content = ({ children }) => {
  const intl = useIntl();
  const handleMessage = (localeList) => {
    let temp = [];
    for (let i = 1; i < localeList.length; i++) {
      const defaultLoginSuccessMessage = intl.formatMessage({
        id: localeList.slice(0, i + 1).join('.'),
      });
      temp.push(defaultLoginSuccessMessage);
    }
    return temp;
  };
  const breadcrumbRender = (e) => {
    const { currentMenu, breadcrumb } = e;

    if (!currentMenu || ignoreBreadCrumb.includes(currentMenu.path)) {
      return (
        <div className="custom-page-header">
          <RightContent />
        </div>
      );
    }

    let nameList = [];

    const localeList = currentMenu?.locale && currentMenu?.locale?.split('.').slice(0);

    let breadcrumbList = [];

    if (localeList && localeList.length > 1) {
      nameList = handleMessage(localeList);

      nameList.map((item, index) => {
        breadcrumbList.push(
          <div
            key={'breadcrumbName' + index}
            className={index === nameList.length - 1 ? 'custom-breadcrumb-active' : ''}
          >
            {item}
            {index !== nameList.length - 1 ? <div className="custom-breadcrumb-line">/</div> : ''}
          </div>,
        );
      });
    } else {
      breadcrumbList.push(
        <div key={'breadcrumbName-0'} className={' custom-breadcrumb-active'}>
          {currentMenu.name}
        </div>,
      );
    }
    return (
      <div className="custom-page-header">
        <div className="custom-breadcrumb ">{breadcrumbList}</div>
        <RightContent />
      </div>
    );
  };
  return ignoreLayout.includes(window.location.pathname) ? (
    <div className={'custom-no-layout'}>{children}</div>
  ) : (
    <PageHeaderWrapper
      header={{
        title: '',
      }}
      style={{ minWidth: 800 }}
      breadcrumbRender={breadcrumbRender}
    >
      <ContentLayout>{children}</ContentLayout>
    </PageHeaderWrapper>
  );
};
export default Content;
