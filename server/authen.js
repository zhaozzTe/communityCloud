let { http } = require('../utils/fetch.js');
export const getAddress = params => http({ url: '/api/v1/certificate/getAddress', params, method: 'post' });//获取小区列表
export const submitCertificate = params => http({ url: '/api/v1/certificate/submitCertificate', params, method: 'post' });//提交实名认证请求
export const getMobileCode = params => http({ url: `/api/v1/certificate/getMobileCode/${params.mobile}`, params:{} });//获取手机号验证码,手机号拼接在url中