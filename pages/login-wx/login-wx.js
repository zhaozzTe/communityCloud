// pages/login-wx/login-wx.js
import Config from "../../utils/config.js";
import WxTools from "../../utils/wxTools.js";
import { wxAppMobileLogin } from '../../server/common.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    //获取定位
    // WxTools.location();
    //获取用户信息
    WxTools.userInfo();
  },
  //微信登录
  // bindgetuserinfo: function(e) {
  //   console.log(e.detail)
  //   wx.login({
  //     success(res){
  //       if(res.code){
  //         console.log('临时code：',res.code);
  //         console.log('encryptedData值encryptedData:', e.detail.encryptedData);
  //         console.log('矢量iv:', e.detail.iv);
  //       }
  //     }
  //   })
  // },

  getPhoneNumber:function(e)
  {
    console.log(e.detail)
    wx.login({
      async success(res) {
        console.log(res)
        if (res.code) {
          console.log('手机临时code：', res.code);
          console.log('手机encryptedData值encryptedData:', e.detail.encryptedData);
          console.log('手机矢量iv:', e.detail.iv);
          try{
            let params={
              "encryptedData": e.detail.encryptedData,
              "iv": e.detail.iv
            }
            let res = await wxAppMobileLogin(params)
            if (res.data && res.data.token){
              wx.setStorageSync("token", res.data.token)
              wx.setStorageSync("isVisitor", 0)
            }
            if (res.data.status == 0) {
              wx.navigateTo({ url: '/pages/authen/index' })
            } else if (res.data.status == -1) {
              wx.navigateTo({ url: '/pages/authen/index' })
            } else if (res.data.status == 2){
              wx.redirectTo({ url: '/pages/index/index' })
            } else if (res.data.status == 1) {
              wx.redirectTo({ url: '/pages/login-waite/login-waite' })
            }
          }catch(e){}
        }
      }
    })
  },
  getPhoneNumber2:function(e)
  {
    console.log(e.detail)
    wx.login({
      async success(res) {
        console.log(res)
        if (res.code) {
          console.log('手机临时code：', res.code);
          console.log('手机encryptedData值encryptedData:', e.detail.encryptedData);
          console.log('手机矢量iv:', e.detail.iv);
          try{
            let params={
              "encryptedData": e.detail.encryptedData,
              "iv": e.detail.iv
            }
            let res = await wxAppMobileLogin(params)
            if (res.data && res.data.token){
              wx.setStorageSync("token", res.data.token)
              wx.setStorageSync("isVisitor", 1)
            }
            res.code==0&&wx.redirectTo({ url: '/pages/index/index' })
          }catch(e){}
        }
      }
    })
  },

})