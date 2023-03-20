let app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        mData: {
            titleA: "序号",
            titleB: "调度表编号",
            titleC: "大类",
            titleD: "小类",
            titleE: "市",
            titleF: "县",
            titleG: "项目名称",
            titleH: "项目阶段",
            titleI: "纳入开发建设文号",
            titleT: "累计完成投资",
        },
        bean1: {text:"尖草坪区",check: false},
        bean2: {text:"阳曲县",check: false},
        beanArray:[]
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
        this.setData({
            scrollTop: 0
        })
        this.refresh()
    },
    getList(aa, lastid) {
        let collectionName = "meta_info"
        let that = this
        const db = wx.cloud.database()
        const _ = db.command
        // 查询当前用户所有的 counters

        wx.showLoading({
            title: '加载中',
        })
        let con1
        if (that.data.beanArray.length>0) {
             con1 = {
                rowF: _.in(that.data.beanArray)
            }
        } else {
            con1 = null
        }
        db.collection(collectionName).limit(200).get({
            success: res => {
                wx.hideLoading()
                console.error('length', res.data.length)
                if (res.data.length > 0) {
                    wx.showToast({
                        icon: 'none',
                        title: '拉取数据完成'
                    })
                    console.log("length", res.data.length)
                    // wx.setStorageSync(collectionName, JSON.stringify(res.data))

                    let listData = res.data
                    this.setData({
                        listData: listData,
                    })
                } else {
                    wx.showToast({
                        icon: 'none',
                        title: '你在云端没数据'
                    })
                }

                console.log('[数据库] [查询记录] 成功: ', res)
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
    refresh() {
        this.getList('refresh', null);
    },

    filterList(aa, lastid) {
        let collectionName = "user"
        let that = this
        const db = wx.cloud.database()
        const _ = db.command
        // 查询当前用户所有的 counters

        wx.showLoading({
            title: '加载中',
        })
        let con1
        if (that.data.beanArray.length>0) {
            con1 = {
                rowF: _.or(that.data.beanArray)
            }
            console.error(that.data.beanArray)
        } else {
            con1 = null
        }
        db.collection(collectionName).where(con1).limit(200).get({
            success: res => {
                wx.hideLoading()
                console.error('length', res.data.length)
                if (res.data.length > 0) {
                    wx.showToast({
                        icon: 'none',
                        title: '拉取数据完成'
                    })
                    console.log("length", res.data.length)
                    // wx.setStorageSync(collectionName, JSON.stringify(res.data))

                    let listData = res.data
                    this.setData({
                        listData: listData,
                    })
                } else {
                    wx.showToast({
                        icon: 'none',
                        title: '你在云端没数据'
                    })
                }

                console.log('[数据库] [查询记录] 成功: ', res)
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
    refresh() {
        this.getList('refresh', null);
    },

    more() {
        this.getList('more', this.data.mData.lastid);
    },
    doAction(e) {

    },
    check1() {
        this.data.bean1.check = !this.data.bean1.check
        let array = []
        if (this.data.bean1.check){
            array.push(this.data.bean1.text)
        }
        if (this.data.bean2.check){
            array.push(this.data.bean2.text)
        }
        this.setData({
            bean1: this.data.bean1,
            beanArray:array,
        })
        if (array.length>0) {
            this.filterList(this.data.beanArray)
        }
    },
    check2() {
        this.data.bean2.check = !this.data.bean2.check
        let array = []
        if (this.data.bean1.check){
            array.push(this.data.bean1.text)
        }
        if (this.data.bean2.check){
            array.push(this.data.bean2.text)
        }
        this.setData({
            bean2: this.data.bean2,
            beanArray:array,
        })
        if (array.length>0) {
            this.filterList(this.data.beanArray)
        }
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
        return {
            title: 'nice',
            path: 'pages/home/home',
        }
    }
})