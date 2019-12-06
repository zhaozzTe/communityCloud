import { getNewsPage,getCategoryText } from '../../server/news.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTitle:'',
    type:'',
    searchV: '',
    page:1,
    isHideSearchIcon: false,
    infos: [],
    finish:false,
    text:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({type:options.type,navTitle:options.navTitle})
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if(this.data.navTitle){
      wx.setNavigationBarTitle({title:this.data.navTitle})
    }
    this.setData({infos:[],finish:false})
    this.getNewsPage()
    this.getCategoryText()
  },
  lower(e){
    if(!this.data.finish) this.getNewsPage(this.data.page+1)
  },
  async getCategoryText(){
    let params={
      typeCode:this.data.type
    }
    try {
      let {code,data}=await getCategoryText(params)
      if(code==0) this.setData({text:data})
    } catch (error) {}
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
      if(isSearch) this.setData({infos:[],finish:false})
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