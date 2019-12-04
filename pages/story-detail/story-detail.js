// pages/story-detail/story-detail.js
import { getNewsDetail,commentList,comment } from '../../server/news.js'
import wxTools from "../../utils/wxTools.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null,
    page:1,
    finish:false,
    data:{},
    infos:[],
    newsComment:'',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({id:options.id})
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
    this.getNewsDetail()
    this.commentList()
  },
  lower(e){
    if(!this.data.finish) this.commentList(this.data.page+1)
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
  async comment(){
    let params={
      // commentImgs:'',
      newsComment:this.data.newsComment,
      newsId:this.data.id
    }
    try {
      let {code,data} = await comment(params)
      console.log(code);
      if(code==0){
        this.commentList(1,true)
        this.setData({newsComment:''})
      }
    } catch (error) {}
  },
  commentList: async function(page=1,isSearch=false){
    this.setData({page})
    let params={
      page:page,
      pageSize:5,
      newsId:this.data.id,
      keyword:""
    }
    try{
      let { code, data } = await commentList(params);
      data.forEach(item=>{
        item.createTime=wxTools.classTimeValidate(item.createTime)
      })
      if(isSearch) this.setData({infos:[],finish:false})
      code==0&&this.setData({infos:[...data,...this.data.infos]})
      data.length==0&&this.setData({finish:true})
    }catch(e){}
  },
  inputCom(e){
    this.setData({newsComment:e.detail.value})
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})