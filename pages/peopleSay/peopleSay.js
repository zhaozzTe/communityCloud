//index.js
//获取应用实例
const app = getApp()
import { getNewsSummary } from '../../server/news.js'
Page({
  data: {
    navTitle:'居民说事厅',
    meuns:[{
      src:'/images/ssgz.png',
      label:'说事规则',
      // url: '/pages/peopleSay-rule/peopleSay-rule',
      url: '/pages/comNews/index',
      params:{
        type:'SHUOSHI_RULE'
      }
    }, {
        src:'/images/lyss.png',
        label: '网格说事',
        // url: '/pages/comNews/index',
        url: '/pages/peopleSay-story/peopleSay-story',
        params:{
          type:'LOUYU_SHUOSHI'
        }
      },
      {
        src:'/images/xqss.png',
        label: '小区说事',
        url: '/pages/house-story/house-story',
        params:{
          type:'XIAOQU_SHUOSHI'
        }
      },
      {
        src:'/images/qyss2.png',
        label: '社区说事',
        url: '/pages/house-story/house-story',
        params:{
          type:'SHEQU_SHUOSHI'
        }
      }, 
      // {
      //   src:'/images/qyss.png',
      //   label: '区域说事',
      //   url: '/pages/house-story/house-story',
      //   params:{
      //     type:'QUYU_SHUOSHI'
      //   }
      // },
      ],
    infos: [],
    
  },

  onLoad: function () {

  },
  onShow: function () {
    this.getNewsSummary()
  },
  cy(e){
    let index = e.currentTarget.dataset.index;
    let inde = e.currentTarget.dataset.inde;
    let type = e.detail;
    if(type){
      let infos=this.data.infos;
      infos[index][inde].hasAttend=true
      infos[index][inde].attendNum+=1
      this.setData({infos})
    }
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
