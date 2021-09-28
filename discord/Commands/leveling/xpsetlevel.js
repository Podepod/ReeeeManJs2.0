const Discord = require('discord.js');
const xpFunctions = require(__dirname + '/../../XPsystem/functions.js');

module.exports = {
	name: 'xpsetlevel',
	description: 'Sets the xp level of a user to a given level',
	category: 'leveling',
	guildOnly: true,
    adminOnly: true,
	execute(bot, message, args) {
		const setLevelFile = require(__dirname + '/../../XPsystem/commands/setlevel.js');
        var profile = setLevelFile.execute(message, args);
        var descriptionText = '';
        console.log(profile);

        if (profile[2] != null)
        {
            descriptionText += `**${profile[2]}**\n`;
            descriptionText += `\n**Profile**\n`;
        }

		descriptionText += `\`Name         :\` ${profile[0].name}\n`;
        descriptionText += `\`XP           :\` ${profile[0].xp}xp\n`;
        descriptionText += `\`Level        :\` ${profile[0].level}\n`;
        descriptionText += `\`Daily streak :\` ${profile[0].dailyStreak.streak} days\n`;
        descriptionText += `\`Next level   :\` ${xpFunctions.calculateNextLevel(profile[0].level, profile[0].levelXp)}xp\n`;
        descriptionText += `\`Leaderboard  :\` #${profile[1]}\n`;

        const helpEmbed = new Discord.MessageEmbed()
            .setColor(bot.settings.basic.defaultColor)
            .setDescription(descriptionText)
            .setAuthor(`${profile[0].name}\'s XP profile` , '', '')
            .setTimestamp()
            .setFooter(`Profile opgevraagd door ${message.author.username}`, message.author.displayAvatarURL({dynamic:  true}));
                      
        message.channel.send(helpEmbed);
	},
};