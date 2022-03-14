'use strict';

const express = require('express');

const { fetchProfile } = require('../database');

require('../firebase');

const router = express.Router();

router.all('/',  (req, res) => {
  res.sendStatus(200);
});

router.post('/user/profile', ensureLoggedIn, (req, res) => {
  const profile = fetchProfile(req.user.id);
  if(!profile) {
    return res.sendStatus(500);
  }
  res.json({
    id: profile.id,
    username: profile.username,
    avatar: profile.avatar,
    scopes: profile.scopes
  });
});

router.post('/user/:userId/profile', ensureLoggedIn, (req, res) => {
  const profile = fetchProfile(req.params.userId);
  if (!profile) {
    return res.sendStatus(400);
  }
  res.json({
    id: profile.id,
    username: profile.username,
    avatar: profile.avatar,
    scopes: profile.scopes
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