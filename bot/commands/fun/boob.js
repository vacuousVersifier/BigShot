const { Command } = require("discord.js-commando");

module.exports = class BoobCommand extends Command {
  constructor(client) {
    super(client, {
      name: "boob",
      aliases: [],
      group: "fun",
      memberName: "boob",
      description: "Boobs!",
      guildOnly: false,
      ownerOnly: false,
      clientPermissions: [],
      userPermissions: [],
      throttling: { usages: 5, duration: 10 }
    });
  }

  run(message) {
    message.say("I love Boobs")
      .catch(e => {
        console.log(e);
      });
  }
};
