import onload from '@/assets/upload/onload.png';
import { FileApplicationType } from '@/utils//filter';
import { handleDownloadFile, importFile } from '@/utils/upload';
import { Button, message, Select, Upload } from 'antd';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Bar from '../Bar';
import CustomModal from '../CustomForm/components/Modal/CustomModal';
import './components.less';

const { Option } = Select;
/**
 * 导入
 * @param  values={
      title: '',
      templateTip: '',
      templateName: '',
      templatePath: '',
      importUrl: '',
      importTip: '',
    }
 * @returns {*}
 * @constructor
 */
const UpdateForm = (props) => {
  const {
    onSubmit,
    onCancel,
    visible,
    title,
    values = {
      templateTip: '',
      templateName: '',
      templatePath: '',
      importUrl: '',
      importTip: '',
    },
  } = props;
  // 新增初始化部分值
  if (!values.id) {
    Object.assign(values, { isIndex: 'no', deleteStats: 'no' });
  }
  const [formValues, setFormValues] = useState(values);
  const [fileList, setFleList] = useState([]);

  console.log(values, values);
  useEffect(() => {
    return () => {
      console.log('unmount');
      setFleList([]);
    };
  }, []);

  const handleOnOk = () => {
    customRequest();
  };
  const propsFile = {
    onRemove: (file) => {
      setFleList([]);
    },
    beforeUpload: (file) => {
      try {
        console.log('file', file);
        const accept = FileApplicationType.xls + ',' + FileApplicationType.xlsx;
        const ext = file.name.substring(file.name.lastIndexOf('.'));

        let isSupported = accept.includes(ext);

        if (!isSupported) {
          message.error(`文件格式错误!`);
          return false;
        }
        setFleList([file]);
        return false;
      } catch (error) {
        console.log('error', error);
      }
    },
    fileList,
    showUploadList: false,
    accept: FileApplicationType.xls + ',' + FileApplicationType.xlsx,
  };
  const customRequest = async () => {
    if (!fileList.length) {
      message.info('请上传Excel文件');
      return;
    }
    const formData = new FormData();
    formData.append('file', fileList[0]);
    let hide = message.loading({
      content: '正在导入，请稍后',
      duration: 0,
    });
    try {
      const res = await importFile(formData, values.importUrl);
      if (res && res.status.code === 1) {
        onSubmit({ success: true });
        message.success('导入成功');
        hide();
      } else {
        hide();
        onSubmit({ success: false, result: res.result ? res.result : res.status.message });
        // if (res.status.code !== 500) {
        // 	message.error(`导入失败:${res.status.message}`);
        // }
      }
    } catch (error) {
      hide();
      message.error(error.message || error);
    }
  };

  return (
    <CustomModal
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              backgroundColor: '#5891fd',
              width: 4,
              height: 18,
              borderRadius: 2,
              marginRight: 8,
            }}
          />
          <div style={{ fontSize: 20, fontWeight: 'bolder' }}>{title}</div>
        </div>
      }
      visible={visible}
      width={600}
      onOk={() => onSubmit && onSubmit(formValues)}
      onCancel={() => onCancel && onCancel()}
      contentStyle={{ padding: '20px 50px 50px 50px' }}
      footer={[
        <Button style={{ marginRight: 20 }} key="back" type="primary" onClick={handleOnOk}>
          确定
        </Button>,
        <Button
          key="close"
          onClick={() => {
            onCancel();
          }}
        >
          取消
        </Button>,
      ]}
    >
      <>
        <div style={{ color: '#0E2949', fontSize: 14, fontWeight: '500' }}>1.准备导入文件</div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 60,
          }}
        >
          <div style={{ display: 'flex', width: 300, color: '#8393A5' }}>{values.importTip}</div>
          <div
            onClick={() => {
              const url = values.templatePath;
              const filename = `attachment;filename=${values.templateName}.xlsx`;
              handleDownloadFile({ filename, url }, 'url');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              color: '#fff',
              height: 35,
              borderRadius: 4,
              background: '#3362FA',
              padding: '0 5px',
            }}
          >
            <img style={{ width: 24, heigh: 24, marginRight: 5 }} src={onload} />
            <div style={{ fontSize: 14 }}>下载导入模板</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <div style={{ color: '#0E2949', fontSize: 14, fontWeight: '500', marginRight: 5 }}>
            2.导入文件:
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Upload {...propsFile}>
              <div className={classNames('ant-btn', 'custom-upload-btn')}>
                <span>选择文件</span>
              </div>
            </Upload>
            {/* {fileList.length ? (
              <div>
                {fileList[0].name}
                <DeleteOutlined
                  onClick={() => {
                    setFleList([]);
                  }}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            ) : null} */}
          </div>
        </div>
        <div style={{ paddingLeft: 80, marginTop: 5 }}>
          <span style={{ display: 'flex', align: 'center' }}>
            {!fileList || fileList.length == 0 ? null : (
              <div>
                {fileList.map((item, index) => (
                  <div key={index}>
                    <Bar titleStyle={{ color: '#3362FA' }} title={item.name} />
                  </div>
                ))}
              </div>
            )}
          </span>
          <span></span>
        </div>
      </>
    </CustomModal>
  );
};
PropTypes.UpdateForm = {
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  values: PropTypes.object,
};
export default UpdateForm;
