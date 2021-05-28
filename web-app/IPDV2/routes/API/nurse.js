const {
    render
} = require('ejs');
const {
    check,
    validationResult
} = require('express-validator')
var express = require('express');
var router = express.Router();
const dataset = require('../dataset/data')
const data1 = require('../../data')
const dbCon = require('../../lib/db');
const db = require('../../models');
let {
    PythonShell
} = require('python-shell')
var spawn = require("child_process").spawn;
//------------------------------------------
// blue_tooth

function send_bt(codebox,number) {
    let options = { 
        mode: 'text', 
        pythonOptions: ['-u'], // get print results in real-time 
          scriptPath: '', //If you are having python_test.py script in same folder, then it's optional. 
        args: [codebox] //An argument which can be accessed in the script using sys.argv[1] 
      }; 
    PythonShell.run('getconnect_bt.py', options, function (err, result){ 
          if (err) throw err; 
       
            let tray1 = result[0].substr(6,1)
            let tray2 = result[1].substr(6,1)
            // let tray3 = result[2].substr(6,1)
            // let tray4 = result[3].substr(6,1)
            // let tray5 = result[4].substr(6,1)
            const rfcomm = 
                {
                    tray1:tray1,
                    tray2:tray2,
                    // tray3:tray3,
                    // tray4:tray4,
                    // tray5:tray5
                }
         
            switch (codebox) {
                case 'A':
                    sendBluetooth(rfcomm.tray1, number)
                    break;
                case 'B':
                    sendBluetooth(rfcomm.tray2, number)
                    break;
                case 'C':
                    sendBluetooth(rfcomm.tray3, number)
                    break;
                case 'D':
                    sendBluetooth(rfcomm.tray4, number)
                    break;
                case 'E':
                    sendBluetooth(rfcomm.tray5, number)
                    break;
                default:
                    break;
            }
    });
}
function sendBluetooth(port, code) {
    let options = {
        mode: 'text',
        pythonOptions: ['-u'], // get print results in real-time 
        scriptPath: '', //If you are having python_test.py script in same folder, then it's optional. 
        args: [port, code] //An argument which can be accessed in the script using sys.argv[1] 
    };
    PythonShell.run('send_bt.py', options, function (err, result) {
        if (err) throw err;
        //console.log('result: ', result.toString());
       
    });
}

// blue_tooth
router.get('/', (req, res, next) => {
     if (req.session.loggedin && req.session.type == 2 || req.session.type == 'admin') {
        const data = data1
        const result = data.filter((member) => {
            return member
        })

        let sql = "SELECT DISTINCT hnId ,bed,st.status FROM patients as ts RIGHT JOIN stockdrug as st ON st.hn = ts.hnId   where st.status = 0 ORDER BY `ts`.`hnId` ASC"
        let sql2 = "SELECT DISTINCT hn FROM stockdrug as st where st.status = 0  ORDER BY st.meal ASC "
        dbCon.query(sql, (err, rows) => {
            if (err) {
                throw err;
            } else {

                dbCon.query(sql2, (err, rs) => {
                    if (err) {
                        throw err;
                    } else {

                        dbCon.query("SELECT  * ,COUNT(meal) as count FROM stockdrug GROUP BY meal ORDER BY hn ASC", (err, countmeal) => {

                            if (err) {
                                throw err;
                            } else {
                                dbCon.query("SELECT  DISTINCT st.meal ,p.hnId,p.bed   from stockdrug  st RIGHT JOIN patients as p on p.hnId = st.hn where st.status =0 ORDER BY `st`.`hn` ASC" , (err, meals) => {
                                    if (err) {
                                        throw err;
                                    } else {
                                        dbCon.query("SELECT  * from patients as p LEFT JOIN stockdrug as st on p.hnId = st.hn where st.status = 1 order BY p.hnId", (err, status) => {
                                            if (err) {
                                                throw err;
                                            } else {
                                                dbCon.query("SELECT * FROM patients as p right join stockdrug as st on p.hnId = st.hn group by st.hn ORDER BY `p`.`hnId` ASC", (err, fullhn) => {
                                                    if (err) {
                                                        throw err;
                                                    } else {
                                                        let bb = []
                                                        let ab = []
                                                        let bl = []
                                                        let al = []
                                                        let bd = []
                                                        let ad = []
                                                        let be = []

                                                        const rsts = meals.filter((data) => {
                                                            return data
                                                        })
                                                        let patient = []
                                                        meals.forEach(key => {
                                                            const {
                                                                hn
                                                            } = key
                                                            patient.push({
                                                                ไอดี: rows
                                                            })
                                                        });
                                                        const hnId = meals.filter((data) => {
                                                            return data
                                                        })
                                                        const hn = []
                                                        meals.forEach(k => {
                                                            if (k.status = 1) {
                                                                hn.push(k)
                                                            }

                                                        });

                                                        for (let i = 0; i < rsts.length; i++) {

                                                            switch (rsts[i].meal) {
                                                                case 'BB':
                                                                    bb.push(rsts[i])
                                                                    break;
                                                                case 'AB':
                                                                    ab.push(rsts[i])
                                                                    break;
                                                                case 'BL':
                                                                    bl.push(rsts[i])
                                                                    break;
                                                                case 'AL':
                                                                    al.push(rsts[i])
                                                                    break;
                                                                case 'BD':
                                                                    bd.push(rsts[i])
                                                                    break;
                                                                case 'AD':
                                                                    ad.push(rsts[i])
                                                                    break;
                                                                case 'BE':
                                                                    be.push(rsts[i])
                                                                    break;
                                                            }
                                                        }


                                                        const meal = [{
                                                                name: 'ก่อน/เช้า',
                                                                code: 'BB',
                                                                data: bb
                                                            },
                                                            {
                                                                name: 'หลัง/เช้า',
                                                                code: 'AB',
                                                                data: ab
                                                            },
                                                            {
                                                                name: 'ก่อน/เที่ยง',
                                                                code: 'BL',
                                                                data: bl
                                                            },
                                                            {
                                                                name: 'หลัง/เที่ยง',
                                                                code: 'AL',
                                                                data: al
                                                            },
                                                            {
                                                                name: 'ก่อน/เย็น',
                                                                code: 'BD',
                                                                data: bd
                                                            },
                                                            {
                                                                name: 'หลัง/เย็น',
                                                                code: 'AD',
                                                                data: ad
                                                            },
                                                            {
                                                                name: 'ก่อน/นอน',
                                                                code: 'BE',
                                                                data: be
                                                            }
                                                        ]
                                                        res.render('nurse/index', {
                                                            data: dataset.length,
                                                            ward: result[0].tward,
                                                            row: rows,
                                                            count: rs.length,
                                                            meal: meal,
                                                            status: status,
                                                            user: req.session.data,
                                                            fullhn: fullhn,
                                                            errors: ''
                                                        })
                                                         //res.send(meal)
                                                    }
                                                })

                                            }
                                        })

                                    }
                                })

                            }
                        })
                    }
                })


            }
        })
 } else {
        res.redirect('/users/login')
    }
})

// getdispensing check hn
router.get('/checkhn', (req, res, next) => {
    if (req.session.loggedin && req.session.type == 2 || req.session.type == 'admin') {
        let bed = req.params.bed
        console.log(bed)
        res.render('nurse/check-hn', {
            user: req.session.data,
            data: '',
        })
    } else {
        res.redirect('/users/login')
    }

})
router.post('/checkhn', [
    check('hnId', 'กรุณาป้อนหมายเลขผู้ป่วย').not().isEmpty()
], (req, res, next) => {
    let hn = req.body.hnId
    const result = validationResult(req)
    var errors = result.errors
    let sql = "SELECT bed, p.codebox FROM patients as p left join stockdrug as st on p.hnId where hnId = '" + hn + "'"

    dbCon.query(sql, (err, rows) => {
        if (rows.length > 0) {

            if (err) {
                req.flash('error', 'ไม่พบหมายเลขHN')
                res.redirect('/nurse')
            } else {
                // let codebox = rows[0].codebox.substr(0,1)
                // let number = rows[0].codebox.substr(1,1)
                // console.log(codebox,number)
                // send_bt(codebox,number)
                res.redirect('/nurse/p/' + rows[0].bed)
            }
        } else {
            req.flash('error', 'ป้อนหมายเลขผู้ป่วย')
            res.redirect('/nurse')
        }
    })

})
router.post('/checkhn/(:meal)', [
    check('hnId', 'กรุณาป้อนหมายเลขผู้ป่วย').not().isEmpty()
], (req, res, next) => {
    let hn = req.body.hnId
    let meal = req.params.meal
    const result = validationResult(req)
    var errors = result.errors
    let sql = "SELECT p.bed,p.codebox FROM patients as p LEFT JOIN stockdrug as st ON p.hnId = st.hn where p.hnId = '"+hn+"' and st.meal ='"+meal+"' and st.status = 0 "
    if (req.session.loggedin && req.session.type == 2 || req.session.type == 'admin') {
        dbCon.query(sql, (err, rows) => {
            if (rows.length > 0) {
                if (err) {
                    req.flash('error', 'ไม่พบหมายเลขHN')
                    res.redirect('/nurse')
                } else {

                    // let codebox = rows[0].codebox.substr(0,1)
                    // let number = rows[0].codebox.substr(1,1)
                    // console.log(codebox,number)
                    // send_bt(codebox,number)
                    res.redirect('/nurse/p/' + rows[0].bed + '/' + meal)
                }
            } else {
                req.flash('error', meal)
                res.redirect('/nurse')
            }

        })
    } else {
        res.redirect('/users/login')
    }



})
router.get('/summary', (req, res, next) => {
    let sql = "SELECT DISTINCT st.hn,p.fullname,p.bed ,count(meal) as total , SUM(st.status=1) as dispensing ,(sum(st.status=2)) as turn,sum(st.status=2) as off ,sum(st.status=3||st.status=4) as nextmeal FROM stockdrug as st LEFT JOIN patients as p  on st.hn = p.hnId GROUP by st.hn"
    if (req.session.loggedin && req.session.type == 2 || req.session.type == 'admin') {
        dbCon.query(sql, (err, rows) => {
            if (err) {
                throw err;

            } else {
                res.render('nurse/summary-drug', {
                    user: req.session.data,
                    data: rows

                })
                //  res.send(rows)
            }
        })
    } else {
        res.redirect('/users/login')
    }

})
router.get('/summarydrug', (req, res, next) => {
    let sql = "SELECT *  FROM stockdrug as st LEFT JOIN  patients as p ON st.hn = p.hnId  WHERE st.status = 2 or st.status = 0 or st.status = 3 or st.status = 4"
    if (req.session.loggedin && req.session.type == 2 || req.session.type == 'admin') {
        dbCon.query(sql, (err, rows) => {
            if (err) {
                throw err;

            } else {
                res.render('nurse/return-drug', {
                    user: req.session.data,
                    data: rows

                })
                //  res.send(rows)
            }
        })
    } else {
        res.redirect('/users/login')
    }

})



// getallpatients
router.get('/getAllPatient/(:meal)', (req, res, next) => {
    let meal = req.params.meal
    let sql = "SELECT  * FROM stockdrug as st where st.status = 0 AND meal = '" + meal + "' ORDER BY st.hn ASC  "
    if (req.session.loggedin && req.session.type == 2 || req.session.type == 'admin') {

        dbCon.query(sql, (err, result) => {
            if (err) {
                throw err
            } else {
                res.send(result)
            }

        })
        // res.render('nurse/getpatient',{
        // })
    } else {
        res.redirect('/users/login')
    }

})
router.get('/p/(:bed)/(:meal)', (req, res, next) => {
    let bed = req.params.bed
    let meal = req.params.meal
    let sql = "SELECT DISTINCT time from stockdrug as st LEFT JOIN patients as t on st.hn = t.hnId where t.bed = '" + bed + "' and st.status = 0 and st.meal ='" + meal + "'"
    let sql2 = "SELECT  * from stockdrug as st LEFT JOIN patients as t on st.hn = t.hnId where t.bed =  '" + bed + "' and st.meal ='" + meal + "'"
    let sql3 = "SELECT  *  from stockdrug as st LEFT JOIN patients as t on st.hn = t.hnId where t.bed = '" + bed + "' and st.status =0 and st.meal ='" + meal + "'"
    if (req.session.loggedin && req.session.type == 2 || req.session.type == 'admin') {
        dbCon.query(sql, (err, result) => {
            if (err) {
                throw err;
            } else {
                if (!result.length > 0) {
                    req.flash('success', 'nomeal')
                  
                    res.redirect('/nurse/API/' + bed)
                    //res.redirect('/nurse')
                } else {

                    dbCon.query(sql2, (err, results) => {
                        if (err) {
                            throw err;
                        } else {
                            dbCon.query(sql3, (err, rst) => {
                                if (err) {
                                    throw err;
                                } else {

                                    var str = results[0].codebox
                                    let code = str.substring(0, 1);




                                    const mealBreakfast = []
                                    const mealLunch = []
                                    const dinner = []
                                    const eveing = []


                                    const countByAll = []
                                    const countByStatus = []
                                    results.forEach(key => {
                                        switch (key.status) {
                                            case '0':
                                                countByAll.push(1)
                                                break;

                                            case '1':
                                                countByStatus.push(1)
                                                break;
                                        }
                                    });
                                    res.render('nurse/show-patientbymeal', {
                                        data: result,
                                        datamap: results,
                                        a: results.length,
                                        b: countByStatus.length,
                                        drug: rst,
                                        user: req.session.data,
                                        bed: bed,
                                        drugScan: '',
                                        mealScan: meal
                                    })
                                    //res.send({a:countByAll.length,b:countByStatus.length})
                                }
                            })

                        }
                    })


                }

            }
        })
    } else {
        res.redirect('/users/login')
    }
})



router.get('/p/(:bed)', (req, res, next) => {
    let bed = req.params.bed
    let sql = "SELECT DISTINCT time from stockdrug as st LEFT JOIN patients as t on st.hn = t.hnId where t.bed = '" + bed + "' and st.status = 0 "
    let sql2 = "SELECT  * from stockdrug as st LEFT JOIN patients as t on st.hn = t.hnId where t.bed =  '" + bed + "'"
    let sql3 = "SELECT  *  from stockdrug as st LEFT JOIN patients as t on st.hn = t.hnId where t.bed = '" + bed + "' and st.status =0"
    if (req.session.loggedin && req.session.type == 2 || req.session.type == 'admin') {
        dbCon.query(sql, (err, result) => {
            if (err) {
                throw err;
            } else {
                if (!result.length > 0) {
                    res.redirect('/nurse/API/' + bed)
                } else {

                    dbCon.query(sql2, (err, results) => {
                        if (err) {
                            throw err;
                        } else {
                            dbCon.query(sql3, (err, rst) => {
                                if (err) {
                                    throw err;
                                } else {


                                    const mealBreakfast = []
                                    const mealLunch = []
                                    const dinner = []
                                    const eveing = []


                                    const countByAll = []
                                    const countByStatus = []
                                    results.forEach(key => {
                                        switch (key.status) {
                                            case '0':
                                                countByAll.push(1)
                                                break;

                                            case '1':
                                                countByStatus.push(1)
                                                break;
                                        }
                                    });
                                    res.render('nurse/show-patients', {
                                        data: result,
                                        datamap: results,
                                        a: results.length,
                                        b: countByStatus.length,
                                        drug: rst,
                                        user: req.session.data,
                                        bed: bed,
                                        drugScan: '',
                                        mealScan: ''
                                    })
                                    //res.send({a:countByAll.length,b:countByStatus.length})
                                }
                            })

                        }
                    })


                }

            }
        })
    } else {
        res.redirect('/users/login')
    }

})
router.post('/p/(:bed)', (req, res, next) => {
    let bed = req.params.bed
    let codedrug = req.body.drug
    let sql = "SELECT DISTINCT time from stockdrug as st LEFT JOIN patients as t on st.hn = t.hnId where t.bed = '" + bed + "' and st.status = 0"
    let sql2 = "SELECT  * from stockdrug as st LEFT JOIN patients as t on st.hn = t.hnId where t.bed =  '" + bed + "'"
    let sql3 = "SELECT  *  from stockdrug as st LEFT JOIN patients as t on st.hn = t.hnId where t.bed = '" + bed + "' and st.status =0"
    let sql4 = "SELECT * from stockdrug as st LEFT JOIN patients as p on st.hn = p.hnId WHERE st.packId = '" + codedrug + "' and p.bed = '" + bed + "' "
    dbCon.query(sql4, (err, rs) => {
        if (!rs.length > 0) {
            req.flash('error', 'ไม่พบรหัสซองยา')
            res.redirect('/nurse/p/' + bed)
        } else {
            if (err) {
                throw err;
            } else {

                dbCon.query(sql, (err, result) => {
                    if (err) {
                        throw err;
                    } else {
                        if (!result.length > 0) {
                            res.redirect('/nurse/API/' + bed)
                        } else {

                            dbCon.query(sql2, (err, results) => {
                                if (err) {
                                    throw err;
                                } else {
                                    dbCon.query(sql3, (err, rst) => {
                                        if (err) {
                                            throw err;
                                        } else {


                                            const countByAll = []
                                            const countByStatus = []
                                            results.forEach(key => {
                                                switch (key.status) {
                                                    case '0':
                                                        countByAll.push(1)
                                                        break;

                                                    case '1':
                                                        countByStatus.push(1)
                                                        break;
                                                }
                                            });
                                            req.flash('success', '44')
                                            res.render('nurse/show-patients', {
                                                data: result,
                                                datamap: results,
                                                a: results.length,
                                                b: countByStatus.length,
                                                drug: rst,
                                                user: req.session.data,
                                                bed: bed,
                                                drugScan: rs
                                            })
                                            //res.send(})
                                        }
                                    })

                                }
                            })


                        }

                    }
                })

            }
        }
    })

})


router.get('/info/(:bed)', (req, res, next) => {
    let bed = req.params.bed
    let sql = "SELECT DISTINCT time from stockdrug as st LEFT JOIN patients as t on st.hn = t.hnId where t.bed = '" + bed + "' and st.status = 0 "
    let sql2 = "SELECT  * from stockdrug as st LEFT JOIN patients as t on st.hn = t.hnId where t.bed =  '" + bed + "'"
    let sql3 = "SELECT  *  from stockdrug as st LEFT JOIN patients as t on st.hn = t.hnId where t.bed = '" + bed + "' and st.status =0"
    if (req.session.loggedin && req.session.type == 2 || req.session.type == 'admin') {
        dbCon.query(sql, (err, result) => {
            if (err) {
                throw err;
            } else {
                if (!result.length > 0) {
                    res.redirect('/nurse/API/' + bed)
                } else {

                    dbCon.query(sql2, (err, results) => {
                        if (err) {
                            throw err;
                        } else {
                            dbCon.query(sql3, (err, rst) => {
                                if (err) {
                                    throw err;
                                } else {


                                    const mealBreakfast = []
                                    const mealLunch = []
                                    const dinner = []
                                    const eveing = []


                                    const countByAll = []
                                    const dispensing = []
                                    const offdrug = []
                                    const nextmeal = []
                                    results.forEach(key => {
                                        switch (key.status) {
                                            // case '0':
                                            //     countByAll.push(1)
                                            //     break;
                                            case '1':
                                                dispensing.push(1)
                                                break;
                                            case '2':
                                                offdrug.push(1)
                                                    break;
                                            case '3':
                                                nextmeal.push(1)
                                                        break;
                                        }
                                    });
                                    
                                    res.render('nurse/show-patient-info', {
                                        data: result,
                                        datamap: results,
                                        total: results.length,
                                                dispensing: dispensing.length,
                                                offdrug: offdrug.length,
                                                nextmeal: nextmeal.length,
                                        drug: rst,
                                        user: req.session.data,
                                        bed: bed,
                                        drugScan: '',
                                        mealScan: ''
                                    })
                                    //res.send({a:countByAll.length,b:countByStatus.length})
                                }
                            })

                        }
                    })


                }

            }
        })
    } else {
        res.redirect('/users/login')
    }

})


router.post('/info/(:bed)', (req, res, next) => {
    let bed = req.params.bed
    let codedrug = req.body.drug
    let sql = "SELECT DISTINCT time from stockdrug as st LEFT JOIN patients as t on st.hn = t.hnId where t.bed = '" + bed + "' and st.status = 0"
    let sql2 = "SELECT  * from stockdrug as st LEFT JOIN patients as t on st.hn = t.hnId where t.bed =  '" + bed + "'"
    let sql3 = "SELECT  *  from stockdrug as st LEFT JOIN patients as t on st.hn = t.hnId where t.bed = '" + bed + "' and st.status =0"
    let sql4 = "SELECT * from stockdrug as st LEFT JOIN patients as p on st.hn = p.hnId WHERE st.packId = '" + codedrug + "' and p.bed = '" + bed + "' "
    dbCon.query(sql4, (err, rs) => {
        if (!rs.length > 0) {
            req.flash('error', 'ไม่พบรหัสซองยา')
            res.redirect('/nurse/p/' + bed)
        } else {
            if (err) {
                throw err;
            } else {

                dbCon.query(sql, (err, result) => {
                    if (err) {
                        throw err;
                    } else {
                        if (!result.length > 0) {
                            res.redirect('/nurse/API/' + bed)
                        } else {

                            dbCon.query(sql2, (err, results) => {
                                if (err) {
                                    throw err;
                                } else {
                                    dbCon.query(sql3, (err, rst) => {
                                        if (err) {
                                            throw err;
                                        } else {


                                            const countByAll = []
                                            const dispensing = []
                                            const offdrug = []
                                            const nextmeal = []
                                            results.forEach(key => {
                                                switch (key.status) {
                                                    case '0':
                                                        countByAll.push(1)
                                                        break;

                                                    case '1':
                                                        dispensing.push(1)
                                                        break;
                                                    case '2':
                                                        offdrug.push(1)
                                                            break;
                                                    case '3':
                                                        nextmeal.push(1)
                                                                break;
                                                }
                                            });
                                            req.flash('success', '44')
                                            res.render('nurse/show-patient-info', {
                                                data: result,
                                                datamap: results,
                                                total: results.length,
                                                dispensing: dispensing.length,
                                                offdrug: offdrug.length,
                                                nextmeal: nextmeal.length,
                                                drug: rst,
                                                user: req.session.data,
                                                bed: bed,
                                                drugScan: rs
                                            })
                                            //res.send(})
                                        }
                                    })

                                }
                            })


                        }

                    }
                })

            }
        }
    })

})


router.get('/infobymeal/(:bed)/(:meal)', (req, res, next) => {
    let bed = req.params.bed
    let meal =req.params.meal
    let sql = "SELECT DISTINCT time from stockdrug as st LEFT JOIN patients as t on st.hn = t.hnId where t.bed = '" + bed + "' and st.status = 0 and st.meal ='"+meal+"'"
    let sql2 = "SELECT  * from stockdrug as st LEFT JOIN patients as t on st.hn = t.hnId where t.bed =  '" + bed + "'"
    let sql3 = "SELECT  *  from stockdrug as st LEFT JOIN patients as t on st.hn = t.hnId where t.bed = '" + bed + "' and st.status =0 and st.meal = '"+meal+"'"
    if (req.session.loggedin && req.session.type == 2 || req.session.type == 'admin') {
        dbCon.query(sql, (err, result) => {
            if (err) {
                throw err;
            } else {
                if (!result.length > 0) {
                    res.redirect('/nurse/API/' + bed)
                } else {

                    dbCon.query(sql2, (err, results) => {
                        if (err) {
                            throw err;
                        } else {
                            dbCon.query(sql3, (err, rst) => {
                                if (err) {
                                    throw err;
                                } else {


                                    const mealBreakfast = []
                                    const mealLunch = []
                                    const dinner = []
                                    const eveing = []


                                    const countByAll = []
                                    const countByStatus = []
                                    results.forEach(key => {
                                        switch (key.status) {
                                            case '0':
                                                countByAll.push(1)
                                                break;

                                            case '1':
                                                countByStatus.push(1)
                                                break;
                                        }
                                    });
                                    res.render('nurse/show-patient-infobymeal', {
                                        data: result,
                                        datamap: results,
                                        a: results.length,
                                        b: countByStatus.length,
                                        drug: rst,
                                        user: req.session.data,
                                        bed: bed,
                                        drugScan: '',
                                        mealScan: '',
                                        meal:meal
                                    })
                                    //res.send({a:countByAll.length,b:countByStatus.length})
                                }
                            })

                        }
                    })


                }

            }
        })
    } else {
        res.redirect('/users/login')
    }

})


router.post('/p/(:bed)/(:meal)', (req, res, next) => {
    let codedrug = req.body.drug
    let bed = req.params.bed
    let meal = req.params.meal
    let sql = "SELECT DISTINCT time from stockdrug as st LEFT JOIN patients as t on st.hn = t.hnId where t.bed = '" + bed + "' and st.status = 0 and st.meal ='" + meal + "'"
    let sql2 = "SELECT  * from stockdrug as st LEFT JOIN patients as t on st.hn = t.hnId where t.bed =  '" + bed + "' and st.meal ='" + meal + "'"
    let sql3 = "SELECT  *  from stockdrug as st LEFT JOIN patients as t on st.hn = t.hnId where t.bed = '" + bed + "' and st.status =0 and st.meal ='" + meal + "'"
    let sql4 = "SELECT * from stockdrug as st LEFT JOIN patients as p on st.hn = p.hnId WHERE st.packId = '" + codedrug + "' and p.bed = '" + bed + "' and st.meal ='" + meal + "' "
    dbCon.query(sql4, (err, rs) => {
        if (!rs.length > 0) {
            req.flash('error', 'nomeal')
            res.redirect('/nurse/p/' + bed + '/' + meal)
        } else {


            if (err) {
                req.flash('error', 'nomeal3')
           
                res.redirect('/nurse/p/' + bed + '/' + meal)
            } else {
                dbCon.query(sql, (err, result) => {
                    if (err) {
                        req.flash('error', 'nomeal3')
           
            res.redirect('/nurse/p/' + bed + '/' + meal)
                    } else {
                        if (!result.length > 0) {
                            res.redirect('/nurse/API/' + bed)
                        } else {

                            dbCon.query(sql2, (err, results) => {
                                if (err) {
                                    throw err;
                                } else {
                                    dbCon.query(sql3, (err, rst) => {
                                        if (err) {
                                            throw err;
                                        } else {


                                            const countByAll = []
                                            const countByStatus = []
                                            results.forEach(key => {
                                                switch (key.status) {
                                                    case '0':
                                                        countByAll.push(1)
                                                        break;

                                                    case '1':
                                                        countByStatus.push(1)
                                                        break;
                                                }
                                            });
                                            req.flash('success', 'กรุณาป้อนหมายเลขรหัสบนซองยา')
                                            res.render('nurse/show-patientbymeal', {
                                                data: result,
                                                datamap: results,
                                                a: results.length,
                                                b: countByStatus.length,
                                                drug: rst,
                                                user: req.session.data,
                                                bed: bed,
                                                drugScan: rs,
                                                mealScan: meal
                                            })
                                            //res.send(})
                                        }
                                    })

                                }
                            })


                        }

                    }
                })

            }
        }
    })
})

router.get('/API/(:bed)', (req, res, next) => {
    let bed = req.params.bed
    let sql2 = "SELECT  * from stockdrug as st LEFT JOIN patients as t on st.hn = t.hnId where t.bed =  '" + bed + "'"
    if (req.session.loggedin && req.session.type == 2 || req.session.type == 'admin') {

        dbCon.query(sql2, (err, results) => {
            if (err) {
                throw err;
            } else {
                if (results.length > 0) {

                                    const dispensing = []
                                    const offdrug = []
                                    const nextmeal = []
                                    results.forEach(key => {
                                        switch (key.status) {
                                            // case '0':
                                            //     countByAll.push(1)
                                            //     break;
                                            case '1':
                                                dispensing.push(1)
                                                break;
                                            case '2':
                                                offdrug.push(1)
                                                    break;
                                            case '3':
                                                nextmeal.push(1)
                                                        break;
                                        }
                                    });
                   
                    res.render('nurse/shows-patients-infos', {

                        datamap: results,
                        total: results.length,
                        dispensing: dispensing.length,
                        offdrug: offdrug.length,
                        nextmeal: nextmeal.length,
                        user: req.session.data


                    })
                } else {
                    req.flash('error', 'ไม่มีผู้ป่วยคนนี้')
                    res.redirect('/nurse')
                }

                //res.send({a:countByAll.length,b:countByStatus.length})
            }
        })
    } else {
        res.redirect('/users/login')
    }
})




// show all drug
router.get('/showalldrug/(:hn)', (req, res, next) => {
    let bed = req.params.bed
    let meal = req.params.meal
    let sql = "SELECT DISTINCT* from stockdrug as st LEFT JOIN patients as t on st.hn = t.hnId where t.bed = '" + bed + "' and st.meal = '" + meal + "' and st.status=0 "
})






// จ่ายยา
router.get('/dispensing/(:bed)/(:packid)/(:meal)', (req, res, next) => {
    // let name = req.body.name
    let packid = req.params.packid
    let bed = req.params.bed
    let meal = req.params.meal
    let sql = "UPDATE stockdrug SET status = 1 WHERE stockdrug.packId = '" + packid + "'"
    if (req.session.loggedin && req.session.type == 2 || req.session.type == 'admin') {
        dbCon.query(sql, (err, rs) => {
            if (err) {
                throw err;
            } else {
                res.redirect('/nurse/p/' + bed + '/' + meal)
            }
        })
    } else {
        res.redirect('/users/login')
    }

    console.log()
})

router.post('/nextmeal/(:bed)/(:packid)/(:meal)', (req, res, next) => {
    let select = req.body.selectremark
    let name = req.body.name
    let remark = req.body.remark
    console.log(select,name,remark)
    // let status = req.body.status
    // let packid = req.params.packid
    // let bed = req.params.bed
    // let meal = req.params.meal
    // let sql = "UPDATE stockdrug SET status = '" + status + "' WHERE stockdrug.packId = '" + packid + "'"
    // if (req.session.loggedin && req.session.type == 2 || req.session.type == 'admin') {
    //     dbCon.query(sql, (err, rs) => {
    //         if (err) {
    //             throw err;
    //         } else {
    //             res.redirect('/nurse/p/' + bed + '/' + packid)
    //         }
    //     })
    // } else {
    //     res.redirect('/users/login')
    // }
    // console.log(status)
})


router.post('/nextmeal/(:bed)/(:packid)/(:meal)', (req, res, next) => {

    let status = req.body.status
    let packid = req.params.packid
    let bed = req.params.bed
    let meal = req.params.meal
    let sql = "UPDATE stockdrug SET status = '" + status + "' WHERE stockdrug.packId = '" + packid + "'"
    if (req.session.loggedin && req.session.type == 2 || req.session.type == 'admin') {
        dbCon.query(sql, (err, rs) => {
            if (err) {
                throw err;
            } else {
                res.redirect('/nurse/p/' + bed + '/' + packid)
            }
        })
    } else {
        res.redirect('/users/login')
    }
    console.log(status)
})
router.get('/drugoff/(:bed)/(:packid)/(:meal)', (req, res, next) => {
    let packid = req.params.packid
    let bed = req.params.bed
    let meal = req.params.meal
    let sql = "UPDATE stockdrug SET status = 2 WHERE stockdrug.packId = '" + packid + "'"
    if (req.session.loggedin && req.session.type == 2 || req.session.type == 'admin') {
        dbCon.query(sql, (err, rs) => {
            if (err) {
                throw err;
            } else {
                res.redirect('/nurse/p/' + bed + '/' + meal)
            }
        })
    } else {
        res.redirect('/users/login')
    }

})

router.get('/dispensinginfo/(:bed)/(:packid)/(:meal)', (req, res, next) => {
    // let name = req.body.name
    let packid = req.params.packid
    let bed = req.params.bed
    let meal = req.params.meal
    let sql = "UPDATE stockdrug SET status = 1 WHERE stockdrug.packId = '" + packid + "'"
    if (req.session.loggedin && req.session.type == 2 || req.session.type == 'admin') {
        dbCon.query(sql, (err, rs) => {
            if (err) {
                throw err;
            } else {
                res.redirect('/nurse/p/' + bed)
            }
        })
    } else {
        res.redirect('/users/login')
    }

    console.log()
})




router.post('/nextmealinfo/(:bed)/(:packid)/(:meal)',(req, res, next) => {
    let list = req.body.selectremark
    let name = req.body.name
    let remark = req.body.remark
    const setData ={
        status:3,
        remarkdrug:list,
        doctor:name,
        remark:remark
    }
    console.log(list,name,remark)
    //let status = req.body.status
    let packid = req.params.packid
    let bed = req.params.bed
    let meal = req.params.meal
    let sql = "UPDATE stockdrug SET ? WHERE stockdrug.packId = '" + packid + "'"
    if (req.session.loggedin && req.session.type == 2 || req.session.type == 'admin') {
        dbCon.query(sql, setData,(err, rs) => {
            if (err) {
                throw err;
            } else {
                req.flash('success','บันทึกเหตุผลสั่งเลื่อนมื้อยา')
                res.redirect('/nurse/info/' + bed)
            }
        })
    } else {
        res.redirect('/users/login')
    }
 
})
router.post('/drugoffinfo/(:bed)/(:packid)/(:meal)', [

],(req, res, next) => {
    let list = req.body.selectremark
    let name = req.body.name
    let remark = req.body.remark
    console.log(list,name,remark)
    let packid = req.params.packid
    let bed = req.params.bed
    let meal = req.params.meal
    const setData ={
        status:2,
        remarkdrug:list,
        doctor:name,
        remark:remark
    }
    let sql = "UPDATE stockdrug SET ? WHERE stockdrug.packId = '" + packid + "'"
    if (req.session.loggedin && req.session.type == 2 || req.session.type == 'admin') {
        dbCon.query(sql, setData,(err, rs) => {
            if (err) {
                throw err;
            } else {
                req.flash('success','บันทึกเหตุผลการสั่งหยุดยา')
                res.redirect('/nurse/info/' + bed)
            }
        })
    } else {
        res.redirect('/users/login')
    }

})

/// bymea;
router.post('/nextmealinfobymeal/(:bed)/(:packid)/(:meal)',(req, res, next) => {
    let list = req.body.selectremark
    let name = req.body.name
    let remark = req.body.remark
    const setData ={
        status:3,
        remarkdrug:list,
        doctor:name,
        remark:remark
    }
    console.log(list,name,remark)
    //let status = req.body.status
    let packid = req.params.packid
    let bed = req.params.bed
    let meal = req.params.meal
    let sql = "UPDATE stockdrug SET ? WHERE stockdrug.packId = '" + packid + "'"
    if (req.session.loggedin && req.session.type == 2 || req.session.type == 'admin') {
        dbCon.query(sql, setData,(err, rs) => {
            if (err) {
                throw err;
            } else {
                req.flash('success','บันทึกเหตุผลสั่งเลื่อนมื้อยา')
                res.redirect('/nurse/infobymeal/'+bed+'/'+meal)
            }
        })
    } else {
        res.redirect('/users/login')
    }
 
})
router.post('/drugoffinfobymeal/(:bed)/(:packid)/(:meal)', [

],(req, res, next) => {
    let list = req.body.selectremark
    let name = req.body.name
    let remark = req.body.remark
    console.log(list,name,remark)
    let packid = req.params.packid
    let bed = req.params.bed
    let meal = req.params.meal
    const setData ={
        status:2,
        remarkdrug:list,
        doctor:name,
        remark:remark
    }
    let sql = "UPDATE stockdrug SET ? WHERE stockdrug.packId = '" + packid + "'"
    if (req.session.loggedin && req.session.type == 2 || req.session.type == 'admin') {
        dbCon.query(sql, setData,(err, rs) => {
            if (err) {
                throw err;
            } else {
                req.flash('success','บันทึกเหตุผลการสั่งหยุดยา')
                res.redirect('/nurse/infobymeal/'+bed+'/'+meal)
            
            }
        })
    } else {
        res.redirect('/users/login')
    }

})







router.get('/test/(:id)',async (req, res, next) => {
   
    let port = req.params.id.substr(0,1)
    let code = req.params.id.substr(1)
    function sendBluetooth(port, code) {
        
        let options = {
            mode: 'text',
            pythonOptions: ['-u'], // get print results in real-time 
            scriptPath: '', //If you are having python_test.py script in same folder, then it's optional. 
            args: [port, code] //An argument which can be accessed in the script using sys.argv[1] 
        };
        PythonShell.run('send_bt.py', options, function (err, result) {
            if (err) throw err;
            console.log('result: ', result.toString());
           
        });
    }

    function send_bluetooth() {
        let options = { 
            mode: 'text', 
            pythonOptions: ['-u'], // get print results in real-time 
              scriptPath: '', //If you are having python_test.py script in same folder, then it's optional. 
            args: ['1'] //An argument which can be accessed in the script using sys.argv[1] 
          }; 
        PythonShell.run('getconnect_bt.py', options, function (err, result){ 
              if (err) throw err; 
              console.log('result: ', result.toString());
              const rfcomm = 
                   {tray1:tray1,
                    tray2:result[1].substr(6,1),
                }
                switch (port) {
                    case 'A':
                        sendBluetooth(rfcomm.tray1, code)
                        break;
                    case 'B':
                        sendBluetooth(rfcomm.tray2, code)
                        break;
                    case 'C':
                        sendBluetooth(rfcomm.tray3, code)
                        break;
                    case 'D':
                        sendBluetooth(rfcomm.tray4, code)
                        break;
                    case 'E':
                        sendBluetooth(rfcomm.tray5, code)
                        break;
                    default:
                        break;
                }
        });
    }
    
 
})
module.exports = router
