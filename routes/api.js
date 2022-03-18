"use strict";

const express = require("express"),
  fetch = require("node-fetch");
const {
  checkScope,
  createDeleteAction,
  profileExists,
  createEntry,
  createModifyAction,
  entryExists,
  fetchAction,
  actionExists,
  approveAction,
  rejectAction
} = require("../database");

const router = express.Router();
const profileRouter = express.Router();
const actionsRouter = express.Router();
const wordsRouter = express.Router();

router.all("/", (req, res) => {
  res.sendStatus(204);
});

router.use("/profile", profileRouter);
router.use("/actions", actionsRouter);
router.use("/words", wordsRouter);

profileRouter.use(ensureLoggedIn);

profileRouter.post("/", (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.username,
    avatar: req.user.avatar,
    scopes: req.user.scopes
  });
});

actionsRouter.use(ensureLoggedIn);
actionsRouter.use(ensureBread);

actionsRouter.post("/create/:type", async (req, res) => {
  const taggedUsers = await parseTaggedUsers(req.body.taggedUsers);
  switch (req.params.type) {
    case "put":
      if (!req.body.type || !req.body.translations || !req.body.content) {
        res.sendStatus(400);
      }
      res.json(
        await createEntry(
          req.body.type,
          req.body.translations,
          req.body.content,
          req.user.id,
          taggedUsers
        )
      );
      break;
    case "modify":
      if (
        !req.body.entryId ||
        !entryExists(req.body.entryId) ||
        !req.body.content
      ) {
        res.sendStatus(400);
      }
      res.json({
        actionId: await createModifyAction(
          req.body.entryId,
          req.body.content,
          req.user.id,
          taggedUsers
        )
      });
      break;
    case "delete":
      if (!req.body.entryId || !entryExists(req.body.entryId)) {
        res.sendStatus(400);
      }
      res.json({
        actionId: await createDeleteAction(
          req.body.entryId,
          req.user.id,
          taggedUsers
        )
      });
      break;
    default:
      res.sendStatus(400);
      break;
  }
});

actionsRouter.post("/approve", async (req, res) => {
  if (!req.body.actionId || !actionExists(req.body.actionId)) {
    res.sendStatus(400);
  }
  if (
    req.user.id !== (await fetchAction(req.body.actionId).author) ||
    (await checkScope(req.user.id, process.env.DEFAULT_SCOPE ?? "admin-bread"))
  ) {
    await approveAction(req.body.actionId);
    return res.sendStatus(204);
  } else {
    return res.sendStatus(403);
  }
});

actionsRouter.post("/reject", async (req, res) => {
  if (!req.body.actionId || !actionExists(req.body.actionId)) {
    res.sendStatus(400);
  }
  if (
    req.user.id === (await fetchAction(req.body.actionId).author) ||
    (await checkScope(req.user.id, process.env.DEFAULT_SCOPE ?? "admin-bread"))
  ) {
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

wordsRouter.use(ensureLoggedIn);
wordsRouter.use(ensureBread);

wordsRouter.post("/translate/:word", async (req, res) => {
  if (!req.params.word) {
    return res.sendStatus(400);
  }
  const word = req.params.word;
  res.json({
    de: await fetchTranslation("de", word),
    nl: await fetchTranslation("nl", word),
    fi: await fetchTranslation("fi", word)
  });
});

async function fetchTranslation(target, word) {
  return await fetch(
    `https://translation.googleapis.com/language/translate/v2?source=en&q=${word}&target=${target}&key=${
      process.env.GOOGLE_API_KEY ?? ""
    }`,
    {
      method: "POST"
    }
  )
    .then((response) => response.json())
    .then((response) => response.data.translations)
    .then((translations) =>
      translations.map((translation) => translation.translatedText)
    )
    .then((translations) => translations[0])
    .catch(() => null);
}

wordsRouter.post("/definitions/:word", (req, res) => {
  if (!req.params.word) {
    return res.sendStatus(400);
  }
  fetch(
    `https://dictionaryapi.com/api/v3/references/sd2/json/${
      req.params.word
    }?key=${process.env.WORD_API_KEY ?? ""}`
  )
    .then((response) => response.json())
    .then((definitions) => {
      if (!Array.isArray(definitions)) {
        throw new Error();
      }
      return definitions.every((element) => typeof element === "string")
        ? definitions
        : definitions.map((definition) => ({
            uuid: definition.meta.uuid,
            type: definition.fl,
            headword: definition.meta.id.split(":")[0],
            offensive: definition.meta.offensive,
            shortdef: definition.shortdef
          }));
    })
    .then((definitions) => res.json(definitions))
    .catch(() => res.sendStatus(500));
});

function ensureLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.sendStatus(401);
  }
}

function ensureBread(req, res, next) {
  checkScope(req.user.id, process.env.DEFAULT_SCOPE ?? "normal-bread").then(
    (bread) => {
      if (bread) {
        return next();
      } else {
        return res.sendStatus(403);
      }
    }
  );
}

module.exports = router;
