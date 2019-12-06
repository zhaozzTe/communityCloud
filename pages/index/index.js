//index.js
//获取应用实例
const app = getApp()
import { getQrCodes,getNotices } from '../../server/common.js'
Page({
  data: {
    text: '社区居民免费体检活动，8月28日起即可开始预约',
    marqueePace: 1,//滚动速度
    marqueeDistance: 0,//初始滚动距离
    size: 14,
    orientation: 'left',//滚动方向
    interval: 30, // 时间间隔
    menuList:[
      {
        src: '/images/sqfw.png',
        label: '社区发布',
        url: '/pages/publishHall/publishHall'
      },
      {
        src: '/images/jmss.png',
        label: '居民说事',
        url: '/pages/peopleSay/peopleSay'
      },
      {
        src: '/images/msfw.png',
        label: '民生服务',
        url: "/pages/Livelihood-service-hall/Livelihood-service-hall"
      },
      {
        src: '/images/fczs.png',
        label: '风采展示',
        url: '/pages/elegant-hall/elegant-hall'
      },
    ],
    entryList:[
      {
        titleImgUrl:'/images/sqfw.png',
        title:'社区居务',
        text:'为社区群众，指引社区居民办事流程',
        url: '/pages/comNews/index',
        params:{
          type:'SHEQU_JUWU'
        }
      },
      {
        titleImgUrl:'/images/flag.png',
        title:'志愿招募',
        text:'文明交通、环境卫生、平安巡逻、垃圾分类',
        url: '/pages/join-volunteer/join-volunteer',
        params:{
          type:'ZHIYUAN_ZHAOMU'
        }
      },
      {
        titleImgUrl:'/images/sqss.png',
        title:'社区说事',
        text:'为社区群众提供协商议论的交流区域',
        url: '/pages/comNews/index',
        params:{
          type:'SHEQU_SHUOSHI'
        }
      },
    ],
    userInfo: {},
    needAuth: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    ewmList:[],
    noticeList:[]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    // 页面显示
    var that = this;
    if (wx.getStorageSync('token')){
      that.setData({
        needAuth: false
      })
    }else{
      that.setData({
        needAuth: true
      })
    }
    var length = that.data.text.length * that.data.size;//文字长度
    var windowWidth = wx.getSystemInfoSync().windowWidth;// 屏幕宽度
    that.setData({
      length: length,
      windowWidth: windowWidth,
    });
    that.runMarquee();// 水平一行字滚动完了再按照原来的方向滚动
    if (app.globalData.userInfo) {
      console.log(444,app.globalData.userInfo)
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log(res)
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
  onShow: function () {
    this.getQrCodes()
    this.getNotices()
  },
  //图片点击事件
  imgYu: function (e) {
    let src = e.currentTarget.dataset.src;
    let imgList = [e.currentTarget.dataset.src];//获取data-list
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  },
  async getQrCodes(){
    try{
      let {code,data} = await getQrCodes()
      console.log(333,data);
      
      if(code==0) this.setData({ewmList:data})
    }catch(e){}
  },
  async getNotices(){
    try{
      let {code,data} = await getNotices()
      if(code==0) this.setData({noticeList:data})
    }catch(e){}
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  runMarquee: function () {
    var that = this;
    var interval = setInterval(function () {
      //文字一直移动到末端
      if (-that.data.marqueeDistance < that.data.length) {
        that.setData({
          marqueeDistance: that.data.marqueeDistance - that.data.marqueePace,
        });
      } else {
        clearInterval(interval);
        that.setData({
          marqueeDistance: that.data.windowWidth
        });
        that.runMarquee();
      }
    }, that.data.interval);
  }
})
