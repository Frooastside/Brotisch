'use strict';

const express = require('express');

const router = express.Router();

router.all('/',  (req, res) => {
  res.sendStatus(200);
});

router.post('/user/profile', ensureLoggedIn, (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.username,
    avatar: req.user.avatar,
    scopes: req.user.scopes
  });
});

function ensureLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.sendStatus(401);
  }
}

module.exports = router;