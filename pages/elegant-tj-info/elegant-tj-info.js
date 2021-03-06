// pages/publichHall-liveService/publichHall-liveService.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTitle:'团建信息',
    searchV: '',
    isHideSearchIcon: false,
    infos: [{
      titleText: '团建活动信息',
      isHasMore: false,
      entData: [{
        image: '/images/flag.png',
        title: '团建活动信息一',
        text: '2019年10月20日',
        url: '/pages/peopleSay-detail/peopleSay-detail'
      },
      {
        image: '/images/sqss.png',
        title: '团建活动信息二',
        text: '2019年10月18日',
        url: '/pages/compage/compage'
      },
      {
        image: '/images/jmss.png',
        title: '团建活动信息三',
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