const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

const authenticationMiddleware = require('./middleware');

// Generate Password
const saltRounds = 10;
const myPlaintextPassword = 'admin';
const salt = bcrypt.genSaltSync(saltRounds);
const passwordHash = bcrypt.hashSync(myPlaintextPassword, salt);

const dao = require('../dao/dao');

const user = {
  username: 'test-user',
  passwordHash,
  id: 1
};

function findUser(username, callback) {
  if (username === user.username) {
    return callback(null, user);
  }
  return callback(null);
}

passport.serializeUser(function (user, done) {
  done(null, user.username)
});

passport.deserializeUser(function (username, done) {
  findUser(username, done)
});

function initPassport(connection) {
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    (username, password, done) => {
        console.log('Finding user');
        dao.findUserInDB(connection, username)
          .then(userRow => {
            // User not found
            if (!userRow || userRow.length === 0) {
              console.log('User not found');
              return done(null, false);
            }

            console.log(userRow.PASSWORD_HASH);

            // Always use hashed passwords and fixed time comparison
            bcrypt.compare(password, userRow.PASSWORD_HASH, (err, isValid) => {
              if (err) {
                return done(err);
              }
              if (!isValid) {
                return done(null, false);
              }
              return done(null, user);
            })
          }, err => console.log('ERROR: ', err));                
        // findUser(username, (err, user) => {          
        // if (err) {
        //   return done(err);
        // }

        // // User not found
        // if (!user) {
        //   console.log('User not found');
        //   return done(null, false);
        // }

        // console.log(user.passwordHash);

        // // Always use hashed passwords and fixed time comparison
        // bcrypt.compare(password, user.passwordHash, (err, isValid) => {
        //   if (err) {
        //     return done(err);
        //   }
        //   if (!isValid) {
        //     return done(null, false);
        //   }
        //   return done(null, user);
        // })
      })
    );
  //   }, 
  // ));

  passport.authenticationMiddleware = authenticationMiddleware;
}

module.exports = initPassport;