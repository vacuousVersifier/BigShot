const { Command } = require("discord.js-commando");

module.exports = class SayCommand extends Command {
  constructor(client) {
    super(client, {
      name: "say",
      aliases: ["repeat"],
      group: "fun",
      memberName: "say",
      description: "Is this phone broken? I just hear myself!!!!!",
      guildOnly: false,
      ownerOnly: false,
      clientPermissions: [],
      userPermissions: [],
      throttling: { usages: 5, duration: 10 },
      args: [
        {
          key: "text",
          prompt: "What would you like me to [SCREAM], you [[hochi mama]]?",
          type: "string"
        }
      ]
    });
  }

  run(message, { text }) {
    message.say(text)
      .catch(e => {
        console.log(e);
      });
  }
};
