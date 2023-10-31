// 运行时配置
import Footer from '@/components/Footer';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { Avatar, FloatButton } from 'antd';
import RightHeader from './components/RightHeader';
import token from './theme';
// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{
  name: string;
  currentUser: Record<string, any>;
}> {
  console.log('app');
  return {
    name: '@umijs/max',
    currentUser: { name: '@umijs/max', avatar: '/logo.png' },
  };
}

export const layout: RunTimeLayoutConfig = ({}) => {
  return {
    logo: <Avatar src={'/logo.png'} />,

    menu: {
      locale: false,
    },
    layout: 'side',
    fixedHeader: false,

    colorPrimary: token?.colorPrimary,

    breadcrumbRender: (routes) => routes?.slice(1),
    rightContentRender: () => <></>,
    childrenRender: (dom) => (
      <div style={{ minHeight: '100vh' }}>
        <RightHeader />
        {dom}

        <FloatButton.BackTop visibilityHeight={200} />
      </div>
    ),
    footerRender: () => <Footer />,
    token: token,
  };
};
