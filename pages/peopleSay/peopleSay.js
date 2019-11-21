//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    meuns:[{
      imgUrl:'/images/tab1.png',
      meunText:'说事规则'
    }, {
        imgUrl: '/images/tab2.png',
        meunText: '楼宇说事'
      },
      {
        imgUrl: '/images/tab3.png',
        meunText: '小区说事'
      },
      {
        imgUrl: '/images/tab4.png',
        meunText: '社区说事'
      }, {
        imgUrl: '/images/tab5.png',
        meunText: '区域说事'
      },
      ],
    infos: [{
      titleText: '说事规则',
      isHasMore: true,
      entData: [{
        image: '/images/sqff.png',
        title: '说事平台发布规则及流程',
        text: '2019年10月20日'
      },
      {
        image: '/images/sqfw.png',
        title: '协商议题发布流程',
        text: '2019年10月18日'
      }],
    },
    ]
  },

  onLoad: function () {

  },

})
