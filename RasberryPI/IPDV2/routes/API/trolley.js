const Swal = require('sweetalert2')
const result = []
const {
    check,
    validationResult
} = require('express-validator')
let {PythonShell} = require('python-shell')
var spawn = require("child_process").spawn; 
const fetch = require('node-fetch');
var express = require('express');
var router = express.Router();
const data1 = require('../../data')
const db = require("../../models");
const Tutorial = db.tutorials;
const Drug = db.drugs;
const dbCon = require('../../lib/db')
const CsvParser = require("json2csv").Parser;
const excel = require("exceljs");
const { forEach } = require('../../data');
// blue_tooth

function send_bt(codebox,number) {
    let options = { 
        mode: 'text', 
        pythonOptions: ['-u'], // get print results in real-time 
          scriptPath: '', //If you are having python_test.py script in same folder, then it's optional. 
        args: [codebox] //An argument which can be accessed in the script using sys.argv[1] 
      }; 
    PythonShell.run('getconnect_bt.py', options, function (err, result){ 
          if (err) {
            throw err
          } 

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
        if (err) {
            throw err
        };
        console.log('result: ', result.toString());
       
    });
}

// blue_tooth
//-----------------------------------------------------
    // render index 
router.get('/', (req, res, next) => {
if (req.session.loggedin && req.session.type == 1 ||req.session.type == 'admin') {
       res.render('content/index', { data: data1 });
}else{
    res.redirect('/users/login')
}
     


    })


// รายละเอียดรถเข็นจ่ายยา
router.get('/detail-trolley/(:id)', (req, res, next) => {
    if (req.session.loggedin && req.session.type == 1 ||req.session.type == 'admin') {
        let id = req.params.id
        const result = data1.filter((member) => {
            if (member.tId == id) {
                return member
            }
        })
        const data = result
        res.render('content/detail-trolley', { flash: 1, data1: result[0], id: id, data: '', user:req.session.data})
 }else{
     res.redirect('/users/login')
 }
    


})


// check drug ID
router.post('/detail-trolley/(:id)', [
    check('drugId', 'กรุณาป้อนหมายเลขรหัสบนซองยา').not().isEmpty()
], (req, res, next) => {
    let tid = req.params.id
    let id = req.body.drugId
    const results = validationResult(req)
    var errors = results.errors
    let user = req.session.data
   
    
if (req.session.loggedin && req.session.type == 1 ||req.session.type == 'admin') {
       const result = data1.filter((member) => {
        if (member.tId == tid) {
            return member
        }
    })
    if (!results.isEmpty()) {
        res.render('content/detail-trolley', {
            errors: errors,
            flash: 1,
            data1: result[0],
            id: id,
            data: '',
            user:user
        })
    } else {
        const data = result
        let sql = "SELECT * FROM drug as d LEFT JOIN patients as t on d.hnId = t.hnId WHERE d.packId = '" + id + "' "
        let store = []
        store.push(data)
        if (!id) {
            req.flash('error', 'err1')
            res.redirect('/trolley/detail-trolley/1')
        }
            dbCon.query(sql, (err, rows) => {
                if (err) {
                    // res.send(err)
                    res.redirect('/trolley/detail-trolley/1')
                } else {
             if (rows.length > 0 ){
              
                
              let form_data = {
                            packId: rows[0].packId,
                            name: rows[0].packName,
                            meal: rows[0].packMeal,
                            typeMeal: rows[0].typeMeal,
                            time: rows[0].time,
                            unit: rows[0].packUnit,
                            status: rows[0].status,
                            hn: rows[0].hnId,
                            codebox: rows[0].codebox,
                }
                        //res.send(form_data.packId) 
                    dbCon.query('INSERT INTO stockdrug SET ?', form_data, (err, results) => {
                        if (err) {
                            //res.send(err);
                            req.flash('error', 'err1')
                            res.redirect('/trolley/detail-trolley/1')
                        } else {
                            // let stringCode = rows[0].codebox.substr(0,1)
                            // let number = rows[0].codebox.substr(1,1)
                            // console.log(stringCode,number)
                            // send_bt(stringCode,number)
                            //res.send(number)
                            req.flash('success', 'กรุณาป้อนหมายเลขรหัสบนซองยา')
                            res.render('content/detail-trolley', { flash: 1, data1: result[0], id: id, data: rows , user:user})
                        }
                    })
                }else{
                    req.flash('error', 'err2')
                    res.redirect('/trolley/detail-trolley/1')
                }
      


                }
            })
        

    }


    // const data = data1[0].tpatient
    // const result = data.filter((member) => {
    //         return member
    // })
    // res.send(result)

} else {
    res.redirect('/users/login')
}
 


})



// เพิ่มข้อมูลผู้ป่วย
router.get('/uploadtrolley', (req, res, next) => {
    if (req.session.loggedin && req.session.type == 1 ||req.session.type == 'admin') {
     res.render('content/uploadtrolley', {
        data: ''
    })
    } else {
        res.redirect('/users/login')
    }
   
})
router.get('/uploadlistdrug', (req, res, next) => {
    if (req.session.loggedin && req.session.type == 1 ||req.session.type == 'admin') {
     res.render('content/uploadlistdrug', {
        data: ''
    })
    } else {
        res.redirect('/users/login')
    }
   
})

router.get('/resetcsv', (req, res, next) => {
    if (req.session.loggedin && req.session.type == 1 ||req.session.type == 'admin') {
   
     db.tutorials.drop();
     db.drugs.drop();
     db.stockdrug.drop();
     setTimeout(() => {
        db.sequelize.sync();
     }, 1000);
    
    res.redirect('/trolley/detail-trolley/1')
    } else {
        res.redirect('/users/login')
    }
   
   


})
router.get('/resetpatient', (req, res, next) => {
    if (req.session.loggedin && req.session.type == 1 ||req.session.type == 'admin') {
    
    db.tutorials.drop();
    setTimeout(() => {
        db.sequelize.sync();
     }, 1000);
    res.redirect('/trolley/uploadtrolley')
    } else {
        res.redirect('/users/login')
    }
   
   


})
router.get('/resetdrug', (req, res, next) => {
    if (req.session.loggedin && req.session.type == 1 ||req.session.type == 'admin') {
     
    db.drugs.drop();
    setTimeout(() => {
        db.sequelize.sync();
     }, 1000);
    res.redirect('/trolley/uploadlistdrug')

    } else {
        res.redirect('/users/login')
    }
   
  

})

// เพิ่มข้อมูลการทานยา
router.get('/getallperson', (req, res, next) => {
    if (req.session.loggedin && req.session.type == 1 ||req.session.type == 'admin') {
       //sql 
    Tutorial.findAll()
        .then((data) => {
            res.render('content/getallpatient', {
                data: data
            })
        })
        .catch((err) => {
            res.render('content/getallpatient', {
                data: ''
            })
        });
    } else {
        res.redirect('/users/login')
    }

 
})



//get all drug
router.get('/getalldrug', (req, res, next) => {
        let sql = "select *,d.packId  as pid ,d.typeMeal as typemeal from drug as d LEFT JOIN stockdrug as st on d.packId = st.packId ORDER BY st.packId DESC"
        
    if (req.session.loggedin && req.session.type == 1 ||req.session.type == 'admin') {
      dbCon.query(sql,(err,result)=>{
        if(err){
            throw err;
        }else{
            res.render('content/getlistdrug', {
                          data: result
                       })
           // res.send(result)
        }
    })
    } else {
        res.redirect('/users/login')
    }
  


})




router.get('/delete/(:id)', (req, res, next) => {
    let id = req.params.id;
    if (req.session.loggedin && req.session.type == 1 ||req.session.type == 'admin') {
    dbCon.query('DELETE FROM trolley WHERE id = ' + id, (err, result) => {
        if (err) {
            req.flash('error', err);
            res.redirect('/trolley');
        } else {

            res.redirect('/trolley');
        }
    })
    } else {
        res.redirect('/users/login')
    }
    
})
router.get('/exportdurg', (req, res, next) => {
    let sql = "SELECT st.packId,st.name,st.meal,st.unit,st.typeMeal,st.remarkdrug,st.doctor,st.remark  FROM stockdrug as st LEFT JOIN  patients as p ON st.hn = p.hnId  WHERE st.status = 2 or st.status = 0 or st.status = 3 or st.status = 4 "
    if (req.session.loggedin && req.session.type == 1 ||req.session.type == 'admin') {
    dbCon.query(sql,(err,data)=>{
        if(err){
            throw err;
        }else{
             let patient = []
             
            data.forEach(key => {
              
                const {packId,name,meal,unit,typeMeal,remarkdrug,doctor,remark} = key
                switch (key.meal) {
                    case "BB":
                        patient.push({รหัสซองยา:packId,ชื่อยา:name,จำนวน:unit,หน่วย:typeMeal,มื้อยา:"เช้าก่อนอาหาร",คำสั่งเลื่อนหยุดยา:remarkdrug,แพทย์คนสั่ง:doctor,เหตุผลเพิ่มเติม:remark})
                        break;
                        case "AB":
                        patient.push({รหัสซองยา:packId,ชื่อยา:name,จำนวน:unit,หน่วย:typeMeal,มื้อยา:"เช้าหลังอาหาร",คำสั่งเลื่อนหยุดยา:remarkdrug,แพทย์คนสั่ง:doctor,เหตุผลเพิ่มเติม:remark})
                        break;
                        case "BL":
                        patient.push({รหัสซองยา:packId,ชื่อยา:name,จำนวน:unit,หน่วย:typeMeal,มื้อยา:"เที่ยงก่อนอาหาร",คำสั่งเลื่อนหยุดยา:remarkdrug,แพทย์คนสั่ง:doctor,เหตุผลเพิ่มเติม:remark})
                        break;
                        case "AL":
                        patient.push({รหัสซองยา:packId,ชื่อยา:name,จำนวน:unit,หน่วย:typeMeal,มื้อยา:"เที่ยงหลังอาหาร",คำสั่งเลื่อนหยุดยา:remarkdrug,แพทย์คนสั่ง:doctor,เหตุผลเพิ่มเติม:remark})
                        break;
                        case "BD":
                        patient.push({รหัสซองยา:packId,ชื่อยา:name,จำนวน:unit,หน่วย:typeMeal,มื้อยา:"เย็นก่อนอาหาร",คำสั่งเลื่อนหยุดยา:remarkdrug,แพทย์คนสั่ง:doctor,เหตุผลเพิ่มเติม:remark})
                            break;
                        case "AD":
                             patient.push({รหัสซองยา:packId,ชื่อยา:name,จำนวน:unit,หน่วย:typeMeal,มื้อยา:"เย็นหลังอาหาร",คำสั่งเลื่อนหยุดยา:remarkdrug,แพทย์คนสั่ง:doctor,เหตุผลเพิ่มเติม:remark})
                            break;
                        case "BE":
                            patient.push({รหัสซองยา:packId,ชื่อยา:name,จำนวน:unit,หน่วย:typeMeal,มื้อยา:"ก่อนนอน",คำสั่งเลื่อนหยุดยา:remarkdrug,แพทย์คนสั่ง:doctor,เหตุผลเพิ่มเติม:remark})
                        break;
                }

            });

         //res.send(patient)
            const csvFields = ["รหัสซองยา","ชื่อยา","จำนวน","มื้อยา","คำสั่งเลื่อน/หยุดยา","แพทย์คนสั่ง","เหตุผลเพิ่มเติม"];
            const csvParser = new CsvParser({csvFields,withBOM:true});
            const csvData = csvParser.parse(patient)
            res.setHeader("Content-Type", "application/csv" );
            var newFileName = encodeURIComponent("รายการคินยา.csv");
            res.setHeader('Content-Disposition', 'attachment;filename*=utf-8\'\''+newFileName);
            res.status(200).end(csvData);
             //res.send(csvParser.parse(patient))
        }
    })
    } else {
        res.redirect('/users/login')
    }
    
})
router.get('/downloadcsv', (req, res, next) => {
    let sql = "SELECT * FROM patients"
    if (req.session.loggedin && req.session.type == 1 ||req.session.type == 'admin') {
    dbCon.query(sql,(err,data)=>{
        if(err){
            throw err;
        }else{
            let patient = []
            data.forEach(key => {
                const {id,ward,hnId,fullname,bed} = key
                patient.push({ไอดี:id,หอผู้ป่วย:ward,HN:hnId,'ชื่อนาม-สกุล':fullname,เตียง:bed})
            });
            //res.send(patient)
            const csvFields = ["ไอดี","หอผู้ป่วย","HN","ชื่อ-นามสกุล","เตียง"];
            const csvParser = new CsvParser(csvFields);
            const csvData = csvParser.parse(patient)
            res.setHeader("Content-Type", "application/csv" );
            var newFileName = encodeURIComponent("รายการคินยา.csv");
            res.setHeader('Content-Disposition', 'attachment;filename*=utf-8\'\''+newFileName);
            res.status(200).end(csvData);
            //res.send(csvParser.parse(patient))
        }
    })
    } else {
        res.redirect('/users/login')
    }
    
})
router.get('/downloadxlx', (req, res, next) => {
    let sql = "SELECT DISTINCT st.hn,p.fullname,p.bed ,count(meal) as total , SUM(st.status=1) as dispensing ,(count(meal)-sum(st.status=1)) as turn FROM stockdrug as st LEFT JOIN patients as p  on st.hn = p.hnId GROUP by st.hn"
    if (req.session.loggedin && req.session.type == 1 ||req.session.type == 'admin') {
     dbCon.query(sql,(err,data)=>{
        if(err){
            throw err;
        }else{
            let patient = []
            data.forEach(key => {
                const {hn,fullname,bed,total,dispensing,turn} = key
                patient.push({hn,fullname,bed,total,dispensing,turn})
            });
            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet("patinet");
            worksheet.columns = [
                { header: "Hn", key: "hn", width: 5 },
                { header: "ชื่อ-นามสกุล", key: "fullname", width: 25},
                { header: "ทั้งหมด", key: "total", width: 10 },
                { header: "จ่าย", key: "dispensing", width: 10 },
                { header: "เหลือ", key: "turn", width: 10 },
               
              ];
            
              worksheet.addRows(patient);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    var newFileName = encodeURIComponent("รายการคินยา.xlsx");
    res.setHeader('Content-Disposition', 'attachment;filename*=utf-8\'\''+newFileName);

    return workbook.xlsx.write(res).then(function () {
      res.status(200).end();
    });
        }
    })
    } else {
        res.redirect('/users/login')
    }
   
})
router.get('/reportdrug', (req, res, next) => {
    let sql = "SELECT *  FROM stockdrug as st LEFT JOIN  patients as p ON st.hn = p.hnId  WHERE st.status = 2 or st.status = 0 or st.status = 3 or st.status = 4"
    if (req.session.loggedin && req.session.type == 1 ||req.session.type == 'admin') {
    dbCon.query(sql,(err, rows)=>{
        if (err){
            throw err;

        }else{
            res.render('content/report', {
                data: rows
    
            })
         //  res.send(rows)
        }
    })
    } else {
        res.redirect('/users/login')
    }
    
})
router.get('/openalldrawer', (req, res, next) => {
    if (req.session.loggedin && req.session.type == 1 ||req.session.type == 'admin') {
        send_bt("A",10)  
        send_bt('B',10)
        setTimeout(() => {
            // send_bt('C',10)
            // send_bt('D',10)
            // send_bt('E',10)
        }, 1000);
     
        res.redirect('/trolley/reportdrug')
       
      
} else {
    res.redirect('/users/login')
}
})
module.exports = router
