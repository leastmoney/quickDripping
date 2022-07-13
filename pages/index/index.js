// index.js
// 获取应用实例
const app = getApp()
Page({
  data: {
    //m默认时间
    time: '12:00',
    mlIndex: -1,
    disuIndex: -1,
    showTime: '',
  },
  formSubmit: function (e) {
    if( this.data.time==''||this.data.mlIndex==-1||this.data.disuIndex==-1){
      wx.showToast({
        //弹出的内容 这种可以写很多内容
          title: '请填写完整的参数',
          icon:"none",
          //持续时间
          duration:2000
        })
    }else{
    wx.request({
      url: 'https://www.quickdripping.top/quickDripping/calculateEndTime', //请求接口的url
      method: 'POST', //请求方式
      data: {
        "drippingSpeed": this.data.disuIndex,
        "milliliter": this.data.mlIndex,
        "startTime": this.data.time
      },//请求参数格式为json
      header: {
          'content-type': 'application/json' // 默认值
      },
      complete() {  //请求结束后隐藏 loading 提示框
          wx.hideLoading();
      },
      success: res => {
        console.log(res.data.message)
          this.setData({
              showTime: res.data.message,
          })
      }
  });}
  },
  formReset: function () {
    console.log('form发生了reset事件，')
    this.setData({
      time: '12:00',
      mlIndex: -1,
      disuIndex: -1,
      showTime: '',
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  chooseDisu: function (e) {
    console.log(e.currentTarget.dataset['index']);
    let query = e.currentTarget.dataset['index']
	  // 根据传参键值，获取点击事件传来的image值
    this.setData({
      mlIndex: query
    })
  },
  chooseDisu2: function (e) {
    let query = e.currentTarget.dataset['index']
	  // 根据传参键值，获取点击事件传来的image值
    this.setData({
      disuIndex: query
    })
  },
}
)
