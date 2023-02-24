import cron from "node-cron";
import { discord_instance } from "../../index";
import { PairingClass } from "../Pairing";
import { ScraperClass } from "../scraper/Scraper";

export class Scheduler {
  private counter: number = 0;
  private interval: ReturnType<typeof setInterval>;
  private timeout: ReturnType<typeof setTimeout>;
  public constructor(private crontab: string, private pairing_link: string) {
    this.start();
  }
  private start() {
    console.log(`${this.crontab}`);
    cron.schedule(this.crontab, () => this.event_schedule());
  }
  private event_schedule() {
    console.log("event started");
    const registered = require("../../registered.json");
    // loop every minute
    this.interval = setInterval(async () => {
      if (this.counter == 60) {
        //After an hour of no new updates just get out of loop
        clearInterval(this.interval);
        console.log("event ended");
      }
      const scraper = new ScraperClass(this.pairing_link);
      await scraper.init();

      const pairings_path = await scraper.generate_pairings();
      if (pairings_path && typeof pairings_path === "string") {
        this.counter = 0;
        for (const player of registered) {
          const pairing = new PairingClass(player.name, pairings_path).get();
          if (pairing.length > 0) {
            discord_instance.message_pairing(player.discord_id, pairing[0]);
          }
        }
        setTimeout(() => {
          console.log("timeout");
        }, 3300000); //3300000
      } else {
        this.counter++;
      }
    }, 60000); //60000
  }
}
