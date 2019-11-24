import React, { Component } from 'react';
import { withRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import '../assets/scss/index.scss'
import {
  Layout, Menu, Breadcrumb, Icon,
} from 'antd';
import { route } from '../routesSet/route'

import SiderBox from '../component/siderCustom/sider' // 侧边栏组件

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: []
    };
  }

  componentWillReceiveProps(newProps) {
    console.log(newProps)
  }

  render() {
    const { currentPage } = this.props;
    return (
      <div id="index">
        <Layout>
          <Header className="header">
            <div className="logo" />
            <div className="user_box" onClick={ this.signOut }>
              注销
            </div>
          </Header>
          <Layout>
            <SiderBox />
            <Layout style={{ padding: '0 24px 24px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                { currentPage.map(item => <Breadcrumb.Item key={ item } >{ item }</Breadcrumb.Item>) }
              </Breadcrumb>
              <Content style={{
                background: '#fff', padding: 24, margin: 0, minHeight: 280,
              }}
              >
                {
                  route.map(item => <Route key={ item.path } path={ item.path } component={ item.component }   />)
                }
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    )
  }

  signOut = () => {
    window.localStorage.removeItem("token");  
    this.props.history.push("/login");
  }
}

const mapState = (state) => {
  return {
    currentPage: state.currentPage
  }
}


export default withRouter(connect(mapState)(Index))