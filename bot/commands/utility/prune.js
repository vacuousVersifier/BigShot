const { Command } = require("discord.js-commando");

module.exports = class PruneCommand extends Command {
  constructor(client) {
    super(client, {
      name: "prune",
      aliases: ["purge"],
      group: "utility",
      memberName: "prune",
      description: "Bulk delete message",
      guildOnly: true,
      ownerOnly: false,
      clientPermissions: ["MANAGE_MESSAGES"],
      userPermissions: ["MANAGE_MESSAGES"],
      throttling: { usages: 2, duration: 10 },
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
      return message.reply("That's not between [ONE CENT] and [[99% off!!]]");
    }

    message.channel.bulkDelete(amount, true).catch(err => {
      console.error(err);
      message.channel.send(
        "OW IT BURNS! IT [cleans right off] MY FLESH!"
      );
    });
  }
};
