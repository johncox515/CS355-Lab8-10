var express = require('express');
var router = express.Router();
var userJob   = require('../dal/userjobs');

router.get('/all', function(req, res) {
    userJob.GetAll(function (err, result) {
            if (err) throw err;
            //res.send(result);
            res.render('displayAllUserJobs.ejs', {rs: result});
        }
    );
});

router.get('/', function (req, res) {
    userJob.GetByID(req.query.user_id, function (err, result) {
            if (err) throw err;

            res.render('displaySchoolInfo.ejs', {rs: result, user_id: req.query.user_id});
        }
    );
});

module.exports = router;
