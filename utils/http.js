const axios = require('axios')

axios.interceptors.response.use(response => {
  if (response.data.code == 10000) {
    // 登录过期
    return null
  } else if (response.data.code !== 0) {
    wx.showToast({
      title: response.data.msg,
      icon: 'warn',
      duration: 2000
    })
    return null
  }
  return response
}, err => {
  wx.hideLoading()
  if (err && err.response) {
    switch (err.response.status) {
      case 401:
        // 登录过期
        err.message = '登录过期'
        break;
      default:
        err.message = `连接错误${err.response.status}`
    }
  } else {
    err.message = '连接到服务器失败';
  }
  if (err.message) wx.showToast({
    title: err.message,
    icon: 'warn',
    duration: 2000
  })
  return null
})
export default async (url = '', data = {}, method = 'get', config = { headers: {} }, isLoading = false) => {
  isLoading&&wx.showLoading({
    title: '加载中',
  })
  method = method.toLowerCase()
  if (getCookie('_dstoken')) {
    config.headers['Authorization'] = getCookie('_dstoken');
  }
  let params;
  if (config.headers['Content-Type'] == 'multipart/form-data') {
    params = new FormData(); //创建form对象
    for (let item of Object.keys(data)) {
      // params.append(item,data[item])
      if (Array.isArray(data[item]) && data[item][0].file.constructor === File) {
        for (let ite of data[item]) {
          let file = ite.file;
          params.append(item, file);//通过append向form对象添加数据
        }
      } else {
        params.append(item, data[item])
      }
    }
  } else {
    params = data
  }

  const ajaxConfig = Object.assign({
    url,
    method
  }, config)
  if (['post', 'put', 'patch'].includes(ajaxConfig.method)) {
    ajaxConfig.data = params
  } else {
    ajaxConfig.params = data
  }

  let result = (await axios(ajaxConfig)).data

  isLoading &&wx.hideLoading()
  return result
}
