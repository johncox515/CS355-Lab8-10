var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback) {
    // NOTE: CompanyView is a View I created.
    // CREATE OR REPLACE VIEW CompanyView AS SELECT c.company_id, c.name, a.street, a.city, a.state_abbr, a.zip FROM company c JOIN address a on c.address_id = a.address_id;
    var query = 'SELECT * FROM School;';

    console.log(query);

    connection.query(query, function(err, result) {
        if(err) {
            console.log(err);
            callback(true);
            return;
        }
        callback(false, result);
    });
}

exports.GetByID = function(school_id, callback) {
    console.log(school_id);
    var query = 'SELECT * FROM School WHERE school_id=' + school_id;
    console.log(query);
    connection.query(query, [school_id],
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

exports.Insert = function(school_info, callback) {
    var query_data = [school_info.name, school_info.address];
    var query = 'INSERT INTO School (name, address) VALUES (?, ?);'
    //NOTE: The addresses already exist we only need to save the id to the company table

    console.log(query);
    connection.query(query, query_data, function(err, result) {
        if(err){
            console.log(err)
            callback(err);
            return;
        }
        else {
            callback(err, result);
        }
    })
}

exports.Update = function(school_info, callback) {
    /* this console.log() will print out the account information that the function receives.  this is useful
     to see if the information I think i'm sending to this function is really being received.
     */
    console.log(school_info);

    /* we are dynamically building a sql string using string concatenation.  We'll see other ways to do this soon.
     NOTE: each value in this example is a string.  And in SQL we have to wrap strings in quotes. If they were integer values
     then we would not need to have them wrapped in quotes; i.e. + '\'' + the_value + '\''
     NOTE 2: My account table has auto incrementing IDs, but I do not submit values for them.
     */
    var dynamic_query = 'UPDATE School SET ' +
            'name  = ' +
            '\'' + school_info.name + '\', ' +
            'address  = ' +
            '\'' + school_info.address + '\', ' +
            ' WHERE school_id = ' +
            '\'' + school_info.school_id + '\'' +
            ';'
        ;

    /* this console.log() will print out the query I'm about to send to the MySQL server via the connection.query() method.
     this log message can be copied and pasted into MySQL workbench to see if there are any SQL syntax errors.
     */console.log("test");
    console.log(dynamic_query);

    // connection.query(query, is where the SQL string we built above is actually sent to the MySQL server to be run
    connection.query(dynamic_query,
        /* we are passing this function as an input variable to connection.query().  MySQL will run the query
         and send back the records you are used to seeing in MySQL workbench as an array of JavaScript objects.
         This is also referred to as a result set or record set.

         After that is complete it will execute the function() we are defining below.  If we pass in a function with
         two arguments, in this case we have named them err (or error) and result, the connection.query() function
         will populate the first argument with any errors that were returned by the MySQL server and it will
         populate the second argument with the result set array.
         */
        function (err, result) {

            // if the err parameter isn't null or 0, then it will run the code within the if statement
            if(err) {
                /* this section of code prints out the error to the console and then runs the function that was
                 passed to exports.Insert().
                 */
                console.log(err);
                callback(true);
                return;
            }

            /* if there were no errors, it runs the function that was passed to exports.Insert() with the arguments
             false (for no errors) and the result set.  The actual function that is being run was defined by the
             section of code that called exports.Insert() to begin with.
             */

            callback(false, result);
        }
    );
}

exports.Delete = function(school_id, callback) {
    var query = 'DELETE FROM School WHERE school_id = ' + school_id;
    connection.query(query, function(err, result){
        if(err){
            console.log(err)
            callback(err);
            return;
        }
        else {
            callback(err, result);
        }

    });
}