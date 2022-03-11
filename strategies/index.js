'use strict';

const passport = require('passport'),
  WolkeneisStrategy = require('passport-wolkeneis').Strategy;

const database = require('../database');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  done(null, database.fetchProfile(userId));
});


passport.use(new WolkeneisStrategy({
  authorizationURL: process.env.AUTH_URL,
  tokenURL: process.env.TOKEN_URL,
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL,
  userProfileURL: process.env.PROFILE_URL
}, (accessToken, refreshToken, profile, done) => {
  database.patchProfile(profile);
  done(null, profile);
}));