import wxTools from "../../utils/wxTools.js"
import { attend } from '../../server/common.js'
Component({
  /**
   * 组件的属性列表
   */
  onShow: function () {
    console.log(1,this);
  },
  properties: {
    datas:{
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    load(e){
      let can = wxTools.canLoad(e)
      this.triggerEvent('load', can)//通过triggerEvent将参数传给父组件,是否可以重新下拉加载
    },
    async join(e) {
      let params={
        newsId:this.data.datas.id
      }
      try {
        let {code}=await attend(params)
        if(code==0){
          const url = e.currentTarget.dataset.item.url;
          wx.navigateTo({
            url,
          })
        }
      } catch (error) {}
    }
  }
})
