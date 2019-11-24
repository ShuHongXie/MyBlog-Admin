import React, { Component } from 'react';
import { Button, Upload, Icon, message, Input } from 'antd';
import E from 'wangeditor' // 引入markdown 编辑器
import { GetAbout, UpadteAbout } from '../../http'
import { getDomain } from '../../util/base'

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

class AboutMeBaseInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorContent: '',
      title: '',
      name: '',
      follow: '',
      avatar: '',
      baseUrl: getDomain()
    };
  }

  handleChange = info => {
    console.log(info)
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, avatar =>
        this.setState({
          avatar,
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
    const { avatar, name, follow, title, baseUrl } = this.state;
    return (
      <div id="aboutme_base">
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action={`${getDomain()}/admin/upload`}
          beforeUpload={beforeUpload}
          onChange={this.handleChange}
        >
          {avatar ? <img src={ avatar } alt="avatar" style={{ width: '94px', height: '94px' }} /> : uploadButton}
        </Upload>
        <Input onChange={ e => this.setState({ name: e.target.value })  } placeholder="请填写名称" value={ name } />
        <Input onChange={ e => this.setState({ title: e.target.value })  } placeholder="请填写句子" value={ title } />
        <Input onChange={ e => this.setState({ follow: e.target.value })  } placeholder="请填写follow链接" value={ follow } />
        <div id="editor" ref="editorElem" style={{textAlign: 'left',  marginBottom: '20px'}}>
        </div>
        <Button type="primary" block onClick={ this.modify }>修改</Button>
      </div>
    )
  }

  async componentDidMount() {
    const elem = this.refs.editorElem
    const editor = new E(elem)
    // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
    editor.customConfig.onchange = html => {
      this.setState({
        editorContent: html
      })
    }
    editor.create()

    // 获取我的基本信息
    try {
      const res = await GetAbout();
      console.log(res)
      if(res.data){
        editor.cmd.do('insertHTML', res.data.info.intro);
        const { baseUrl } = this.state;
        const { name, avatar, follow, title  } = res.data.info;
        this.setState({
          name,
          avatar: baseUrl + avatar,
          follow,
          title
        })
      }
      
    } catch (e) {
      throw e;
    }
  }
  // 修改
  modify = async () => {
    const { editorContent, title, follow, link, name } = this.state;
    console.log(editorContent, title, follow, name)
    if(!editorContent || !title || !follow || !name){
      message.error("必填项不能为空");
      return ;
    }
    try {
      const res = await UpadteAbout({ 
        intro: editorContent,
        title,
        follow,
        link,
        name
      });
      if(res.retCode === 200){
        message.success("修改成功");
      }
    } catch (error) {
      throw error;
    }
  }
}

export default AboutMeBaseInfo