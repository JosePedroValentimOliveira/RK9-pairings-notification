import cheerio from "cheerio";
import axios from "axios";
import fs from "fs";
import path from "path";

export class ScraperClass {
  private html: string;
  private event_name: string;
  private dir_path: string;
  private round: string;

  public constructor(private link: string) {}

  public async init() {
    this.html = await this.get_html();
    this.event_name = await this.get_event_name();
    this.dir_path = path.join(__dirname, "..", "event_results");
    await this.generate_event_folder();
    this.round = "1"; //await this.get_round()
  }

  private async get_event_name() {
    const $ = cheerio.load(this.html);
    const event_name = $("h4").text().toLowerCase().split(" ").join("-");
    const event_date = new Date($("h5").text().split("at")[0])
      .toISOString()
      .split("T")[0];
    return event_name + "-" + event_date;
  }

  private async generate_event_folder() {
    if (!fs.existsSync(this.dir_path)) {
      fs.mkdirSync(this.dir_path);
    }
    if (!fs.existsSync(`${this.dir_path}/${this.event_name}`)) {
      fs.mkdirSync(`${this.dir_path}/${this.event_name}`);
    }
  }

  public async generate_pairings(): Promise<string | boolean> {
    const round_path = `${this.dir_path}/round_${this.round}.json`;
    if (!fs.existsSync(round_path)) {
      const $ = cheerio.load(this.html);
      const masterPairings = $(`#P2R${this.round} > .row.row-cols-3.match`);
      const pairings_array: any[] = [];
      masterPairings.each((i, pair) => {
        const data = $(pair)
          .text()
          .replace(/  /gm, "")
          .split(/\r\n|\n|\r/gm)
          .filter((el) => {
            return el !== "" && !el.includes("pts");
          });

        if (!data[3]) {
          data[3] = "";
        }
        const obj = {
          round: this.round,
          table: `${data[3].replace("Table", "")}` || "",
          player_1: {
            name: `${data[0]} ${data[1]}` || "",
            score: data[2] || "",
          },
          player_2: {
            name: `${data[4]} ${data[5]}` || "",
            score: data[6] || "",
          },
        };

        pairings_array.push(obj);
      });
      fs.writeFileSync(round_path, JSON.stringify(pairings_array));
      return round_path;
    }
    return false;
  }

  private async get_round() {
    const $ = cheerio.load(this.html);
    return $("#P2-tab").text().split(" ")[3];
  }

  private async get_html(): Promise<string> {
    return await (
      await axios.get(this.link)
    ).data;
  }
}
