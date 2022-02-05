const dotenv = require("dotenv");
dotenv.config();

const Prefix = process.env.PREFIX;
const Token = process.env.TOKEN;

const owner = "802317699157196850";
const invite = "https://discord.gg/jAuAwagpJU";

const groups = [
  ["fun", "[[FUN AND GAMES]]"],
  ["utility", "[[Utility Belt]]"],
  ["kromer", "Delicious Kromer!"]
];

const yellow = "#fff301";
const pink = "#ffaec9";
const colors = [yellow, pink];

module.exports = { Prefix, Token, owner, invite, groups, colors };
