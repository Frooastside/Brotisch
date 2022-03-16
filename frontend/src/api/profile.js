function fetchSelfProfile() {
  return fetch(
    new Request(`${process.env.REACT_APP_BACKEND}/api/profile`, {
      method: "POST",
      credentials: "include"
    })
  )
    .then((response) => response.json())
    .then((profile) => profile)
    .catch(() => null);
}

export { fetchSelfProfile };
