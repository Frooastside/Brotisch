'use strict';

const { JsonDB } = require('node-json-db'),
  { Config } = require('node-json-db/dist/lib/JsonDBConfig')

const database = new JsonDB(new Config("profiles.json", true, true, '/'));


function patchProfile(profile) {
  if (!database.exists('/profiles/' + profile.id)) {
    profile.scopes = [process.env.DEFAULT_SCOPE ?? 'default'];
  }
  database.push('/profiles/' + profile.id, profile, false);
}

function fetchProfile(userId) {
  try {
    return database.getData('/profiles/' + userId);
  } catch (error) {
    console.error(error);
  }
}

function checkScope(userId, scope) {
  return fetchProfile(userId).scopes.includes(scope);
}

function addScope(userId, scope) {
  const user = {
    id: userId,
    scopes: [scope]
  }
  database.push('/profiles/' + userId, user, false);
}

function fetchScopes(userId) {
  return fetchProfile(userId).scopes;
}

module.exports = { database, patchProfile, fetchProfile, checkScope, addScope, fetchScopes };