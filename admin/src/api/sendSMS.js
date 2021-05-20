import pluginId from "../../pluginId";

export const sendSMS = ({ message, users }, date) => {
  const endpoint = date ? "schedule" : "send";
  console.log("sending sms:", { message, users, date });
  fetch(`/${pluginId}/send-sms/${endpoint}`, {
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
