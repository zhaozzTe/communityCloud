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
    infos: [],
    finish:false
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
    this.setData({infos:[],finish:false})
    this.getNewsPage()
  },
  lower(e){
    if(!this.data.finish) this.getNewsPage(this.data.page+1)
  },
  getNewsPage: async function(page=1,isSearch=false){
    this.setData({page})
    let params={
      page:page,
      pageSize:5,
      typeCode:this.data.type,
      keyword:this.data.searchV
    }
    try{
      let { code, data } = await getNewsPage(params);
      if(isSearch) this.setData({infos:[]})
      code==0&&this.setData({infos:[...data,...this.data.infos]})
      data.length==0&&this.setData({finish:true})
    }catch(e){}
  },
  getFocus: function (e) {
    this.setData({
      isHideSearchIcon: true
    })

  },
  bindReplaceInput: function (e) {
    this.setData({
      searchV: e.detail.value
    })
    this.getNewsPage(1,true)
  }
})