import React, { Component } from 'react';
import { Input, Button } from 'antd';
import { LoginReq } from '../http'
import JsEncrypt from 'jsencrypt'
import './login.scss'

const encrypt = new JsEncrypt();
// encrypt.setPublicKey("MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCC0ZGkYWoxFX65S+8SvyqEiqQCYEzHCKGOICtZ/HAqgeSURtevvNL6GgHZlIG7oM66oUBEKmIz3kz8GKz7l5OOngmTue8aicp1W2HGvq2d5zQei9GXOAFyP+BQ8q2an4rvvpkudzaWK6BQIoZnK6hryH8nqbxRK/DwTqSwI4yhfwIDAQAB");
encrypt.setPublicKey(`-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCqBa0yw4CxVzN6M91TRzIEsPEt
3k/D/iiuCUGE0ujzbBGEmQzvU829GLPUgrw1RaLYNzjYveKm/NlI3EyHmSRSLygV
Y0HPAcOXfRl5CA89glEvGCenaop6QP1pGPGifd3N/S4SReVRT6UL1lOFiBflAe4S
cqy/KVYrCLcveeb4XwIDAQAB
-----END PUBLIC KEY-----`);


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '13005322685',
      pwd: '13553356523'
    };
  }
  render() {
    const { account, pwd } = this.state;
    return (
      <div id="login">
        <p>登录</p>
        <div className="box">
          <Input 
            placeholder="请输入账号" 
            allowClear 
            value={ account } 
            onChange={ this.saveAccount }
          />
          <br /><br />
          <Input.Password
            placeholder="请输入密码" 
            allowClear 
            value={ pwd } 
            onChange={ this.savePwd }
          />
          <br /><br />
          <Button type="primary" onClick={ this.login }>登录</Button>
        </div>
      </div>
    )
  }

  login = async () => {
    const { account, pwd } = this.state;
    try {
      const res = await LoginReq({
        username: account,
        password: encrypt.encrypt(pwd)
      });
      console.log(res)
      if(res.retCode === 500200) {
        this.props.history.push("/index/blog/list")
      }
    } catch (e) {
      throw e;
    }
  }

  saveAccount = e => this.setState({ account: e.target.value.trim() })

  savePwd = e => this.setState({ pwd: e.target.value.trim() })
}

export default Login