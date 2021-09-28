const Discord = require('discord.js');
const xpFunctions = require(__dirname + '/../../XPsystem/functions.js');

module.exports = {
	name: 'xpleader',
	description: 'Shows you the xp leaderboard',
	category: 'leveling',
	guildOnly: true,
	execute(bot, message, args) {
		const leaderFile = require(__dirname + '/../../XPsystem/commands/leaderboard.js');
		var leaderboard = leaderFile.execute(message, args);

        if (leaderboard.length === 0)
        {
            var descriptionText = "**Het leaderboard is nog leeg.**";
        }
        else
        {
            var descriptionText = '';

            for (var i = 0; i < leaderboard.length; i++)
            {
                descriptionText += `**#${i+1}**\n`;
                descriptionText += `\`Name  :\` ${leaderboard[i].name}\n`;
                descriptionText += `\`XP    :\` ${leaderboard[i].xp}xp\n`;
                descriptionText += `\`Level :\` ${leaderboard[i].level}\n\n`;
            }
        }

        const helpEmbed = new Discord.MessageEmbed()
            .setColor(bot.settings.basic.defaultColor)
            .setDescription(descriptionText)
            .setAuthor(`${message.guild.name}\'s xp leaderboard` , '', '')
            .setTimestamp()
            .setFooter(`Leaderboard opgevraagd door ${message.author.username}`, message.author.displayAvatarURL({dynamic:  true}));
                      
        message.channel.send(helpEmbed);
	},
};