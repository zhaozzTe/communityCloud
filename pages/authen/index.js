/*
 * @Author: your name
 * @Date: 2019-11-17 10:51:06
 * @LastEditTime: 2019-11-25 23:28:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \communityCloud\pages\authen\index.js
 */
let that =getApp()
import WxTools from "../../utils/wxTools.js";
import { getAddress, submitCertificate, getMobileCode } from '../../server/authen.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    initaddress:'宁波市镇海区庄市街道同心湖社区',
    address: [
      // { name: '0', value: '宁波市镇海区庄市街道同心湖社区',checked: 'true' },
      { name: '合生国际城', value: '合生国际城',  },
      { name: '拉菲庄园', value: '拉菲庄园' },
    ],
    addressv:'',
    sexFontName:'icongender',
    nameFontName:'iconname',
    locationFontName:'iconlocation',
    phoneFontName:'iconcellnumber',
    yzmFontName: 'iconverification-code',
    index:"",
    isCheck:0,
    tel:'',
    idCard:'',
    hasGet:false,
    yzmText:'获取验证码',
    sexArr:[
      {
        id:"",
        name:'请选择'
      },
      {
        id:1,
        name:'男'
      },
      {
        id:0,
        name:'女'
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
    this.getAddress()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  telInput: function (e) {
    this.setData({
      tel: e.detail.value
    })
  },
  idInput: function (e) {
    this.setData({
      idCard: e.detail.value
    })
  },
  onShow: function () {
    WxTools.userInfo();
  },
  async getYZM(){
    let telreg=/^[1][3,4,5,7,8][0-9]{9}$/; 
    if(telreg.test(this.data.tel) === false){  
      that.Toast('请输入正确的手机号')
        return  false;  
    } 
    let params={
      mobile: this.data.tel
    }
    let res = await getMobileCode(params)
    const { data, code } = res
    if(code==0){
      if (this.data.hasGet) return
      this.setData({ hasGet: true })
      let time = 60;
      let timer = setInterval(() => {
        if (time == 1) {
          this.setData({ hasGet: false })
          clearInterval(timer);
        }
        time--;
        if (time == 0) {
          this.setData({ yzmText: '获取验证码' })
        } else {
          this.setData({ yzmText: `重新发送(${time})` })
        }
      }, 1000)
    }
  },
  async getAddress(){
    let res = await getAddress()
    const {data,code}=res
    if(code==0&&data){
      this.setData(
        {
          address: data
        }
      )
    }
  },
  bindPickerChange(e)
  {
    this.setData(
      {
        index: e.detail.value
      })
  
  },
  checkboxChange(e) {
    this.setData({
      addressv: e.detail.value
    })
  },
  readChange(e) {
    this.setData({
      isCheck: e.detail.value[0]||0
    })
  },
  async formSubmit(e) {
    let telreg = /^[1][3,4,5,7,8][0-9]{9}$/; 
    let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
    let params = e.detail.value;
    params.address = this.data.addressv.toString();
    if (!WxTools.validate(params)){
      that.Toast('请填写完整')
      return false;  
    }
    if (this.cardNum && reg.test(params.idCard) === false) {
      that.Toast('请输入合法的身份证号码')
      return false;
    }
    if (telreg.test(params.mobile) === false) {
      that.Toast('请输入正确的手机号')
      return false;
    }  
    if (!this.data.isCheck){
      that.Toast('请阅读并同意实名认证协议')
      return false;  
    }
    let res = await submitCertificate(params)
    if(res&&res.code==0){
      wx.redirectTo({
        url: '/pages/index/index',
      })
    }
  },

    

})