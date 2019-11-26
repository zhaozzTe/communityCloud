//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    meuns: [{
      imgUrl: '/images/tab1.png',
      meunText: '展示规则',
      url: '/pages/peopleSay-rule/peopleSay-rule'
    }, {
      imgUrl: '/images/tab2.png',
        meunText: '团建信息',
      url: '/pages/peopleSay-story/peopleSay-story'
    },
    {
      imgUrl: '/images/tab3.png',
      meunText: '活动展示',
      url: '/pages/house-story/house-story'
    },
    {
      imgUrl: '/images/tab4.png',
      meunText: '才艺展示'
    }, {
      imgUrl: '/images/tab5.png',
      meunText: '媒体发布'
    },
    ],
    infos: [{
      titleText: '展示规则',
      isHasMore: true,
      entData: [{
        image: '/images/sqff.png',
        title: '团建活动展示规则说明',
        text: '2019年10月20日'
      },
      {
        image: '/images/sqfw.png',
        title: '才艺展示活动发布',
        text: '2019年10月18日'
      }],
    },
    {
      titleText: '团建信息',
      isHasMore: true,
      entData: [{
        image: '/images/sqss.png',
        title: '社区团建活动一',
        text: '2019年10月18日'
      },
      {
        image: '/images/smrz.png',
        title: '社区团建活动二',
        text: '2019年10月18日'
      }]
    },
      {
        titleText: '活动展示',
        isHasMore: true,
        entData: [{
          image: '/images/sqss.png',
          title: '文化有约，携手共进',
          text: '2019年10月18日'
        },
        {
          image: '/images/smrz.png',
          title: '九九重阳节，温暖老人心',
          text: '2019年10月18日'
        }]
      },
    ]
  },

  onLoad: function () {

  },

})
