// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  upload() {
    wx.chooseMessageFile({
      count: 1,
      type: "file",
      success: (res) => {
        let path = res.tempFiles[0].path
        console.log("选择excel成功",path)
        this.uploadExcel(path)
      }
    })
  },
  uploadExcel(path) {
    wx.showLoading({
      title: '上传中……',
    })
    // wx.showToast({
    //     icon: 'none',
    //     title: '上传中……'
    // })
    wx.cloud.uploadFile({
      cloudPath: new Date().getTime()+".xls",
      filePath: path,
      success: (res) => {
        this.jiexi(res.fileID)
        console.log("上传成功",res.fileID)
      },
      fail:err => {
        console.log("上传失败",err)
      }
    })
  },
  jiexi(fileId) {
    wx.cloud.callFunction({
      name: "excel",
      data: {fileID:fileId},
      success: (res) => {
        wx.hideLoading()
        wx.showToast({
          icon: 'success',
          title: '解析并上传成功'
        })
        wx.cloud.deleteFile({
          fileList:[fileId]
        })
        console.log("解析并上传成功",res)
      },
      fail:err => {
        wx.hideLoading()
        wx.showToast({
          icon: 'error',
          title: '解析失败'
        })
        console.log("解析失败",err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '龙飞数据',
      path: 'pages/splash/splash',
    }
  }
})