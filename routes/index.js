'use strict';

const authenticate = require('./authenticate');
const api = require('./api');
const webhooks = require('./webhooks');

module.exports = {
  authenticate,
  api,
  webhooks
};