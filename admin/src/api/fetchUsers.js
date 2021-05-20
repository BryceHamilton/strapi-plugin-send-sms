const REACT_APP_API_URL = "http://localhost:1337";

export const fetchUsers = (cb) => {
  fetch("/users")
    .then((res) => res.json())
    .then(cb)
    .catch(console.log);
};
