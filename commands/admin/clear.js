const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const embed = require('../../modules/embed.js');
const { informations, channels } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clear `i` messages.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addIntegerOption(option =>
            option.setName('limite')
            .setDescription('Enter the number of messages to delete (100max).')
            .setRequired(true)),
    async execute(interaction) {
        var i = interaction.options.getInteger('limite');
        if (i > 100){
            await interaction.reply(`${interaction.member}, you can delete a maximum of 100 messages !`);
            return;
        }
        var logs = interaction.client.channels.cache.get(channels.logs);
        await interaction.channel.messages.fetch({limit: i}).then((messages) => {interaction.channel.bulkDelete(messages)});
        await interaction.reply(`>>> *${i} messages have been successfully deleted !*`);
        var clear = embed('Clear','#f56816',`${interaction.member} has deleted ${i} messages from the channel : ${interaction.channel}`,null,informations.name,informations.logo);
        logs.send({embeds: [clear]});
        setTimeout(async function(){
            await interaction.deleteReply();
        },3000);
    },
};