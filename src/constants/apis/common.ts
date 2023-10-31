const BASE_URL_MAP = {
  dev: '/proxy/',
  prod: '/',
};

const BASE_URL = BASE_URL_MAP[APP_ENV];

const PREFIX_MAP = {
  dev: {
    GLOBAL: '',
    STATIC: '',
    USER: '',
    SYSTEM_USER: '',
    STANDARD_SYSTEM: '',
  },
  prod: {
    GLOBAL: '',
    STATIC: '',
    USER: '',
    SYSTEM_USER: '',
    STANDARD_SYSTEM: '',
  },
};

// @ts-ignore
const PREFIX = PREFIX_MAP[APP_ENV];

const URL_PREFIX = BASE_URL;

export { PREFIX, URL_PREFIX };
