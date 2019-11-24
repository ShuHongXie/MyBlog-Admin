import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { SaveBreadcrumb } from './redux/action'
import { connect } from 'react-redux'


import Index from './views/index'
import Login from './views/login'
import './App.css'
// @connect('currentPage', SaveBreadcrumb)
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hanlde: false,
      loggedIn: true
    };
  }
  componentDidMount() {
    const page = this.props.history.location.pathname;
    this.props.change(page.split('/').slice(1))
  }
  render() {
    const { loggedIn } = this.state;
    
    return (
      <div id="App" >
        <Router>
          <Switch>
            <Route exact path="/" render={() => (
            loggedIn ? (
              <Redirect to="/login"/>
            ) : (
              <Redirect to="/index"/>
            )
            )} />
            <Route path="/index" component={ Index } />
            <Route path="/login" component={ Login } />
          </Switch>
        </Router>
      </div>
    );
  }
  componentWillReceiveProps(nextProps){
    let { currentPage } = this.props, cPage = '';
    for(let i in currentPage) {
      cPage += '/' + currentPage[i]
    }
    const page = nextProps.history.location.pathname;
    if( cPage !== page ) {
      this.props.change(page.split('/').slice(1))
    } 
  }
}

const mapState = (state) => {
  return {
    currentPage: state.currentPage
  }
}
const mapDispatch = (dispatch) => {
  return {
    change: arr => {
      dispatch(SaveBreadcrumb(arr))
    },
  }
}

export default withRouter(connect(mapState, mapDispatch)(App))
