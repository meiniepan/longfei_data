import {isEmpty} from "../../utils/util";

let app = getApp();
const db = wx.cloud.database()
const _ = db.command
const ALL = "全选"
let collectionName = "meta_info"
let filterPosition = 0
let page = 0
let page_last = 0
let pageSize = 20

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isEmpty: true,
        pageData:[],
        filterPosition: 0,
        mData: [
            {name: "电站个数", val: ""},
            {name: "电站容量(万千瓦)", val: ""},
            {name: "总投资(亿元)", val: ""},
            {name: "累计完成投资(亿元)", val: ""},
            {name: "年度计划投资(亿元)", val: ""},
            {name: "年度完成投资(亿元)", val: ""},
            {name: "本月完成投资(亿元)", val: ""},
            {name: "年度并网容量(万千瓦)", val: ""},
            {name: "调度表编号", val: ""},
        ],
        bean1: {text: "尖草坪区", check: false},
        bean2: {text: "阳曲县", check: false},
        beanArray: [],
        listData: [],
        checkData: [],
        dataTotal: {},
        filterData: [{title: "企业类型", table: "qylx", row: "rowAG", val: "", checkData: null},
            {title: "所属集团", table: "ssjt", row: "rowAH", val: ""},
            {title: "所属基地", table: "ssjd", row: "rowAJ", val: ""},
            {title: "黄河流域", table: "hhly", row: "rowAL", val: ""},
            {title: "市", table: "city", row: "rowE", val: ""},
            {title: "县", table: "county", row: "rowF", val: ""},
            {title: "大类", table: "big_type", row: "rowC", val: ""},
            {title: "小类", table: "little_type", row: "rowD", val: ""},
            {title: "纳入开发建设文号", table: "nrkf", row: "rowM", val: ""},
            {title: "项目阶段", table: "stage", row: "rowL", val: ""},],
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let filterData = wx.getStorageSync('filter_data')
        let listData = wx.getStorageSync('result_data')
        let dataTotal = wx.getStorageSync('total_data')
        let pageData = wx.getStorageSync('page_data')

        if (!isEmpty(filterData)) {
            filterData = JSON.parse(filterData)
            // filterData.forEach(it => {
            //     it.checkData = null
            // })
            this.setData({
                filterData,
            })
        }
        if (!isEmpty(listData)) {
            listData = JSON.parse(listData)
            let isEmpty = true
            if (listData.length > 0) {
                 isEmpty = false
            }
            this.setData({
                listData,
                isEmpty,
            })
        }
        if (!isEmpty(dataTotal)) {
            dataTotal = JSON.parse(dataTotal)
            this.setData({
                dataTotal,
            })
        }
        if (!isEmpty(pageData)) {
            pageData = JSON.parse(pageData)
            this.setData({
                pageData,
            })
        }
        console.log("filterData",filterData)
    },
    doFinish() {
        wx.navigateBack({
            delta: 1,
        })
    },
    setStorageFilter() {
        console.log("filter_data", this.data.filterData)
        wx.setStorageSync('filter_data', JSON.stringify(this.data.filterData))
    },
    setStoragePage() {
        console.log("page_data", this.data.pageData)
        wx.setStorageSync('page_data', JSON.stringify(this.data.pageData))
    },
    setStorageResult() {
        console.log("result_data", this.data.listData)
        wx.setStorageSync('result_data', JSON.stringify(this.data.listData))
        wx.setStorageSync('total_data', JSON.stringify(this.data.dataTotal))
    },
    queryPage(e) {
        let index = e.currentTarget.dataset.index
        page = index
        if (page!=page_last) {
            let pageData = this.data.pageData
            pageData.forEach(it => {
                it.checked = false
            })
            pageData[index].checked = true
            this.filterList()
            page_last = page
        }
    },
    queryFilter(e) {
        filterPosition = e.currentTarget.dataset.index
        console.log("queryFilter", filterPosition)
        this.setData({
            filterPosition,
        })
        if (this.data.filterData[filterPosition].checkData == null) {
            this.getList()
        } else {
            this.setData({
                show: true,
                overlay: true,
            })
        }
    },
    checkRule(e) {
        let v = this.data.filterData[filterPosition].checkData
        console.log("checkRule", v)
        let index = e.currentTarget.dataset.index
        v[index].checked = !v[index].checked
        if (index == 0) {
            v.forEach(it => {
                it.checked = v[0].checked
            })
        }else {
            if (!v[index].checked) {
                v[0].checked = false
            }
        }
        this.setData({
            filterData: this.data.filterData,
        })
    },
    queryDetail(e) {
        let num = e.currentTarget.dataset.num
        wx.navigateTo({
            url: '/pages/query/query?num=' + num,
        })
    },
    doBtn1() {
        this.setData({
            show: false,
            overlay: false,
        })
    },
    doBtn2() {
        let v = this.data.filterData[filterPosition]
        let checkData = this.data.filterData[filterPosition].checkData

        let n = 0
        let str = ''
        if (checkData[0].checked) {
            n++
            str = str + checkData[0].name
            v.val = str
        } else {
            checkData.forEach(it => {

                if (it.checked) {
                    str = str + it.name + ","
                    n++
                }
            })
            if (str.length > 1) {
                str = str.substring(0, str.length - 1)
                v.val = str
            }
        }


        if (n > 0) {
            this.setStorageFilter()
            this.setData({
                show: false,
                overlay: false,
                filterData: this.data.filterData,
            }, () => {
                this.filterList()
            })
        } else {
            wx.showToast({
                icon: 'none',
                title: '筛选条件不能为空'
            })
        }
    },

    clearPosition(e) {
        let index = e.currentTarget.dataset.index
        console.log("clearPosition", index)
        let v = this.data.filterData[index]

        v.val = ''
        this.setData({
            filterData: this.data.filterData,
        })
    },
    clearAll() {
        let v = this.data.filterData
        console.log("clearAll", v)
        v.forEach(it => {
            it.val = ''
        })
        this.setData({
            filterData: this.data.filterData,
        })
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
    getList(aa, lastid) {

        // 查询当前用户所有的 counters

        wx.showLoading({
            title: '加载中',
        })
        let con1
        if (this.data.beanArray.length > 0) {
            con1 = {
                rowF: _.in(this.data.beanArray)
            }
        } else {
            con1 = null
        }
        db.collection(this.data.filterData[filterPosition].table).limit(20).get({
            success: res => {
                wx.hideLoading()
                console.error('length', res.data.length)
                if (res.data.length > 0) {
                    console.log("length", res.data.length)
                    let checkData = res.data
                    checkData.forEach(it => {
                        it.checked = false
                        it.display = it.name + "(" + it.total + ")"
                    })
                    checkData.splice(0, 0, {display: ALL, name: ALL})
                    this.data.filterData[filterPosition].checkData = checkData
                    this.setData({
                        filterData: this.data.filterData,
                        checkData: checkData,
                        show: true,
                        overlay: true,
                    })
                } else {
                    this.data.filterData[filterPosition].checkData = []
                    this.setData({
                        filterData: this.data.filterData,
                    })
                    wx.showToast({
                        icon: 'none',
                        title: '没有相应筛选条件'
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


    async filterList() {
        const db = wx.cloud.database()
        const _ = db.command
        // 查询当前用户所有的 counters

        wx.showLoading({
            title: '加载中',
        })
        let con1 = {}

        let n = 0
        this.data.filterData.forEach(it => {
            if (!isEmpty(it.val)) {
                if (it.checkData != null) {
                    n++
                    let array = []
                    it.checkData.forEach(it => {
                        if (it.name != ALL) {
                            if (it.checked) {
                                array.push(it.name)
                            }
                        }
                    })
                    con1[it.row] = _.or(array)
                }
            }
        })
        if (n == 0) {
            con1 = null
        }
        console.log("con1", con1)

        const $ = db.command.aggregate
        let dataTotal = await db.collection(collectionName)
            .aggregate()
            .match(con1)
            .group({
                _id: null,
                value_0: $.sum(1),
                value_1: $.sum('$rowK'),
                value_2: $.sum('$rowS'),
                value_3: $.sum('$rowT'),
                value_4: $.sum('$rowV'),
                value_5: $.sum('$rowX'),
                value_6: $.sum('$rowW'),
                value_7: $.sum('$rowAM'),
            })
            .end()
        console.log("dataTotal", dataTotal)
        let totalPage = Math.ceil(dataTotal.list[0].value_0/pageSize);
        let pageData = []
        if(totalPage>1){
            for (let i = 0; i < totalPage; i++) {
                if (i==0){
                    pageData.push({name:i+1,checked:true})
                }else {
                    pageData.push({name:i+1,checked:false})
                }
            }
        }
        this.setData({
            dataTotal,
            pageData,
        })
        console.log("totalPage", totalPage)
        console.log("pageData", pageData)
        this.setStoragePage()
        db.collection(collectionName).where(con1)
            .skip((page) * pageSize)
            .limit(pageSize)
            .orderBy('rowB', 'asc')
            .get({
                success: res => {
                    wx.hideLoading()
                    console.error('length', res.data.length)
                    if (res.data.length > 0) {

                        console.log("length", res.data.length)

                        let listData = res.data
                        // {name: "电站个数", val: ""},
                        // {name: "电站容量", val: ""},
                        // {name: "总投资", val: ""},
                        // {name: "累计完成投资", val: ""},
                        // {name: "年度计划投资", val: ""},
                        // {name: "年度完成投资", val: ""},
                        // {name: "本月完成投资", val: ""},
                        // {name: "年度并网容量", val: ""},
                        listData.forEach(it => {
                            it.value_0 = 1
                            it.value_1 = it.rowK
                            it.value_2 = it.rowS
                            it.value_3 = it.rowT
                            it.value_4 = it.rowV
                            it.value_5 = it.rowX
                            it.value_6 = it.rowW
                            it.value_7 = it.rowAM
                            it.value_8 = it.rowB
                        })

                        this.setData({
                            listData: listData,
                            isEmpty: false,
                        })
                    } else {
                        wx.showToast({
                            icon: 'none',
                            title: '筛选到了空气QAQ'
                        })
                        this.setData({
                            isEmpty: true,
                            listData:[]
                        })
                    }
                    this.setStorageResult()
                    console.log('[数据库] [查询记录] 成功: ', listData)
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


    doAction(e) {

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