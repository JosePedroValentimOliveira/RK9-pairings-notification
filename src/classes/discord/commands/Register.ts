import { SlashCommandBuilder, CommandInteraction } from "discord.js/";
import fs from "fs";
import path from "path";
export const RegisterCommand: any = {
  data: new SlashCommandBuilder()
    .setName("register")
    .setDescription("Registers your name to be tracked for events")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("Your name in RK9")
        .setRequired(true)
    ),
  async execute(interaction: CommandInteraction) {
    const registered = require(path.join(
      __dirname,
      "..",
      "..",
      "..",
      "registered.json"
    ));
    await interaction.reply(
      `${interaction.user}, You were succesfully registered as ${
        interaction.options.get("name")?.value
      }`
    );
    registered.push({
      name: interaction.options.get("name")?.value,
      discord_id: interaction.user.id,
    });
    fs.writeFileSync(
      path.join(__dirname, "..", "..", "..", "registered.json"),
      JSON.stringify(registered)
    );
  },
};
