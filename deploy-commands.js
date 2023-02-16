import { REST, Routes } from 'discord.js';
import { PingCommand, RegisterCommand } from './commands.js';
import { config } from 'dotenv'
config()

const commands = [];

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment

commands.push(PingCommand.data.toJSON());
commands.push(RegisterCommand.data.toJSON());


// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_ID),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();