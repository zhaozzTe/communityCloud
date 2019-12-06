let { http } = require('../utils/fetch.js');
export const wxAppLogin = params => http({ url: '/api/v1/wx/wxAppLogin', params, method:'post'});//移动端小程序手机号二次登录接口,返回登录token
export const wxAppMobileLogin = params => http({ url:'/api/v1/wx/wxAppMobileLogin', params, method:'post'});//移动端小程序登录接口
export const getUserStatus = params => http({ url: `/api/v1/certificate/getUserCertificateStatus`, params: {} });//获取实名认证状态
export const getQrCodes = params => http({ url: `/api/v1/index/getQrCodes`, params: {} });//获取二维码图片
export const getNotices = params => http({ url: `/api/v1/index/getNotices`, params: {} });//获取公告列表
//获取服务类别接口
export const getServerType = params => http({ url: `/api/v1/requires/getAddress`, params: {}, method: 'post' });//获取服务类别接口
export const addServer = params => http({ url: `/api/v1/requires/add`, loading: true, params, method: 'post' });//添加服务需求
export const requiresList = params => http({ url: `/api/v1/requires/requiresList`,  params, method: 'post' });//分页查询历史需求数据
///上传图片
export const uploadimg = params => http({ url: `/api/v1/requires/upload/image`, contentType: 'multipart/form-data', params, method: 'post'});
export const submitnews = params => http({ url: `/api/v1/news/submitNews`, params, method: 'post' });//提交楼宇说事议题
export const attend = params => http({ url: `/api/v1/attend/attend`, params, loading: true, method: 'post' });//参与
export const getCategoryList = params => http({ url: `/api/v1/news/getCategoryList`, params, method: 'get' });//获取新闻板块

