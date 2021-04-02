var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sanpham',
  password: '^62a(KnZOoszYJ*$',
  port: 5432,
})

/* GET home page. */
router.get('/', function(req, res, next) {

  pool.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    pool.end()
  })

  res.render('index', { title: 'Express' });
});

// api get data from postgreSQL
router.get('/getdata01', function(req, res, next) {
  console.log('Đây là API lấy dữ liệu cho reactjs');
  // get data
  pool.query('SELECT * FROM public.product_info', (error, response) => {
    if(error){
      console.log(error);
    } else {
      console.log(response.rows);
    }
    pool.end();
  })
  res.render('index', { title: 'Express' });
});


module.exports = router;
