import React, { Component } from 'react';
import { Upload, Icon, message, Input } from 'antd';
import { withRouter } from 'react-router'

import './index.scss'

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

class Aboutme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      title: '',
      followLink: ''
    };
  }
  
  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl, username, followLink, title } = this.state;
    return (
      <div id="aboutme">
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="http://127.0.0.1:8999/upload"
          beforeUpload={beforeUpload}
          onChange={this.handleChange}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '94px', height: '94px' }} /> : uploadButton}
        </Upload>
        <Input placeholder="请填写名称" value={ username } />
        <Input placeholder="请填写句子" value={ title } />
        <Input placeholder="请填写follow链接" value={ followLink } />
      </div>
      
    );
  }


}

export default withRouter(Aboutme)