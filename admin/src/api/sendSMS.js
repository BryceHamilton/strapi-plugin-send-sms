const REACT_APP_API_URL = "http://localhost:1337";

export const sendSMS = ({ message, users }, date) => {
  const endpoint = date ? "schedule" : "send";
  console.log("sending sms:", { message, users, date });
  fetch(`${REACT_APP_API_URL}/sms-plugin/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      users,
      date,
    }),
  })
    .then((res) => res.json())
    .then(console.log)
    .catch(console.log);
};
