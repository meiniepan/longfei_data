// pages/query/query.js
import {isEmpty} from "../../utils/util";

let number = ''
let app = getApp();
const db = wx.cloud.database()
const _ = db.command
let collectionName = "meta_info"
Page({
    /**
     * 页面的初始数据
     */
    data: {
        isEmpty: true,
        number: '',
        mData: {
            titleA: "序号", rowA: "", //序号
            titleB: "调度表编号", rowB: "", //调度表编号
            titleC: "大类", rowC: "", //大类
            titleD: "小类", rowD: "", //小类
            titleE: "市", rowE: "", //市
            titleF: "县", rowF: "", //县
            titleG: "项目名称", rowG: "", //项目名称
            titleH: "省电力公司统计报表名称", rowH: "", //省电力公司统计报表名称
            titleI: "项目单位", rowI: "", //"项目单位"
            titleJ: "建设地点(乡镇村)", rowJ: "", //建设地点(乡镇村)
            titleK: "项目规模(万千瓦)", rowK: "", //项目规模(万千瓦)
            titleL: "项目阶段", rowL: "", //项目阶段
            titleM: "纳入开发建设文号", rowM: "",  //纳入开发建设文号
            titleN: "纳规文件名称", rowN: "", //纳规文件名称
            titleO: "核准备案文号", rowO: "", //核准备案文号
            titleP: "接入系统电压等级(kV)", rowP: "", //接入系统电压等级(kV)
            titleQ: "项目开工时间(*年*月)", rowQ: "", //项目开工时间(*年*月)
            titleR: "项目预计完工时间(*年*月)", rowR: "", //项目预计完工时间(*年*月)
            titleS: "总投资规模(亿元)", rowS: "", //总投资规模(亿元)
            titleT: "累计完成投资", rowT: "", //累计完成投资
            titleU: "截止2022年12月31日累计完成投资(亿元)", rowU: "", //截止2022年12月31日累计完成投资(亿元)
            titleV: "2023年度度计划完成投资(亿元)", rowV: "", //2023年度度计划完成投资(亿元)
            titleW: "本月完成投资(亿元)", rowW: "", //本月完成投资(亿元)
            titleX: "2023年度年度累计完成投资(亿元)", rowX: "", //2023年度年度累计完成投资(亿元)
            titleY: "用地预审与规划选址意见书", rowY: "", //用地预审与规划选址意见书
            titleZ: "接入系统评审", rowZ: "", //接入系统评审
            titleAA: "主设备、施工招标", rowAA: "", //主设备、施工招标
            titleAB: "能监质检备案", rowAB: "", //能监质检备案
            titleAC: "项目进度", rowAC: "", //项目进度
            titleAD: "项目调度联系人及电话", rowAD: "", //项目调度联系人及电话
            titleAE: "投资异动/目前实际并网容量", rowAE: "", //投资异动/目前实际并网容量
            titleAF: "项目未建成原因", rowAF: "", //项目未建成原因
            titleAG: "企业类型", rowAG: "", //企业类型
            titleAH: "所属集团", rowAH: "", //所属集团
            titleAI: "规划阶段", rowAI: "", //规划阶段
            titleAJ: "所属基地", rowAJ: "", //所属基地
            titleAK: "重点工程建设项目", rowAK: "", //重点工程建设项目
            titleAL: "黄河流域", rowAL: "", //黄河流域
            titleAM: "2023年并网容量", rowAM: "", //2023年并网容量
            titleAN: "混改", rowAN: "", //混改
        },
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        if (!isEmpty(options.num)) {
            number = options.num
            this.setStorageNum()
            console.log("number", number)
            this.getInfo()
        } else {
            let number = wx.getStorageSync('query_num')
            console.log("number", number)
            if (!isEmpty(number)) {
                let mData = JSON.parse(wx.getStorageSync('query_detail'))
                this.setData({
                    isEmpty: false,
                    number,
                    mData
                })
            }
        }
    },
    doSearch(e) {
        let key = e.detail.value
        if (key.length > 0) {
            number = key
            this.setStorageNum()
            this.getInfo()
        }
    },
    setStorageNum() {
        console.log("query_num", number)
        wx.setStorageSync('query_num', number)
    },

    setStorageDetail() {
        console.log("query_detail", this.data.mData)
        wx.setStorageSync('query_detail', JSON.stringify(this.data.mData))
    },

    getInfo() {
        wx.showLoading({
            title: '加载中',
        })
        let con1
        con1 = {
            rowB: number
        }

        db.collection(collectionName).where(con1).limit(20).get({
            success: res => {
                wx.hideLoading()
                if (res.data.length > 0) {
                    console.log("data", res.data)
                    let data = res.data[0]
                    this.data.mData.rowA = data.rowA
                    this.data.mData.rowB = data.rowB
                    this.data.mData.rowC = data.rowC
                    this.data.mData.rowD = data.rowD
                    this.data.mData.rowE = data.rowE
                    this.data.mData.rowF = data.rowF
                    this.data.mData.rowG = data.rowG
                    this.data.mData.rowH = data.rowH
                    this.data.mData.rowI = data.rowI
                    this.data.mData.rowJ = data.rowJ
                    this.data.mData.rowK = data.rowK
                    this.data.mData.rowL = data.rowL
                    this.data.mData.rowM = data.rowM
                    this.data.mData.rowN = data.rowN
                    this.data.mData.rowO = data.rowO
                    this.data.mData.rowP = data.rowP
                    this.data.mData.rowQ = data.rowQ
                    this.data.mData.rowR = data.rowR
                    this.data.mData.rowS = data.rowS
                    this.data.mData.rowT = data.rowT
                    this.data.mData.rowU = data.rowU
                    this.data.mData.rowV = data.rowV
                    this.data.mData.rowW = data.rowW
                    this.data.mData.rowX = data.rowX
                    this.data.mData.rowY = data.rowY
                    this.data.mData.rowZ = data.rowZ
                    this.data.mData.rowAA = data.rowAA
                    this.data.mData.rowAB = data.rowAB
                    this.data.mData.rowAC = data.rowAC
                    this.data.mData.rowAD = data.rowAD
                    this.data.mData.rowAE = data.rowAE
                    this.data.mData.rowAF = data.rowAF
                    this.data.mData.rowAG = data.rowAG
                    this.data.mData.rowAH = data.rowAH
                    this.data.mData.rowAI = data.rowAI
                    this.data.mData.rowAJ = data.rowAJ
                    this.data.mData.rowAK = data.rowAK
                    this.data.mData.rowAL = data.rowAL
                    this.data.mData.rowAM = data.rowAM
                    this.data.mData.rowAN = data.rowAN
                    console.log("this.data.mData",this.data.mData)
                    this.setData({
                        mData: this.data.mData,
                        isEmpty: false,
                    },()=>{
                        this.setStorageDetail()
                    })

                } else {
                    this.setData({
                        isEmpty: true,
                    })
                    wx.showToast({
                        icon: 'none',
                        title: '编号不存在~'
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