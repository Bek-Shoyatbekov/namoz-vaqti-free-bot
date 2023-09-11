import { Menu } from "@grammyjs/menu";

export const regions = {
  tashkent: "Tashkent",
  andijon: "Andijon",
  buxoro: "Buxoro",
  fargona: "Farg'ona",
  jizzax: "Jizzax",
  xorazm: "Xorazm",
  namangan: "Namangan",
  navoiy: "Navoiy",
  qashqadaryo: "Qashqadaryo",
  qoraqalpogiston: "Qoraqalpogiston",
  samarqand: "Samarqand",
  sirdaryo: "Sirdaryo",
  surxondaryo: "Surxondaryo",
};

export const mainMenu = new Menu("mainMenu")
  .text("🏘Shahar tanlash", async (ctx) => {
    await ctx.conversation.enter("getClientLocation");
  })
  .text("📿Namoz vaqti", async (ctx) => {
    if (Object.keys(ctx.session[ctx.chat.id]).length == 0) {
    }
    ctx.conversation.enter("getPrayingTime");
  })
  .text("🔔Bildirishnomalar", async (ctx) => {
    await ctx.conversation.enter("notifications");
  })
  .row();
  

