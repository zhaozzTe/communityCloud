import Config from "./config.js"
import Utils from "./util.js"

/**
 * post 数据请求
 */
var nPost = function (data) {
  var _header = {}
  let promise = new Promise(function (resolve, reject) {
    wx.showNavigationBarLoading();
    wx.request({
      url: data.url,
      data: data.params,
      method: "POST",
      dataType: "json",
      header: {
        "content-type": 'application/json',
        "Auth-Header": JSON.stringify(_header),
      },
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) {
        let _sData = res.data;
        if (_sData && _sData.code == '0') { // 成功时的标记
          resolve(_sData); // 成功时的回调
        } else {
          console.log('--- error ---');
          if (_sData && _sData.code == '99999') { // 登录超时退出
            reLogin();
            reject(_sData || "");
            Utils.showMsg(_sData.message || "系统异常");
          } else if (res.errMsg != "request:ok") { // 网络请求超时
            _sData = objOutTime;
          } else if (_sData.code == '60032') {
            //身份认证提示
            wx.showModal({
              title: '提示',
              content: _sData.message,
              showCancel: false,
              confirmText: '知道了',
            });
            reject(_sData || "");
          } else {
            reject(_sData || "");
            Utils.showMsg(_sData.message || "系统异常");
          }
        }
      }
    });
  });
  return promise;
}


/**
 * get 数据请求
 */
var nGet = function (data) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: data.url,
      method: "GET",
      header: {
        "content-type": 'application/json'
      },
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) {
        wx.hideLoading();
        if (res.errMsg != "request:ok") { // 网络请求超时
          _sData = objOutTime;
          Utils.showMsg(_sData.message || "系统异常");
        } else {
          resolve(res.data);
        }
      }
    });
  });
}

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
        "Auth-Header": JSON.stringify(_header),
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
        "Auth-Header": JSON.stringify(_header),
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
  wx.switchTab({
    url: '/pages/tab-home/tab-home'  
  });
}

//该数据用于在无网络环境下，模拟报文，不再请求网络
var objOutTime = {
  message: '网络请求超时',
  code: '999998'
}

module.exports = {
  nPost,
  nGet,
  nUplaod,
  myUploadFile,
}