const dotenv = require("dotenv");
dotenv.config();

const Prefix = process.env.PREFIX;
const Token = process.env.TOKEN;

const owner = "802317699157196850";
const invite = "https://discord.gg/dFmgxrxU5A";

const groups = [
  ["fun", "Fun"],
  ["utility", "Useful"]
];

module.exports = { Prefix, Token, owner, invite, groups };
