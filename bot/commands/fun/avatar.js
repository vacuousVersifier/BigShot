const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");

module.exports = class ReactCommand extends Command {
  constructor(client) {
    super(client, {
      name: "avatar",
      aliases: [],
      group: "fun",
      memberName: "avatar",
      description: "Get an [[DAZZLING FACE]]",
      guildOnly: false,
      ownerOnly: false,
      clientPermissions: [],
      userPermissions: [],
      throttling: { usages: 5, duration: 10 },
      args: [
        {
          key: "target",
          prompt: "Who's [Dazzling Faces!] do you want to [[Observatory]]",
          type: "user"
        }
      ]
    });
  }

  run(message, { target }) {
    const embed = new MessageEmbed()
      .setColor(this.client.getColor())
      .setTitle(`${target.username}'s Avatar`)
      .setImage(target.displayAvatarURL());

    message.say(embed)
      .catch(e => {
        console.log(e);
      });
  }
};
