/** 获取中英文字符长度 */
export const getStrRealLength = (str: string) => {
  if (str === null || str === undefined || str === '') {
    return 0;
  }

  let len = 0;
  const strLen = str.length;
  for (let i = 0; i < strLen; i++) {
    const charCode = str.charCodeAt(i); // 获取指定位置的字符的 Unicode 编码
    if (charCode >= 0 && charCode <= 128) {
      // 判断 Unicode 编码 是否在0到128，原因上面有说
      len += 1;
    } else {
      len += 2;
    }
  }
  return len;
};

/** 中英文字符换行 */
export const getStrWrap = (val: string, len: number) => {
  const str = new String(val);
  let bytesCount = 0;
  let s = '';
  for (let i = 0, n = str.length; i < n; i++) {
    const charCode = str.charCodeAt(i);
    // 统计字符串的字符长度
    if (
      (charCode >= 0x0001 && charCode <= 0x007e) ||
      (0xff60 <= charCode && charCode <= 0xff9f)
    ) {
      bytesCount += 1;
    } else {
      bytesCount += 2;
    }
    // 换行
    s += str.charAt(i);
    if (bytesCount >= len) {
      s = s + '\n';
      // 重置
      bytesCount = 0;
    }
  }
  return s;
};
