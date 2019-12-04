import { getNewsPage  } from '../../server/news.js'
import { attend, getCategoryList} from '../../server/common.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:null,
    CategoryList:[],
    type: '',
    searchV: '',
    page: 1,
    isHideSearchIcon: false,
    infos: [],
    finish: false
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
    this.setData({ infos: [], finish: false })
    this.getNewsPage();
    this.getCategoryList({
      typeCode:'ZHIYUAN_ZHAOMU'
  });
  },

  getNewsPage: async function (page = 1, isSearch = false) {
    this.setData({ page })
    let params = {
      page: page,
      pageSize: 5,
      typeCode: 'ZHIYUAN_ZHAOMU',
      keyword: this.data.searchV
    }
    try {
      let { code, data } = await getNewsPage(params);
      if (isSearch) this.setData({ infos: [], finish: false })
      code == 0 && this.setData({ infos: [...data, ...this.data.infos] })
      data.length == 0 && this.setData({ finish: true })
    } catch (e) { }
  },

  lower(e) {
    console.log(111111);
    if (!this.data.finish) this.getNewsPage(this.data.page + 1)
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
    this.getNewsPage(1, true)
  },
  myjoin(e) {
    console.log(445445545,e);
    this.attend({ id:e.target.dataset.id });
  },
  async attend(params) {
    try {
      let res = await attend(params);
      console.log('6666666', res)
      wx.navigateTo({
        url: '/pages/mySay-success/mySay-success',
      })
    } catch (e) { console.log(9999, e)}
  },

  //获取板块
  async getCategoryList(params) {
    try {
      let res = await getCategoryList(params);
      this.setData({
        CategoryList: res.data
      })
      console.log('getCategoryList', res)
    } catch (e) { console.log(9999, e) }
  },

})