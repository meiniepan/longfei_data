const cloud = require('wx-server-sdk')
cloud.init({
    env: "env-0glfk94n26eebb18"
})
var xlsx = require('node-xlsx');
const db = cloud.database()

exports.main = async (event, context) => {
    let {
        fileID
    } = event
    console.error(fileID)
    //1,通过fileID下载云存储里的excel文件
    const res = await cloud.downloadFile({
        fileID: fileID,
    })
    const buffer = res.fileContent
    let table = "meta_info";
    let table_1 = "qylx";
    let table_2 = "ssjt";
    let table_3 = "ssjd";
    let table_4 = "hhly";
    let table_5 = "city";
    let table_6 = "county";
    let table_7 = "big_type";
    let table_8 = "little_type";
    let table_9 = "nrkf";
    let table_10 = "stage";
    const all_excel_data = [] //用来存储所有的excel数据

    const data_qylx = new Map()
    const data_ssjt = new Map()
    const data_ssjd = new Map()
    const data_hhly = new Map()
    const data_city = new Map()
    const data_county = new Map()
    const data_big = new Map()
    const data_little = new Map()
    const data_nrkf = new Map()
    const data_stage = new Map()
    //2,解析excel文件里的数据
    var sheets = xlsx.parse(buffer); //获取到所有sheets
    sheets.forEach(function (sheet) {
        console.log(sheet['name']);
        for (var rowId in sheet['data']) {
            //console.log(rowId);
            var row = sheet['data'][rowId]; //第几行数据
            if (rowId > 2 && row) { //第一行是表格标题，所以我们要从第2行开始读
                //3，把解析到的数据存到excelList数据表里
                //a b c d e f g h i j  k  l  m  n  o  p  q  r  s  t  u  v  w  x  y  z
                //0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25

                //aa ab ac ad ae af ag ah ai aj ak al am an  o  p  q  r  s  t  u  v  w  x  y  z
                //26 27 28 29 30 31 32 33 34 35 36 37 38 39

                //1
                let row_qylx = row[32]
                if (!isEmpty(row_qylx)) {
                    if (data_qylx.has(row_qylx)) {
                        data_qylx.set(row_qylx, data_qylx.get(row_qylx) + 1)
                    } else {
                        data_qylx.set(row_qylx, 1)
                    }
                }
                //2
                let row_ssjt = row[33]
                if (!isEmpty(row_ssjt)) {
                    if (data_ssjt.has(row_ssjt)) {
                        data_ssjt.set(row_ssjt, data_qylx.get(row_ssjt) + 1)
                    } else {
                        data_ssjt.set(row_ssjt, 1)
                    }
                }
                //3
                let row_ssjd = row[35]
                if (!isEmpty(row_ssjd)) {
                    if (data_ssjd.has(row_ssjd)) {
                        data_ssjd.set(row_ssjd, data_ssjd.get(row_ssjd) + 1)
                    } else {
                        data_ssjd.set(row_ssjd, 1)
                    }
                }
                //4
                let row_hhly = row[37]
                if (!isEmpty(row_hhly)) {
                    if (data_hhly.has(row_hhly)) {
                        data_hhly.set(row_hhly, data_hhly.get(row_hhly) + 1)
                    } else {
                        data_hhly.set(row_hhly, 1)
                    }
                }
                //5
                let row_city = row[4]
                if (!isEmpty(row_city)) {
                    if (data_city.has(row_city)) {
                        data_city.set(row_city, data_city.get(row_city) + 1)
                    } else {
                        data_city.set(row_city, 1)
                    }
                }
                //6
                let row_county = row[5]
                if (!isEmpty(row_county)) {
                    if (data_county.has(row_county)) {
                        data_county.set(row_county, {parent:row_city,total:data_county.get(row_county).total + 1})
                    } else {
                        data_county.set(row_county, {parent:row_city,total:1})
                    }
                }
                //7
                let row_big = row[2]
                if (!isEmpty(row_big)) {
                    if (data_big.has(row_big)) {
                        data_big.set(row_big, data_big.get(row_big) + 1)
                    } else {
                        data_big.set(row_big, 1)
                    }
                }
                //8
                let row_little = row[3]
                if (!isEmpty(row_little)) {
                    if (data_little.has(row_little)) {
                        data_little.set(row_little, {parent:row_big,total:data_little.get(row_little).total + 1})
                    } else {
                        data_little.set(row_little, {parent:row_big,total:1})
                    }
                }
                //9
                let row_nrkf = row[12]
                if (!isEmpty(row_nrkf)) {
                    if (data_nrkf.has(row_nrkf)) {
                        data_nrkf.set(row_nrkf, data_nrkf.get(row_nrkf) + 1)
                    } else {
                        data_nrkf.set(row_nrkf, 1)
                    }
                }
                //10
                let row_stage = row[11]
                if (!isEmpty(row_stage)) {
                    if (data_stage.has(row_stage)) {
                        data_stage.set(row_stage, data_stage.get(row_stage) + 1)
                    } else {
                        data_stage.set(row_stage, 1)
                    }
                }
                all_excel_data.push({
                    rowA: row[0], //序号
                    rowB: row[1], //调度表编号
                    rowC: row[2], //大类
                    rowD: row[3], //小类
                    rowE: row[4], //市
                    rowF: row[5], //县
                    rowG: row[6], //项目名称
                    rowH: row[7], //省电力公司统计报表名称
                    rowI: row[8], //"项目单位"
                    rowJ: row[9], //建设地点（乡镇村）
                    rowK: row[10], //项目规模〔万千瓦）
                    rowL: row[11], //项目阶段
                    rowM: row[12], //纳入开发建设文号
                    rowN: row[13], //纳规文件名称
                    rowO: row[14], //核准备案文号
                    rowP: row[15], //接入系统电压等级〔kV)
                    rowQ: row[16], //项目开工时间〔*年*月）
                    rowR: row[17], //项目预计完工时间〔*年*月）
                    rowS: row[18], //总投资规模〔亿元)
                    rowT: row[19], //累计完成投资
                    rowU: row[20], //截止2022年12月31日累计完成投资〔亿元)
                    rowV: row[21], //2023年度度计划完成投资〔亿元)
                    rowW: row[22], //本月完成投资〔亿元)
                    rowX: row[23], //2023年度年度累计完成投资〔亿元)
                    rowY: row[24], //用地预审与规划选址意见书
                    rowZ: row[25], //接入系统评审
                    rowAA: row[26], //主设备、施工招标
                    rowAB: row[27], //能监质检备案
                    rowAC: row[28], //项目进度
                    rowAD: row[29], //项目调度联系人及电话
                    rowAE: row[30], //投资异动/目前实际并网容量
                    rowAF: row[31], //项目未建成原因
                    rowAG: row[32], //企业类型
                    rowAH: row[33], //所属集团
                    rowAI: row[34], //规划阶段
                    rowAJ: row[35], //所属基地
                    rowAK: row[36], //重点工程建设项目
                    rowAL: row[37], //黄河流域
                    rowAM: row[38], //2023年并网容量
                    rowAN: row[39], //混改

                })
            }
        }
    });
    //先删除所有表
    await db.collection(table).where({
        _id: db.command.exists(true)
    }).remove()
    await db.collection(table_1).where({
        _id: db.command.exists(true)
    }).remove()
    await db.collection(table_2).where({
        _id: db.command.exists(true)
    }).remove()
    await db.collection(table_3).where({
        _id: db.command.exists(true)
    }).remove()
    await db.collection(table_4).where({
        _id: db.command.exists(true)
    }).remove()
    await db.collection(table_5).where({
        _id: db.command.exists(true)
    }).remove()
    await db.collection(table_6).where({
        _id: db.command.exists(true)
    }).remove()
    await db.collection(table_7).where({
        _id: db.command.exists(true)
    }).remove()
    await db.collection(table_8).where({
        _id: db.command.exists(true)
    }).remove()
    await db.collection(table_9).where({
        _id: db.command.exists(true)
    }).remove()
    await db.collection(table_10).where({
        _id: db.command.exists(true)
    }).remove()

    //一起添加所有数据
    var result = await db.collection(table).add({data: all_excel_data}).then(res => {
        return res
    }).catch(err => {
        return err
    })
    let array_1 = []
    console.error(data_qylx)
    data_qylx.forEach((val, key) => {
        array_1.push({name: key, total: val})
    })
    console.error("array_1", array_1)
    var result_1 = await db.collection(table_1).add({data: array_1}).then(res => {
        return res
    }).catch(err => {
        return err
    })

    let array_2 = []
    console.error(data_ssjt)
    data_ssjt.forEach((val, key) => {
        array_2.push({name: key, total: val})
    })
    console.error("array_2", array_2)
    var result_2 = await db.collection(table_2).add({data: array_2}).then(res => {
        return res
    }).catch(err => {
        return err
    })

    let array_3 = []
    data_ssjd.forEach((val, key) => {
        array_3.push({name: key, total: val})
    })
    var result_3 = await db.collection(table_3).add({data: array_3}).then(res => {
        return res
    }).catch(err => {
        return err
    })

    let array_4 = []
    data_hhly.forEach((val, key) => {
        array_4.push({name: key, total: val})
    })
    var result_4 = await db.collection(table_4).add({data: array_4}).then(res => {
        return res
    }).catch(err => {
        return err
    })

    let array_5 = []
    data_city.forEach((val, key) => {
        array_5.push({name: key, total: val})
    })
    var result_5 = await db.collection(table_5).add({data: array_5}).then(res => {
        return res
    }).catch(err => {
        return err
    })

    let array_6 = []
    data_county.forEach((val, key) => {
        array_6.push({name: key,parent:val.parent, total: val.total})
    })
    var result_6 = await db.collection(table_6).add({data: array_6}).then(res => {
        return res
    }).catch(err => {
        return err
    })

    let array_7 = []
    data_big.forEach((val, key) => {
        array_7.push({name: key, total: val})
    })
    var result_7 = await db.collection(table_7).add({data: array_7}).then(res => {
        return res
    }).catch(err => {
        return err
    })

    let array_8 = []
    data_little.forEach((val, key) => {
        array_8.push({name: key,parent:val.parent, total: val.total})
    })
    var result_8 = await db.collection(table_8).add({data: array_8}).then(res => {
        return res
    }).catch(err => {
        return err
    })

    let array_9 = []
    data_nrkf.forEach((val, key) => {
        array_9.push({name: key, total: val})
    })
    var result_9 = await db.collection(table_9).add({data: array_9}).then(res => {
        return res
    }).catch(err => {
        return err
    })

    let array_10 = []
    data_stage.forEach((val, key) => {
        array_10.push({name: key, total: val})
    })
    var result_10 = await db.collection(table_10).add({data: array_10}).then(res => {
        return res
    }).catch(err => {
        return err
    })
    return result
}

function isEmpty(string) {
    if (typeof (string) == 'undefined' || string == null || string === '') {
        return true;
    } else {
        return false;
    }
}