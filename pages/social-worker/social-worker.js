// pages/publichHall-liveService/publichHall-liveService.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchV: '',
    isHideSearchIcon: false,
    infos: [{
      titleText: '社工政策',
      isHasMore: true,
      entData: [{
        image: '/images/flag.png',
        title: '社区社工政策说明细则',
        text: '2019年10月20日',
        url: '/pages/peopleSay-detail/peopleSay-detail'
      },
      {
        image: '/images/sqss.png',
        title: '社区社工政策详细解读',
        text: '2019年10月18日',
        url: '/pages/compage/compage'
      },
     ],
    },
      {
        titleText: '社工服务',
        isHasMore: true,
        entData: [{
          image: '/images/flag.png',
          title: '社工服务规范',
          text: '2019年10月20日',
          url: '/pages/peopleSay-detail/peopleSay-detail'
        },
        {
          image: '/images/sqss.png',
          title: '社工服务时间及注意事项',
          text: '2019年10月18日',
          url: '/pages/compage/compage'
        },
        ],
      }
    ]
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