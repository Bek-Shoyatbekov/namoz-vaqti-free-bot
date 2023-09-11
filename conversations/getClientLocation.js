import {
  getKeys,
  getPrayingTimes,
  makeKeyboards,
  pritablePrayingTimes,
} from "../utils.js";
import { regions } from "../keyboards.js";
import { regionsParams } from "../parameters.js";
import moment from "moment";

export async function getClientLocation(conversation, ctx) {
  let step = 0;
  const regionsMenu = makeKeyboards(regions);
  let citiesMenu;
  let chosenRegionCities = [];
  let chosenRegion;
  let city;
  await ctx.reply("Viloyat ( shahar ) ni tanlang", {
    reply_markup: regionsMenu,
  });
  while (true) {
    ctx = await conversation.wait();
    chosenRegion = ctx.message.text.toLowerCase();
    if (Object.keys(regions).includes(chosenRegion)) {
      step++;
      chosenRegionCities = getKeys(regionsParams[chosenRegion]).map(
        (e) => e[0].toUpperCase() + e.slice(1)
      );
      citiesMenu = makeKeyboards(chosenRegionCities);
      await ctx.reply("Shaharingiz tanlang", {
        reply_markup: citiesMenu,
      });
    }
    else if (!Object.keys(regions).includes(chosenRegion) && step == 0) {
      await ctx.reply("Bunday viloyat / shahar topilmadi!", {
        reply_markup: regionsMenu,
      });
      continue;
    }
    if (step == 1) {
      ctx = await conversation.wait();
      city = ctx.message.text.toLowerCase();
      if (!Object.keys(regionsParams[chosenRegion]).includes(city)) {
        ctx.reply("Bunday viloyat / shahar topilmadi!", {
          reply_markup: citiesMenu,
        });
        continue;
      } else {
        const today = moment().format("MM/DD/YYYY").replaceAll("/", "-");
        const latitude = regionsParams[chosenRegion][city][0];
        const longitude = regionsParams[chosenRegion][city][1];
        let data = await getPrayingTimes(today, latitude, longitude);
        data.city = city;
        data.chosenRegion = chosenRegion;
        data.today = today;
        data.latitude = latitude;
        data.longitude = longitude;
        ctx.session[ctx.chat.id].city = city;
        const printableTimes = pritablePrayingTimes(data);
        ctx.reply(printableTimes, { parse_mode: "HTML" });
        step = 1;
        continue;
      }

    }
  }


  // let userRegionContext = await conversation.wait();

  // // let chosenRegion = userRegionContext.message.text.toLowerCase();
  // // if incorrect regions were given
  // while (!Object.keys(regions).includes(chosenRegion)) {
  //   await ctx.reply("Bunday viloyat/shahar topilmadi!", {
  //     reply_markup: regionsMenu,
  //   });
  //   userRegionContext = await conversation.wait();
  //   chosenRegion = userRegionContext.message.text.toLowerCase();
  //   ctx.session[ctx.chat.id].chosenRegion =
  //     userRegionContext.message.text.toLowerCase();
  // }


  // let userCityContext = await conversation.wait();
  // // let city = userCityContext.message.text.toLowerCase();

  // while (!Object.keys(regionsParams[chosenRegion]).includes(city)) {
  //   ctx.reply("Bunday viloyat/shahar topilmadi!", {
  //     reply_markup: citiesMenu,
  //   });
  //   userCityContext = await conversation.wait();
  //   city = userCityContext.message.text.toLowerCase();
  // }
  // const today = moment().format("MM/DD/YYYY").replaceAll("/", "-");
  // const latitude = regionsParams[chosenRegion][city][0];
  // const longitude = regionsParams[chosenRegion][city][1];
  // let data = await getPrayingTimes(today, latitude, longitude);
  // data.city = city;
  // data.chosenRegion = chosenRegion;
  // data.today = today;
  // data.latitude = latitude;
  // data.longitude = longitude;
  // ctx.session[ctx.chat.id].city = city;
  // const printableTimes = pritablePrayingTimes(data);
  // ctx.reply(printableTimes, { parse_mode: "HTML" });
}
