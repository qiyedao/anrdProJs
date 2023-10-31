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
    const imgSrc = canvas.toDataURL('image/png');
    URL.revokeObjectURL(blobUrl);
    resolve(imgSrc);
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

export const FILE_TYPE = {
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ppt: 'application/vnd.ms-powerpoint',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  pdf: 'application/pdf',
  zip: 'application/x-zip-compressed',
  txt: 'text/plain',
  png: 'image/png',
  jpg: 'image/jpeg',
  mp4: 'video/mp4',
  csv: 'text/csv',
};
