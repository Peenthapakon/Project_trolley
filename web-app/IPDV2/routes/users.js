var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt')
var User=require('../models/user');
const dbCon = require('../lib/db')
const fetch = require('node-fetch');

const {
  check,
  validationResult
} = require('express-validator');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/login', function(req, res, next) {
  res.render('admin/index',{
    errors:''
  })
});

router.post('/login',[
  check('username').not().isEmpty().withMessage('กรุณากรอกชื่อผู้ใช้'),
  check('password').not().isEmpty().withMessage('กรุณากรอกรหัสผู้ใช้'),
], (req, res)=> {
  let username = req.body.username;
  let password = req.body.password
  var hour = 3600000
  req.session.cookie.expires = new Date(Date.now() + hour)
  let errors = false;
  const err = validationResult(req)
  const data = {
    name:username,
    password:password
  }
  if (username && password) {
      dbCon.query("SELECT * from User as u LEFT JOIN instructor as i ON u.username = i.username  WHERE u.username = '"+username+"'", 
      (error, results, fields)=> {
      if (results.length > 0){
        switch (results[0].type) {
          case 'admin':
            if (results[0].type == 'admin') {
              req.session.loggedin = true;
              req.session.type = results[0].type
              req.session.username = results[0].username;
              req.session.data = results[0]
              res.redirect('dashboard')
              res.end();
              break;
          } else {
            req.flash('error','ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง')
            res.redirect('login')
            res.end();
            break;
          } 
          case '1':
            if (bcrypt.compareSync(password, results[0].password)) {
              req.session.loggedin = true;
              req.session.type = results[0].type
              req.session.username = results[0].username;
              req.session.data = results[0]
              res.redirect('/trolley/detail-trolley/1')
              res.end();
              break;
          } else {
            req.flash('error','ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง')
            res.redirect('login')
            res.end();
            break;
          }  
            break;
            case '2':
              if (bcrypt.compareSync(password, results[0].password)) {
                req.session.loggedin = true;
                req.session.type = results[0].type
                req.session.username = results[0].username;
                req.session.data = results[0]
                res.redirect('/nurse')
                res.end();
                break;
            } else {
              req.flash('error','ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง')
              res.redirect('login')
              res.end();
              break;
            }  
            default : 
            req.flash('error','ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง')
            res.redirect('login')
            res.end();
            break;
          
        }
      }else{
        req.flash('error','ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง')
        res.redirect('login')
        res.end();
      }
  

      });
  } else {
      req.flash('error','ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง')
      res.redirect('login');
  }

});

router.get('/add', function(req, res, next) {
  res.render('admin/adduser',{errors:'',
  username:'',
  password:'',
  fname:'',
  lname:'',
  position:'',
  type:''

})
});

router.post('/add',[

  check('username').not().isEmpty().withMessage('กรุณากรอกชื่อผู้ใช้'),
  check('password').not().isEmpty().withMessage('กรุณากรอกรหัสผู้ใช้'),
  check('fname').not().isEmpty().withMessage('กรุณาป้อนชื่อผู้รับผิดชอบ'),
  check('lname').not().isEmpty().withMessage('กรุณาป้อนนามสกุล'),
  check('position').not().isEmpty().withMessage('กรุณาป้อนตำแหน่งงาน'),
  check('type').not().isEmpty().withMessage('เลือกประเภทผู้ใช้')

], async (req, res, next)=>{
  let username = req.body.username
  let fname = req.body.fname
  let lname = req.body.lname
  let password= req.body.password
  let type = req.body.type
  let position = req.body.position
  
  const result = validationResult(req)

  if (username.length === 0 && fname.length === 0&&lname.length === 0&&fname.length === 0&&password.length === 0&&position.length === 0&&type.length === 0){
    res.render('admin/adduser', {
      errors: result.mapped(),
      username:username,
      password:password,
      fname:fname,
      lname:lname,
      position:position,
      type:type
  })
  }else{
  if(type == 'admin'){
    let newPerson ={
      username:username,
      fname:fname,
      lname:lname,
      position:position,
      type:type
    }
      
    let user ={
    username:username,
    password:await bcrypt.hash(req.body.password,10),
    type:type
  }
    //sql
    dbCon.query("INSERT INTO  User set ?",user,(err,response)=>{
      if(err){
        throw err;
        // req.flash('error','sss')
        // res.redirect('add')
        
      }
      else{
        dbCon.query("INSERT INTO  instructor set ?",newPerson,(err,response)=>{
          if(err){
            throw err;
            // req.flash('error','sss')
            // res.redirect('add')
            
          }
          else{
            
            req.flash('success','sss')
            res.redirect('/users/dashboard')
            
          }
        })
        
      }
    })
  }
  else{
    let newPerson ={
      username:username,
      fname:fname,
      lname:lname,
      position:position,
      type:type
    }
      
    let user ={
    username:username,
    password:await bcrypt.hash(req.body.password,10),
    type:type
  }
   //sql
   dbCon.query("INSERT INTO  User set ?",user,(err,response)=>{
    if(err){
      req.flash('error','1')
      res.redirect('add')
    }
    else{
      dbCon.query("INSERT INTO  instructor set ?",newPerson,(err,response)=>{
        if(err){
          req.flash('error','2')
          res.redirect('add')
        
        }
        else{
          req.flash('success','sss')
          res.redirect('/users/dashboard')
          }
      })
    }
  })
  }
}

  

}) 
router.get('/dashboard', (req, res) => {
  let sql = "SELECT * from instructor where not type = 'admin'"
  if (req.session.loggedin && req.session.type == 'admin') {
    dbCon.query(sql,(err,response)=>{
      if(err){
        
        res.redirect('/users/dashboard')
      }else{
        res.render('admin/dashboad',{
          data:response,
         
          user:req.session.username
        })
        //res.send(req.headers)
      }
    })
 
  } else {
    res.redirect('login')
  }
})
router.get('/changepassword/(:username)', function(req, res, next) {
  let username = req.params.username
  let sql = "SELECT * FROM `User` as u LEFT JOIN instructor as i on u.username = i.username  WHERE u.username = '"+username+"'"
  if (req.session.loggedin && req.session.type == 'admin') {
  dbCon.query(sql,(err,result)=>{
    if(err){
      throw err;
    }else{
      res.render('admin/changepassword',{errors:'',data:result})
      
    }
    
  })}  else {
    res.redirect('login')
  }

});
router.post('/updatepassword/(:username)',[
  check('password').not().isEmpty().withMessage('กรุณากรอกรหัสผู้ใช้'),
],async function(req, res, next) {
  if (req.session.loggedin && req.session.type == 'admin') {
  let username = req.params.username
  let password = req.body.password
  const hashedPassword = await bcrypt.hash(password,10)
  let sql = "UPDATE User SET  password = '"+hashedPassword+"' WHERE User.username = '"+username+"';"
  dbCon.query(sql,(err,result)=>{
    if(err){
      throw err;
    }else{
      res.redirect('/users/dashboard')
      
    } 
  })
} else {
  res.redirect('login')
}
});
router.get('/delete/(:username)',(req, res)=>{
  let username = req.params.username
  let sql = "DELETE FROM User WHERE username = '"+username+"'"
  let sql2 = "DELETE FROM instructor WHERE username = '"+username+"'"
  dbCon.query(sql,(err,result)=>{
    if(err){
      throw err;
    }else{
      dbCon.query(sql2,(err,result)=>{
        if(err){
          throw err;
        }else{
          
          res.redirect('/users/dashboard')
          
        } 
      })
    } 
  })

 
})

router.get('/logout',(req, res)=>{
  req.session.destroy(function (err) {
    res.redirect('login'); //Inside a callback… bulletproof!
   });
})
router.get('/test', async (req, res)=>{

  const data = await fetch("https://jsonplaceholder.typicode.com/posts?fbclid=IwAR3nqXRqUpKibK-y1mKRnvrgDX-nLReHEI8BtJ4i_t9uF1Rrg9Hmgs3Tams", {
    headers: { "Content-Type": "application/json; charset=UTF-8"},
    method: "POST",
    body: JSON.stringify(
      {
        "userId": "1",
        "title": "1",
        "body": "1",
        
        
      },
     
    
  )
  }).then(res => res.json());
  
 
console.log(data);


})



module.exports = router;


