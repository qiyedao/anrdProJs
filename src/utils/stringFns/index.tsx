import { formatRequestUrl, formatRequestUrls } from './urlsPrefix';

const cantainNumber = (s: string) => {
  const reg = RegExp(/\d/);
  return reg.test(s);
};

const containChinese = (s: string) => {
  const reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g');
  return reg.test(s);
};
const validateLength = (str: string, min: number, max: number) => {
  const len = str.length;
  if (len > max || len < min) return true;
  return false;
};
// 生成字符串长度的正则
const strLengthRegExp = (min: number, max: number) => {
  return new RegExp(`^.{${min},${max}}$`);
};

const validateUserName = (s: string) => {
  const reg = /\W/g;
  return reg.test(s) || !strLengthRegExp(4, 12).test(s);
};
// https://c.runoob.com/front-end/854/sdf
export {
  cantainNumber,
  containChinese,
  formatRequestUrl,
  formatRequestUrls,
  strLengthRegExp,
  validateLength,
  validateUserName,
};
