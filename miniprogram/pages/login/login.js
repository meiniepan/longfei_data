// pages/login/login.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        phone: "",
        pwd: "",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },
    doInput: function (e) {
        let type = e.currentTarget.dataset.type;
        let v = e.detail.value
        this.setData({
            [type]: v,
        });
    },

    doLogin() {
        if (this.data.phone.length == 0 || this.data.pwd.length == 0) {
            wx.showToast({
                icon: 'none',
                title: '请完善数据'
            })
            return
        }
        if (this.data.phone == "13546726645" && this.data.pwd == "12345678") {
            wx.setStorageSync("token", "true")
            wx.switchTab({
                url: '/pages/home/home',
            })
        } else {
            wx.showToast({
                icon: 'none',
                title: '账号或密码错误~'
            })
        }
        // if (this.data.loginType == "maker") {
        //   this.login("match_makers", "maker")
        // } else if (this.data.loginType == "manager") {
        //   this.login("account_manager", "manager")
        // }
    },
    login(collectionName, user_type) {
        const db = wx.cloud.database()
        // 查询当前用户所有的 counters
        wx.showLoading({
            title: '加载中',
        })
        db.collection(collectionName).where({
            phone: this.data.phone
        }).get({
            success: res => {
                wx.hideLoading()
                console.log("res", res)
                if (res.data.length > 0) {
                    let pwd = res.data[0].pwd
                    console.log("pwd", pwd)
                    if (pwd == this.data.pwd) {
                        this.setData({
                            showModal: false
                        })
                        wx.setStorageSync("user_type", user_type)
                        wx.setStorageSync("phone", this.data.phone)
                        wx.setStorageSync("maker_info", res.data[0])
                        wx.switchTab({
                            url: '/pages/index/index',
                        })
                        wx.showToast({
                            icon: 'none',
                            title: '登录成功！'
                        })
                    } else {
                        wx.showToast({
                            icon: 'none',
                            title: '账号或密码错误'
                        })
                    }
                } else {
                    wx.showToast({
                        icon: 'none',
                        title: '账号或密码错误'
                    })
                }
            },
            fail: err => {
                wx.hideLoading()
                wx.showToast({
                    icon: 'none',
                    title: '查询记录失败'
                })
                console.error('[数据库] [查询记录] 失败：', err)
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