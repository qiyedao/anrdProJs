import { SettingDrawer } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { history, Link } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import Content from './components/Content';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import defaultSettings from '../config/defaultSettings';
const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';
/** 获取用户信息比较慢的时候会展示一个 loading */
import MenuIcon from './components/MenuIcon';

const menuIcon = {
  icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAAAXNSR0IArs4c6QAAAyxJREFUaEPtmz2MDVEUx3+HEN+CSHwFIUJDpVPpVFQ6FZWKikpFQ0WDhoZOpdOpdDQ6sRTY3UKwyVrsLq78X+6V2TGzs+/Nnfdmxtxkmrl37j2/879f5+1ZI6c459YDa4BVwGpgRV7bEb2fB74DP4BvZjadZYelXzrnVgK7gLUjMnzQYWeAD2Y2l+xgAaBzbhOwHVg+6Cgj/u4XMGlmX4IdfwGdc5uBnSM2MNbw42b2WZ31AP20PAAsizXCiPv5DbzWdA2A+xq45op8OGNmb805p51yf1Hrhta/EeAWYEdDAYrMnhDgHmBDUcuG1k8J8FAND/FY/pwT4OFYvdWxnw6wjqr0Y1OnYD/eqmPbTsGIqii+vOf7Owdkxm8Rx+t1NSwFdVO6mYhWxoGhQA4D8KBX7itwwSt0X0GMh3wVW7UFAW/FB32AmwTOJqalpqsgFVxLycogq1QwDy44eCiQVQEeB67q54OUcunZmIS8CDyPPV2rADzl4WSs1lzRbinIW8BR4ArwOCZkbMAAJyNlbD9Fiuv7qJAxAcvABUdEh4wFeB7Qk1ZOG82lAhm1iyZLgLwN3O1nCmS1jQEogDO+8yOpQbS+Ql2erXcyKl76dw+BG2UgYwA+8gZIrTTgoLYJMJyNpwftJOZVLUzRmIBSNkvdvnhjKKgB8wB1Bz1ZYFHWOpOCjQG8tgigzshwP0020zXuAfC0L7kyGletYFn7Sn/fAS7RhYttMrqCKTTKKy8yKrQjTyzhmldoXtUKytBwjOQZcywD5BmgM7D2u2ihh3MaNGYXbQ2g4j+FPCf82hkUTN/p7Hzij4/aHBO6c2qtaTMpG88pKtEfZnVFK4olCx0Za5MJnr8MSM0yRapdjzATejbEBCwDVdm3HWBlrh1Sx52CQ3J0ZcP8Fwq2OQlhXgruBXRQt7FMC3AbsLWNdMBHAW4EdrcU8J0AlWGoXDVl9rapKBN4LGQbCk6QbUqnHDOz2WRCbJuS8ibM7FPvsp2ckz7rV5tOk1OaBTcVuLKS0pVdr6T0dQ1bkMoBeG9mP5N2/wMYKn2aszLvw6Ns/DoVZdcr016P/q1gNsu4P2Z/NeZ557qMAAAAAElFTkSuQmCC',
};
export const initialStateConfig = {
  loading: <PageLoading />,
};
/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */

export async function getInitialState() {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser();
      console.log('queryCurrentUser', msg);
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }

    return undefined;
  }; // 如果不是登录页面，执行

  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    console.log('queryCurrentUser', currentUser);
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }

  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
} // ProLayout 支持的api https://procomponents.ant.design/components/layout

export const layout = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    // waterMarkProps: {
    //   content: initialState?.currentUser?.name,
    // },
    menuItemRender: (item, defaultDom) => {
      console.log('menuItemRender', item);

      console.log(item);
      if (item.pro_layout_parentKeys.length == 0) {
        return (
          <Link to={item.path}>
            <span className=" anticon custom-icon">
              <MenuIcon imgSrc={menuIcon.icon} />
              <span className="ant-pro-menu-item-title">{item.name}</span>
            </span>
          </Link>
        );
      } else {
        return (
          <Link to={item.path}>
            <span>{defaultDom}</span>
          </Link>
        );
      }
    },
    subMenuItemRender: (item, defaultDom) => {
      if (item.pro_layout_parentKeys.length == 0) {
        return (
          <span className=" anticon custom-icon">
            <MenuIcon imgSrc={menuIcon.icon} />
            <span className="ant-pro-menu-item-title">{item.name}</span>
          </span>
        );
      } else {
        return <span>{defaultDom}</span>;
      }
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history; // 如果没有登录，重定向到 login

      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    // links: isDev
    //   ? [
    //       <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
    //         <LinkOutlined />
    //         <span>OpenAPI 文档</span>
    //       </Link>,
    //       <Link to="/~docs" key="docs">
    //         <BookOutlined />
    //         <span>业务组件文档</span>
    //       </Link>,
    //     ]
    //   : [],
    menuHeaderRender: undefined,

    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <Content>
          {children}
          {/* {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({ ...preInitialState, settings }));
              }}
            />
          )} */}
        </Content>
      );
    },
    ...initialState?.settings,
  };
};
