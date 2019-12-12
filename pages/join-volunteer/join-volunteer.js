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
    islower:false,
    index: null,
    CategoryList: [{ id: "", name: "全部" }],
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
    this.getNewsPage(params,false);
    this.getCategoryList({
      typeCode: 'ZHIYUAN_ZHAOMU'
    });
  },

  getNewsPage: async function (params, islower) {
    const { infos }= this.data;
    try {
     const res = await getNewsPage(params);
      res.data.forEach((item) => {
        console.log(1111, Math.ceil(item.attendNum / item.quota)) 
        item.rate = Math.round((item.attendNum / item.quota*100))
      })
      console.log(1111, res.data) 
      islower?this.setData({
        infos: [...infos, ...res.data] 
      }) : this.setData({
          infos: res.data
      })
     
    } catch (e) {}
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
    params.page = 1;
    this.setData({
      searchV: e.detail.value,
      params,
    })
    this.timer && clearTimeout(this.timer);
    this.timer = setTimeout(function() {
      _this.getNewsPage(params, false);
    }, 1000)

  },
  myjoin(e) {
    if (!this.data.canAttend) {
      return false;
    }
    this.attend({
      newsId: e.target.dataset.id
    });
  },
  async attend(params) {
    try {
      let res = await attend(params);
      if (res.code == 0){
        wx.navigateTo({
          url: '/pages/zyz-join-success/zyz-join-success'
        })
      }
     
    } catch (e) {
    }
  },

  //获取板块
  async getCategoryList(params) {
    try {
      let CategoryList = this.data.CategoryList;
      let res = await getCategoryList(params);
      CategoryList = [...CategoryList,...res.data];
      this.setData({
        CategoryList
      })
    } catch (e) {
    }
  },

  bindPickerChange(e) {
    let {params,index} = this.data;
    params.page = 1;
    params.category = this.data.CategoryList[e.detail.value].id;
    this.setData({
      params,
      index: e.detail.value,
    })
    this.getNewsPage(params,false);
  },

  //上拉翻页
  onReachBottom: function() {
    let { params } = this.data;
    params.page = this.data.page + 1;
    // 最后一页了，取消下拉功能
    if (this.data.isLastPage) {
      return
    }
    this.setData({
      page: this.data.page + 1,
    });
    this.getNewsPage(params, true);
  },
  noCanJoin(){
    let { params } = this.data;
    params.page = 1;
    params.canAttend = false ;
    this.setData({
      canAttend: false,
      params,
    })
    this.getNewsPage(params,false);
  },
  canJoin(){
    let { params } = this.data;
    params.canAttend = true;
    params.page = 1;
    this.setData({
      canAttend:true,
      params,
    })
    this.getNewsPage(params,false);
  },
  gotoDetail(e){
    const info = e.currentTarget.dataset.info;
    console.log(e)
    wx.navigateTo({
      url: '/pages/detailCom/index?id=' + info.id + '&navTitle=' + info.typeCode_str+'详情'
    })
  }
})