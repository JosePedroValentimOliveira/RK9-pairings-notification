import { config } from "dotenv";
import { DiscordClass } from "./classes/discord/Discord";
config();

export const discord_instance = new DiscordClass(
  process.env.DISCORD_TOKEN || ""
);
console.log(new Date());
