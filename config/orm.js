// / Import MySQL connection.
var connection = require("../config/connection.js");

function printQuestionMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
  }

function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
}

// selectALL()
// insertOne()
// updateOne()

// Object for all our SQL statement functions.
var orm = {
    selectAll: function (tableInput, cb) {
        var queryString = "SELECT * FROM ??;";
        connection.query(queryString, [tableInput], function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    insertOne: function (table, cols, vals, cb) {
        var queryString = "INSERT INTO ?? (??) VALUES (?)";

        console.log(queryString);

        const query = connection.query(queryString, [table, cols, vals], function (err, result) {
            if (err) {
                throw err;
            }
            console.log(query.sql);
            cb(result);
        });
    },
    // An example of objColVals would be {name: panther, sleepy: true}
    updateOne: function (table, objColVals, condition, cb) {
        const queryString = "UPDATE ?? SET ? WHERE ?"

        console.log(queryString);
        const query = connection.query(queryString, [table, objColVals, condition], function (err, result) {
            console.log(query.sql);
            if (err) {
                throw err;
            }

            cb(result);
        });
    },

    deleteOne: function(table, condition, cb){
        const queryString = "DELETE FROM ?? WHERE ?";
        connection.query(queryString, [table, condition], function(err, data){
            cb(data);
        });
    }
   
};


module.exports = orm;