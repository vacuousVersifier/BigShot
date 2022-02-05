const { CommandoClient } = require("discord.js-commando");
const path = require("path");
const swadesh = require("./swadesh");
const Kromer = require("../persistence/KromerDatabase");

module.exports = class Bot {
  constructor(Token, Prefix, owner, invite, groups, colors) {
    this.Token = Token;
    this.Prefix = Prefix;
    this.owner = owner;
    this.invite = invite;
    this.groups = groups;
    this.colors = colors;

    this.kromerDB = new Kromer();
    this.kromerDB.initialize();
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

    let current = 0;
    this.client.getColor = () => {
      if(current == 0) {
        current = 1;
        return this.colors[0];
      } else {
        current = 0;
        return this.colors[1];
      }
    };
  }

  run(callback) {
    this.client.on("ready", () => {
      this.client.kromerDB = this.kromerDB;
      callback(this.client.user.tag, this.client.user.id);
    });

    this.client.on("message", message => {
      if(!message.member.user.bot) {
        let userID = message.member.id;

        this.kromerDB.get(userID, (err, users) => {
          let user = users[0];
          if(user) {
            this.kromerDB.update(userID, user.amount + 1);
          } else {
            this.kromerDB.add(userID);
            this.kromerDB.update(userID, 1);
          }
        });

        if(message.content.includes("boob")) {
          message.channel.send("I Love Boobs");
        }
      }
    });
  }

  swadesh() {
    swadesh(this.client);
  }

  databaseTest() {
    const kromerDB = new Kromer();
    kromerDB.initialize();
    kromerDB.all((err, items) => {
      console.log(items);
    });
    kromerDB.add("bb", () => {
      kromerDB.all((err, items) => {
        console.log(items);
        kromerDB.update("bb", 10, () => {
          kromerDB.all((err, items) => {
            console.log(items);
            kromerDB.delete("bb", () => {
              kromerDB.all((err, items) => {
                console.log(items);
              });
            });
          });
        });
      });
    });
  }
};
