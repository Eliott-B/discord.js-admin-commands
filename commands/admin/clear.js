const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const embed = require('../../modules/embed.js');
const { informations, channels } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Supprime `i` messages du salon.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addIntegerOption(option =>
            option.setName('limite')
            .setDescription('Donnez le nombre de messages à supprimer (100max).')
            .setRequired(true)),
    async execute(interaction) {
        var i = interaction.options.getInteger('limite');
        if (i > 100){
            await interaction.reply(`${interaction.member}, tu peux supprimer que 100 messages maximum !`);
            return;
        }
        var logs = interaction.client.channels.cache.get(channels.logs);
        await interaction.channel.messages.fetch({limit: i}).then((messages) => {interaction.channel.bulkDelete(messages)});
        await interaction.reply(`>>> *${i} messages ont bien été supprimés !*`);
        var clear = embed('Clear','#f56816',`${interaction.member} a supprimé ${i} messages dans le salon : ${interaction.channel}`,null,informations.name,informations.logo);
        logs.send({embeds: [clear]});
        setTimeout(async function(){
            await interaction.deleteReply();
        },3000);
    },
};