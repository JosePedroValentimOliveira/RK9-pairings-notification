import { ScraperClass } from "./classes/Scraper";
import fs from "fs";
import path from "path";
import { PairingClass } from "./classes/Pairing";

const start = async () => {
  const dir_path = path.join(__dirname, "event_results");
  
  if (!fs.existsSync(dir_path)) {
    fs.mkdirSync(dir_path);
  }

  const scraper = new ScraperClass(
    "https://rk9.gg/pairings/pSploGDVVtciEUExOo43"
  );

  await scraper.init();
  const round_path = await scraper.generate_pairings();
  const pairing = new PairingClass("Jamie Frankland", round_path);
  //await pairing.get() => outputs found pairings
};
start();
