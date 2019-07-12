var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "phpmyadmin",
  password: "ns",
  database: "speed"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = {con};