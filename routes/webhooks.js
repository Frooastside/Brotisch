'use strict';

const express = require('express'),
  crypto = require('crypto'),
  util = require('util'),
  exec = util.promisify(require('child_process').exec);

const router = express.Router();

router.post('/push', (req, res) => {
  if (!req.rawBody) {
    res.status(400).send('Request body empty!')
  }

  const sig = Buffer.from(req.get('X-Hub-Signature-256') || '', 'utf8');
  const hmac = crypto.createHmac('sha256', secret);
  const digest = Buffer.from('sha256' + '=' + hmac.update(req.rawBody).digest('hex'), 'utf8');
  if (sig.length !== digest.length || !crypto.timingSafeEqual(digest, sig)) {
    res.status(403).send(`Request body was not signed or verification failed: Request body digest (${digest}) did not match 'X - Hub - Signature - 256' (${sig})!`);
  }

  try {
    const { stdout, stderr } = exec(__dirname + '/../updatew');
    res.send(stdout);
  } catch (error) {
    res.status(500).send("An error occurred on updating!");
  }
});

module.exports = router;