const { Command } = require("discord.js-commando");

module.exports = class SayInChannel extends Command {
  constructor(client) {
    super(client, {
      name: "sayinchannel",
      aliases: [],
      group: "fun",
      memberName: "sayinchannel",
      description: "Says something in the channel specified",
      guildOnly: true,
      ownerOnly: false,
      clientPermissions: [],
      userPermissions: [],
      throttling: { usages: 5, duration: 10 },
      args: [
        {
          key: "text",
          prompt: "What would you like me to [SCREAM], you [[hochi mama]]?",
          type: "string"
        },
        {
          key: "channel",
          prompt: "What [[Channel 34]] do you want me to send the [[Telegrams 50% off!]] in?",
          type: "text-channel"
        }
      ]
    });
  }

  run(message, { text, channel }) {
    channel.send(text);
  }
};
