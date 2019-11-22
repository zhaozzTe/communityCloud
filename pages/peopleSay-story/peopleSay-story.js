// pages/peopleSay-story/peopleSay-story.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      advices: [{
          title: '关于高空抛物处罚的意见征集',
          joinPeoples: 156,
          replyPeoples: 35,
          url: '/pages/story-detail/story-detail'
        },
        {
          title: '关于楼道流浪猫的问题讨论',
          joinPeoples: 126,
          replyPeoples: 37,
          url: '/pages/story-detail/story-detail'
        },
        {
          title: '关于楼道垃圾分类工作的意见采集',
          joinPeoples: 156,
          replyPeoples: 35,
          url: '/pages/story-detail/story-detail'
          
        },
        {
          title: '电梯安全问题的意见征集',
          joinPeoples: 156,
          replyPeoples: 30,
          url: '/pages/story-detail/story-detail'
        },
        {
          title: '16栋电动汽车充电桩的问题',
          joinPeoples: 126,
          replyPeoples: 37,
          url: '/pages/story-detail/story-detail'
        },
        {
          title: '关于7栋噪音扰民的处理意见征集',
          joinPeoples: 156,
          replyPeoples: 35,
          url: '/pages/story-detail/story-detail'
        },
        {
          title: '关于10栋花木被破坏的问题讨论',
          joinPeoples: 156,
          replyPeoples: 30,
          url: '/pages/story-detail/story-detail'
        }
      ],
   
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  gotoMySay(){
    console.log(11111)
    wx.navigateTo({
      url: '/pages/my-say/my-say',
    })
  }
})