import { REST, Routes } from "discord.js";
import { RegisterCommand } from "./commands/Register";
import { config } from "dotenv";
/* import { DiscordClass } from "./classes/discord/Discord"; */
config();
const commands = [];
console.log(process.env.DISCORD_TOKEN);

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment

commands.push(RegisterCommand.data.toJSON());

// Construct and prepare an instance of the REST module
const rest = new REST({ version: "10" }).setToken(
  process.env.DISCORD_TOKEN || ""
);

// and deploy your commands!
(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    // The put method is used to fully refresh all commands in the guild with the current set
    const data: any = await rest.put(
      Routes.applicationGuildCommands(
        process.env.DISCORD_CLIENT_ID || "",
        process.env.DISCORD_GUILD_ID || ""
      ),
      { body: commands }
    );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
