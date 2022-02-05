const sqlite3 = require("sqlite3");

module.exports = class KromerDatabase {
  constructor(path) {
    if(!path) {
      path = "database.sqlite";
    }

    this.db = new sqlite3.Database(path);
  }

  initialize() {
    this.db.serialize(() => {
      this.db.run("CREATE TABLE IF NOT EXISTS kromer (userID Text primary key, amount Integer)");
    });
  }

  all(callback) {
    console.log("All");
    this.db.all("SELECT * FROM kromer", callback);
  }

  get(userID, callback) {
    console.log("Get - ", userID);
    this.db.all(`SELECT * FROM kromer WHERE userID = "${userID}"`, callback);
  }

  add(userID, callback){
    console.log("Add - ", userID);
    this.db.run(`INSERT INTO kromer (userID, amount) VALUES("${userID}", 0)`, callback);
  }

  update(userID, amount, callback){
    this.db.run(`UPDATE kromer SET amount = ${amount} WHERE userID = "${userID}"`, callback);
  }

  delete(userID, callback){
    this.db.run(`DELETE FROM kromer WHERE userID = "${userID}"`, callback);
  }
};
