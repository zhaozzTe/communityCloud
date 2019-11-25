/*
 * @Author: your name
 * @Date: 2019-11-17 10:51:06
 * @LastEditTime: 2019-11-25 23:28:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \communityCloud\pages\authen\index.js
 */
let that =getApp()
import WxTools from "../../utils/wxTools.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sexFontName:'icongender',
    nameFontName:'iconname',
    locationFontName:'iconlocation',
    phoneFontName:'iconcellnumber',
    yzmFontName: 'iconverification-code',
    index:0,
    isCheck:0,
    tel:'',
    sexArr:[
      {
        id:0,
        name:'请选择'
      },
      {
        id:1,
        name:'男'
      },
      {
        id:2,
        name:'女'
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  telInput: function (e) {
    this.setData({
      tel: e.detail.value
    })
  },
  onShow: function () {
    WxTools.userInfo();
  },
  getYZM(){
    let telreg=/^[1][3,4,5,7,8][0-9]{9}$/; 
    if(telreg.test(this.data.tel) === false){  
      that.Toast('请输入正确的手机号')
        return  false;  
    } 
  },
  bindPickerChange(e)
  {
    console.log(e.detail.value)  
    this.setData(
      {
        index: e.detail.value
      })
  
  },

  submit() {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },

    

})