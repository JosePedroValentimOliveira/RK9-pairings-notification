// Require the necessary discord.js classes
import { Client, Events, GatewayIntentBits, Collection } from 'discord.js';
import { config } from 'dotenv'
config()
import { PingCommand, RegisterCommand } from './commands.js'

// Create a new client instance

export const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
client.commands.set(PingCommand.data.name, PingCommand)
client.commands.set(RegisterCommand.data.name, RegisterCommand)


// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, (c) => {
    console.log(`Logged in as ${c.user.tag}!`);

    
});


client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});


// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);