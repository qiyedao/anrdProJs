import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Upload, Button, message } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';

const App = () => {
  const [fileList, setFileList] = useState([]);
  const [accept, setAccept] = useState('.png');

  useEffect(() => {
    setAccept('.png');
    setFileList([
      {
        uid: '1',
        name: 'xxx.png',
        status: 'done',
        response: 'Server Error 500',
        // custom error message to show
        url: 'http://www.baidu.com/xxx.png',
      },
      {
        uid: '2',
        name: 'yyy.png',
        status: 'done',
        url: 'http://www.baidu.com/yyy.png',
      },
      {
        uid: '3',
        name: 'zzz.png',
        status: 'error',
        response: 'Server Error 500',
        // custom error message to show
        url: 'http://www.baidu.com/zzz.png',
      },
    ]);
  }, []);
  const props = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',

    onChange({ file, fileList }) {
      const ext = file.name.substring(file.name.lastIndexOf('.'));
      console.log('ext', ext);
      if (!accept.includes(ext)) {
        const newFileList = fileList.slice(0, fileList.length - 1);
        console.log('onChange', newFileList);
        setFileList([...newFileList]);
      } else {
        console.log('onChange', fileList);
        setFileList([...fileList]);
      }

      if (file.status !== 'uploading') {
        // console.log(file, fileList);
      }
    },
    beforeUpload: (file, fileList) => {
      console.log('beforeUpload', file, fileList);
      const ext = file.name.substring(file.name.lastIndexOf('.'));
      const isSupported = accept.includes(ext);
      if (!isSupported) {
        message.error('文件格式错误');
      }
      return isSupported;
    },
  };
  return (
    <Upload
      {...props}
      fileList={fileList}
      itemRender={(originNode, file, fileList, actions) => {
        console.log('file', file);
        return (
          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <div style={{ maxWidth: 300, overflow: 'hidden' }}>
              <a
                style={{
                  color: file.status == 'error' ? 'red' : 'blue',
                  marginRight: 10,
                }}
                target="_blank"
                href={file.url}
              >
                {file.name}
              </a>
            </div>
            <DeleteOutlined />
          </div>
        );
      }}
    >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
  );
};

export default App;
