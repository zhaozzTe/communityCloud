//index.js
//获取应用实例
const app = getApp()
import { getNewsSummary } from '../../server/news.js'
Page({
  data: {
    menuList: [{
      src: '/images/fwgz.png',
      label: '服务规则',
      url: '/pages/comNews/index',
      // url: '/pages/Livelihood-service-rule/Livelihood-service-rule',
      params:{
        type:'FUWU_RULE'
      }
    }, {
      src: '/images/fwtd.png',
        label: '服务团队',
        url: '/pages/comNews/index',
        // url: '/pages/Livelihood-service-tream/Livelihood-service-tream',
        params:{
          type:'FUWU_TUANDUI'
        }
    },
    {
      src: '/images/fwxq.png',
      label: '服务需求',
      url: '/pages/server-sumbit/server-sumbit',
      params:{
        type:'FUWU_XUQIU'
      }
    },
    {
      src: '/images/flag2.png',
      label: '志愿招募',
      url: '/pages/join-volunteer/join-volunteer',
      params:{
        type:'ZHIYUAN_ZHAOMU'
      }
    }, {
      src: '/images/sgyd.png',
      label: '社工应答',
      // url: '/pages/comNews/index',
      url: '/pages/social-worker/social-worker',
      params:{
        type:'SHEGONG_YINGDA'
      }
    },
    ],
    infos: [],
  },

  onLoad: function () {

  },
  onShow: function () {
    this.getNewsSummary()
  },
  getNewsSummary: async function(){
    let params={
      newsType:'MINSHENG_NEWS'
    }
    try{
      let { code, data } = await getNewsSummary(params);
      code==0&&this.setData({infos:data})
    }catch(e){}
  }
})
