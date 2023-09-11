import { Bot, GrammyError, HttpError, session } from "grammy";
import { config } from "dotenv";
import { mainMenu } from "./keyboards.js";

import { conversations, createConversation } from "@grammyjs/conversations";
import { getClientLocation } from "./conversations/getClientLocation.js";
import { movie } from "./conversations/movie.js";

config();
const TOKEN = process.env.TOKEN;
const BOT_NAME = process.env.BOT_NAME;

const bot = new Bot(TOKEN);

bot.use(session({ initial: () => ({}) }));
bot.use(conversations());

// creating conversations
// bot.use(createConversation(getClientRegion));
bot.use(createConversation(getClientLocation));
bot.use(createConversation(movie));
bot.use(mainMenu);

bot.command("start", async (ctx) => {
  ctx.session[ctx.chat.id] = ctx.session[ctx.chat.id] || {};
  await ctx.reply(".....", {
    reply_markup: { remove_keyboard: true },
  });
  await ctx.reply("Assalamu alaykum 😊", {
    reply_markup: { remove_keyboard: true },
    reply_markup: mainMenu,
  });
  return;
});

bot.command("movie", async (ctx) => {
  await ctx.conversation.enter("movie");
});

bot.command("orqaga", async (ctx) => {
  await ctx.reply("../", {
    reply_markup: { remove_keyboard: true },
  });
  await ctx.reply("Asosiy menu", {
    reply_markup: mainMenu,
  });
  return;
});

bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error("Error in request:", e.description);
  } else if (e instanceof HttpError) {
    console.error("Could not contact Telegram:", e);
  } else {
    console.error("Unknown error:", e);
  }
});

bot.start();
