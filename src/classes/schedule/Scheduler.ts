import cron from "node-cron";
import { discord_instance } from "../../init";
import { PairingClass } from "../Pairing";
import { ScraperClass } from "../scraper/Scraper";

export class Scheduler {
  private counter: string;
  private interval: ReturnType<typeof setInterval>;
  private timeout: ReturnType<typeof setTimeout>;
  public constructor(private crontab: string, private pairing_link: string) {
    this.start();
  }
  private start() {
    cron.schedule(this.crontab, () => this.event_schedule());
  }
  private event_schedule() {
    const registered = require("../../registered.json");
    // loop every minute
    this.interval = setInterval(async () => {
      const scraper = new ScraperClass(this.pairing_link);
      await scraper.init();
      const pairings_path = await scraper.generate_pairings();

      if (pairings_path && typeof pairings_path === "string") {
        for (const player of registered) {
          const pairing = new PairingClass(player.name, pairings_path).get();

          if (pairing.length > 0) {
            discord_instance.message_pairing(player.discord_id, pairing[0]);
          }
        }
      }

      /* this.timeout = setTimeout(() => {}, 3300000); */
    }, 6000); //60000
  }
}
