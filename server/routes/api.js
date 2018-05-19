const passport = require('passport');

const express = require('express');
const router = express.Router();

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  database : 'sfedu_automatic_parallelizer',
  user     : 'root',
  password : '5855633'
});

const dao = require('../dao/dao');

const availableOptions = require('../parallelizing-options/options');

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

// Auth
require('../auth/passport-init')(connection);

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
    dao.getAvailableOptions(connection, res);
    // res.send(availableOptions);
});

router.get('/all-parallelizing-options',
    passport.authenticationMiddleware(),
    (req, res) => {
        dao.getAllOptions(connection, res);
    // res.send(availableOptions);
    }
);

router.get('/code-examples',
    passport.authenticationMiddleware(),
    (req, res) => {
        dao.getCodeExamples(connection, res);
    }
);

router.get('/parallelize',
    passport.authenticationMiddleware(),
    (req, res) => {
        res.send({
            success: true 
        });
    }
);

// router.post('/login',
//     function (req, res, next) {
//         console.log(req);
//         return next();
//     },
//     passport.authenticate(),
//     (req, res) => {
//         console.log(req);
//     }
// );

// router.post('/login', passport.authenticate('local', { successRedirect: '/',
//                                                     failureRedirect: '/login', }));
router.post('/login', (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.send({
                    success: false
                });
            }
            req.logIn(user, function(err) {
                if (err) {
                    return next(err);
                }
                return next();
            })
        })(req, res, next);
    },
    (req, res) => {
        console.log('Recognized');
        res.send({
            success: true
        });
    }
);

router.get('/logout',
    (req, res) => {
        req.logout();
        res.send({
            success: true
        });
    }
);
module.exports = router;