const fs = require("fs");

function swadesh(client) {
  let channels = getChannels(client);
  let [messages, promises] = getMessages(channels);
  getWordsAndLetters(messages, promises, (words, letters) => {
    let wordCount = {};
    let letterCount = {};

    for(const letter of letters) {
      if(letterCount[letter]) {
        letterCount[letter]++;
      } else {
        letterCount[letter] = 1;
      }
    }

    for(const word of words) {
      if(wordCount[word]) {
        wordCount[word]++;
      } else {
        wordCount[word] = 1;
      }
    }

    let sortableLetterCount = [];
    for (const [key, value] of Object.entries(letterCount)) {
      sortableLetterCount.push({ "letter": key, "count": value });
    }

    let sortableWordCount = [];
    for (const [key, value] of Object.entries(wordCount)) {
      sortableWordCount.push({ "word": key, "count": value });
    }

    let sortedLetterCount = sortableLetterCount.sort((a, b) => b.count - a.count);
    // sortedLetterCount = sortableLetterCount.sort((a, b) => ea.leteter.localeCompare(b.letter));

    let sortedWordCount = sortableWordCount.sort((a, b) => a.word.localeCompare(b.word));
    // sortedWordCount = sortableWordCount.sort((a, b) => b.count - a.count);
    sortedWordCount = sortedWordCount.sort((a, b) => b.word.length - a.word.length);

    let letterString = "";
    sortedLetterCount.forEach(letterCount => {
      letterString += `${letterCount.letter},${letterCount.count},\n`;
    });

    let wordString = "";
    sortedWordCount.forEach(wordCount => {
      wordString += `${wordCount.word},${wordCount.count},\n`;
    });

    fs.writeFile("bot/results/letters.csv", letterString, err => {
      if(err) throw err;

      console.log("Letters have been written");
    });

    fs.writeFile("bot/results/words.csv", wordString, err => {
      if(err) throw err;

      console.log("Words have been written");
    });
  });
}

function getMessages(channels) {
  let messages = [];
  let promises = [];

  channels.forEach(channel => {
    const limit = { limit: 100 };
    let promise = channel.messages.fetch(limit).then(fetchedMessages => {
      fetchedMessages.forEach(message => {
        messages.push(message);
      });

    });
    promises.push(promise);
  });

  return [messages, promises];
}

function getWordsAndLetters(messages, promises, callback) {
  let words = [];
  let letters = [];

  Promise.all(promises).then(() => {
    messages = messages.flat();

    messages.forEach(message => {
      words.push(message.content.replace(/[^a-zA-Z' ]/g, " ").toLowerCase().split(" "));
    });

    words = words.flat();

    words.forEach(word => {
      letters.push(word.split(""));
    });

    letters = letters.flat();

    callback(words, letters);
  });
}

function getChannels(client) {
  let channels = client.channels.cache.array();

  channels = channels.filter(channel => {
    return channel.type == "text";
  });

  return channels;
}

module.exports = swadesh;
