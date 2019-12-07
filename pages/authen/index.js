/*
 * @Author: your name
 * @Date: 2019-11-17 10:51:06
 * @LastEditTime: 2019-12-07 15:48:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \communityCloud\pages\authen\index.js
 */
let that =getApp()
import WxTools from "../../utils/wxTools.js";
import { submitCertificate, getMobileCode,getStreetList,getCommunity,getVillageList } from '../../server/authen.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasTap:false,
    initaddress:'宁波市镇海区庄市街道同心湖社区',
    address:'',
    multiIndex: [0, 0, 0],
    multiArray:[],
    villageList:[],
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
    this.getStreetList()
  },
  async getYZM(){
    let telreg=/^[1][3,4,5,7,8][0-9]{9}$/; 
    if(telreg.test(this.data.tel) === false){  
      that.Toast('请输入正确的手机号')
        return  false;  
    } 
    if(this.data.hasTap) return
      this.setData({hasTap:true})
    let params={
      mobile: this.data.tel
    }
    let res = await getMobileCode(params)
    try {
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
      this.setData({hasTap:false})
    } catch (error) {
      this.setData({hasTap:false})
    }
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    let multiArray=this.data.multiArray
    let multiIndex=this.data.multiIndex

    multiIndex[e.detail.column] = e.detail.value
    let c0=multiArray[0][multiIndex[0]].name
    let c1=multiArray[1][multiIndex[1]].name
    if(e.detail.column==0){
      multiIndex[1]=0
      multiIndex[2]=0
      this.getCommunity(c0,true)
    }else if(e.detail.column==1){
      this.getVillageList(c1)
      multiIndex[2]=0
    }
  },
  
  async getStreetList(){
    let res = await getStreetList()
    const {data,code}=res
    if(code==0&&data){
      let list=[]
      for(let item of data){
        list.push({name:item})
      }
      let multiArray=this.data.multiArray
      multiArray[0]=list
      this.setData({multiArray})
      this.getCommunity(data[0],true)
    }
  },
  async getCommunity(v,init){
    let res = await getCommunity({street:v})
    const {data,code}=res
    if(code==0&&data){
      let list=[]
      for(let item of data){
        list.push({name:item})
      }
      let multiArray=this.data.multiArray
      multiArray[1]=list
      this.setData({multiArray})
      init&&this.getVillageList(data[0])
    }
  },
  async getVillageList(v){
    let res = await getVillageList({community:v})
    const {data,code}=res
    if(code==0&&data){
      this.setData({villageList: data})
      for(let item of data){
        item.name=item.village
      }
      let multiArray=this.data.multiArray
      multiArray[2]=data
      this.setData({multiArray})
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
    let address= this.data.multiArray[2][params.address[2]].id
    params.address = address;
    console.log(2,params);
    
    if (!WxTools.validate(params)){
      that.Toast('请填写完整')
      return false;  
    }
    // if (this.cardNum && reg.test(params.idCard) === false) {
    //   that.Toast('请输入合法的身份证号码')
    //   return false;
    // }
    if (telreg.test(params.mobile) === false) {
      that.Toast('请输入正确的手机号')
      return false;
    }  
    if (!this.data.isCheck){
      that.Toast('请阅读并同意实名认证协议')
      return false;  
    }
    if(this.data.hasTap) return
      this.setData({hasTap:true})
    try {
      let res = await submitCertificate(params)
      if(res&&res.code==0){
        wx.redirectTo({
          url: '/pages/index/index',
        })
      }
      this.setData({hasTap:false})
    } catch (error) {
      this.setData({hasTap:false})
    }
  },

    

})