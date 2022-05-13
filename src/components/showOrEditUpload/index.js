import React from 'react';

import { Upload, Icon, Modal, message, Row, Col, Button } from 'antd';
import { EditOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import styles from './index.less';

import { commonFormUpload } from '@/utils/upload';
import ProxyAPi from '../../../config/proxy';
class ShowOrEditUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // onSelectPictureAction: config.domain + 'api/common/upload',
      disbaled: false,
      ico: false,
      // filelist file 格式
      // {
      //   uid: '-1',
      //   name: 'xxx.png',
      //   status: 'done',
      //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      // }
      fileList: [],
      fileSize: 2,
      url: '',
      // 预览
      previewImage: '',
      modalPreviewVisible: false,
      accept: 'image/*',
      uploadUrl: '',
      type: 'img',
    };
  }
  componentDidMount() {
    if (this.props.accept) {
      this.setState({
        accept: this.props.accept,
      });
    }
    if (this.props.fileSize) {
      this.setState({
        fileSize: this.props.fileSize,
      });
    }
    if (this.props.uploadUrl) {
      this.setState({
        uploadUrl: this.props.uploadUrl,
      });
    }
    if (this.props.type) {
      this.setState({
        type: this.props.type,
      });
    }

    if (this.props.isButton) {
      this.setState({ fileList: [] });
    } else {
      if (this.props.length && this.props.length > 1) {
      } else {
        let url = this.props.url;

        if (this.props.ico) {
          this.setState({
            ico: this.props.ico,
          });
        }
        if (url !== '' && url !== null && url !== undefined) {
          let obj = {};
          obj.url = url;
          obj.uid = '0';
          obj.name = '图片.png';
          obj.status = 'done';
          this.setState({ fileList: [obj] });
        } else {
          // 否则就说明需要清空
          this.setState({ fileList: [] });
        }
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fileSize) {
      this.setState({
        fileSize: nextProps.fileSize,
      });
    }
    if (nextProps.accept) {
      this.setState({
        accept: nextProps.accept,
      });
    }
    if (nextProps.uploadUrl) {
      this.setState({
        uploadUrl: nextProps.uploadUrl,
      });
    }
    if (nextProps.type) {
      this.setState({
        type: nextProps.type,
      });
    }
    if (nextProps.isButton) {
      this.setState({ fileList: [] });
    } else {
      if (nextProps.length && nextProps.length > 1) {
      } else {
        let url = nextProps.url;
        // console.log('图片', nextProps.accept);

        if (nextProps.ico) {
          this.setState({
            ico: nextProps.ico,
          });
        }
        if (url !== '' && url !== null && url !== undefined) {
          let obj = {};
          obj.url = url;
          obj.uid = '0';
          obj.name = '图片.png';
          obj.status = 'done';
          this.setState({ fileList: [obj] });
        } else {
          // 否则就说明需要清空
          this.setState({ fileList: [] });
        }
      }
    }
  }

  // 预览图片
  handlePreviewPicture = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      modalPreviewVisible: true,
    });
  };
  // 关闭预览
  handleCancelModal = () => this.setState({ modalPreviewVisible: false });

  // 删除上传的图片
  handleRemovePicture = (file) => {
    // console.log('handleRemovePicture', file);
    this.setState({
      fileList: [],
    });

    if (this.props.deleteUploadUrl) {
      this.props.deleteUploadUrl(file);
    }

    return true;
  };
  customRequest = async (params) => {
    const { onSuccess, onError, file, onProgress } = params;
    const formData = new FormData();
    console.log(file);
    formData.append('file', file);
    formData.append('type', this.state.type);
    let hide = '';
    if (file.type.indexOf('image') == -1) {
      hide = message.loading({
        content: '正在上传',
        duration: 0,
      });
    }

    try {
      const res = await commonFormUpload(formData, this.state.uploadUrl);
      if (res && res.status.code === 1) {
        const result = res.result;
        onProgress({ percent: 100 }, file);
        if (file.type.indexOf('image') == -1) {
          // message.success('上传成功');
          hide();
        }

        onSuccess && onSuccess(result, file);
      } else {
        message.error(`上传出错:${res.status.message}`);
      }
    } catch (error) {
      message.error(`上传出错:${error}`);
    }
  };
  // 编辑图片，即上传图片
  handleChangePicture = ({ file, fileList, event }) => {
    this.setState({
      fileList: [...fileList],
    });

    if (file.status === 'done') {
      console.log(file.response, 'done', {
        key: file.response,
        filePath: ProxyAPi.dev['/api/'].target + file.response,
      });
      let fileName = file.name.split('.')[0];

      this.props.setUploadUrl({
        key: file.response,
        filePath: ProxyAPi.dev['/api/'].target + file.response,
        fileName: fileName,
      });
    }
  };
  // getBase64 = (img, callback) => {
  //   const reader = new FileReader();
  //   reader.addEventListener("load", () => callback(reader.result));
  //   reader.readAsDataURL(img);
  // };

  beforeUpload = (file) => {
    let isJPG = file.type === 'image/jpeg';
    let isPNG = file.type === 'image/png';
    let formatSize = file.size / 1024 / 1024;
    console.log('file.type', file.type, 'formatSize', formatSize, file);
    const isLt2M = formatSize < this.state.fileSize;
    if (!isLt2M) {
      message.error(`文件大小不能超过${this.state.fileSize}MB!`);
      this.state.fileList.pop();
    }
    // return isLt2M && (isJPG || isPNG);
    return isLt2M;
  };

  // 渲染组件
  render() {
    const { onSelectPictureAction, fileList, modalPreviewVisible, previewImage } = this.state;

    const { label } = this.props;

    return (
      <Row type="flex" justify="start">
        <Col>
          <Upload
            name="file"
            className={styles.uploadInrow}
            customRequest={this.customRequest}
            listType={
              this.props.listType
                ? this.props.listType
                : this.props.isButton
                ? 'picture'
                : 'picture-card'
            }
            beforeUpload={this.beforeUpload}
            accept={this.state.accept}
            showUploadList={this.props.isButton ? false : true}
            fileList={fileList}
            onPreview={this.handlePreviewPicture}
            onChange={this.handleChangePicture}
            onRemove={this.handleRemovePicture}
          >
            {this.props.isButton ? (
              <Button type="primary">选择文件</Button>
            ) : fileList.length > 0 ? (
              <div>
                <EditOutlined />
                <div>编辑图片</div>
              </div>
            ) : (
              <div>
                <PlusOutlined />
                <div>上传图片</div>
              </div>
            )}
          </Upload>

          <Modal visible={modalPreviewVisible} footer={null} onCancel={this.handleCancelModal}>
            <img alt="上传图片" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </Col>
      </Row>
    );
  }
}

export default ShowOrEditUpload;
