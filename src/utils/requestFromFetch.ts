import { URL_PREFIX } from '@/constants/apis';
import { removeEmptyValues } from '@/utils';
import { getStorage } from '@/utils/storage';
import { notification } from 'antd';

import delay from '@/utils/delay';
import { codeMessage } from './request';

const request = async (
  url: string,
  options: RequestInit & { data?: Record<string, any> },
): Promise<
  Response & {
    controller: AbortController;
  }
> => {
  const controller = new AbortController();
  const idToken = getStorage('session', 'idToken');
  const Authorization = idToken ? 'Bearer ' + idToken : undefined;
  let body = '';
  if (options.data) {
    body = JSON.stringify(options.data);
  }

  return await fetch(`${URL_PREFIX}${url}`, {
    ...options,
    body,
    signal: controller.signal,
    headers: {
      'Content-Type': 'application/json',
      kgSysCode: '',
      ...removeEmptyValues({ Authorization }),
      ...(options?.headers ?? {}),
    },
  }).then(async (response) => {
    console.log('response', response);
    const { statusText, status, url: requestUrl } = response ?? {};
    if (response.status === 401) {
      await delay(2000);
      // logoutToRedirect();
      console.log('requestFromFetch.ts--->41');
    }
    if (/\b(?:4\d{2}|5\d{2})\b/.test(status?.toString())) {
      const errorText = statusText || codeMessage[status] || 'error';
      notification.error({
        message: `请求错误 ${status}: ${requestUrl ?? ''}`,
        description: errorText,
        key: 'errorCode',
      });
      return Promise.reject(response.statusText);
    }
    // @ts-ignore
    response.controller = controller;
    return response as any;
  });
};

export default request;
