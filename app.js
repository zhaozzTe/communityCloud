//app.js
const UpdateManager = wx.getUpdateManager();
const Def_Key_UserInfo = "Key_UserInfo";

App({
  globalData: {
    hasUserInfo:true,
    userInfo: {
      loginStatus: "", // 0-未登录，1-已登录
      userToken: "", //  
      mobilePhone: "", // 当前登录手机
      openId: "",
      unionid: ""
    },
    location: {
      latitude: '', // 纬度，范围为 -90~90，负数表示南纬
      longitude: '', // 经度，范围为 -180~180，负数表示西经
    },
    systemInfo: {
      channelCode: "02", // 01：APP，02：永辉金融小程序，03：超市小程序
      appVersion: "", // app版本号
      plateform: "", // 平台 Android/iOS
      deviceInfo: "", // 设备品牌加型号
      deviceVersion: "", // 操作系统及版本
    },
    wxUserInfo: {}, //微信用户信息
    wxCode: "", //用户登录凭证
    pageBackFunc: null,//返回方法
    lnid: '',//产品id
  },

  onLaunch: function () {
    let _that = this;
    // 从缓存拿到用户信息
    this.getUserInfo();
    // 获取设备信息
    var _systemInfo = wx.getSystemInfoSync();
    this.globalData.systemInfo.appVersion = _systemInfo.version; // app版本号
    this.globalData.systemInfo.deviceInfo = `${_systemInfo.brand}_${_systemInfo.model}`; // 设备品牌加型号
    this.globalData.systemInfo.plateform = _systemInfo.platform; // 平台 Android/iOS
    this.globalData.systemInfo.deviceVersion = _systemInfo.system; // 操作系统及版本
    // console.log(this.globalData);
    // 获取定位
    wx.getLocation({
      type: 'wgs84',
      complete: function (res) {
        if (res.latitude && res.longitude) {
          _that.globalData.location.latitude = res.latitude;
          _that.globalData.location.longitude = res.longitude;
        }
      },
    });
    wx.login({
      success(res) {
        if (res.code) {
          wx.getUserInfo({
            success(info){
              console.log(1112222,info);
            },
            fail(err){
              console.log(33, err);
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      },
      fail(res){
        console.log('登录失败！' + res.errMsg)
      }
    })
  },

  onShow: function () {
    this.checkIsUpdate();
  },

  checkIsUpdate: function () {
    UpdateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        confirmText: "立即重启",
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            UpdateManager.applyUpdate();
          }
        }
      })
    })
  },

  Toast: function (msg, duration) {
    wx.showToast({
      title: msg || '',
      icon: 'none',
      duration: Number(duration) * 1000
    })
  },
  // ====== 分享 ======

  shareTool: function () {
    return {
      title: '',
      path: '/pages/index/index',
      success: function (res) { }
    }
  },

  // ======用户信息======

  /**
   * 获取用户信息
   */
  getUserInfo: function () {
    let _userInfo = this.getValue(Def_Key_UserInfo);
    if (_userInfo && _userInfo != "") {
      this.globalData.userInfo = JSON.parse(_userInfo);
    } else {
      this.globalData.userInfo = {
        loginStatus: "", // 0-未登录，1-已登录
        userToken: "", //  
        mobilePhone: "", // 当前登录手机
        openId: "",
        unionid: ""
      };
    }
    return _userInfo;
  },

  /**
   * 保存用户信息
   */
  setUserInfo: function (userInfo) {
    let _nowUserInfo = this.globalData.userInfo;
    let _newUserInfo = Object.assign(_nowUserInfo, userInfo);
    this.globalData.userInfo = _newUserInfo;
    this.setValue(Def_Key_UserInfo, JSON.stringify(_newUserInfo));
  },

  /**
   * 清除用户信息
   */
  clearUserInfo: function () {
    this.globalData.userInfo = {
      loginStatus: "", // 0-未登录，1-已登录
      userToken: "", //  
      mobilePhone: "", // 当前登录手机
      openId: "",
      unionid: ""
    };
    this.clearValue(Def_Key_UserInfo);
  },

  // ======本地存储======

  setValue: function (key, value) {
    wx.setStorageSync(key, value);
  },

  getValue: function (key, defultValue = "") {
    if (wx.getStorageSync(key)) {
      return wx.getStorageSync(key);
    } else {
      return defultValue;
    }
  },

  clearValue: function (key) {
    wx.removeStorageSync(key);
  },

})