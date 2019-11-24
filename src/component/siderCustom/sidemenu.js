import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import {
  Menu, Icon,
} from 'antd';


// 子项
const renderMenuItem = ({ key, title, icon, ...props }) => 
  <Menu.Item key={ key }>
    <Link to={key}>
      { icon && <Icon type={ icon } /> }
      <span>{ title }</span>
    </Link>
  </Menu.Item>

const { SubMenu } = Menu;

class SiderMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    const { menu, currentPage } = this.props;
    return (
      <Menu
        mode="inline"
        theme="dark"
        defaultSelectedKeys={ currentPage || ''}
        defaultOpenKeys={[menu[1].key] || ''}
        style={{ height: '100%', borderRight: 0 }}
      >
        {
          menu && menu.map((item, idx) => 
            item.sub && item.sub.length ? 
              <SubMenu key={ idx } title={<span><Icon type={ item.icon } /><span>{ item.title }</span></span>}>
                {
                  item.sub.map( items => renderMenuItem(items))
                }
              </SubMenu>
              : renderMenuItem(item)
          )
        }
      </Menu>
    )
  }
}

const mapState = (state) => {
  return {
    currentPage: state.currentPage
  }
}

export default connect(mapState)(SiderMenu)