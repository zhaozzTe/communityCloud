// pages/peopleSay-story/peopleSay-story.js
import { getNewsPage } from '../../server/news.js'
import wxTools from "../../utils/wxTools.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTitle:'',
    type:'',
    searchV: '',
    page:1,
    finish:false,
    infos: [],
    advices: [{
      title: '关于小区广场舞的议题商议',
      joinPeoples: 156,
      replyPeoples: 35,
      url: '/pages/house-story-detail/house-story-detail'
    }    ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({type:options.type,navTitle:decodeURI(options.navTitle)})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
  },
  lower(e){
    if(!this.data.finish) this.getNewsPage(this.data.page+1)
  },
  cy(e){
    let index = e.currentTarget.dataset.index;
    let type = e.detail;
    if(type){
      let infos=this.data.infos;
      infos[index].hasAttend=true
      infos[index].attendNum+=1
      this.setData({infos})
    }
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
  },
  gotoMySay(){
    if(wxTools.checkVisitor()) return
    wx.navigateTo({
      url: `/pages/my-say/my-say?type=${this.data.type}`,
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },


  // gotoMySay() {
  //   console.log(11111)
  //   wx.navigateTo({
  //     url: '/pages/my-say/my-say',
  //   })
  // }
})