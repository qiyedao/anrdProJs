// 引入编辑器组件
import BraftEditor from 'braft-editor';
// 引入编辑器样式
import { commonFormUpload } from '@/utils/upload';
import { message } from 'antd';
import 'braft-editor/dist/index.css';
import { useState } from 'react';

const Editor = ({ value, onChange }) => {
  const myUploadFn = async (param) => {
    const successFn = () => {
      // 假设服务端直接返回文件上传后的地址
      // 上传成功后调用param.success并传入上传后的文件地址
      param.success({
        url: 'https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg',
        meta: {
          id: 'https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg',
          title: '123',
          alt: '123',
        },
      });
    };

    const progressFn = (event) => {
      // 上传进度发生变化时调用param.progress
      param.progress((event.loaded / event.total) * 100);
    };

    const errorFn = (response) => {
      // 上传发生错误时调用param.error
      param.error({
        msg: 'unable to upload.',
      });
    };
    const formData = new FormData();

    formData.append('file', param.file);
    try {
      // console.log(param, 'param');
      // // param.progress(100);
      // successFn();
      // return;
      const res = await commonFormUpload(formData);
      if (res && res.status.code === 1) {
        const result = res.result;

        if (file.type.indexOf('image') == -1) {
          // message.success('上传成功');
          hide();
        }
      } else {
        message.error(`上传出错:${res.status.message}`);
      }
    } catch (error) {
      message.error(`上传出错:${error}`);
    }
  };

  const [editorState, setEditorState] = useState(null);
  const handleEditorChange = (e) => {
    console.log(e.toHTML(), 'handleEditorChange');
  };

  return (
    <BraftEditor
      media={{
        accepts: {
          image: 'image/png,image/jpeg,image/gif,image/webp,image/apng,image/svg',
          video: 'video/mp4',
          audio: false,
        },
        uploadFn: myUploadFn,
      }}
      value={editorState}
      onChange={handleEditorChange}
    />
  );
};
export default Editor;
