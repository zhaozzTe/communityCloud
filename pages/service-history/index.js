// pages/service-history/index.js
import { requiresList } from '../../server/common.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    infos: [],
    finish:false,
    searchV:'',
    id:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.setData({infos:[],finish:false})
    this.requiresList()
  },
  lower(e){
    if(!this.data.finish) this.requiresList(this.data.page+1)
  },
  requiresList: async function(page=1,isSearch=false){
    this.setData({page})
    let params={
      page:page,
      pageSize:8,
      newsId:this.data.id,
      keyword:this.data.searchV
    }
    try{
      let { code, data } = await requiresList(params);
      if(isSearch) this.setData({infos:[],finish:false})
      code==0&&this.setData({infos:[...data,...this.data.infos]})
      data.length==0&&this.setData({finish:true})
    }catch(e){}
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

})