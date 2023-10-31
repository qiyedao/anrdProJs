function formatUrl(prefix: string, url: any): string {
  return `${prefix}${url}`;
}
const formatFunction = (prefix: string, fn: (...rest: any) => string) => {
  return (...args: any) => {
    const ret = prefix + fn(...args);
    return ret;
  };
};

function formatRequestUrl(prefix: string, url: string): string;
function formatRequestUrl(
  prefix: string,
  url: (...rest: any) => string,
): (...args: any) => string;

function formatRequestUrl(prefix: string, url: any): any {
  if (typeof url === 'string') {
    return formatUrl(prefix, url);
  } else {
    return formatFunction(prefix, url);
  }
}
function formatRequestUrls(prefix: string, data: Record<string, any>): any {
  const ret = {};
  Object.keys(data).forEach((key: string) => {
    const current = data[key];
    const value = formatRequestUrl(prefix, current);
    ret[key] = value;
  });
  return ret;
}

export { formatRequestUrl, formatRequestUrls };
