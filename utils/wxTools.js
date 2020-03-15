/**
 * 定位
 */
import { getUserStatus } from '../server/common.js'
const checkAuth=async ()=>{
  let auth=false;
  try {
    let {code,data} = await getUserStatus()
    if (code == 0) {
      if (data && data.token) wx.setStorageSync("token",data.token)
      if(data.status==0){//未实名认证,需要引导用户到注册页面
        wx.navigateTo({ url: '/pages/authen/index' })
      }else if(data.status==1){//实名认证信息待审核
        wx.redirectTo({ url: '/pages/login-waite/login-waite' })
      }else if(data.status==2){//实名认证通过
        auth = true
      }else if(data.status==-1){//实名认证未通过
        wx.navigateTo({ url: '/pages/authen/index' })
      }else if(data.status==-2){//未获取手机号
        wx.navigateTo({ url: '/pages/login-wx/login-wx' })
      }
    }
  } catch (e) {

  }finally{
    return auth
  }
}
const location = () => {
  wx.getLocation({
    type: 'wgs84',
    complete: function(res) {
      if (res.latitude && res.longitude) {
        getApp().globalData.location.latitude = res.latitude;
        getApp().globalData.location.longitude = res.longitude;
      }
    },
  });
}
const checkVisitor = () => {
  let isVisitor=getApp().globalData.isVisitor;
  if(isVisitor){
    wx.showModal({
      title: '提示',
      content: '请您使用真实身份参与功能体验',
      success (res) {
        if (res.confirm) {
          wx.navigateTo({ url: '/pages/login-wx/login-wx' })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
  return isVisitor
}

/**
 * 查看是否授权,获取微信用户信息
 */
const userInfo = () => {
  // 查看是否授权
  wx.getSetting({
    success(res) {

      console.log('6666getSetting值', res)
      if (res.authSetting['scope.userInfo']) {
        // 已经授权,先获取用户登录凭证（有效期五分钟）
        wx.login({
          success(res) {
           
            if (res.code) {
              console.log('77777code值', res)
              //设置缓存数据(用户登录凭证)
              getApp().globalData.wxCode = res.code;
              //调用 getUserInfo ,获取用户信息
              wx.getUserInfo({
                success(res) {
                  console.log('8888getUserInfo值', res)
                  //设置缓存数据(微信用户信息)
                  getApp().globalData.wxUserInfo = res;
                }
              })
            } else {
              getApp().Toast('网络异常', 2);
            }
          }
        });
      } else {
        getApp().Toast('网络异常', 2);
      }
    },
    fail(res) {
      getApp().Toast('网络异常', 2);
    }
  });
}
/*获取当前页url*/
function getCurrentPageUrl() {
  var pages = getCurrentPages()    //获取加载的页面
  var currentPage = pages[pages.length - 1]    //获取当前页面的对象
  var url = currentPage.route    //当前页面url
  return url
}
/**
 * 跳转到下一页
 * 
 * WxTools.navigateBackTo(getCurrentPages(), 'pages/login-wx/login-wx');
 */
const navigateBackTo = (stack, pageUrl) => {
  let _pageCounts = stack.length;
  let _index = 0;
  stack.map((_pageObj, index) => {
    if (_pageObj.route.indexOf(pageUrl) != -1) {
      _index = index;
    }
  });
  console.log('--navigateBackTo--', _pageCounts - _index);
  return function pageBack() {
    wx.navigateBack({
      delta: _pageCounts - _index - 1
    });
  }
}
function validate(obj={}){
  let r = true
  for(let item in obj){
    if (obj[item] === '' || obj[item] === null || obj[item] === undefined){
      r= false
      break
    }
  }
  return r
}
let _offsetTops=[];
function canLoad(e) {
    _offsetTops=[..._offsetTops, e.target.offsetTop]
  let r = false, len = _offsetTops.length
  if (_offsetTops.length == 1) return true
  if (_offsetTops[len - 2] == e.target.offsetTop) {
    r = false
  } else {
    r = true
    _offsetTops=[]
  }
  return r
}
const classTimeValidate= function (e) {
  let date = new Date(e);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear()
  let M = date.getMonth() + 1
  let D = date.getDate()

  let h = date.getHours();
  let m = date.getMinutes();

  let date1 = new Date();
  let Y1 = date1.getFullYear()
  let M1 = date1.getMonth() + 1
  let D1 = date1.getDate()

  let h1 = date1.getHours();
  let m1 = date1.getMinutes();
  // console.log(D1)
  if(D==D1){
  // console.log(123)
  let temp = h1-h
  if(temp==0){
      return '刚刚'
  }else{
      return temp + '小时前'
  }
  }else if(D1-D==1){
  return '昨天'
  }else{
  return Y + '年' + M + '月' + D + '日' + ' ' + h + ':' + m
  }
}
export default {
  location, // 定位 
  userInfo, // 用户信息
  navigateBackTo, // 返回到指定页面
  getCurrentPageUrl,
  validate,
  checkAuth,
  canLoad,
  classTimeValidate,
  checkVisitor
}