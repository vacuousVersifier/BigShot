module.exports = class Server {
  run() {  const app = require("express")();
    app.get("/", (req, res) => res.send("Server is live"));
    app.listen(3000, () => console.log("Listening on port 3000"));
  }
};
