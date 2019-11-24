import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { GetCategories } from '../../http'
import './categoryList.scss'

import { Tree,  Icon, Button } from 'antd';

const { TreeNode } = Tree;

class CategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedKeys: ['0-0-0', '0-0-1'],
      autoExpandParent: true,
      checkedKeys: ['0-0-0'],
      selectedKeys: [],
      data: []
    };
  }
  componentDidMount() {
    this.GetCategoryList();
  }

  async GetCategoryList() {
    try {
      const res = await GetCategories();
      this.setState({
        data: res.data.list
      })
    } catch (e) {
      throw e;
    }
  }

  render() {
    const { data, expandedKeys, autoExpandParent } = this.state; 
    return (
      <div id="category_list">
        <Link to='/index/catalog/edit'>
          <Button type="primary" icon="plus">编辑</Button>
        </Link>
        <Tree
          onExpand={this.onExpand}
          expandedKeys={expandedKeys}
          onCheck={this.onCheck}
          defaultExpandAll={ true }
          onSelect={this.onSelect}
          switcherIcon={<Icon type="down" />}
          // selectedKeys={this.state.selectedKeys}
        >
          {this.renderTreeNodes(data)}
        </Tree>
      </div>
    )
  }
  onExpand = (expandedKeys) => {
    console.log('onExpand', expandedKeys);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }

  onCheck = (checkedKeys) => {
    console.log('onCheck', checkedKeys);
    // let { checkedKeys } = this.state;
    this.setState({ checkedKeys });
  }

  onSelect = (selectedKeys, info) => {
    console.log(selectedKeys, info);
    this.setState({ checkedKeys: selectedKeys });
  }

  renderTreeNodes = data => data.map((item) => {
    if (item.categorys) {
      return (
        <TreeNode value={ item.id } title={item.name} key={item.id} dataRef={item}>
          {this.renderTreeNodes(item.categorys)}
        </TreeNode>
      );
    }
    return <TreeNode value={ item.id } title={ item.name } key={item.id} />;
  })
}

export default CategoryList