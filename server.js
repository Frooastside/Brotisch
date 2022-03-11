'use strict';

require('dotenv').config();

const express = require('express'),
  session = require('express-session'),
  FileStore = require('session-file-store')(session),
  passport = require('passport'),
  path = require('path');

const app = express();

app.set('trust proxy', 1);

app.use(session({
  store: new FileStore(),
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: false,
  cookie: {
    path: '/',
    sameSite: process.env.NODE_ENV !== 'development' ? 'none' : 'lax',
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: 604800000
  }
}));
app.use(passport.initialize());
app.use(passport.session());

const { authenticate } = require('./routes');

app.use('/authenticate', authenticate);

app.use('/', express.static(path.join(__dirname, '/frontend/build/')));

app.get('/index.html', (req, res) => {
  res.sendFile(__dirname + '/frontend/build/index.html');
});

app.use('/', express.static(path.join(__dirname, '/frontend/build/')));

const server = app.listen(process.env.PORT || 6000);

module.exports = app;
