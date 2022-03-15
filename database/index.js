'use strict';

const admin = require('firebase-admin');

const serviceAccount = require('../security/firebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL
});

const db = admin.database();

const profiles = db.ref('profiles');
const dictionary = db.ref('dictionary');
const actions = db.ref('actions');

async function patchProfile(profile) {
  profile['fetchedAt'] = profile['fetchedAt']?.toISOString();
  await profiles.child(profile.id).update({
    id: profile.id,
    username: profile.username,
    avatar: profile.avatar
  });
  if (isEmptyObject(await fetchScopes(profile.id))) {
    await profiles.child(profile.id).update({
      scopes: [process.env.DEFAULT_SCOPE ?? 'default']
    });
  }
}

async function fetchProfile(userId) {
  return (await profiles.child(userId).get()).val();
}

async function fetchScopes(userId) {
  return (await profiles.child(`${userId}/scopes`).get()).val();
}

async function checkScope(userId, scope) {
  return await fetchScopes(userId).includes(scope);
}

async function addScope(userId, scope) {
  const scopes = await fetchScopes();
  await profiles.child(`${userId}/scopes`).update([
    ...scopes,
    scope
  ]);
}

async function createEntry(type, translations, content, author, taggedUsers) {
  const entry = await dictionary.push();
  await entry.set({
    type: type,
    translations: translations
  });
  return await createPutAction(entry.key, content, author, taggedUsers);
}

async function deleteEntry(entryId) {
  await dictionary.child(entryId).remove();
}

async function entryExists(entryId) {
  return !isEmptyObject((await dictionary.child(entryId).get()).val());
}

async function createPutAction(entryId, content, author, taggedUsers) {
  return await createAction('put', entryId, content, author, taggedUsers);
}

async function createModifyAction(entryId, content, author, taggedUsers) {
  return await createAction('patch', entryId, content, author, taggedUsers);
}

async function createDeleteAction(entryId, author, taggedUsers) {
  return await createAction('delete', entryId, null, author, taggedUsers);
}

async function createAction(type, entryId, content, author, taggedUsers) {
  const action = await actions.push();
  await action.set({
    type: type,
    entry: entryId,
    content: content,
    approved: false,
    rejected: false,
    author: author,
    taggedUsers: taggedUsers
  });

  const actionReference = {};
  actionReference[action.key] = true;

  await dictionary.child(`${entryId}/actions`).update(actionReference);

  await profiles.child(`${author}/actions`).update(actionReference);
  if (taggedUsers) {
    for (const taggedUser of taggedUsers) {
      await profiles.child(`${taggedUser}/actions`).update(actionReference);
    }
  }
  return action.key;
}

async function deleteAction(actionId) {
  return await actions.child(actionId).remove();
}

async function actionExists(actionId) {
  return !isEmptyObject((await actions.child(actionId).get()).val());
}

async function approveAction(actionId) {
  const action = actions.child(actionId);
  await action.update({
    approved: true
  });

  action.get().then(async (snapshot) => {
    const values = snapshot.val();

    if (values.type !== 'delete') {
      const authorReference = {};
      authorReference[values.author] = true;

      await dictionary.child(`${values.entryId}/content`).update(values.content);
      await dictionary.child(`${values.entryId}/contributors`).update(authorReference);

      await profiles.child(`${values.author}/contributions`).push().set(values.entryId);

    } else {
      await deleteEntry(values.entryId);
    }

    const taggedUsers = values.taggedUsers;
    if (taggedUsers) {
      for (const taggedUser of taggedUsers) {
        await profiles.child(`${taggedUser}/actions/${action}`).remove();
      }
    }
  }).catch(console.error);
}

async function rejectAction(actionId) {
  const action = actions.child(actionId);
  await action.update({
    rejected: true
  });

  action.get().then(async (snapshot) => {
    const values = snapshot.val();

    if (values.type === 'put') {
      await deleteEntry(values.entryId);
      await deleteAction(actionId);
    }

    const taggedUsers = values.taggedUsers;
    if (taggedUsers) {
      for (const taggedUser of taggedUsers) {
        await profiles.child(`${taggedUser}/actions/${action}`).remove();
      }
    }
  }).catch(console.error);
}

function isEmptyObject(object) {
  return !Object.keys(object).length;
}

module.exports = {
  patchProfile, fetchProfile, fetchScopes, checkScope, addScope,
  createEntry, entryExists,
  createModifyAction, createDeleteAction, actionExists, approveAction, rejectAction
};