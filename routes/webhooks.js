'use strict';

const express = require('express'),
  crypto = require('crypto'),
  util = require('util'),
  execFile = util.promisify(require('child_process').execFile);

const router = express.Router();

router.post('/push', (req, res) => {
  if (!req.rawBody) {
    res.status(400).send('Request body empty!');
  }

  const sig = Buffer.from(req.get('X-Hub-Signature-256') || '', 'utf8');
  const hmac = crypto.createHmac('sha256', process.env.PUSH_SECRET);
  const digest = Buffer.from('sha256' + '=' + hmac.update(req.rawBody).digest('hex'), 'utf8');
  if (sig.length !== digest.length || !crypto.timingSafeEqual(digest, sig)) {
    res.status(403).send(`Request body was not signed or verification failed: Request body digest (${digest}) did not match 'X - Hub - Signature - 256' (${sig})!`);
  }

  execFile(__dirname + '/../updatew',)
    .then(({ stdout, stderr }) => {
      if (stderr) {
        console.error(stderr);
      }
      console.log(stdout);
    })
    .catch((error) => {
      console.error(error);
    });

  res.sendStatus(204);
});

module.exports = router;