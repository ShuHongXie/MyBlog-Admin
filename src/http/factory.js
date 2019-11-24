import axios from 'axios';
import qs from 'qs';
import { message } from 'antd';
import { getDomain } from '../util/base'
import { createHashHistory } from 'history'; // 是hash路由 history路由 自己根据需求来定
 
const history = createHashHistory();
//此文件配置请求前置操作,后置操作
//若增加log可以写到此文件
let instance = axios.create({
    baseURL: getDomain(),
    transformRequest: [function(data) {
        return qs.stringify(data, {arrayFormat: 'indices'});
    }],
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    },
    timeout: process.env.ENV_NAME === 'PRO' ? 30000 : 300000,
    maxRedirects: 0, // default

});
//参考 https://www.mmxiaowu.com/article/589af8cde9be1c5b21ef8e9c
//拦截发起请求时
instance.interceptors.request.use(config => {
    if(config.url !== "login"){
        let token = window.localStorage.getItem("token") || ''
        config.headers["token"] = token;
    }
    return config
}, error => {
    return Promise.reject(error) //扶正发起请求时发生的错误并返回
})

instance.interceptors.response.use(res => {
    if(res.data.retCode !== 200 && res.data.retCode !== 500200) {
        switch(res.data.retCode){
            case 401:
                console.log("enter factory")
                window.localStorage.removeItem("token");
                setTimeout(() => {
                    history.push('/login');
                }, 0);
            break;
            default:       
        }
        message.error(res.data.message);
    } else {
        switch(res.data.retCode){
            case 500200:
                window.localStorage.setItem("token", res.data.data.token);  
            break;
            default:
        }
        message.success(res.data.message);
    }
    return res.data
}, error => {
    return Promise.reject(error);
})
export default instance;