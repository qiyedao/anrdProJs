const BASE_URL_MAP = {
  dev: '/proxy/',
  prod: '/',
};

const BASE_URL = BASE_URL_MAP[APP_ENV];

const PREFIX_MAP = {
  dev: {
    GLOBAL: 'api/v1/',
    STATIC: '',
    USER: 'api/v1/',
    SYSTEM_USER: 'api/v1/system/user/',
    STANDARD_SYSTEM: 'api/v1/sys/',
  },
  prod: {
    GLOBAL: 'api/v1/',
    STATIC: '',
    USER: 'api/v1/',
    SYSTEM_USER: 'api/v1/system/user/',
    STANDARD_SYSTEM: 'api/v1/sys/',
  },
};

// @ts-ignore
const PREFIX = PREFIX_MAP[APP_ENV];

const URL_PREFIX = BASE_URL;

export { PREFIX, URL_PREFIX };
