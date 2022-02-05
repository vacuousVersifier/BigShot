const sqlite3 = require("sqlite3");
const crypto = require("crypto");

module.exports = class SuggestionDatabase {
  constructor(path) {
    if(!path) {
      path = "database.sqlite";
    }

    this.db = new sqlite3.Database(path);
  }

  initialize() {
    this.db.serialize(() => {
      this.db.run("CREATE TABLE IF NOT EXISTS suggestions (id Text primary key, userID Text, suggestion Text)");
    });
  }

  all(callback) {
    console.log("All");
    this.db.all("SELECT * FROM suggestions", callback);
  }

  add(userID, suggestion, callback){
    console.log("Add - ", userID);
    this.db.run(`INSERT INTO suggestions (id, userID, suggestion) VALUES("${crypto.randomBytes(5).toString("hex")}", "${userID}", "${suggestion}")`, callback);
  }

  delete(id, callback){
    this.db.run(`DELETE FROM kromer WHERE id = "${id}"`, callback);
  }
};
