"use strict";

const passport = require("passport"),
  WolkeneisStrategy = require("passport-wolkeneis").Strategy;

const { fetchProfile, patchProfile } = require("../database");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  fetchProfile(userId).then((profile) => done(null, profile));
});

passport.use(
  new WolkeneisStrategy(
    {
      authorizationURL: process.env.AUTH_URL,
      tokenURL: process.env.TOKEN_URL,
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
      userProfileURL: process.env.PROFILE_URL
    },
    (accessToken, refreshToken, profile, done) => {
      patchProfile(profile).then(() => done(null, profile));
    }
  )
);
