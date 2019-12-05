import {
  getNewsPage
} from '../../server/news.js'
import {
  attend,
  getCategoryList
} from '../../server/common.js'
Page({

  /**
   * 页面的初始数据
   */
  timer: null,
  data: {
    index: null,
    CategoryList: [],
    type: '',
    searchV: '',
    page: 1,
    isHideSearchIcon: false,
    infos: [],
    finish: false,
    isLastPage: false,
    pageSize: 5,
    canAttend: true,
    keyword: '',
    category: '',
    typeCode: 'ZHIYUAN_ZHAOMU'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示 
   */
  onShow: function() {
    const {
      page,
      pageSize,
      canAttend,
      keyword,
      category,
      typeCode
    } = this.data;
    const params = {
      page,
      pageSize,
      canAttend,
      typeCode,
      category,
      keyword
    }
    this.setData({
      params
    })
    this.getNewsPage(params);
    this.getCategoryList({
      typeCode: 'ZHIYUAN_ZHAOMU'
    });
  },

  getNewsPage: async function(params) {
    try {
     const res = await getNewsPage(params);
      this.setData({
        infos: res.data
      })
     
    } catch (e) {}
  },

  lower(e) {
    console.log(111111);
    if (!this.data.finish) this.getNewsPage(this.data.page + 1)
  },
  getFocus: function(e) {
    this.setData({
      isHideSearchIcon: true
    })

  },
  bindReplaceInput: function(e) {
    let params = this.data.params;
    const _this = this;
    params.keyword = e.detail.value;
    this.setData({
      searchV: e.detail.value,
      params
    })
    this.timer && clearTimeout(this.timer);
    this.timer = setTimeout(function() {
      _this.getNewsPage(params);
    }, 1000)

  },
  myjoin(e) {
    console.log(445445545, e);
    this.attend({
      id: e.target.dataset.id
    });
  },
  async attend(params) {
    try {
      let res = await attend(params);
      console.log('6666666', res)
      wx.navigateTo({
        url: '/pages/mySay-success/mySay-success',
      })
    } catch (e) {
      console.log(9999, e)
    }
  },

  //获取板块
  async getCategoryList(params) {
    try {
      let res = await getCategoryList(params);
      this.setData({
        CategoryList: res.data
      })
      console.log('getCategoryList', res)
    } catch (e) {
      console.log(9999, e)
    }
  },

  bindPickerChange(e) {
    let {params,index} = this.data;
    params.category = this.data.CategoryList[e.detail.value].id;
    this.setData({
      params,
      index: e.detail.value,
      // typeCode: this.data.CategoryList[index].id
    })
    this.getNewsPage(params);
  },

  //上拉翻页
  onReachBottom: function() {
    // 最后一页了，取消下拉功能
    if (this.data.isLastPage) {
      return
    }
    this.setData({
      page: this.data.page + 1
    });

  },
  noCanJoin(){
    let { params } = this.data;
    params.canAttend = false ;
    this.setData({
      canAttend: false,
      params,
    })
    this.getNewsPage(params);
  },
  canJoin(){
    let { params } = this.data;
    params.canAttend = true;
    this.setData({
      canAttend:true,
      params,
    })
    this.getNewsPage(params);
  }

})