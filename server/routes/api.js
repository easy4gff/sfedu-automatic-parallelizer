const passport = require('passport');
const formidable = require('express-formidable');

const express = require('express');
const router = express.Router();

const AppFilesystemConstants = require('../parallelizer/filesystem-constants').AppFilesystemConstants;
const ParallelizingUtils = require('../parallelizing-utils/parallelizing-utils').ParallelizingUtils;
const queue = require('express-queue');

var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   database : 'sfedu_automatic_parallelizer',
//   user     : 'root',
//   password : '5855633'
// });
var connection = mysql.createConnection({
    host     : 'localhost',
    database : 'sfedu_automatic_parallelizer',
    user     : 'newwebops',
    password : 'webops'
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

router.get('/parallelizing-options',
queue({ activeLimit: 1, queuedLimit: -1 }),
(req, res) => {
    console.log('Request for parallelizing options');
    dao.getAvailableOptions(connection, res);
    // res.send(availableOptions);
});

router.get('/all-parallelizing-options',queue({ activeLimit: 1, queuedLimit: -1 }),
    passport.authenticationMiddleware(),
    (req, res) => {
        dao.getAllOptions(connection, res);
    // res.send(availableOptions);
    }
);

router.get('/code-examples',
    passport.authenticationMiddleware(),queue({ activeLimit: 1, queuedLimit: -1 }),
    (req, res) => {
        dao.getCodeExamples(connection, res);
    }
);

router.post('/edit-library-example',
    passport.authenticationMiddleware(),queue({ activeLimit: 1, queuedLimit: -1 }),
    (req, res) => {
        console.log(req.body.exampleId);
        console.log(req.body.exampleLabelRussian);
        console.log(req.body.exampleLabelEnglish);
        dao.editLibraryExample(connection, req)
           .then(result => {
               res.send(result);
           })
           .catch(error => {
               res.send(error);
           });
    }
);

router.post('/add-library-example',
    formidable(),
    passport.authenticationMiddleware(),queue({ activeLimit: 1, queuedLimit: -1 }),
    (req, res) => {
        console.log(req.fields);
        console.log(req.files);
        dao.addLibraryExample(connection, req)
           .then(result => {
                res.send(result);  
           })
           .catch(err => {
                res.send({
                    status: 'ERR'
                });
           });
    }
)

router.post('/delete-library-example',queue({ activeLimit: 1, queuedLimit: -1 }),
    passport.authenticationMiddleware(),
    (req, res) => {
        console.log(req.body.exampleId);
        dao.deleteLibraryExample(connection, req)
           .then(result => {
               res.send(result);
           })
           .catch(error => {
               res.send(error);
           });
    }
);

router.post('/add-parallelizing-method',queue({ activeLimit: 1, queuedLimit: -1 }),
    passport.authenticationMiddleware(),
    (req, res) => {
        console.log(req.body.methodModel);
        dao.addParallelizingOption(connection, req)
           .then(result => {
               res.send(result);
           })
           .catch(error => {
               res.send({
                   status: 'ERR'
               });
           });
    }
);

router.post('/edit-parallelizing-method',queue({ activeLimit: 1, queuedLimit: -1 }),
    passport.authenticationMiddleware(),
    (req, res) => {
        console.log(req.body.methodModel);
        dao.editParallelizingOption(connection, req)
           .then(result => {
               res.send(result);
           })
           .catch(error => {
               res.send({
                   status: 'ERR'
               });
           });
    }
);

router.post('/delete-parallelizing-method',queue({ activeLimit: 1, queuedLimit: -1 }),
    passport.authenticationMiddleware(),
    (req, res) => {
        console.log(req.body.methodId);
        dao.deleteParallelizingOption(connection, req)
           .then(result => {
               res.send(result);
           })
           .catch(error => {
               res.send(error);
           });
    }
);

router.post('/parallelize',queue({ activeLimit: 1, queuedLimit: -1 }),
    formidable({
        uploadDir: AppFilesystemConstants.UPLOAD_DIR
    }),
    // passport.authenticationMiddleware(),
    (req, res) => {
        console.log(req.fields);
        console.log(req.files);
        ParallelizingUtils.getConvertedFiles(connection, req, res);
        // res.send({
        //     success: true 
        // });
    }
);

router.post('/login', queue({ activeLimit: 1, queuedLimit: -1 }),(req, res, next) => {
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

router.get('/logout',queue({ activeLimit: 1, queuedLimit: -1 }),
    (req, res) => {
        req.logout();
        res.send({
            success: true
        });
    }
);

module.exports = router;