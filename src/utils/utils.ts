import { message } from 'antd';
import moment from 'dayjs';
export const ResourceOptType = {
  add: 0,
  edit: 1,
  view: 2,
};

export const lableColorList: string[] = [
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
];
export enum SourceType {
  Home = 'Home',
  Resource = 'Resource',
  Document = 'Document',
}

export function hightElTxt(content: string, highTags: any[]) {
  const retStr: string[] = content.split('');

  highTags.forEach((item: any) => {
    const { start, instanceId, color = 'red' } = item;
    // const color = map[type] || 'red';
    retStr[
      start
    ] = `<span id=instance_${instanceId} style='background: ${color} !important;color:#fff; padding:2px 3px; cursor: pointer;'>${
      retStr[start] || ''
    }`;
  });
  highTags.forEach((item: any) => {
    const { end } = item;
    retStr[end] = `</span>${retStr[end] || ''}`;
  });

  return retStr.join('');
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
    newValue = moment(newValue).format('YYYY-MM-DD HH:mm:ss');
  }
  return newValue;
};

export enum ClassificationPermissionsEnum {
  /** 查看列表 */
  role_view_list = 1,
  /** 导入文件 */
  role_import_file = 2,
  /** 新增 */
  role_add_record = 3,
  /** 预览全文 */
  role_overview_content = 4,
  /** 编辑 */
  role_edit_record = 5,
  /** 删除 */
  role_delete_record = 6,
  /** 下载 */
  role_download = 7,
  /** 版本 */
  role_version = 8,
  /** 知识点 */
  role_knowledge_point = 9,
}
//下载文件
export const downloadFlie = async ({ url, fileName, options }: any) => {
  const data = await fetch(url, { ...options });

  const fn = async () => {
    const CDStr: string = data.headers.get('Content-disposition') as string;
    let filename = fileName ? fileName : '';
    if (CDStr) {
      filename = CDStr.split(';')[1].replace('filename=', '');
      filename = decodeURIComponent(filename);
    }
    const res = await data.clone().blob();

    const blobUrl = window.URL.createObjectURL(res);
    const aElement = document.createElement('a');
    aElement.download = filename;
    aElement.href = blobUrl;
    aElement.click();
  };
  try {
    const res = await data.clone().json();
    message.error({
      key: '1',
      content: res?.message || '下载错误',
    });
    return;
  } catch (error) {
    fn();
  }
};
