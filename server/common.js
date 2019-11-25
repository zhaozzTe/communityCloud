let { http } = require('../utils/fetch.js');
export const wxAppLogin = params => http({ url: 'http://one-tech.cn:88/zh/api/v1/wx/wxAppLogin', params, method:'post'});//移动端小程序手机号二次登录接口,返回登录token
export const wxAppMobileLogin = params => http({ url:'http://one-tech.cn:88/zh/api/v1/wx/wxAppMobileLogin', params, method:'post'});//移动端小程序登录接口