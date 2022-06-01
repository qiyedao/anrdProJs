// https://umijs.org/config/
import { defineConfig } from 'umi';

export default defineConfig({
  extraBabelPlugins: ['transform-remove-console'],
});
