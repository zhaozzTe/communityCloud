//index.js
//获取应用实例
const app = getApp()
import { getNewsSummary } from '../../server/news.js'
Page({
  data: {
    menuList: [{
      src: '/images/ssgz.png',
      label: '展示规则',
      url: '/pages/comNews/index',
      // url: '/pages/elegant-rule/elegant-rule',
      params:{
        type:'ZHANSHI_GUIZE'
      }
    }, {
      src: '/images/tjxx.png',
        label: '团建信息',
        url: '/pages/comNews/index',
        // url: '/pages/elegant-tj-info/elegant-tj-info',
        params:{
          type:'TUANJIAN_XINXI'
        }
    },
    {
      src: '/images/hdzs.png',
      label: '活动展示',
      url: '/pages/comNews/index',
      // url: '/pages/elegant-hdzs/elegant-hdzs',
      params:{
        type:'HUODONG_ZHANSHI'
      }
    },
    {
      src: '/images/cyzs.png',
      label: '才艺展示',
      url: '/pages/comNews/index',
      params:{
        type:'CAIYI_ZHANSHI'
      }
    }, {
      src: '/images/mtfb.png',
      label: '媒体发布',
      url: '/pages/comNews/index',
      params:{
        type:'MEITI_FABU'
      }
    },
    ],
    infos: []
  },

  onLoad: function () {
    this.getNewsSummary()
  },
  onShow: function () {
   
  },
  getNewsSummary: async function(){
    let params={
      newsType:'FENGCAI_NEWS'
    }
    try{
      let { code, data } = await getNewsSummary(params);
      console.log(55555,data)
      code==0&&this.setData({infos:data})
    }catch(e){}
  }

})
