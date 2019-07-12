var express = require('express')
var app = express()
const port = 1234
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
app.set('view engine', 'ejs');
// for all css and js files 
app.use(express.static(__dirname + '/public'));
app.use(upload.single('avatar'));
// var Url = require('./routes.js');
var admin = require('./admin/routes.js');
const v = require('node-input-validator');
app.use('/admin',admin);
app.listen(port, () => console.log(`My app listening on port ${port}!`))
// console.log(__dirname);
