const github = require("@actions/github");
const Discord = require("discord.js");
const core = require("@actions/core");

module.exports = function () {
  const {
    DISCORD_WEBHOOK_ID,
    DISCORD_WEBHOOK_TOKEN,
    SHORT_SHA,
    DISCORD_TITLE,
    DISCORD_COLOR,
    DISCORD_IMAGE,
  } = process.env;

  const repo = github.context.repo.repo;

  const embedBlock = {
    color: DISCORD_COLOR,
    title: DISCORD_TITLE,
    description: `최신 커밋: ${SHORT_SHA}`,
    url: repo,
    thumbnail: {
      url: DISCORD_IMAGE,
    },
    image: {
      url: DISCORD_IMAGE,
    },
    timestamp: new Date().toISOString(),
  };

  try {
    const hook = new Discord.WebhookClient(
      DISCORD_WEBHOOK_ID,
      DISCORD_WEBHOOK_TOKEN
    );

    hook.send({
      embeds: [embedBlock],
    });
  } catch (err) {
    core.info(err);
  }
};
