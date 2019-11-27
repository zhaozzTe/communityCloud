//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    meuns:[{
      imgUrl:'/images/tab1.png',
      meunText:'说事规则',
      url: '/pages/peopleSay-rule/peopleSay-rule'
    }, {
        imgUrl: '/images/tab2.png',
        meunText: '网格说事',
        url: '/pages/peopleSay-story/peopleSay-story'
      },
      {
        imgUrl: '/images/tab3.png',
        meunText: '小区说事',
        url: '/pages/house-story/house-story'
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
    ],

    adviceBoxs: [{
      titleText: '楼宇说事',
      isHasMore: true,
      advices: [{
        title: '关于高空抛物处罚的意见征集',
        joinPeoples: 156,
        replyPeoples: 35
        },
        {
          title: '关于楼道流浪猫的问题讨论',
          joinPeoples: 126,
          replyPeoples: 37
        }
      ],
    },
      {
        titleText: '楼宇说事',
        isHasMore: true,
        advices: [{
          title: '垃圾分类工作意见征集',
          joinPeoples: 156,
          replyPeoples: 35
        },
        {
          title: '关于不文明养犬的问题讨论',
          joinPeoples: 156,
          replyPeoples: 30
        }
        ],
      }
    ],
    
  },

  onLoad: function () {

  },

})
