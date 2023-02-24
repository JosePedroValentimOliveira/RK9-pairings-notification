import { SlashCommandBuilder, CommandInteraction } from "discord.js/";
import { Scheduler } from "../../schedule/Scheduler";
export const NewEventCommand: { data: any; execute: any } = {
  data: new SlashCommandBuilder()
    .setName("new-event")
    .setDescription("Registers a event to be tracked")
    .addStringOption((option) =>
      option
        .setName("crontab")
        .setDescription("Cron tab for the date event start")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("event_name")
        .setDescription(
          "Event name, do make a difference between day one and two"
        )
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("pairings_link")
        .setDescription("Link to the events pairing")
        .setRequired(true)
    ),
  async execute(interaction: CommandInteraction) {
    const crontab = interaction.options.get("crontab")?.value?.toString() || "";
    const pairing_link =
      interaction.options.get("pairings_link")?.value?.toString() || "";
    new Scheduler(crontab, pairing_link);
    await interaction.reply(
      `${interaction.user}, You succesfully registered ${
        interaction.options.get("event_name")?.value
      } as an event`
    );
  },
};
