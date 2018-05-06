const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();

// Auth related stuff
const exphbs = require('express-handlebars');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const RedisConfig = require('./auth/redis-storage.config');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// app.use(session({
//   store: new RedisStore({
//     url: RedisConfig.url
//   }),
//   secret: RedisConfig.secret,
//   resave: false,
//   saveUninitialized: false
// }))

app.use(session({
    store: new RedisStore({
      host: 'localhost',
      port: 6379
    }),
    secret: RedisConfig.secret,
    resave: false,
    saveUninitialized: false
  }))

const passport = require('passport');  
app.use(passport.initialize());
app.use(passport.session());

// Angular DIST output folder
app.use(express.static(path.join(__dirname, '../dist')));

// API file for interacting with MySQL
const api = require('./routes/api');

// API location
app.use('/api', api);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));