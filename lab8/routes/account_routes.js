var express = require('express');
var router = express.Router();
var accountDal   = require('../dal/account');

router.get('/all', function(req, res) {
  accountDal.GetAll(function (err, result) {
          if (err) throw err;
          //res.send(result);
          res.render('account/displayAllAccounts.ejs', {rs: result});
        }
    );
});

router.get('/', function (req, res) {
  accountDal.GetByID(req.query.account_id, function (err, result) {
          if (err) throw err;

          res.render('account/displayAccountInfo.ejs', {rs: result, account_id: req.query.account_id});
        }
    );
});

module.exports = router;
