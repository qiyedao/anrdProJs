import moment from 'dayjs';
import lodash from 'lodash';
import _isEmpty from 'lodash/isEmpty';

// 分页 list getter
export const getCurrentPageList = <T extends any>(
  list: T[] = [],
  pageNo: number = 1,
  pageSize: number = 5,
): T[] => {
  const startIndex = (pageNo - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentList = list.slice(startIndex, endIndex);
  return currentList;
};

// 生成随机 ID
export const genID = () => {
  return (
    Math.random().toString(16).substring(3, 6) +
    Date.now().toString(32) +
    Math.random().toString(16).substring(6, 9)
  );
};
export enum SourceType {
  Home = 'Home',
  Resource = 'Resource',
  Document = 'Document',
}

//表格查询最后一条
export const requeryTable = (
  res: { list: any[]; total: number; pageNum: number },
  actionRef: any,
): boolean => {
  let success: boolean = true;
  if (res?.total > 0 && res?.list?.length === 0 && res?.pageNum > 1) {
    actionRef?.current?.reloadAndRest();
    success = false;
  }
  return success;
};

//格式化时间
export const formatMinute = (time: number) => {
  const m: string = parseInt(`${time / 60}`)
    .toString()
    .padStart(2, '0');
  const s: string = parseInt(`${time % 60}`)
    .toString()
    .padStart(2, '0');
  return `${m}:${s}`;
};

export const genOptions = <T extends (val: string) => void | any>(
  data: Record<string, any>,
  convertVal?: T,
) => {
  if (!data) return [];
  return Object.keys(data)?.map?.((key) => ({
    value: data[key],
    label: convertVal ? convertVal(key) : key,
  }));
};

export const genOptionsNew = <T extends (val: string) => void | any>(
  data: Record<string, any>,
  convertVal?: T,
) => {
  if (!data) return [];
  return Object.keys(data)?.map?.((key) => ({
    value: convertVal ? convertVal(key) : key,
    label: data[key],
  }));
};

/** 去除对象中的 null undefined 空数组 空字符串 */
export const removeEmptyValues = <
  T extends Record<string, any> = Record<string, any>,
>(
  obj: T,
): Partial<T> => {
  if (!obj || typeof obj !== 'object') return {} as T;
  const newObj = {} as T;
  for (const key of Object.keys(obj)) {
    if ([undefined, null, ''].includes(obj[key])) continue;
    if (Array.isArray(obj[key]) && !obj[key].length) continue;
    // @ts-ignore
    newObj[key] = obj[key];
  }
  return newObj;
};

export const isEmpty = (value: any): boolean => {
  if (Array.isArray(value)) {
    return value.every((val) => isEmpty(val));
  }
  if (Object.prototype.toString.call(value) === '[object Object]') {
    return Object.values(value).every((val) => isEmpty(val));
  }
  if (typeof value === 'number') {
    return false;
  }
  return _isEmpty(value);
};

//格式化时间类型
export const formatProPertyValue = (props: {
  value: any;
  dataType: string;
  [key: string]: any;
}) => {
  const { value, dataType } = props;
  let newValue: any = value;
  if (dataType.toLowerCase() === 'date') {
    newValue = moment(newValue).format('YYYY-MM-DD HH:mm:ss');
  }
  return newValue;
};

//不能为空或者空格
export const regNull = (value: string) => {
  const reg = new RegExp('^\\s*$');
  return reg.test(value);
};

//知识云图数据化
export const formatCloud = (obj: any) => {
  const value: any = [];
  const arr = Object.keys(obj);
  arr?.forEach((item: any) => {
    const values = {
      name: item,
      value: obj[item],
    };
    value.push(values);
  });
  return value;
};

//热门搜索处理
export const formatHotData = (arr: any) => {
  const value: any = [];
  arr?.forEach((item: any) => {
    const values = {
      question: item,
      value: item,
    };
    value.push(values);
  });
  return value;
};

//知识云图数据化
export const formatLeft = (obj: any, map?: any) => {
  const value: any = [];
  if (obj) {
    if (map) {
      obj?.forEach((item: any) => {
        const values = {
          name: item.name,
          showName: map[item.name],
          count: item.value,
        };
        value.push(values);
      });
    } else {
      obj?.forEach((item: any) => {
        const values = {
          name: item.name,
          showName: item.name,
          count: item.value,
        };
        value.push(values);
      });
    }
  }
  return value;
};

//左侧数据格式化
export const formatCountFilter = (obj: any, map: any) => {
  const value = [
    {
      classification: 'theme',
      classificationName: '主题',
      expand: false,
      statisticalResultsList: formatLeft(obj?.themeList),
    },
    {
      classification: 'documentType',
      classificationName: '文档类型',
      expand: false,
      statisticalResultsList: formatLeft(obj?.typeList, map),
    },
    {
      classification: 'source',
      classificationName: '来源',
      expand: false,
      statisticalResultsList: formatLeft(obj?.sourceList),
    },
    {
      classification: 'year',
      classificationName: '年份',
      expand: false,
      statisticalResultsList: lodash.reverse(formatLeft(obj?.yearList)),
    },
    {
      classification: 'author',
      classificationName: '作者',
      expand: false,
      statisticalResultsList: formatLeft(obj?.authorList),
    },
    {
      classification: 'authorAffiliation',
      classificationName: '单位',
      expand: false,
      statisticalResultsList: formatLeft(obj?.affiliationList),
    },
  ];
  console.log(value, 'value');
  return value;
};

export const genErrorMessage = (
  error: Error | string,
  defaultMsg: string = '',
) => {
  let errorMsg: string | undefined;
  if (error instanceof Error) {
    errorMsg = `${error.name} ${error.message}`;
  }
  if (typeof error === 'string') {
    errorMsg = error;
  }
  return errorMsg ?? defaultMsg;
};
