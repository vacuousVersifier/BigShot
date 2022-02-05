const { Command } = require("discord.js-commando");

module.exports = class ReactCommand extends Command {
  constructor(client) {
    super(client, {
      name: "react",
      aliases: [],
      group: "fun",
      memberName: "react",
      description: "React to your [telecommunications]",
      guildOnly: false,
      ownerOnly: false,
      clientPermissions: [],
      userPermissions: [],
      throttling: { usages: 5, duration: 10 },
      args: [
        {
          key: "emoji",
          prompt: "What [EMOTICON] would you like me to [[bleach REACTS with vinegar]] with?",
          type: "default-emoji"
        }
      ]
    });
  }

  run(message, { emoji }) {
    message.react(emoji)
      .catch(e => {
        console.log(e);
      });
  }
};
