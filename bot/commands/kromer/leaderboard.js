const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");

module.exports = class LeaderBoardCommand extends Command {
  constructor(client) {
    super(client, {
      name: "leaderboard",
      group: "kromer",
      memberName: "leaderboard",
      description: "Who's the [[NUMBER 1 RATED SALEMEN]]",
      guildOnly: true,
      ownerOnly: false,
      clientPermissions: [],
      userPermissions: [],
      throttling: { usages: 5, duration: 10 }
    });
  }

  run(message) {
    this.client.kromerDB.all((err, items) => {
      let leaderboard = items.slice(0, 10).sort((a, b) => b.amount - a.amount);
      let result = "";

      leaderboard.forEach((item, i) => {
        this.client.users.fetch(item.userID)
          .then(user => {
            if(i + 1 == leaderboard.length) {
              result += `${i + 1}. ${user.username}: ${item.amount} kromer`;


              const embed = new MessageEmbed()
                .setColor(this.client.getColor())
                .setTitle("KROMER")
                .setDescription(result);

              message.say(embed);
            } else {
              result += `${i + 1}. ${user.username}: ${item.amount} kromer\n`;
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
