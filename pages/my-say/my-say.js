// pages/my-say/my-say.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    text:''
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数   
   */
  onReachBottom: function () {

  },
  titleInput: function (e) {
    this.setData({
      title: e.detail.value
    })
  },
  textInput: function (e) {
    this.setData({
      text: e.detail.value
    })
  },
  formSubmit(e){
    console.log(121321,e.detail.value)
    wx.navigateTo({
      url: '/pages/mySay-success/mySay-success',
    })
  }

})