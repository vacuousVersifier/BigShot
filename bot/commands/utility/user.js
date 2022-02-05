const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");

module.exports = class UserCommand extends Command {
  constructor(client) {
    super(client, {
      name: "user",
      aliases: ["userinfo"],
      group: "utility",
      memberName: "user",
      description: "[[Peeking]] some user info",
      guildOnly: true,
      ownerOnly: false,
      clientPermissions: [],
      userPermissions: [],
      throttling: { usages: 5, duration: 10 },
      args: [
        {
          key: "target",
          prompt: "Which [[LITTLE SPONGE]] do you want to [Read at the Library!!!]",
          type: "user"
        }
      ]
    });
  }

  run(message, { target }) {
    const embed = new MessageEmbed()
      .setColor(this.client.getColor())
      .addFields(
        { name: "Username", value: target.username },
        { name: "ID", value: target.id }
      );

    message.say(embed)
      .catch(e => {
        console.log(e);
      });
  }
};
