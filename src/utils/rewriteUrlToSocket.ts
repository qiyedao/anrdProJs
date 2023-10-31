/**
 * @description 改写 websocket url
 * @param {string} url
 */
export const rewriteUrlToSocket = (url: any) => {
  const replaceProtocol = (urlStr: string) =>
    urlStr.replace(/^http/, 'ws').replace(/^https/, 'wss');
  if (!url) return url;
  // if (replaceProtocol(url).search(/^ws[s]{0,1}/) !== -1) return replaceProtocol(url);
  if (window) {
    const { protocol, host } = window.location;
    return `${replaceProtocol(protocol)}//${host}${url}`;
  }
  return url;
};
