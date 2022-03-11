'use strict';

const express = require('express'),
  passport = require('passport');

require('../strategies');

const router = express.Router();

router.get('/', passport.authenticate('wolkeneis'));

router.get('/callback', passport.authenticate('wolkeneis', {
  failureRedirect: '/'
}), (req, res) => {
  res.redirect(process.env.CONTROL_ORIGIN + '/redirect/nodes');
});

module.exports = router;