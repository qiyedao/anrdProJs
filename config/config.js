// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';
import theme from './theme';
import openAPI from './openAPI';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  ssr: {},
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  // https://umijs.org/zh-CN/plugins/plugin-locale
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  // targets: {
  //   ie: 11,
  // },
  // umi routes: https://umijs.org/docs/routing
  routes,
  access: {},
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme,

  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  // Fast Refresh 热更新
  fastRefresh: {},
  openAPI,
  nodeModulesTransform: {
    type: 'none',
  },
  // mfsu: {},
  // webpack5: {},
  exportStatic: {},
  // chainWebpack(config, webpack) {
  //   console.log(JSON.stringify(config));
  // },
  // terserOptions: {
  //   compress: {
  //     drop_console: true,
  //   },
  // },
  // chunks: ['umi', 'vendors'],
  // chainWebpack: (config) => {
  //   config.optimization.splitChunks({
  //     chunks: 'all',
  //     minSize: 30000,
  //     minChunks: 1,
  //     cacheGroups: {
  //       vendors: {
  //         name: 'vendors',
  //         test: /[\\/]node_modules[\\/]/,
  //         priority: 0,
  //       },
  //     },
  //   });
  // },
});
