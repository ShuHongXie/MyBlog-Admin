import React, { Component } from 'react';
import {
  Layout
} from 'antd';
import { menuList } from '../../routesSet/menu'
import SiderMenu from './sidemenu'

const { Sider } = Layout;

// 整个左边导航栏封装
class SiderBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }
  render() {
    return (
      <Sider 
        width={200} 
        style={{ background: '#fff' }}
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
      >
          <SiderMenu menu={ menuList } />
      </Sider>
    )
  }
}

export default SiderBox;