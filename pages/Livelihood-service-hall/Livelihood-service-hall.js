//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    meuns: [{
      imgUrl: '/images/tab1.png',
      meunText: '服务规则',
      url: '/pages/peopleSay-rule/peopleSay-rule'
    }, {
      imgUrl: '/images/tab2.png',
        meunText: '服务团队',
      url: '/pages/peopleSay-story/peopleSay-story'
    },
    {
      imgUrl: '/images/tab3.png',
      meunText: '服务需求'
    },
    {
      imgUrl: '/images/tab4.png',
      meunText: '志愿招募'
    }, {
      imgUrl: '/images/tab5.png',
      meunText: '社工应答',
      url: '/pages/social-worker/social-worker'
    },
    ],
    infos: [{
      titleText: '服务规则',
      isHasMore: true,
      entData: [{
        image: '/images/sqff.png',
        title: '民生服务发布规则',
        text: '2019年10月20日'
      },
      {
        image: '/images/sqfw.png',
        title: '志愿者招募规则及流程说明',
        text: '2019年10月18日'
      }],
    },
      {
        titleText: '服务团队',
        isHasMore: true,
        entData: [{
          image: '/images/sqff.png',
          title: '无偿服务团队列表',
          text: '2019年10月20日'
        },
        {
          image: '/images/sqfw.png',
          title: '低偿服务团队列表',
          text: '2019年10月18日'
        }],
      },
      {
        titleText: '服务需求',
        isHasMore: true,
        entData: [{
          image: '/images/sqff.png',
          title: '养老需求登记',
          text: '2019年10月20日'
        },
        {
          image: '/images/sqfw.png',
          title: '保洁服务需求登记',
          text: '2019年10月18日'
        }],
      },
    ],
  },

  onLoad: function () {

  },

})
