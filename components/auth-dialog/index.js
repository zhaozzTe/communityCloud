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
              if (res.code == 0) {
                wx.setStorageSync("token",res.data.token)
                  wx.navigateTo({ url:'/page/login-wx/login-wx'})
              }else{
                wx.navigateTo({ url: '/page/authen/index' })
              }
            }catch(e){}
          }
        }
      })
    },
  }
})
