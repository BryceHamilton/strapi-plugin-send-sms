"use strict";

/**
 * sms-plugin.js controller
 *
 * @description: A set of functions called "actions" of the `sms-plugin` plugin.
 */

module.exports = {
  /**
   * Default action.
   *
   * @return {Object}
   */

  send: async (ctx) => {
    const { message, users } = ctx.request.body;
    console.log("sms-controller: ", { message, users });
    await strapi.plugins["sms-plugin"].services["send-sms"].send({
      message,
      users,
    });
    await ctx.send({
      message: "sms sent from get request",
    });
  },
  schedule: async (ctx) => {
    const { message, users, date } = ctx.request.body;
    console.log("sms-controller: ", { message, users, date });
    await strapi.plugins["sms-plugin"].services["send-sms"].schedule({
      message,
      users,
      date,
    });
    await ctx.send({
      message: "sms sent from get request",
    });
  },
};
