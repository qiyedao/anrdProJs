import type { RequestConfig, ResponseInterceptor } from '@umijs/max';
import { notification } from 'antd';
import qs from 'qs';

import { removeEmptyValues } from '@/utils';
import delay from '@/utils/delay';
import { getStorage } from '@/utils/storage';

export const codeMessage: any = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

// @ts-ignore
const responseInterceptor: ResponseInterceptor = (response) => {
  console.log('response', response);
  if (['blob', 'stream'].includes(response.config.responseType ?? '')) {
    return response;
  }
  const { retCode } = response?.data as any;

  // eslint-disable-next-line
  if (retCode != 0) return Promise.reject(response?.data || 'Error');
  return response;
};

/** 异常处理程序
 * @see https://beta-pro.ant.design/docs/request-cn
 */
const errorHandler: Required<RequestConfig>['errorConfig']['errorHandler'] =
  async (error) => {
    const { response, errorCode } = error as any;

    if (response && response.status) {
      const { data: { message, path, retCode } = {} as any } = response as any;
      const errorText =
        message || response?.message || codeMessage[response.status] || 'error';
      notification.error({
        message: `请求错误 ${response.status}: ${path ?? ''}`,
        description: errorText,
        key: 'errorCode',
      });

      if (retCode === '50006' || response.status === 401) {
        await delay(2000);
        // logoutToRedirect();
        console.log('request.ts--->60');

        return Promise.reject(message);
      }
    }

    // 无权限 重新登陆
    if (errorCode === 200000 || errorCode === 100102) {
      // const message = error?.message || 'Error';
      const message = '会话已超时，请重新登录！';
      notification.error({
        message,
        key: 'errorCode',
      });
      await delay(2000);
      // logoutToRedirect();
      console.log('request.ts--->75');
      return Promise.reject(message);
    }

    if (!response && !status) {
      notification.error({
        description: `请求错误`,
        message: error?.message || 'Error',
        key: 'errorCode',
      });
    }

    return Promise.reject(error?.message || error || 'Error');
  };

const request: RequestConfig = {
  // timeout: 10000,
  withCredentials: true,

  errorConfig: { errorHandler },
  requestInterceptors: [
    // @ts-ignore
    (url, options) => {
      const idToken = getStorage('session', 'idToken');
      const Authorization = idToken ? 'Bearer ' + idToken : undefined;
      return {
        options: {
          ...options,
          headers: {
            ...removeEmptyValues({ Authorization }),
            ...(options?.headers ?? {}),
          },
        },
        url,
      };
    },
  ],
  responseInterceptors: [responseInterceptor],
  paramsSerializer: (params) => {
    return qs.stringify(params, { indices: false });
  },
};

export default request;
