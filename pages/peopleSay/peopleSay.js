//index.js
//获取应用实例
const app = getApp()
import { getNewsSummary } from '../../server/news.js'
Page({
  data: {
    meuns:[{
      iconfont:'iconshuoshiguize',
      label:'说事规则',
      // url: '/pages/peopleSay-rule/peopleSay-rule',
      url: '/pages/comNews/index',
      params:{
        type:'SHUOSHI_RULE'
      }
    }, {
      iconfont:'iconlouyushuoshi',
        label: '楼宇说事',
        // url: '/pages/comNews/index',
        url: '/pages/peopleSay-story/peopleSay-story',
        params:{
          type:'LOUYU_SHUOSHI'
        }
      },
      {
        iconfont:'iconxiaoqushuoshi',
        label: '小区说事',
        url: '/pages/house-story/house-story',
        params:{
          type:'XIAOQU_SHUOSHI'
        }
      },
      {
        iconfont:'iconshequshuoshi1',
        label: '社区说事',
        url: '/pages/comNews/index',
        params:{
          type:'SHEQU_SHUOSHI'
        }
      }, {
        iconfont:'iconquyushuoshi',
        label: '区域说事',
        url: '/pages/comNews/index',
        params:{
          type:'QUYU_SHUOSHI'
        }
      },
      ],
    infos: [],

    adviceBoxs: [{
      titleText: '网格说事',
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
        titleText: '网格说事',
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
  onShow: function () {
    this.getNewsSummary()
  },
  getNewsSummary: async function(){
    let params={
      newsType:'JUMIN_NEWS'
    }
    try{
      let { code, data } = await getNewsSummary(params);
      code==0&&this.setData({infos:data})
    }catch(e){}
  }
})
