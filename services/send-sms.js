"use strict";
const fetch = require("node-fetch");
const schedule = require("node-schedule");

const TEXTBELT_URL = "https://textbelt.com/text";
const TEXTBELT_KEY =
  "50726c24bcb11391fab4822451547717f974ac22cltxiLq4oSpDk0zWAdNbkJ4RO";

const sendMessageTextbelt = async ({ user, message }) => {
  const body = {
    phone: user.phoneNumber,
    message,
    key: TEXTBELT_KEY,
  };
  console.log("sending sms: ", body);
  const res = await fetch(TEXTBELT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (res.ok) {
    const json = await res.json();
    console.log(json);
    createMessage({ user, message });
  }
};

const createMessage = async ({ user, message }) => {
  const body = {
    messageBody: message,
    user,
    sentAt: Date.now().toString(),
  };
  await strapi.query("message").create(body);
};

/**
 * send-sms.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

module.exports = {
  send: ({ message, users }) => {
    console.log("sms-service, send: ", { message, users });
    if (!message || !users) return;
    users.forEach((user) => {
      sendMessageTextbelt({ user, message });
    });
  },
  schedule: ({ message, users, date }) => {
    console.log("sms-service, schedule: ", { message, users, date });
    const timeToSend = new Date(date);
    timeToSend.setHours(timeToSend.getHours() + 4);
    const job = schedule.scheduleJob(timeToSend, async () => {
      await strapi.plugins["sms-plugin"].services["send-sms"].send({
        message,
        users,
      });
    });
  },
};
