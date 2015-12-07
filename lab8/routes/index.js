var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { subtitle: 'Lab 8' });
});

/* GET Template Example */
router.get('/templatelink', function(req, res, next){
  res.render('templateexample.ejs');
});


module.exports = router;
