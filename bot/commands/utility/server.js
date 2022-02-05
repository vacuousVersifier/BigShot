const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");

module.exports = class ServerCommand extends Command {
  constructor(client) {
    super(client, {
      name: "server",
      aliases: ["serverinfo"],
      group: "utility",
      memberName: "server",
      description: "Get some [[JUICY RIB-EYE]] server info",
      guildOnly: true,
      ownerOnly: false,
      clientPermissions: [],
      userPermissions: [],
      throttling: { usages: 5, duration: 10 }
    });
  }

  run(message) {
    const embed = new MessageEmbed()
      .setColor(this.client.getColor())
      .addFields(
        { name: "Server name", value: message.guild.name },
        { name: "Total [LITTLE SPONGES]", value: message.guild.memberCount }
      );

    message.say(embed)
      .catch(e => {
        console.log(e);
      });
  }
};
