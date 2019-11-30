//index.js
//获取应用实例
const app = getApp()
import { getNewsSummary } from '../../server/news.js'
Page({
  data: {
    infos:[],
    menuList:[
      {
        src: '/images/tab1.png',
        label: '发布规则',
        url: '/pages/comNews/index',
        params:{
          type:'SHEWU_RULE'
        }
      },
      {
        src: '/images/tab4.png',
        label: '社区党务',
        url: '/pages/comNews/index',
        params:{
          type:'SHEWU_DANGWU'
        }
      },
      {
        src: '/images/tab5.png',
        label: '社区居务',
        url: '/pages/comNews/index',
        params:{
          type:'SHEQU_JUWU'
        }
      },
      {
        src: '/images/tab2.png',
        label: '社区财务',
        url: '/pages/comNews/index',
        params:{
          type:'SHEQU_CAIWU'
        }
      },
      {
        src: '/images/tab3.png',
        label: '社区动态',
        url: '/pages/comNews/index',
        params:{
          type:'SHEQU_DONGTAI'
        }
      },
      {
        src: '/images/tab6.png',
        label: '科普教育',
        url: '/pages/comNews/index',
        params:{
          type:'KEPU_JIAOYU'
        }
      },
    ],
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
      code==0&&this.setData({infos:data})
    }catch(e){}
  }
})
