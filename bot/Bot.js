const { CommandoClient } = require("discord.js-commando");
const path = require("path");
const swadesh = require("./swadesh");

module.exports = class Bot {
  constructor(Token, Prefix, owner, invite, groups) {
    this.Token = Token;
    this.Prefix = Prefix;
    this.owner = owner;
    this.invite = invite;
    this.groups = groups;
  }

  initialize() {
    this.client = new CommandoClient({
      commandPrefix: this.Prefix,
      owner: this.owner,
      invite: this.invite
    });

    this.client.registry
      .registerDefaultTypes()
      .registerGroups(this.groups)
      .registerDefaultGroups()
      .registerDefaultCommands()
      .registerCommandsIn(path.join(__dirname, "commands"));

    this.client.login(this.Token);

  }

  run(callback) {
    this.client.on("ready", () => {
      callback(this.client.user.tag, this.client.user.id);
    });

    this.client.on("message", message => {
      if(message.content.includes("boob")) {
        message.channel.send("I Love Boobs");
      }
    });
  }

  swadesh() {
    swadesh(this.client);
  }
};
