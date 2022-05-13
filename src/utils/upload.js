import request from '@/utils/request';
import Apis from '../services/Apis';

const path = Apis.CommonUpload;
const delPath = Apis.DeleteFile;

export async function commonFormUpload(data, uploadUrl) {
  if (!uploadUrl) {
    // eslint-disable-next-line no-param-reassign
    uploadUrl = path;
  }
  return request(uploadUrl, {
    method: 'post',
    data,
    requestType: 'form',
  });
}
export async function commonDelUpload(data) {
  return request(delPath, {
    method: 'delete',
    data,
    requestType: 'form',
  });
}

export async function commonDelListUpload(data) {
  return request(`${delPath}/list`, {
    method: 'delete',
    data,
    requestType: 'form',
  });
}

//导出
export async function exportFile(params, url) {
  return request(`${url}`, {
    method: 'get',
    params,
    responseType: 'blob',
  });
}

//导入
export async function importFile(params, url) {
  return request(url, {
    method: 'put',
    data: params,
    requestType: 'form',
  });
}
//下载
export const handleDownloadFile = async (type = 'blob', data) => {
  console.log('data', data);
  try {
    let href = '';

    if (type == 'blob') {
      href = window.URL.createObjectURL(data.blob);
    } else {
      href = data.url;
    }
    let downloadElement = document.createElement('a');
    downloadElement.href = href;
    let filename = data.filename;
    console.log(filename, 'filename');
    downloadElement.download = filename.split('filename=')[1];
    document.body.appendChild(downloadElement);
    downloadElement.click();
    document.body.removeChild(downloadElement);
    window.URL.revokeObjectURL(href);
  } catch (error) {
    console.log('error', error);
  }
};
