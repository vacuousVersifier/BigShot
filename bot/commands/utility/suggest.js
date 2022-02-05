const { Command } = require("discord.js-commando");

module.exports = class SuggestCommand extends Command {
  constructor(client) {
    super(client, {
      name: "suggest",
      group: "utility",
      memberName: "suggest",
      description: "Take a [[suggestion]] right to hell",
      guildOnly: false,
      ownerOnly: false,
      clientPermissions: [],
      userPermissions: [],
      throttling: { usages: 1, duration: 10 },
      args: [
        {
          key: "suggestion",
          prompt: "What do you want to [[Suggestion Box]]",
          type: "string"
        }
      ]
    });
  }

  run(message, { suggestion }) {
    this.client.suggestionDB.add(message.member.id, suggestion, err => {
      if(err) throw err;

      message.say("Suggestion [[creation]]");
    });
  }
};
