const Discord = require('discord.js');
const xpFunctions = require(__dirname + '/../../XPsystem/functions.js');

module.exports = {
	name: 'xpdaily',
	description: 'Give you your daily xp reward',
	category: 'leveling',
	guildOnly: true,
	execute(bot, message, args) {
		const dailyFile = require(__dirname + '/../../XPsystem/commands/daily.js');
		daily = dailyFile.execute(message, args);
        const profileFile = require(__dirname + '/../../XPsystem/commands/profile.js');
		profile = profileFile.execute(message, args);

        var descriptionText = `**Daily Reward**\n`;
        if (daily == -1)
        {
            descriptionText += `Daily rewards zijn uitgeschakeld voor ${message.guild.name}.\n`;
        }
        else if (daily == -2)
        {
            descriptionText += `Je kan je daily reward nog niet claimen, wacht nog wat langer.\n`;
        }
        else
        {
            descriptionText += `\`Reward       :\` ${daily}\n`;
        }

        descriptionText += `\n**Profile**\n`
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
            .setFooter(`Daily opgevraagd door ${message.author.username}`, message.author.displayAvatarURL({dynamic:  true}));
                      
        message.channel.send(helpEmbed);
	},
};