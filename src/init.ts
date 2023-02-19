import { ScraperClass } from "./classes/scraper/Scraper";
import fs from "fs";
import path from "path";
import { PairingClass } from "./classes/Pairing";
import { config } from "dotenv";
import { DiscordClass } from "./classes/discord/Discord";
config();

new DiscordClass(process.env.DISCORD_TOKEN || "");
