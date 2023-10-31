import { PREFIX } from './common';

/** 静态资源配置 */
const STATIC = {
  QUERY: `${PREFIX.STATIC}get`,
  SET: `${PREFIX.STATIC}set`,
  ROLLBACK: `${PREFIX.STATIC}rollback`,
};

export default STATIC;
