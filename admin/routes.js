var express = require('express')
var fs = require('fs');
var router = express.Router()
var bodyParser = require('body-parser')
const v = require('node-input-validator');
var db = require('../database.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
router.use(bodyParser.urlencoded({
  extended: false
}))
var response ={};
router.use(bodyParser.json())
router.get('/register', (req, res)=> {
    res.render('../admin/views/register',{title:"Sample App"});
});

router.post('/register', (req, res)=> {
    let validator = new v(req.body, {email:'required|email',password:'required',full_name:'required',confirm_password:'required|same:password'});
	validator.check().then((matched)=> {
    	if (!matched) {
            response['status'] = 'failure';
            response['errors'] = validator.errors;
    		res.send(response);
    	}else{
            // insert into database;
            var pass = bcrypt.hashSync(req.body.password,saltRounds)
            // console.log(pass);
            // return false;
            var values = '(' + '"' +req.body.full_name + '"' + ',' + '"' + req.body.full_name + '"' +',' + '"' + req.body.email + '"' +','  + '"' + pass + '"' +')';
            var sql = "INSERT INTO users (first_name,last_name,email,password) VALUES" + values;
            db.con.query(sql, function (err, result) {
                if (err) throw(err);
                // console.log("1 record inserted");
                 response['status'] = 'success';
                 // response['errors'] = validator.errors;
                 res.send(response);
              });
        }
    });
});

router.get('/login', (req, res)=> {
    res.render('../admin/views/login',{title:"Sample App"});
});

router.get('/homepage',(req,res)=>{
    res.render('../admin/views/welcome',{title:"Sample App"});
});

router.post('/login', (req, res)=> {
    let validator = new v(req.body, {email:'required|email',password:'required'});
    validator.check().then((matched)=> {
        if (!matched) {
            response['status'] = 'failure';
            response['errors'] = validator.errors;
            res.send(response);
        }else{
            var sql ='SELECT * FROM users where email = '+ '"' + req.body.email + '"';
            db.con.query(sql,(err,result)=>{
                // console.log(result.length);
                if (result.length==0) {
                    response['status'] = 'fail';
                    response['message'] = 'Email not found.';
                    res.send(response);
                }else{
                    bcrypt.compare(req.body.password, result[0].password).then((result)=> {
                        // console.log(res);
                        if (!result) {
                            response['status'] = 'fail';
                            response['message'] = 'Please enter correct password.';
                            res.send(response);  
                        }else{
                            response['status'] = 'login';
                            // response['redirect_url'] = 'Logged in successfully.';
                            res.send(response); 
                            return res.redirect('homepage'); 
                        }
                    });
                }
            });
        }
    });
});

module.exports = router;