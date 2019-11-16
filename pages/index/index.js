//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    menuList:[
      {
        src: '/images/sqfw.png',
        label: '社区发布'
      },
      {
        src: '/images/jmss.png',
        label: '居民说事'
      },
      {
        src: '/images/msfw.png',
        label: '民生服务'
      },
      {
        src: '/images/fczs.png',
        label: '风采展示'
      },
    ],
    entryList:[
      {
        image:'/images/sqfw.png',
        title:'社区居务',
        text:'为社区群众，指引社区居民办事流程'
      },
      {
        image:'/images/flag.png',
        title:'志愿招募',
        text:'文明交通、环境卫生、平安巡逻、垃圾分类'
      },
      {
        image:'/images/sqss.png',
        title:'社区说事',
        text:'为社区群众提供协商议论的交流区域'
      },
    ],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
