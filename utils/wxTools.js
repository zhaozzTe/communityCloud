/**
 * 定位
 */
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
export default {
  location, // 定位 
  userInfo, // 用户信息
  navigateBackTo, // 返回到指定页面
  getCurrentPageUrl,
  validate
}