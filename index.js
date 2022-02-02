// Requirements
const { CommandoClient } = require("discord.js-commando");
const path = require("path");
const Discord = require("discord.js");

// Constants
const dotenv = require("dotenv");
dotenv.config();

const PREFIX = process.env.PREFIX;
const TOKEN = process.env.TOKEN;

console.log(TOKEN + " " + PREFIX);

const fs = require("fs");

// Client
const owners = [ "802317699157196850"];
const link = "https://discord.gg/dFmgxrxU5A";
const client = new CommandoClient({ commandPrefix: PREFIX, owner: owners, invite: link });

// Groups
const groups = [
  ["fun", "Fun"],
  ["utility", "Useful"]
];

// Registry
client.registry
  .registerDefaultTypes()
  .registerGroups(groups)
  .registerDefaultGroups()
  .registerDefaultCommands()
  .registerCommandsIn(path.join(__dirname, "commands"));

// Events
client.once("ready", async () => {
  console.log(`Logged in as ${client.user.tag}! (${client.user.id})`) ;

  // Get all channels from all servers
  let channels = client.channels.cache.array();

  // Remove all non-text channels
  channels = channels.filter(channel => {
    return channel.type == "text";
  })

  // Gets channel info
  channels.forEach((channel, i) => {
    let name = channel.name;
    let id = channel.id;
    let lastMessageID = channel.lastMessageID;
    let messages = channel.messages;

    channels[i] = {
      name, id, lastMessageID, messages
    }
  });

  // Fetches the last (x) messagees from each channel
  let rawWords = [];
  let promises = [];
  channels.forEach(async (channel, i) => {
    promises.push(channel.messages.fetch({limit: 100}).then(messages => {
      messages.forEach((message, i) => {
        rawWords.push(message.content.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase().split(" "));
      });
    }))
  });

  // Once all messages are got
  let words = [];
  let letters = [];
  Promise.all(promises).then(() => {
    // console.log(rawWords.flat());
    rawWords.flat().forEach((word, i) => {
      let present = false;
      words.forEach((checkWord, i) => {
        if(word == checkWord.word) {
          present = true;
          checkWord.count++;
        }
      });

      if(!present) {
        words.push({
          word: word,
          count: 1
        })
      }

      let letterSet = word.split("");
      letterSet.forEach((letter, i) => {
        let present = false;
        letters.forEach((checkLetter, i) => {
          if(letter == checkLetter.letter) {
            present = true;
            checkLetter.count++;
          }
        });

        if(!present) {
          letters.push({
            letter: letter,
            count: 1
          })
        }

      });

    });

    words.sort((a, b) => a.word.localeCompare(b.word));
    words.sort((a, b) => b.count - a.count);

    letters.sort((a, b) => b.count - a.count);


    // Write to a file
    let wordResult = ""
    words.forEach((word, i) => {
      wordResult += `${word.word}: ${word.count}\n`
    });

    let letterResult = "";
    letters.forEach((letter, i) => {
      letterResult += `${letter.letter}: ${letter.count}\n`
    });


    fs.writeFile("words.txt", wordResult, (err) => {
      if(err) throw err;
    })
    console.log("Finished writing words");

    fs.writeFile("letters.txt", letterResult, (err) => {
      if(err) throw err;
    })
    console.log("Finished writing letters");
  })
});

client.once("message", message => {
  message.reply("I like boobs");

})

client.on("error", console.error);

// Login
client.login(TOKEN)

// Server
const app = require("express")();
app.get("/", (req, res) => res.send("Server is live"));
app.listen(3000, () => console.log("Listening on port 3000"));
