let { http } = require('../utils/fetch.js');
export const getStreetList = params => http({ url: '/api/v1/certificate/getStreetList', params });//获取街道列表
export const getCommunity = params => http({ url: '/api/v1/certificate/getCommunity', params, method: 'post' });//根据街道获取社区列表
export const getVillageList = params => http({ url: '/api/v1/certificate/getVillageList', params, method: 'post' });//根据社区获取小区列表,提交实名认证时传小区id,切记
export const submitCertificate = params => http({ url: '/api/v1/certificate/submitCertificate', params, method: 'post', loading:true});//提交实名认证请求
export const getMobileCode = params => http({ url: `/api/v1/certificate/getMobileCode/${params.mobile}`, params:{} });//获取手机号验证码,手机号拼接在url中