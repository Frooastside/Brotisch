'use strict';

const express = require('express');
const { checkScope, createDeleteAction, profileExists, createEntry, createModifyAction, entryExists, fetchAction, actionExists, approveAction, rejectAction } = require('../database');

const router = express.Router();
const profileRouter = express.Router();
const actionsRouter = express.Router();

router.all('/', (req, res) => {
  res.sendStatus(200);
});

router.use('/profile', profileRouter);
router.use('/actions', actionsRouter);

profileRouter.use(ensureLoggedIn);

profileRouter.post('/', (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.username,
    avatar: req.user.avatar,
    scopes: req.user.scopes
  });
});

actionsRouter.use(ensureLoggedIn);
actionsRouter.use(ensureBread);

actionsRouter.post('/create/:type', async (req, res) => {
  const taggedUsers = await parseTaggedUsers(req.body.taggedUsers);
  switch (req.params.type) {
  case 'put':
    if (!req.body.type || !req.body.translations || !req.body.content) {
      res.sendStatus(400);
    }
    res.json(
      await createEntry(req.body.type, req.body.translations, req.body.content, req.user.id, taggedUsers)
    );
    break;
  case 'modify':
    if (!req.body.entryId || !entryExists(req.body.entryId) || !req.body.content) {
      res.sendStatus(400);
    }
    res.json({
      actionId: await createModifyAction(req.body.entryId, req.body.content, req.user.id, taggedUsers)
    });
    break;
  case 'delete':
    if (!req.body.entryId || !entryExists(req.body.entryId)) {
      res.sendStatus(400);
    }
    res.json({
      actionId: await createDeleteAction(req.body.entryId, req.user.id, taggedUsers)
    });
    break;
  default:
    res.sendStatus(400);
    break;
  }
});

actionsRouter.post('/approve', async (req, res) => {
  if (!req.body.actionId || !actionExists(req.body.actionId)) {
    res.sendStatus(400);
  }
  if (req.user.id !== await fetchAction(req.body.actionId).author || await checkScope(req.user.id, process.env.DEFAULT_SCOPE ?? 'admin-bread')) {
    await approveAction(req.body.actionId);
    return res.sendStatus(204);
  }else {
    return res.sendStatus(403);
  }
});

actionsRouter.post('/reject', async (req, res) => {
  if (!req.body.actionId || !actionExists(req.body.actionId)) {
    res.sendStatus(400);
  }
  if (req.user.id === await fetchAction(req.body.actionId).author || await checkScope(req.user.id, process.env.DEFAULT_SCOPE ?? 'admin-bread')) {
    await rejectAction(req.body.actionId);
    return res.sendStatus(204);
  } else {
    return res.sendStatus(403);
  }
});

async function parseTaggedUsers(unsafeTaggedUsers) {
  const taggedUsers = [];
  for (const taggedUser of unsafeTaggedUsers) {
    if (await profileExists(taggedUser)) {
      taggedUsers.push(taggedUser);
    }
  }
  return taggedUsers;
}

function ensureLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.sendStatus(401);
  }
}

function ensureBread(req, res, next) {
  checkScope(req.user.id, process.env.DEFAULT_SCOPE ?? 'normal-bread').then((bread) => {
    if (bread) {
      return next();
    } else {
      return res.sendStatus(403);
    }
  });
}

module.exports = router;