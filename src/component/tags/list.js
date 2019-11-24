import React, { Component } from 'react';
import {
  Tag, Input, Icon,
} from 'antd';
import { GetTags, CreateTag, DeleteTag } from '../../http'

class TagsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      inputVisible: false,
      inputValue: '',
      data: []
    };
  }
  forMap = (tag, xx, xxx) => {
    const tagElem = (
      <Tag 
        closable 
        onClose={(e) => {
          e.preventDefault();
          this.handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
    );
  }

  componentDidMount() {
    this.getTagsList();
  }


  render() {
    const { tags, inputVisible, inputValue } = this.state;
    const tagChild = tags.map(this.forMap);
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          {tagChild}
        </div>
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag
            onClick={this.showInput}
            style={{ background: '#fff', borderStyle: 'dashed' }}
          >
            <Icon type="plus" />添加
          </Tag>
        )}
      </div>
    );
  }

  getTagsList = async () => {
    try {
      const res = await GetTags(), arr = [];
      res.data && res.data.list.forEach(item => {
        arr.push(item.name)
      })
      this.setState({
        tags: arr,
        data: res.data.list
      })
    } catch (e) {
      throw e;
    }
  }

  // 删除标签
  handleClose = async removedTag => {
    
    let id, { data } = this.state;
    data.forEach(item => {
      if(item.name === removedTag){
        id = item.id;
      }
    })
    try {
      const res = await DeleteTag({ id });
      const tags = this.state.tags.filter(tag => tag !== removedTag);
      this.setState({ tags },() => { this.getTagsList() });
    } catch (e) {
      throw e;
    }
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  handleInputConfirm = async () => {
    const { inputValue } = this.state;
    try {
      if(inputValue) { // 当输入框有值时
        const res = await CreateTag({ name: inputValue })
        let { tags } = this.state;
        if (inputValue && tags.indexOf(inputValue) === -1) {
          tags = [...tags, inputValue];
        }
        this.setState({
          tags,
          inputVisible: false,
          inputValue: '',
        },() => { this.getTagsList() });
      } else {
        this.setState({
          inputVisible: false,
          inputValue: '',
        });
      }
    } catch (e) {
      throw e;
    }
  }

  saveInputRef = input => this.input = input
}

export default TagsList