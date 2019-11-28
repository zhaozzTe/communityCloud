let { http } = require('../utils/fetch.js');
export const getNewsPage = params => http({ url: 'http://one-tech.cn:88/zh/api/v1/news/getNewsPage', params, method: 'post' });//获取新闻列表
export const getNewsSummary = params => http({ url: `http://one-tech.cn:88/zh/api/v1/news/getNewsSummary/${params.newsType}`, params: {} });//获取板块新闻概览,每个子栏目最多返回2条数据
export const getNewsDetail = params => http({ url: `http://one-tech.cn:88/zh/api/v1/news/getNewsDetail/${params.id}`, params: {} });//获取新闻详情