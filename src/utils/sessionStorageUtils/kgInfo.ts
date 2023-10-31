export function saveKgInfo(data: string | Record<string, any> = '') {
  const value = JSON.stringify(data);
  sessionStorage.setItem('kgInfo', value);
}
export function getKgInfo() {
  const ret = sessionStorage.getItem('kgInfo') || '{}';
  return JSON.parse(ret);
}

export function clearKgInfo() {
  sessionStorage.removeItem('kgInfo');
}
