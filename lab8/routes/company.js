var express = require('express');
var router = express.Router();
var companyDal = require('../dal/company_dal');

/* return a table of all the companies and their addresses */
router.get('/', function(req, res){
    companyDal.GetAll(function(err, result){
        console.log(result);
        res.render('company/company_list', {rs: result});
    });
})


router.get('/create', function(req, res) {
    companyDal.GetAll(function(err, result) {
        res.render('company/company_create', {address : result});
    });
});


/* return a drop down of all the address */
router.get('/edit', function(req, res) {
    var company_id = req.query.company_id;
    console.log("company_id: " + company_id);
    companyDal.GetByID(company_id, function(err, company_results){

        if(err) {
            var alert_class = 'alert-danger';
            var data = {
                message: "Error retrieving company with id " + company_id + "<p>" + err + "</p>",
                alert_class: alert_class
            };
            res.render('company/company_edit', data);
        }
        else {
            companyDal.GetAll(function(err, address_results) {

                console.log(company_results);
                var data = {
                    company: company_results,
                    address: address_results
                };
                console.log("Data is: "+ data);
                res.render('company/company_edit', data);
            })
        }
    });

});

router.get('/save', function(req, res) {
    console.log(req.query);

    companyDal.Insert(req.query, function(err, result) {
        if(err) {
            res.send('Error adding new company.<br />' + err);
        }
        else {
            res.send('Company Successfully Added');
        }
    });
})


router.get('/update', function(req, res, next) {
    console.log("company name equals: " + req.query.name);
    console.log("the company street submitted was: " + req.query.street);
    console.log("the company city submitted was: " + req.query.city);
    console.log("the company zip submitted was: " + req.query.zip);
    console.log("the company_id submitted was " + req.query.company_id);



    companyDal.Update(req.query, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.send("Successfully saved the data.");
        }
    });
});

router.get('/delete', function(req, res) {
    console.log(req.query.company_id);

    companyDal.Delete(req.query.company_id, function(err, result) {
        res.send(req.query.name + ' was successfully deleted.');
    });
});

module.exports = router;

