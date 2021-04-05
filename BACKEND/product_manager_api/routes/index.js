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
router.get('/', function(req, res, next) {});

// api get data from postgreSQL
router.get('/getdata01', function(req, res, next) {

  pool.query('SELECT * FROM product_info', (error, response) => {
    if(error){
      console.log(error);
    } else {
      //console.log(response.rows);
      res.send(response.rows);
    }
    //pool.end();
  })
  //res.render('index', { title: 'Express' });
});

router.get('/add', function(req, res, next) {
  res.render('add', {});
});

router.post('/add', function(req, res, next) {
  var product_name = req.body.product_name,
  product_price = req.body.product_price,
  image = req.body.image;

  pool.query("INSERT INTO product_info (product_name, product_price, image) VALUES ($1,$2,$3)", [product_name, product_price, image], (err, response) => {
    if(err){ // err = error, res = response
      //res.send(err);
      res.send(0); // 0 trả về false
    } else {
      res.send(1); // 1 trả về true
    }
  })
});

module.exports = router;
