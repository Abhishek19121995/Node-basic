var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')
var db = require('./database.js');
const v = require('node-input-validator');
const bcrypt = require('bcrypt');
var response = {};
router.use(bodyParser.urlencoded({
  extended: true
}))
router.use(bodyParser.json())
router.get('/login',(req,res)=>{
    res.sendFile(__dirname +'/views/admin/login.html');
})
router.post('/login', (req, res)=> {
	let validator = new v(req.body, {email:'required|email',password:'required'});
	validator.check().then((matched)=> {
    	if (!matched) {
            response['status'] = 'failure';
            response['errors']=validator.errors;
    		res.send(response);
    	}else{
    		// console.log(req.body.email);
    		db.con.query("SELECT * FROM admins WHERE email=" + "'" + req.body.email + "'",(err,result,fields)=>{
    			// console.log(err);
    			if (err) {
    				throw err;
    			}else{
    				bcrypt.compare(req.body.password, result[0].password, function(err, res) {
					    console.log(res);
					});
    				res.send(result);
    			}
    		})
    	}
	});
})

module.exports = router