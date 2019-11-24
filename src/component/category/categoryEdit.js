import React, { Component } from 'react';
import { GetCategories, UpdateCategories, CreateCategories, DeleteCategories} from '../../http'
import './categoryEdit.scss'
import { Select, Button, Drawer, Input, Divider, message, Modal } from 'antd';

const { confirm } = Modal;

const Option = Select.Option;
const provinceData = ['Zhejiang', 'Jiangsu'];
const cityData = {
  Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
  Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
};

class CategoryEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: cityData[provinceData[0]],
      secondCity: cityData[provinceData[0]][0],
      onClose: false,
      visible: false,
      visibles: false,
      data: null,
      datas: null,
      datat: null,
      categoryf: '',
      categorys: '',
      categoryt: '',
      categoryName: '',
      categoryNames: '',
      chooseId: 0,
      parentId: 0,
    };
  }

  async componentDidMount() {
    try {
      const res = await GetCategories();
      console.log(res.data.list)
      this.setState({
        data: res.data.list,
        categoryf: 0,
        // categorys: res.data.list[1].name,
        // categoryt: res.data.list[2] && res.data.list[2].name
      })
    } catch (e) {
      throw e;
    }
  }

  render() {
    const { data, datas, datat, categoryf, categorys, categoryt, categoryName, categoryNames, visibles, visible } = this.state;
    console.log(categoryf)
    return (
      <div id="category_edit">
        <div>
          <p>顶层操作:</p>
          <Select 
          defaultValue={ categoryf }
          style={{ width: 120 }} 
          onChange={this.handleChange}
          >
            {
              data && data.map(item => (
                <Option key={item.id}>{ item.name }</Option>
              ))
            }
          </Select>
          <Button type="primary" icon="plus" onClick={ () => this.openDrawers(categoryf, null) }>新增</Button>
          <Button icon="edit" onClick={ () => this.openDrawer(categoryf) }>编辑</Button>
          <Button type="danger" icon="stop" onClick={ () => this.deleteCate(categoryf) }>删除</Button>
        </div>
        <div>
          <p>第二层分类操作:</p>
          <Select defaultValue="" style={{ width: 120 }} onChange={this.handleChanges}>
            {
              datas && datas.map(item => (
                <Option key={item.id}>{ item.name }</Option>
              ))
            }
          </Select>
          <Button type="primary" icon="plus" onClick={ () => this.openDrawers(categorys, categoryf) } >新增</Button>
          <Button icon="edit" onClick={ () => this.openDrawer(categorys) }>编辑</Button>
          <Button type="danger" icon="stop" onClick={ () => this.deleteCate(categorys) }>删除</Button>
        </div>
        <div>
          <p>第三层分类操作:</p>
          <Select defaultValue="" style={{ width: 120 }} onChange={this.handleChanget}>
            {
              datat && datat.map(item => (
                <Option key={item.id}>{ item.name }</Option>
              ))
            }
          </Select>
          <Button type="primary" icon="plus" onClick={ () => this.openDrawers(categoryt, categorys) }>新增</Button>
          <Button icon="edit" onClick={ () => this.openDrawer(categoryt) }>编辑</Button>
          <Button type="danger" icon="stop" onClick={ () => this.deleteCate(categoryt) }>删除</Button>
        </div>
        <Drawer
          title="修改"
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={visible}
        >
          <Input onChange={ this.editCategoryName } value={ categoryName } placeholder="请更改当前分类的名称" />
          <Button onClick={ this.confirmEdit } block type="primary">确定</Button>
        </Drawer>
        <Drawer
          title="新增"
          placement="left"
          closable={false}
          onClose={this.onCloses}
          visible={visibles}
        >
          <Input onChange={ this.createCategoryName } value={ categoryNames } placeholder="请输入分类名称" />
          <Button onClick={ this.confirmCreate } block type="primary">确定</Button>
        </Drawer>
      </div>
    )
  }

  onClose = () => { this.setState({ visible: false }) }

  onCloses = () => { this.setState({ visibles: false }) }

  deleteCate = id => {
    console.log(id)
    if(!id) { message.warning('请选择分类'); return ; }
    confirm({
      title: '你确定要删除该分类吗 ?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        DeleteCategories({ id })
        .then(res => {
          message.success("删除成功");
        }) 
      },
      onCancel() {
        message.success("已取消");
      },
    });
    // try {
    //   await DeleteCategories({ id });
    // } catch(e) {
    //   throw e;
    // }
  }

  // 修改分类名称
  editCategoryName = e => {
    console.log(e.target.value)
    this.setState({
      categoryName: e.target.value
    })
  }
  
  createCategoryName = e => {
    this.setState({
      categoryNames: e.target.value
    })
  }

  // 打开侧边
  openDrawer = chooseId => {
    console.log(chooseId)
    this.setState({ visible: true, chooseId });
  }

  confirmCreate = async () => {
    const { chooseId, parentId, categoryNames } = this.state;
    if(!chooseId && !parentId) { message.warning('请选择分类'); return ; }
    try {
      await CreateCategories({ name: categoryNames, parent_id: parentId });
      message.success('创建成功');
      this.setState({ visible: false });
    } catch( e ) {
      throw e;
    }
  }

  openDrawers = async (chooseId, parentId) => {
    console.log(chooseId, parentId)
    this.setState({
      chooseId,
      parentId,
      visibles: true
    })
  }

  // 关闭侧边
  confirmEdit = async () => {
    const { categoryName, chooseId } = this.state;
    console.log(chooseId)
    if(!categoryName.replace(/\s+/g, '') ){
      message.warning('分类名称不能为空');
    } else {
      try {
        await UpdateCategories({ name: categoryName, id: chooseId });
        message.success('修改成功');
        this.setState({ visible: false });
      } catch( e ) {
        throw e;
      }
    }
    // this.setState({ visible: false })
  }

  handleChange = (value) => {
    console.log(typeof value);
    const { data } = this.state;
    data.forEach(item => {
      if(item.id === parseInt(value)){
        console.log(item.id)
        this.setState({
          datas: item.categorys || null,
          categoryf: item.id
        })
      }
    });
  }

  handleChanges = value => {
    console.log(value)
    const { datas } = this.state;
    datas.forEach(item => {
      if(item.id === parseInt(value)){
        this.setState({
          datat: item.categorys || null,
          categorys: item.id
        })
      }
    });
  }

  handleChanget = value => {
    const { datat } = this.state;
    datat.forEach(item => {
      if(item.id === parseInt(value)){
        this.setState({
          categoryt: item.id
        })
      }
    });
    
  }
}

export default CategoryEdit