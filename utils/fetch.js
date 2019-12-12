import Config from "./config.js"
import Utils from "./util.js"
import wxTools from "./wxTools.js"
const origin='https://one-tech.cn/zh'
/**
 * post 数据请求
 */
var http = function (data) {
  var _header = {}
  let promise = new Promise(async function (resolve, reject) {
    let loading = data && data.loading
    let method = data.method&&data.method.toLowerCase() || 'GET'
    let isLoginReq = data.url.toLowerCase().includes('LOGIN');// 登录请求
    if (loading) wx.showLoading({
      title: '加载中',
      mask:true
    })
    wx.request({
      url: `${origin}${data.url}`,
      data: data.params,
      method: method,
      dataType: "json",
      header: {
        "content-type": data.contentType || 'application/json',
        "Authorization": wx.getStorageSync('token'),
      },
      success: async function (res) {
        // console.log('接口', res)
        let { statusCode} = res;
        if (res.data.code == 0 || (isLoginReq && res.data.code == 0 && res.data.data && (res.data.data.status == 0 || res.data.data.status == 2))) { // 成功时的标记
          resolve(res.data); // 成功时的回调
        } else if (statusCode==401){ // 状态失效
          await reLogin(data)
          console.log(wx.getStorageSync('token'));
          // await http(data)
        } else if (statusCode == 403) { // 未实名
          wx.showToast({
            title: '请您先实名认证',
            icon: 'none',
            duration: 2000
          })
          if (!wxTools.getCurrentPageUrl().includes('/pages/authen/index')) wx.redirectTo({ url: '/pages/authen/index' })
        } else {
          console.log('--- error ---',res);
          wx.showToast({
            title: res.data.msg||'连接错误',
            icon: 'none',
            duration: 2000
          })
          reject(data || "");
        }
      },
      fail: function (res) {
        console.log('接口fail',res)
        wx.showToast({
          title: res.errMsg||'网络不通',
          icon: 'none',
          duration: 2000
        })
      },
      complete: function (res) {
        if (loading) wx.hideLoading()
      }
    });
  });
  return promise;
}
/**
 * 上传文件
 */
var nUplaod = function (data) {
  var _header = {
  }
  return new Promise(function (resolve, rejec) {
    let loading = data && data.loading
    if (loading) wx.showLoading({
      title: '加载中',
      mask:true
    })
    wx.uploadFile({
      url: `${origin}${data.url}`, //仅为示例，非真实的接口地址
      filePath: data.imgPath,
      header: {
        'content-type': 'multipart/form-data',
        "Authorization": wx.getStorageSync('token'),
      },
      name: 'file',
      formData: data.params,
      complete: function (res) {
        wx.hideLoading();
        let _sData = JSON.parse(res.data);
        if (_sData.code != "0") {
          getApp().Toast(_sData.message, 2);
          rejec(_sData)
        } else {
          resolve(_sData);
        }
      }
    });
  });
}


/**
 * 上传图片
 */
var myUploadFile = function (data) {
  var _header = {
    
  }
  let promise = new Promise(function (resolve, reject) {
    let loading = data && data.loading
    if (loading) wx.showLoading({
      title: '加载中',
      mask:true
    })
    wx.uploadFile({
      url: `${origin}${data.url}`,
      filePath: data.filePath,
      header: {
        'content-type': 'multipart/form-data',
        "Authorization": wx.getStorageSync('token'),
      },
      name: 'img',
      formData: data.formData,
      complete: function (res) {
        wx.hideLoading();
        if (res.data && res.data.code === 0) { // 成功
          resolve(res);
        } else { // 失败
          reject(res);
          Utils.showMsg(res.data.message);
        }
      },
    })
  });
}


/**
 * 重新登录 清除用户信息
 */
var reLogin = async function (data) {
  console.log('reLogin');
  let req;
  // getApp().clearUserInfo();
  await wx.login({
    async success(res) {
      if (res.code) {
        await wx.getUserInfo({
          async success(info) {
            console.log(info);
            
            let params = {
              "code": res.code,
              "encryptedData": info.encryptedData,
              "iv": info.iv
            }
            try{
              let res = await http({ url: `/api/v1/wx/wxAppLogin`, params, method: 'post' })
              if (res.data && res.data.token) wx.setStorageSync("token", res.data.token)
              // req =await http(data)
              // console.log(1,req);
            }catch(e){}
          },
          fail(err) {
          }
        })
      } else {
        console.log('重新授权失败！' + res.errMsg)
      }
    },
    fail(res) {
      console.log('重新授权失败！' + res.errMsg)
    }
  })
  // console.log(2,req);
  // return req
}

//该数据用于在无网络环境下，模拟报文，不再请求网络
var objOutTime = {
  message: '网络请求超时',
  code: '999998'
}

module.exports = {
  http,
  nUplaod,
  myUploadFile,
}