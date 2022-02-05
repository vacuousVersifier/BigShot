const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");

module.exports = class SuggestionsCommand extends Command {
  constructor(client) {
    super(client, {
      name: "suggestions",
      group: "utility",
      memberName: "suggestions",
      description: "All those [[Juicy]] suggestions",
      guildOnly: false,
      ownerOnly: false,
      clientPermissions: [],
      userPermissions: [],
      throttling: { usages: 5, duration: 10 }
    });
  }

  run(message) {
    this.client.suggestionDB.all((err, items) => {
      let result = "";

      items.forEach((item, i) => {
        this.client.users.fetch(item.userID)
          .then(user => {
            if(i + 1 == items.length) {
              result += `${i + 1}. ${user.username}: ${item.suggestion} (${item.id})`;


              const embed = new MessageEmbed()
                .setColor(this.client.getColor())
                .setTitle("Suggestions")
                .setDescription(result);

              message.say(embed);
            } else {
              result += `${i + 1}. ${user.username}: ${item.suggestion} (${item.id})\n`;
            }
          });
      });
    });


    // const embed = new MessageEmbed()
    //   .setColor(this.client.getColor())
    //   .addFields(
    //     { name: "Username", value: target.username },
    //     { name: "ID", value: target.id }
    //   )
    //
    // message.channel.send(embed);
  }
};
