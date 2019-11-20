// pages/login-wx/login-wx.js
import Http from '../../utils/http.js';
import Config from "../../utils/config.js";
import WxTools from "../../utils/wxTools.js";
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
  bindgetuserinfo: function(e) {
    console.log(e.detail)
    wx.login({
      success(res){
        if(res.code){
          console.log('临时code：',res.code);
          console.log('encryptedData值encryptedData:', e.detail.encryptedData);
          console.log('矢量iv:', e.detail.iv);
        }
      }
    })
  },

})