import { Client, Events, GatewayIntentBits, Collection } from "discord.js";
import { RegisterCommand } from "./commands/Register";
import fs from "fs";
import path from "path";

export class DiscordClass {
  private client: any;

  public constructor(private token: string) {
    this.client = new Client({ intents: [GatewayIntentBits.Guilds] });
    this.client.commands = new Collection();
    this.client.commands.set(RegisterCommand.data.name, RegisterCommand);
    this.check_registered();
    this.on_interaction();
    this.on_ready();
    this.login();
  }

  private check_registered() {
    const dir_path = path.join(__dirname, "..", "..", "registered.json");
    if (!fs.existsSync(dir_path)) {
      fs.writeFileSync(dir_path, JSON.stringify([]));
    }
  }
  private login() {
    this.client.login(this.token);
  }

  private on_ready() {
    this.client.once(Events.ClientReady, (c: any) => {
      console.log(`Ready! Logged in as ${c.user.tag}`);
    });
  }
  private on_interaction() {
    this.client.on(Events.InteractionCreate, async (interaction: any) => {
      if (!interaction.isChatInputCommand()) return;

      const command: any = interaction.client.commands.get(
        interaction.commandName
      );

      if (!command) {
        console.error(
          `No command matching ${interaction.commandName} was found.`
        );
        return;
      }

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    });
  }
}
