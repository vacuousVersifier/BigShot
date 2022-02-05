const { Command } = require("discord.js-commando");

module.exports = class PruneCommand extends Command {
  constructor(client) {
    super(client, {
      name: "prune",
      aliases: ["purge"],
      group: "utility",
      memberName: "prune",
      description: "[[WHOLE STORE SELL OUT]]",
      guildOnly: true,
      ownerOnly: false,
      clientPermissions: ["MANAGE_MESSAGES"],
      userPermissions: ["MANAGE_MESSAGES"],
      args: [
        {
          key: "amount",
          prompt: "How many [[rapidly shrinking]] messages do you want to [[REMOVE ALL VIRUSES]]",
          type: "integer"
        }
      ]
    });
  }

  run(message, { amount }) {
    if (amount <= 1 || amount > 100) {
      message.reply("That's not between [ONE CENT] and [[99% off!!]]")
        .catch(e => {
          console.log(e);
        });
    } else {
      message.channel.bulkDelete(amount, true)
        .catch(err => {
          console.error(err);
          message.channel.send(
            "OW IT BURNS! IT [cleans right off] MY FLESH!"
          );
        });
    }
  }
};
