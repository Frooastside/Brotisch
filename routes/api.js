'use strict';

const express = require('express');

const { fetchProfile } = require('../database');

const router = express.Router();

router.all('/',  (req, res) => {
  res.sendStatus(200);
});

router.post('/user/profile', ensureLoggedIn, (req, res) => {
  res.json(fetchProfile(req.user.id));
});

router.post('/user/:userId/profile', ensureLoggedIn, (req, res) => {
  res.json(fetchProfile(req.params.userId));
});

function ensureLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.sendStatus(401);
  }
}

module.exports = router;