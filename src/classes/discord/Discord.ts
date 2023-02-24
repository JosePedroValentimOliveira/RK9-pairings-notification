import {
  Client,
  Events,
  GatewayIntentBits,
  Collection,
  EmbedBuilder,
} from "discord.js";
import { NewEventCommand } from "./commands/NewEvent";
import { RegisterCommand } from "./commands/Register";

import fs from "fs";
import path from "path";
import { Pairing } from "../../types/types";

export class DiscordClass {
  private client: any;

  public constructor(private token: string) {
    this.client = new Client({ intents: [GatewayIntentBits.Guilds] });
    this.client.commands = new Collection();
    this.client.commands.set(RegisterCommand.data.name, RegisterCommand);
    this.client.commands.set(NewEventCommand.data.name, NewEventCommand);
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
  public message_pairing(user_id: string, pairing: Pairing) {
    const message = new EmbedBuilder()
      .setTitle(`Pairing round ${pairing.round}`)
      .setDescription(`Table ${pairing.table}`)
      .addFields(
        {
          name: "Player 1",
          value: `${pairing.player_1.name} ${pairing.player_1.score}`,
          inline: true,
        },
        {
          name: "Player 2",
          value: `${pairing.player_2.name} ${pairing.player_2.score}`,
          inline: true,
        }
      );
    this.client.users.fetch(user_id, false).then((user: any) => {
      user.send({ embeds: [message] });
    });
  }
}
