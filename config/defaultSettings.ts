import { ProLayoutProps } from '@ant-design/pro-components';

const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string | false;
  favicons?: string[];
} = {
  // 拂晓蓝
  colorPrimary: '#29ccb1',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'QY1',
  pwa: true,
  favicons: ['./logo.png'],
  iconfontUrl: '',
};

export default Settings;
