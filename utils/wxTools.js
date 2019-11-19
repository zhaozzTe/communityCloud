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

      console.log(7777777777777, res)
      if (res.authSetting['scope.userInfo']) {
        // 已经授权,先获取用户登录凭证（有效期五分钟）
        wx.login({
          success(res) {
           
            if (res.code) {
              console.log(8888, res.code)
              //设置缓存数据(用户登录凭证)
              getApp().globalData.wxCode = res.code;
              //调用 getUserInfo ,获取用户信息
              wx.getUserInfo({
                success(res) {
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

export default {
  location, // 定位 
  userInfo, // 用户信息
  navigateBackTo, // 返回到指定页面
}