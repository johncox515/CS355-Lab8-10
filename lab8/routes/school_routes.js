var express = require('express');
var router = express.Router();
var schoolDal   = require('../dal/school');

router.get('/all', function(req, res) {
    schoolDal.GetAll(function (err, result) {
            if (err) throw err;
            //res.send(result);
            res.render('school/displayAllSchools.ejs', {rs: result});
        }
    );
});

router.get('/', function (req, res) {
    schoolDal.GetByID(req.query.school_id, function (err, result) {
            if (err) throw err;

            res.render('school/displaySchoolInfo.ejs', {rs: result, school_id: req.query.school_id});
        }
    );
});

router.get('/create', function (req, res, next) {
    res.render('school/schoolFormCreate.ejs');

});

router.get('/save', function(req, res, next) {
    console.log("school name equals: " + req.query.schoolname);
    console.log("the school address submitted was: " + req.query.address);

    schoolDal.Insert(req.query, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.send("Successfully saved the data.");
        }
    });
})

module.exports = router;

