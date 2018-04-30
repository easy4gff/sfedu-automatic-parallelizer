const express = require('express');
const router = express.Router();
// const MongoClient = require('mongodb').MongoClient;
// const ObjectID = require('mongodb').ObjectID;
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  database : 'sfedu_automatic_parallelizer',
  user     : 'root',
  password : '5855633'
});

const getAvailableOptions = require('../dao/dao');

const availableOptions = require('../parallelizing-options/options');

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});


// Connect
/*const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/coursework', (err, client) => {
        const db = client.db('coursework');
        if (err) 
            return console.log(err);

        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users
router.get('/users', (req, res) => {
    connection((db) => {
        db.collection('users')
            .find()
            .toArray()
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});*/

router.get('/parallelizing-options', (req, res) => {
    getAvailableOptions(connection, res);
    // res.send(availableOptions);
});

module.exports = router;