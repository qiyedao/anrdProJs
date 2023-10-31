import { defineConfig } from '@umijs/max';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';
const { REACT_APP_ENV = 'dev' } = process.env;
const APP_ENV = REACT_APP_ENV || 'dev';
const PUBLIC_PATH_MAP = {
  dev: '/',
  prod: '/',
};

// @ts-ignore
const PUBLIC_PATH = PUBLIC_PATH_MAP[APP_ENV];
const BASE_NAME = PUBLIC_PATH;
export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    ...defaultSettings,
  },
  routes: routes,
  proxy: proxy[REACT_APP_ENV as keyof typeof proxy],
  npmClient: 'pnpm',
  tailwindcss: {},
  define: { APP_ENV, PUBLIC_PATH, BASE_NAME },
  hash: true,
});
