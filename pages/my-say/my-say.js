import { submitnews } from '../../server/common.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs: [],
    uploadfile: [],
    uploadfile1: [],
    uploadfile2: [],
    uploadfile3: [],
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

  },
  //上传图片
  updateimg(e) {
    const type = e.currentTarget.dataset.uptype;
    let { uploadfile1, uploadfile2, uploadfile3 } = this.data;
    const that = this;
    // let uploadfile = this.data.uploadfile;
    let imgs = this.data.imgs;
    console.log(99999, e.currentTarget.dataset.uptype);
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths
        const tempFile = res.tempFiles;
        wx.uploadFile({
          url: 'http://one-tech.cn:88/zh/api/v1/requires/upload/image', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            "content-type": 'application/json',
            "Authorization": wx.getStorageSync('token'),
          },
          formData: {
            'file': tempFilePaths[0]
          },
          success(res) {
            const imgpath = res.data;
            if (type == '1') {
              uploadfile1.push(imgpath);
            }
            else if (type == '2') {
              uploadfile2.push(imgpath);
            } else {
              uploadfile3.push(imgpath);
            }
            // uploadfile.push(imgpath);
            // imgs.push({ type, imgUrl: imgpath});
            that.setData({
              uploadfile1,
              uploadfile2,
              uploadfile3,
              imgs
            })
          }
        })
      }
    })
  },
  formSubmit(e) {
    let { uploadfile1, uploadfile2, uploadfile3 } = this.data;
    let params = e.detail.value;
    params.imgs = [...uploadfile1, ...uploadfile2, ...uploadfile3];
    if (!params.title) {
      this.toast('请输入议题名称');
      return false;
    } else if (!params.content) {
      this.toast('请输入议题详细内容');
      return false;
    } 
    console.log(121321, params)
    this.submitnews(params);
  },

  async submitnews(params) {
    try {
      let res = await submitnews(params);
      console.log('6666666', res)
      wx.navigateTo({
        url: '/pages/mySay-success/mySay-success',
      })
    } catch (e) { }
  },

  toast(title) {
    wx.showToast({
      title: title,
      duration: 2000,
      icon: 'none'
    })
  }

})