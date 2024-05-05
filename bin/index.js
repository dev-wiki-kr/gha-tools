#!/usr/bin/env node

const argv = require("minimist")(process.argv.slice(2));

const {
  _: [command, ...params],
} = argv;

switch (command) {
  case "notify-discord-bot":
    require("../lib/notify-discord-bot")(argv);
    break;
  default:
    throw new Error("Unknown command");
}
