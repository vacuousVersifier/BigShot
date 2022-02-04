const { Token, Prefix, owner, invite, groups } = require("../constants");
const Bot = require("./Bot");
const Server = require("../webserver/Server");

function main() {
  const bot = new Bot(Token, Prefix, owner, invite, groups);
  bot.initialize();

  bot.run((userTag, ID) => {
    console.log(`Logged in as ${userTag}! (${ID})`);
  });

  const server = new Server();
  server.run();

  // bot.swadesh();
}

main();
