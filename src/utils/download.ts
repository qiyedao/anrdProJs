import { message } from 'antd';
// 下载
export const downloadFile1 = (url: string, download: string = ''): void => {
  if (!url) return;
  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('download', download);
  a.setAttribute('target', '_blank');
  a.click();
};

//下载文件
export const downloadFlie = async ({
  url,
  fileName,
  options,
}: {
  url: string;
  fileName?: string;
  options?: Record<string, any>;
}) => {
  const data = await fetch(url, { ...options });
  const fn = async () => {
    const CDStr: string = data.headers.get('Content-disposition') as string;
    let $fileName = fileName ?? '';
    if (CDStr) {
      const { filename }: any = CDStr.split(';')?.reduce?.((pre, str) => {
        const [key, value] = str.split('=');
        return { ...pre, [key]: decodeURIComponent(value ?? '') };
      }, {});
      $fileName = decodeURIComponent(filename ?? '') ?? '';
    }
    const res = await data.clone().blob();
    const blobUrl = window.URL.createObjectURL(res);
    const aElement = document.createElement('a');
    aElement.download = $fileName;
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

// 截取视频缩略图
export const screenshot = (file: any) => {
  const blobUrl = URL.createObjectURL(file);
  // video 播放
  const videoPlay = (video: any, time: number) => {
    setTimeout(() => {
      video.pause();
    }, time);
  };

  // video 暂停
  const videoPause = (video: any, scale: any, resolve: any) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const imgHeight = video.videoHeight;
    const imgWidth = video.videoWidth;
    canvas.width = imgWidth * scale;
    canvas.height = imgHeight * scale;
    ctx?.drawImage(
      video,
      0,
      0,
      imgWidth,
      imgHeight,
      0,
      0,
      canvas.width,
      canvas.height,
    );
    canvas.toBlob((blob: any) => {
      resolve(blob);
    });
    URL.revokeObjectURL(blobUrl);
  };

  return new Promise((resolve) => {
    const video = document.createElement('video');
    const playTime = 1500;
    const scale = 0.3;
    video.src = blobUrl;
    video.muted = true;
    video.addEventListener('play', () => videoPlay(video, playTime), false);
    video.addEventListener(
      'pause',
      () => videoPause(video, scale, resolve),
      false,
    );
    video.play();
  });
};
