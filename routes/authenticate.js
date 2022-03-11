'use strict';

const express = require('express'),
  passport = require('passport');

require('../strategies');

const router = express.Router();

router.get('/', passport.authenticate('wolkeneis'));

router.get('/callback', passport.authenticate('wolkeneis', {
  failureRedirect: '/'
}), (req, res) => {
  if (process.env.REACT_APP) {
    res.redirect(`${process.env.REACT_APP}/profile`)
  } else {
    res.redirect('/profile');
  }
});

module.exports = router;