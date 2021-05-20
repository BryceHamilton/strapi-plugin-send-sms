const REACT_APP_API_URL = "http://localhost:1337";

export const fetchUsers = (cb) => {
  fetch(`${REACT_APP_API_URL}/users`)
    .then((res) => res.json())
    .then(cb)
    .catch(console.log);
};
