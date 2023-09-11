import { Menu } from "@grammyjs/menu";
import axios from "axios";
import { Keyboard } from "grammy";
import { config } from "dotenv";

config();
const BASE_URL = process.env.PRAYING_TIME_API;

export const getKeys = (region) => {
  return Object.keys(region);
};

export const makeKeyboards = (data) => {
  let buttonRows = [];
  if (Array.isArray(data)) {
    buttonRows = data.map((e) => [Keyboard.text(e)]);
  } else {
    for (let i in data) {
      buttonRows.push([Keyboard.text(data[i])]);
    }
  }
  const keyboards = Keyboard.from(buttonRows).resized();
  return keyboards;
};

export const makeMenu = (data) => {
  let buttonRows = [];
  if (Array.isArray(data)) {
    buttonRows = data.map((e) => [Menu.text(e)]);
  } else {
    for (let i in data) {
      buttonRows.push([Menu.text(data[i])]);
    }
  }
  const keyboards = Menu.from(buttonRows).resized();
  return keyboards;
};

export const getPrayingTimes = async (date, latitude, longitude) => {
  try {
    let ans = {};
    let res = await axios.get(
      `${BASE_URL}/${date}?latitude=${latitude}&longitude=${longitude}`
    );
    ans.times = res.data.data.timings;
    ans.dateHijri = res.data.data.date.hijri.date;
    return ans;
  } catch (err) {
    console.log(`Error while getting api ` + err);
    return err;
  }
};

/**
 *
 * @param {object} data. data must have : times, city, chosenRegion, today , dateHijr
 * @returns printable praying times
 */
export const pritablePrayingTimes = (data) => {
  const times = data.times;
  let result = `
  📍<i>${data.city[0].toUpperCase() + data.city.slice(1)} , ${
    data.chosenRegion[0].toUpperCase() + data.chosenRegion.slice(1)
  }</i>
  <strong>
  🗓Sana: ${data.today}
  🌙Hijri sana: ${data.dateHijri}
  
  🌆Bomdod: ${data.times.Fajr}
  🌅Quyosh: ${data.times.Sunrise}
  🏙Peshin: ${data.times.Dhuhr}
  🌁Asr: ${data.times.Asr}
  🌄Quyosh botishi: ${data.times.Sunset}
  🌃Xufton: ${data.times.Isha}
  </strong>
  ❗️ <b>Namoz vaqtlari +5 yoki -5 bo'lishi mumkun</b>
  `;
  return result;
};

