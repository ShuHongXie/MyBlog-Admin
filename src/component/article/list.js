import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Table, Tag, Modal, message } from 'antd';
import { GetArticle, DeleteArticle } from '../../http'

import './list.scss'

const { confirm } = Modal;

// 博客列表
class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNum: 1,
      total: undefined,
      pageSize: undefined,
      columns: [
        { title: '内容', dataIndex: 'content', key: 'content',
          render: content => (
            <span>{ content.slice(0, 10) }</span>
          )
        },
        { title: '分类', dataIndex: 'categoryArticles', key: 'categoryArticles',
          render: categoryArticles => (
          <span>
            { categoryArticles && categoryArticles.map(cate => {
              return (
                <Tag key={cate.id}>
                  {cate.category.name}
                </Tag>
              );
            })}
          </span>
          )
        },
        { title: '标签', dataIndex: 'tagsArticles', key: 'tagsArticles', 
          render: tagsArticles => (
            <span>
              { tagsArticles && tagsArticles.map(tag => {
                return (
                  <Tag key={tag.id}>
                    {tag.tags.name}
                  </Tag>
                );
              })}
            </span>
          )
        },
        { title: '时间', dataIndex: 'create_time', key: 'create_time' },
        {
          title: '操作', 
          dataIndex: '', 
          key: 'x', 
          render: (text, record, index) => <div>
            <a className="del" href="javascript:;" onClick={ () => this.delete(index) }>删除</a>
            <a className="show" href="javascript:;" onClick={ () => this.detail(index) }>查看详情</a>
            <a className="edit"  href="javascript:;" onClick={ () => this.edit(index) }>编辑</a>
          </div>,
        }
      ]
    };
  }

  async componentDidMount() {
    await this.getList();
  }

  getList = async () => { 
    try {
      const res = await GetArticle(`admin/article?pageNum=${ this.state.pageNum }&pageSize=6`);
      if(res.retCode === 200){
        const { list, pageNum, pageSize, total } = res.data;
        this.setState({
          list,
          pageSize,
          pageNum,
          total
        })
      }
    } catch(e) {
      throw e;
    }
  }

  delete = idx => {
    const _this = this;
    try {
      confirm({
        title: '你确定要删除这篇文章吗 ?',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          DeleteArticle({ id: _this.state.list[idx].id })
          .then(res => {
            if(res.retCode === 200){
              message.success("删除成功");
              const list = _this.state.list;
              list.splice(idx,1);
              _this.setState({
                list
              })
            }
          }) 
        },
        onCancel() {
        },
      });
    } catch (e) {
      throw e;
    }
  }

  edit = idx => {
    this.props.history.push({
      pathname : '/index/blog/publish', 
      state: {
        data: this.state.list[idx],
        type: 1
      }
    })
  }

  detail = idx => {
    this.props.history.push({
      pathname : '/index/blog/publish', 
      state: {
        data: this.state.list[idx],
        type: 2
      }
    })
  }

  render() {
    const { columns, list, total, pageSize, pageNum } = this.state;
    return (
      <div id="aboutme" >
        <Table
          columns={columns}
          dataSource={list}
          rowKey={ record => record.id }
          pagination={
            { 
              total,
              defaultCurrent: pageNum,
              pageSize,
              onChange: (page, pageSize) => this.onChangePage(page, pageSize)
            }
          }
        />
      </div>
    )
  }

  onChangePage = (page, pageSize) => {
    this.setState({
      pageNum: page
    },() => {
      this.getList();
    })
  }
}

export default withRouter(ArticleList)