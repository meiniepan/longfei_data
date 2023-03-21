// pages/home/home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {},

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

    queryId() {
        wx.navigateTo({
            url: '/pages/query/query',
        })
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
    checkInfo(){
        wx.navigateTo({
            url: `/pages/table/table`,
        });
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})