// pages/publichHall-liveService/publichHall-liveService.js
import { getNewsPage } from '../../server/news.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'',
    searchV: '',
    page:1,
    isHideSearchIcon: false,
    infos: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({type:options.type})
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.setData({infos:[]})
    this.getNewsPage()
  },
  lower(e){
    this.getNewsPage(this.data.page+1)
  },
  getNewsPage: async function(page=1){
    this.setData({page})
    let params={
      page:page,
      pageSize:5,
      typeCode:this.data.type,
      keyword:this.data.searchV
    }
    try{
      let { code, data } = await getNewsPage(params);
      code==0&&this.setData({infos:[...data,...this.data.infos]})
    }catch(e){}
  },
  getFocus: function (e) {
    this.setData({
      isHideSearchIcon: true
    })

  },
  bindReplaceInput: function (e) {
    console.log(e.detail.value)
    this.setData({
      searchV: e.detail.value
    })
  }
})