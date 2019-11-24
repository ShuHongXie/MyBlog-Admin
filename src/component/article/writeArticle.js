import React, { Component } from 'react';
import { Input, Cascader, Button, TreeSelect, Tree, message } from 'antd';
import SimpleMDE from 'simplemde'
import marked from 'marked'
import highlight from 'highlight.js'
import { GetCategories, GetTags, CreateArticle } from '../../http'

import './writeArticle.scss'
import 'simplemde/dist/simplemde.min.css'

const { TreeNode } = Tree;

class WriteArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smde:null,
      tagList: [],
      categoryList: [],
      tagValue: undefined,
      categoryValue: undefined,
      showBtn: true,
      title: '',
      link: '',
      id: 0,
    };
  }

  async componentDidMount() {
    const { location } = this.props;
    console.log(location)

    this.smde = new SimpleMDE({
      element: document.getElementById('editor').childElementCount,  
      autofocus: true,
      autosave: true,
      previewRender: function(plainText) {
        return marked(plainText,{
          renderer: new marked.Renderer(),
          gfm: true,
          pedantic: false,
          sanitize: false,
          tables: true,
          breaks: true,
          smartLists: true,
          smartypants: true,
          highlight: function (code) {
            return highlight.highlightAuto(code).value;
          }
        });
      },
    })
    
    if(location.state && location.state.data && location.state.type === 1){
      const { data } = location.state;
      const { type } = location.state;
      this.setData(data, type);
    } else if(location.state && location.state.data && location.state.type === 2){
      const { data } = location.state;
      const { type } = location.state;
      this.setData(data, type);
    } else {
      this.setState({
        showBtn: 0
      })
    }
    
    try {
      const categoryList = await GetCategories();
      const tagList = await GetTags();
      this.setState({
        categoryList: categoryList.data.list,
        tagList: tagList.data.list
      })
    } catch (e) {
      throw e;
    }
  }

  setData = (data, type) => {
    let arrTag = [], arrCate = [];
    data.tagsArticles && data.tagsArticles.forEach(el => {
      arrTag.push(el.tags.id)
    });
    if(!arrTag.length) arrTag = undefined;
    data.categoryArticles && data.categoryArticles.forEach(el => {
      arrCate.push(el.category.id)
    });
    if(!arrCate.length) arrCate = undefined;
    console.log(arrCate)
    this.setState({
      showBtn: type,
      tagValue: arrTag,
      categoryValue: arrCate,
      title: data.title,
      link: data.link,
      id: data.id
    })
    this.smde.value(data.content);
  }

  render() {
    const { options, title, tagList, tagValue, categoryList, categoryValue, showBtn, link } = this.state;
    return (
      <div id="write_article">
        <Input 
        placeholder="请输入文章标题" 
        allowClear 
        value={ title }
        onChange={this.onChange} />
        <Input 
        placeholder="请输入链接名称" 
        allowClear 
        value={ link }
        onChange={this.onChangeLink} />
        <TreeSelect
        showSearch
        style={{ width: 300 }}
        value={ tagValue }
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="请选择标签"
        allowClear
        multiple
        treeDefaultExpandAll
        onChange={this.onChangeTag}
      >
        {this.renderTreeNodesTag(tagList)}
      </TreeSelect>
      <TreeSelect
        showSearch
        style={{ width: 300 }}
        value={ categoryValue }
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="请选择分类"
        allowClear
        multiple
        treeDefaultExpandAll
        onChange={this.onChangeCate}
      >
        {this.renderTreeNodesCate(categoryList)}
      </TreeSelect>
        <textarea id="editor"></textarea>
        { !showBtn ? 
        ( 
          <Button type="primary" style={{"marginBottom": "30px" }} block onClick={ this.publish }>发布</Button>
        ) : showBtn === 1 ? (
          <Button type="primary" style={{"marginBottom": "30px" }} block onClick={ this.edit }>修改</Button>
        ) : null }
      </div>
    )
  }

  onChangeTag = tagValue => {
    this.setState({
      tagValue
    })
  }

  onChangeCate = categoryValue => {
    this.setState({
      categoryValue
    })
  }

  publish = async () => {
    const { title, tagValue, categoryValue, link } = this.state;
    if(!title || !tagValue || !categoryValue || !link){
      message.error("必填项未填写");
      return false;
    }
    try {
      await CreateArticle({
        title,
        content: this.smde.value(),
        tagList: tagValue,
        cateList: categoryValue,
        link,
        type: 0
      })
    } catch (e) {
      throw e;
    }
    
  }

  edit = async () => {
    const { title, tagValue, categoryValue, link, id } = this.state;
    try {
      await CreateArticle({
        title,
        id,
        content: this.smde.value(),
        tagList: tagValue,
        cateList: categoryValue,
        link,
        type: 1
      })
    } catch (e) {
      throw e;
    }
  }

  onChangeLink = e => {
    this.setState({
      link: e.target.value
    })
  }

  onChange = e => {
    this.setState({
      title: e.target.value
    })
  }

  renderTreeNodesTag = data => data.map((item, idx) => {
    
    return (
      <TreeNode value={ item.id }  title={item.name} key={item.id}></TreeNode>
    );
  })

  renderTreeNodesCate = data => data.map((item, idx) => {
    if (item.categorys) {
      return (
        <TreeNode value={ item.id } title={ item.name } key={item.id}>
          {this.renderTreeNodesCate(item.categorys)}
        </TreeNode>
      );
    }
    return <TreeNode value={ item.id } title={ item.name } key={item.id} />;
  })

}

export default WriteArticle