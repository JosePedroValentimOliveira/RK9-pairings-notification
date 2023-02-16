import { SlashCommandBuilder } from 'discord.js';

export const PingCommand = {
    data: new SlashCommandBuilder().setName('yot').setDescription("reeee"),
    async execute(interaction) {
        await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`)
    }
}
export const RegisterCommand = {
    data: new SlashCommandBuilder().setName('register').setDescription("Registers your name to be tracked for events").addStringOption(option=>option.setName('name').setDescription('Your name in RK9').setRequired(true)),
    async execute(interaction) {
        console.log(interaction.options.getString('name'))
        console.log(interaction.user.id)
        await interaction.reply(`This command was run by ${interaction.user}, who joined on ${interaction.member.joinedAt}.`)
    }
}
