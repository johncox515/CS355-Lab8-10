var express = require('express');
var router = express.Router();
var companyDal   = require('../dal/company');

router.get('/all', function(req, res) {
    companyDal.GetAll(function (err, result) {
            if (err) throw err;
            //res.send(result);
            res.render('company/displayAllCompanyGPA.ejs', {rs: result});
        }
    );
});

router.get('/', function (req, res) {
    companyDal.GetByID(req.query.company_id, function (err, result) {
            if (err) throw err;

            res.render('company/displayCompanyGPAInfo.ejs', {rs: result, company_id: req.query.company_id});
        }
    );
});

router.get('/create', function (req, res, next) {
    res.render('company/companyFormCreate.ejs');

});

router.get('/save', function(req, res, next) {
    console.log("company name equals: " + req.query.companyname);
    console.log("the company street submitted was: " + req.query.street);
    console.log("the company city submitted was: " + req.query.city);
    console.log("the company zip submitted was: " + req.query.zip);



    companyDal.Insert(req.query, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.send("Successfully saved the data.");
        }
    });
})

module.exports = router;
