// pages/detailCom/index.js
import { getNewsDetail } from '../../server/news.js'
import {
  attend,
  getCategoryList
} from '../../server/common.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canAttend: true,
    navTitle:'',
    id:null,
    data:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({id:options.id,navTitle:decodeURI(options.navTitle)})
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
    this.getNewsDetail()
  },
  async getNewsDetail(){
    try {
      let {code,data} = await getNewsDetail({id:this.data.id})
      data.content = data.content
          .replace(/<p([\s\w"=\/\.:;]+)((?:(style="[^"]+")))/ig, '<p')
          .replace(/<p([\s\w"=\/\.:;]+)((?:(class="[^"]+")))/ig, '<p')
          .replace(/<p>/ig, '<p class="p_class">')

          .replace(/<img([\s\w"-=\/\.:;]+)((?:(height="[^"]+")))/ig, '<img$1')
          .replace(/<img([\s\w"-=\/\.:;]+)((?:(width="[^"]+")))/ig, '<img$1')
          .replace(/<img([\s\w"-=\/\.:;]+)((?:(style="[^"]+")))/ig, '<img$1')
          .replace(/<img([\s\w"-=\/\.:;]+)((?:(alt="[^"]+")))/ig, '<img$1')
          .replace(/<img([\s\w"-=\/\.:;]+)/ig, '<img$1 class="pho"')
          
      code==0&&this.setData({data})
    } catch (error) {}
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

  myjoin(e) {
    if (!this.data.data.hasAttend) {
      return false;
    }
    this.attend({
      newsId: this.data.id
    });
  },
  async attend(params) {
    try {
      let res = await attend(params);
      if (res.code == 0) {
        wx.navigateTo({
          url: '/pages/zyz-join-success/zyz-join-success'
        })
      }

    } catch (e) {
      console.log(9999, e)
    }
  },
})