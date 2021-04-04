var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sanpham',
  password: '^62a(KnZOoszYJ*&',
  port: 5432,
})

/* GET home page. */
router.get('/', function(req, res, next) {});

// api get data from postgreSQL
router.get('/getdata01', function(req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  pool.query('SELECT * FROM product_info', (error, response) => {
    if(error){
      console.log(error);
    } else {
      //console.log(response.rows);
      res.send(response.rows);
    }
    pool.end();
  })
  //res.render('index', { title: 'Express' });
});

module.exports = router;
