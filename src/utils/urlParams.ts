// 获取 url 参数
export const getUrlParams = (url: string): Record<string, any> => {
  if (!url) return {};
  const reg = /([^&?]*)=([^&]*)/g;
  const paramsArray = url.match(reg);
  if (!paramsArray) return {};
  const params = paramsArray.reduce((pre, str) => {
    const [key, value] = str.split('=');
    return { ...pre, [key]: decodeURIComponent(value) };
  }, {});
  return params;
};

// 格式化 url parmas
export const formatParmas = (parmas: Record<string, any> = {}) => {
  if (Object.prototype.toString.call(parmas) !== '[object Object]') return '';
  return Object.keys(parmas)
    .filter((parma) => parmas[parma] !== null && parmas[parma] !== undefined)
    .map((parma) => `${parma}=${parmas[parma]}`)
    .join('&');
};
