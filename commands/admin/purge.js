const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const embed = require('../../modules/embed.js');
const { informations, channels } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('purge')
        .setDescription('Clone the channel and delete the original.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    async execute(interaction) {
        var channel = await interaction.channel.clone();
        await interaction.channel.delete();
        var logs = interaction.client.channels.cache.get(channels.logs);
        message = await channel.send(`>>> *The channel has been purged !*`);
        var clear = embed('Purge','#f56816',`${interaction.member} purged the channel: ${channel}`,null,informations.name,informations.logo);
        logs.send({embeds: [clear]});
        setTimeout(async function(){
            await message.delete();
        },3000);
    },
};