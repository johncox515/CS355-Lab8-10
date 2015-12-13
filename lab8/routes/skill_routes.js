var express = require('express');
var router = express.Router();
var skillDal   = require('../dal/skill');


router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.get('/create', function (req, res, next) {
    res.render('skill/skillFormCreate.ejs');

});

router.get('/save', function(req, res, next) {
    console.log("school name equals: " + req.query.schoolname);
    console.log("the school address submitted was: " + req.query.address);

    skillDal.Insert(req.query, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.send("Successfully saved the data.");
        }
    });
})

module.exports = router;
