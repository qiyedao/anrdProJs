import dayjs from 'dayjs';
// 示例方法，没有实际意义
export function trim(str: string) {
  return str.trim();
}

//格式化时间类型
export const formatProPertyValue = (props: {
  value: any;
  dataType: string;
  [key: string]: any;
}) => {
  const { value, dataType } = props;
  let newValue: any = value;
  if (dataType.toLowerCase() === 'date') {
    newValue = dayjs(newValue).format('YYYY-MM-DD HH:mm:ss');
  }
  return newValue;
};
