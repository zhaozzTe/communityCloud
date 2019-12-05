// pages/my-say/my-say.js
import { getServerType, addServer, uploadimg} from '../../server/common.js'
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
    index:null,
    servertypes:[],
    startime: '',
    endtime: '',
    times: [{
      name: '1', value:'当前时间',
    },
      {
        name: '2', value: '随时',
      },
    ]
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
    this.getServerTypes()
  },
  toHistory(){
    wx.navigateTo({
      url: '/pages/service-history/index'
    })
  },
  async getServerTypes() {
    
    try {
      let res = await getServerType()
      this.setData({
        servertypes:res.data
  },)
      console.log('55555', res)
    } catch (e) { console.log('88888', res)}
  },

  bindPickerChange: function (e) {
    const index = e.detail.value;
    console.log(345645654, e.detail.value)
    this.setData({
      index: e.detail.value,
      typeCode: this.data.servertypes[index].id
    })
  },
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startime: e.detail.value
    })
  },
  bindTimeChangeend:function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endtime: e.detail.value
    })
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
            } else{
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

  async addserver(params) {
    try {
      let res = await addServer(params);
      if(code==0){
        wx.navigateTo({
          url: '/pages/issue-success/issue-success',
      })

      }
    } catch (e) { }
  },

  delImg(e) {
    const type = e.currentTarget.dataset.uptype;
    let { uploadfile1, uploadfile2, uploadfile3, uploadfile } = this.data;
    if (type == '1'){
      uploadfile1=[]
    }else if (type == '2') {
      uploadfile2 = []
    } 
    else {
      uploadfile3 = []
    }
    this.setData({
      uploadfile1,
      uploadfile2,
      uploadfile3,
    }) 
  },

  formSubmit(e) {
    let { uploadfile1, uploadfile2, uploadfile3 } = this.data;
    let params = e.detail.value ;
    params.imgs = [...uploadfile1,...uploadfile2, ...uploadfile3];
    if (!params.typeCode) { 
      this.toast('请选择服务类别');
      return false;
    } else if (!params.name) {
      this.toast('请输入服务名称');
      return false;
    } else if (!params.desc) {
      this.toast('请输入服务详细内容');
      return false;
    }
    else if (!params.type) {
      this.toast('请选择服务时间');
      return false;
    }
    else if (!params.startTime) {
      this.toast('请选择指定开始时间');
      return false;
    } else if (!params.endTime) {
      this.toast('请选择指定结束时间');
      return false;
    } 
    console.log(121321, params)
    this.addserver(params);
    
  },

  toast(title) {
    wx.showToast({
      title: title,
      duration: 2000,
      icon:'none'
    })
  }

})