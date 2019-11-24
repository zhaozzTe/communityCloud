import Config from "./config.js"
import Utils from "./util.js"

/**
 * post 数据请求
 */
var http = function (data) {
  var _header = {}
  let promise = new Promise(async function (resolve, reject) {
    wx.showNavigationBarLoading();
    let method = data.method.toLowerCase() || 'GET'
    wx.request({
      url: data.url,
      data: data.params,
      method: method,
      dataType: "json",
      header: {
        "content-type": 'application/json',
        "Authorization": wx.getStorageSync('token'),
      },
      success: function (res) {
        console.log(res)
        let { data, statusCode} = res;
        if ((data.code == 0 && data.data && data.data.status == 0) || (data.code == 0 && data.data && data.data.status == 2)) { // 成功时的标记
          resolve(data); // 成功时的回调
          // reLogin()
        } else if (statusCode==401){ // 状态失效
          wx.removeStorageSync('token')
          // reLogin()
        } else {
          console.log('--- error ---');
          wx.showToast({
            title: data.msg||'连接错误',
            icon: 'warn',
            duration: 2000
          })
          reject(data || "");
        }
      },
      fail: function (res) {
        console.log(99,res)
      },
      complete: function (res) {}
    });
  });
  return promise;
}


/**
 * get 数据请求
 */
// var nGet = function (data) {
//   return new Promise(function (resolve, reject) {
//     wx.request({
//       url: data.url,
//       method: "GET",
//       header: {
//         "content-type": 'application/json'
//       },
//       success: function (res) { },
//       fail: function (res) { },
//       complete: function (res) {
//         wx.hideLoading();
//         if (res.errMsg != "request:ok") { // 网络请求超时
//           _sData = objOutTime;
//           Utils.showMsg(_sData.message || "系统异常");
//         } else {
//           resolve(res.data);
//         }
//       }
//     });
//   });
// }

/**
 * 上传文件
 */
var nUplaod = function (data) {
  var _header = {
  }
  return new Promise(function (resolve, rejec) {
    wx.uploadFile({
      url: data.url, //仅为示例，非真实的接口地址
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
    wx.uploadFile({
      url: data.url,
      filePath: data.filePath,
      header: {
        'content-type': 'multipart/form-data',
        "Authorization": wx.getStorageSync('token'),
      },
      name: 'img',
      formData: data.formData,
      complete: function (res) {
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
var reLogin = function () {
  getApp().clearUserInfo();
  wx.getUserInfo({
    async success(info) {
      console.log(1112222, info);
      let params = {
        "code": res.code,
        "encryptedData": e.detail.encryptedData,
        "iv": e.detail.iv
      }
      let res=await http({ url: 'http://one-tech.cn:88/zh/api/v1/wx/wxAppLogin', params, method: 'post' })
      
    },
    fail(err) {
      console.log(33, err);
    }
  })
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