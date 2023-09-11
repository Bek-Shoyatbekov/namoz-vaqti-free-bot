export async function movie(conversation, ctx) {
  await ctx.reply("Please send me your name");
  while (true) {
    ctx = await conversation.wait();
    
    if (ctx.has("message:text")) {
      ctx.chatAction = "typing";
      await conversation.sleep(1000);

      return ctx.reply(`Hello, ${ctx.message.text}!`);
    } else {
      await ctx.reply("Please send me your name");
    }
  }
}
