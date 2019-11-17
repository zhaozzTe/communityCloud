// pages/publichHall-liveService/publichHall-liveService.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchV:'',
    isHideSearchIcon:false,
    infos: [{
      titleText: '全部社区居务',
      isHasMore:false,
      entData: [{
        image: '/images/smrz.png',
        title: '被征地人员缴费补贴初审',
        text: '2019年10月20日'
      },
      {
        image: '/images/smrz.png',
        title: '城乡居民养老保险经办',
        text: '2019年10月18日'
      },
        {
          image: '/images/smrz.png',
          title: '灵活就业补贴申请',
          text: '2019年10月18日'
        },
          {
          image: '/images/smrz.png',
            title: '退休人员信息管理',
          text: '2019年10月18日'
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