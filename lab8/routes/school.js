var express = require('express');
var router = express.Router();
var schoolDal = require('../dal/school_dal');

/* return a table of all the companies and their addresses */
router.get('/', function(req, res){
    schoolDal.GetAll(function(err, result){
        console.log(result);
        res.render('school/school_list', {rs: result});
    });
})


router.get('/create', function(req, res) {
    schoolDal.GetAll(function(err, result) {
        res.render('school/school_create', {address : result});
    });
});


/* return a drop down of all the address */
router.get('/edit', function(req, res) {
    var school_id = req.query.school_id;
    console.log("school_id: " + school_id);
    schoolDal.GetByID(school_id, function(err, school_results){

        if(err) {
            var alert_class = 'alert-danger';
            var data = {
                message: "Error retrieving company with id " + school_id + "<p>" + err + "</p>",
                alert_class: alert_class
            };
            res.render('school/school_edit', data);
        }
        else {
            schoolDal.GetAll(function(err, address_results) {

                console.log(school_results);
                var data = {
                    school: school_results,
                    address: address_results
                };
                console.log("Data is: "+ data);
                res.render('school/school_edit', data);
            })
        }
    });

});

router.get('/save', function(req, res) {
    console.log(req.query);

    schoolDal.Insert(req.query, function(err, result) {
        if(err) {
            res.send('Error adding new company.<br />' + err);
        }
        else {
            res.send('School Successfully Added');
        }
    });
})


router.get('/update', function(req, res, next) {
    console.log("school name equals: " + req.query.name);
    console.log("the street submitted was: " + req.query.address);
    console.log("the school_id submitted was " + req.query.school_id);



    schoolDal.Update(req.query, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.send("Successfully saved the data.");
        }
    });
});

router.get('/delete', function(req, res) {
    console.log(req.query.school_id);

    schoolDal.Delete(req.query.school_id, function(err, result) {
        res.send(req.query.name + ' was successfully deleted.');
    });
});

module.exports = router;

