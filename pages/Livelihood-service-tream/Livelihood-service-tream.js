// pages/publichHall-liveService/publichHall-liveService.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchV: '',
    isHideSearchIcon: false,
    infos: [{
      titleText: '服务团队各类说明',
      isHasMore: false,
      entData: [{
        image: '/images/flag.png',
        title: '无偿服务内容及其说明',
        text: '2019年10月20日',
        url: '/pages/peopleSay-detail/peopleSay-detail'
      },
      {
        image: '/images/sqss.png',
        title: '有偿服务内容及其说明',
        text: '2019年10月18日',
        url: '/pages/compage/compage'
      },
      {
        image: '/images/jmss.png',
        title: '低偿服务内容及其说明',
        text: '2019年10月18日',
        url: '/pages/publichHal-liveDetail/publichHal-liveDetail'
      },
     ],
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
  getFocus: function (e) {
    this.setData({
      isHideSearchIcon: true
    })

  },
  bindReplaceInput: function (e) {
    console.log(e.detail.value)
    this.setData({
      searchV: e.detail.value
    })
  }
})