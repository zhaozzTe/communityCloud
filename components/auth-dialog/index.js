// components/auth-dialog/index.js
let app = getApp();  //获取app.js
import { wxAppLogin} from '../../server/common.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    needAuth:{
      type: Boolean
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    needAuth:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //微信登录
    bindgetuserinfo: function (e) {
      this.triggerEvent('parentEvent', { needAuth: false })
      console.log(e.detail)
      wx.login({
        async success(res) {
          if (res.code) {
            app.globalData.hasUserInfo = true;
            console.log('临时code：', res.code);
            console.log('encryptedData值encryptedData:', e.detail.encryptedData);
            console.log('矢量iv:', e.detail.iv);
            let params={
              "code": res.code,
              "encryptedData": e.detail.encryptedData,
              "iv": e.detail.iv
            }
            try{
              let res = await wxAppLogin(params)
              console.log(res)
              if (res.data && res.data.token) wx.setStorageSync("token",res.data.token)
              if (res.data.status == 0) {
                wx.navigateTo({ url:'/pages/login-wx/login-wx'})
              } else if (res.data.status == -1){
                wx.navigateTo({ url: '/pages/authen/index' })
              } else if (res.data.status == 2){
                // wx.redirectTo({ url: '/pages/index/index' })
              } else if (res.data.status == 1) {
                wx.redirectTo({ url: '/pages/login-waite/login-waite' })
              }else if(res.data.status==-2){//未获取手机号
                wx.navigateTo({ url: '/pages/login-wx/login-wx' })
              }
            }catch(e){}
          }
        }
      })
    },
  }
})
