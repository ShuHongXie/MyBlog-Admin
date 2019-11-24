// 封装connect 来使用ES7修饰器语法
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

export default ( mode, action ) => {
  return connect(
    state => state[mode],
    dispatch => bindActionCreators(action,dispatch)
  )
}