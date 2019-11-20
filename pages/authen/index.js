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
  onShow: function () {
    WxTools.userInfo();
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