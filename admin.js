var db = require('./database.js');

var getData = (parameter) =>{
  db.con.query("SELECT * FROM admins WHERE email=" + "'" + req.body.email + "'",(err,result,fields)=>{
	if (err) {
		throw err;
	}else{
		bcrypt.compare(req.body.password, result[0].password, function(err, res) {
		    console.log(res);
		});
		res.send(result);
	}

}