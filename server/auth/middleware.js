
function authenticationMiddleware () {
    return function (req, res, next) {
        console.log('Auth middleware');  
        if (req.isAuthenticated()) {
            return next();
        }
        console.log('Incorrect credentials!');
        res.send({
            logged: false
        });
    }
  }
  
  module.exports = authenticationMiddleware;