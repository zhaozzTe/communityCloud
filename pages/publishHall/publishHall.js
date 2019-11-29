//index.js
//获取应用实例
const app = getApp()
import { getNewsSummary } from '../../server/news.js'
Page({
  data: {
    infos:[{
      titleText: '发布规则',
      isHasMore: true,
      entData: [{
        image: '/images/sqff.png',
        title: '社区党务发布规则',
        text: '2019年10月20日'
      },
        {
          image: '/images/sqfw.png',
          title: '社区财务发布规则',
          text: '2019年10月18日'
        }],
    },
      {
        titleText: '社区党务',
        isHasMore: true,
        entData: [{
          image: '/images/sqss.png',
          title: '红山社区党支部被评选为优…',
          text: '2019年10月18日'
        },
          {
            image: '/images/smrz.png',
            title: '红山社区党支部被评选为优…',
            text: '2019年10月18日'
          }]
    },
   ]
  },

  onLoad: function () {

  },
  onShow: function () {
    this.getNewsSummary()
  },
  methods: {
    
  },
  getNewsSummary: async function(){
    let params={
      newsType:'SHEWU_NEWS'
    }
    try{
      let { code, data } = await getNewsSummary(params);
    }catch(e){}
  }
})
