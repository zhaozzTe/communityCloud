// pages/my-say/my-say.js
import {
  getRequiresDetail,
  getServerType
} from '../../server/common.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    servertypes: [],
    imgs: [],
    times: {
      '1': '当前时间',
      '2': '随时',
    },
    detailData: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    const id = options.id;
    const params = {
      id
    }
    this.getRequiresDetail(params);
    this.getServerTypes();
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

  },
  async getServerTypes() {
    let obj = {
    } ;
    try {
      let res = await getServerType();
      res.data.forEach(item => {
        obj[item.id] = item.name
      })
      console.log(3333, obj)
      this.setData({
        servertypes: obj
      })
    } catch (e) {}
  },

  async getRequiresDetail(params) {
    try {
      let res = await getRequiresDetail(params);
      console.log(6666, res.data.imgUrl.split(","))
      this.setData({
        detailData: res.data,
        imgs: res.data.imgUrl ? res.data.imgUrl.split(",") :[],
      })
    } catch (e) {}
  },

})