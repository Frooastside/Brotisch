'use strict';

require('dotenv').config();

const cors = require('cors'),
  express = require('express'),
  session = require('express-session'),
  FileStore = require('session-file-store')(session),
  passport = require('passport'),
  path = require('path');

const app = express();

app.set('trust proxy', 1);

if(process.env.REACT_APP) {
  app.use(cors({
    origin: process.env.REACT_APP,
    allowedHeaders: 'X-Requested-With, Content-Type',
    credentials: true
  }));
}
app.use(express.json({
  verify: (req, res, buf, encoding) => {
    if (buf && buf.length) {
      req.rawBody = buf.toString(encoding || 'utf8');
    }
  }
}));
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

const { authenticate, api, webhooks } = require('./routes');

app.use('/authenticate', authenticate);
app.use('/api', api);
app.use('/webhooks', webhooks);

app.all('/logout',
  (req, res) => {
    req.logout();
    res.redirect(process.env.REACT_APP ? process.env.REACT_APP : '/');
  });

app.use(express.static(path.join(__dirname, '/frontend/build/')));

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/frontend/build/index.html');
});

app.listen(process.env.PORT || 6000);

module.exports = app;
