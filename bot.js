import { config } from "dotenv";
import { Telegraf } from "telegraf";

config();
const bot = new Telegraf(process.env.TOKEN);

