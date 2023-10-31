import { ProLayoutProps } from '@ant-design/pro-components';
// https://procomponents.ant.design/components/layout#token
const colorPrimary = '#1890ff';
const colorBgPrimary = '#000';
const colorTextPrimary = '#fff';
const Token: ProLayoutProps['token'] = {
  colorPrimary: colorPrimary,
  sider: {
    colorMenuBackground: colorBgPrimary,
    colorBgMenuItemActive: 'transparent',
    colorBgMenuItemSelected: colorPrimary,
    colorTextMenu: colorTextPrimary,
    colorTextMenuItemHover: colorTextPrimary,
    colorTextSubMenuSelected: colorTextPrimary,
    colorTextMenuSelected: colorTextPrimary,
    colorBgCollapsedButton: colorBgPrimary,
    colorTextCollapsedButton: colorTextPrimary,
    colorTextCollapsedButtonHover: colorTextPrimary,
    colorBgMenuItemCollapsedElevated: colorBgPrimary,
  },
  header: {
    colorBgHeader: colorBgPrimary,
    colorHeaderTitle: colorTextPrimary,
    colorTextMenu: colorTextPrimary,
  },
};
export default Token;
