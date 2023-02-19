import { ScraperClass } from "./classes/scraper/Scraper";
import fs from "fs";
import path from "path";
import { PairingClass } from "./classes/Pairing";
import { config } from "dotenv";
import { DiscordClass } from "./classes/discord/Discord";
import cron from "node-cron";
import { Scheduler } from "./classes/schedule/Scheduler";
config();

export const discord_instance = new DiscordClass(
  process.env.DISCORD_TOKEN || ""
);

/* discord.message_pairing("260543325252091905", {
  round: 1,
  table: "23",
  player_1: { name: "José Pedro Valentim Oliveira", score: "(0-0-0)" },
  player_2: { name: "José Pedro Valentim Oliveira", score: "(0-0-0)" },
}); */
new Scheduler("37 21 19 2 *", "https://rk9.gg/pairings/FeaUVURjohP4cvrMb5ZZ");
/* scheduler.event_schedule(); */

/* (async () => {
  const scraper = new ScraperClass(
    "https://rk9.gg/pairings/FeaUVURjohP4cvrMb5ZZ"
  );
  await scraper.init();
  const pairings_path = await scraper.generate_pairings();
})(); */
