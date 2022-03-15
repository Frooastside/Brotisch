'use strict';

const express = require('express');

const router = express.Router();
const profileRouter = express.Router();
const actionsRouter = express.Router();

router.all('/',  (req, res) => {
  res.sendStatus(200);
});

router.use('/profile', profileRouter);
router.use('/actions', actionsRouter);

profileRouter.post('/', ensureLoggedIn, (req, res) => {
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