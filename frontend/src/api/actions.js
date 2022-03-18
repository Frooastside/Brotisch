function createPutAction(type, translations, content) {
  return createActionFetch(
    "put",
    JSON.stringify({
      type: type,
      translations: translations,
      content: content
    })
  )
    .then((response) => response.json())
    .then((response) => response)
    .catch(() => null);
}

function createActionFetch(type, body) {
  return fetch(
    new Request(`${process.env.REACT_APP_BACKEND}/api/actions/create/${type}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: body
    })
  );
}

export { createPutAction };
