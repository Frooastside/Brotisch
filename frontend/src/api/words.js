function fetchDefinition(word) {
  return fetch(
    new Request(
      `${process.env.REACT_APP_BACKEND}/api/words/definitions/${word}`,
      {
        method: "POST",
        credentials: "include"
      }
    )
  )
    .then((response) => response.json())
    .then((definition) => definition)
    .catch(() => null);
}

export { fetchDefinition };
