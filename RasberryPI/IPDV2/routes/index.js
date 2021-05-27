var express = require('express');
var router = express.Router();
let {PythonShell} = require('python-shell')
var spawn = require("child_process").spawn; 
var device = "hci0";
const csvController = require("../controllers/tutorial/csv.controller");

const upload = require("../middleware/upload");

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.session.loggedin) {
    res.render('index', {
      title: 'Express'
    });
  } else {
    res.redirect('/users/login')
  }


});
/* GET home page. */
router.get('/managetrollet', function (req, res, next) {
  res.send('connect bluetooth')
});

router.post('/upload', upload.single("file"), csvController.upload)
router.get('/tutorials', csvController.getTutorials)

router.post('/uploaddrug', upload.single("file"), csvController.uploadDrug)

router.get('/drawer', function(req, res, next) {
  let port = []
  let options = { 
    mode: 'text', 
    pythonOptions: ['-u'], // get print results in real-time 
      scriptPath: '', //If you are having python_test.py script in same folder, then it's optional. 
    args: [] //An argument which can be accessed in the script using sys.argv[1] 
}; 
          PythonShell.run('connected.py', options, function (err, result){ 
            if (err) {
              res.render('drawer',{data:'',connect:''}) 
            }
            else{
              console.log('result: ', result.toString());
              port.push(result.toString())
              
             // res.send(data)
              res.render('drawer',{data:'',connect:''}) 
            }
            
       
         
});
});

router.get('/drawer/(:id)', function(req, res, next) {
	   let ids = "sudo rfcomm connect connect 98:D3:32:30:EB:EA"
       let id = new String(req.params.id)
		let data = []
                 let options = { 
                                  mode: 'text', 
                                  pythonOptions: ['-u'], // get print results in real-time 
                                    scriptPath: '', //If you are having python_test.py script in same folder, then it's optional. 
                                  args: [id] //An argument which can be accessed in the script using sys.argv[1] 
                              }; 
                                
                              
                              PythonShell.run('python.py', options, function (err, result){ 
                                    //if (err) throw err; 
                                    // result is an array consisting of messages collected  
                                    //during execution of script. print("csv file created for leetcode" ) 
                                  console.log('result: ', result.toString());
                                  const data = [
                                    {
                                      name:'TRAY01',
                                      code:"98:D3:32:30:EB:EA"
                                    },
                                    {
                                      name:'TRAY02',
                                      code:"98:D3:32:30:EB:0B"
                                    }
                                  ]
                                  // res.send(
                                  //   data
                                  //   )
									               res.render('drawer',{data:data,connect:data}) 
			 
          }); 
          
                                 
});
router.get('/connect1/(:port)', function(req, res, next) {
    let ids = "sudo rfcomm connect connect 98:D3:32:30:EB:EA"
    let port = req.params.port;
    let id = new String(req.params.id)

              let options = { 
                               mode: 'text', 
                               pythonOptions: ['-u'], // get print results in real-time 
                                 scriptPath: '', //If you are having python_test.py script in same folder, then it's optional. 
                               args: [1] //An argument which can be accessed in the script using sys.argv[1] 
                           }; 
                             
                           
                           PythonShell.run('connectbluetooth1.py',  options,  function (err, result){ 
                                 //if (err) throw err; 
                                 // result is an array consisting of messages collected  
                                 //during execution of script. print("csv file created for leetcode" ) 
                               //console.log('result: ', result.toString());
                             
                                res.redirect('/drawer/1')
                            
                             
                             
    
       }); 
                              
});
router.get('/connect2/(:port)', function(req, res, next) {
  let ids = "sudo rfcomm connect connect 98:D3:32:30:EB:EA"
  let port = req.params.port;
  let id = new String(req.params.id)

            let options = { 
                             mode: 'text', 
                             pythonOptions: ['-u'], // get print results in real-time 
                               scriptPath: '', //If you are having python_test.py script in same folder, then it's optional. 
                             args: [2] //An argument which can be accessed in the script using sys.argv[1] 
                         };   
                           
                         
                         PythonShell.run('connectbluetooth2.py',  options,  function (err, result){ 
                               //if (err) throw err; 
                               // result is an array consisting of messages collected  
                               //during execution of script. print("csv file created for leetcode" ) 
                             console.log('result: ', result.toString());
                           
                              //res.redirect('/drawer/1')
                          
                           
                           
  
     }); 
                            
});

module.exports = router;
