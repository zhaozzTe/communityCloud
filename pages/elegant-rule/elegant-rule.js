// pages/publichHall-liveService/publichHall-liveService.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTitle:'展示规则',
    searchV: '',
    isHideSearchIcon: false,
    infos: [{
      titleText: '全部展示规则',
      isHasMore: false,
      entData: [{
        image: '/images/flag.png',
        title: '社区展示流程详细说明',
        text: '2019年10月20日',
        url: '/pages/peopleSay-detail/peopleSay-detail'
      },
      {
        image: '/images/sqss.png',
        title: '社区风采展示流程说明',
        text: '2019年10月18日',
        url: '/pages/compage/compage'
      },
      {
        image: '/images/jmss.png',
        title: '社区风采展示流程说明',
        text: '2019年10月18日',
        url: '/pages/publichHal-liveDetail/publichHal-liveDetail'
      },
      {
        image: '/images/msfw.png',
        title: '社区风采展示流程说明',
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