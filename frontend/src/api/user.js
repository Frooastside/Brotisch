
function fetchSelfProfile() {
  return fetch(new Request(`${process.env.REACT_APP_BACKEND}/api/user/profile`, {
    method: 'POST',
    credentials: 'include'
  }))
    .then(response => response.json())
    .then((profile) => profile)
    .catch(() => null);
}

function fetchUserProfile(userId) {
  return fetch(new Request(`${process.env.REACT_APP_BACKEND}/api/user/${userId}/profile`, {
    method: 'POST',
    credentials: 'include'
  }))
    .then(response => response.json())
    .then((profile) => profile)
    .catch(() => null);
}

export { fetchSelfProfile, fetchUserProfile };