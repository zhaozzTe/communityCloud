// pages/publichHall-liveService/publichHall-liveService.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTitle:'社区居务',
    searchV:'',
    isHideSearchIcon:false,
    infos: [{
      titleText: '全部社区居务',
      isHasMore:false,
      entData: [{
        image: '/images/flag.png',
        title: '被征地人员缴费补贴初审',
        text: '2019年10月20日',
        url: '/pages/compage/compage'
      },
      {
        image: '/images/sqss.png',
        title: '城乡居民养老保险经办',
        text: '2019年10月18日',
        url: '/pages/compage/compage'
      },
        {
          image: '/images/jmss.png',
          title: '灵活就业补贴申请',
          text: '2019年10月18日',
          url: '/pages/publichHal-liveDetail/publichHal-liveDetail'
        },
          {
          image: '/images/msfw.png',
            title: '退休人员信息管理',
          text: '2019年10月18日',
            url: '/pages/compage/compage'
        }],
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(1)
  },
  getFocus:function(e){
    this.setData({
      isHideSearchIcon:true
    })

  },
  bindReplaceInput:function(e){
    console.log(e.detail.value)
    this.setData({
      searchV:e.detail.value
    })
  }
})