const Discord = require('discord.js');

module.exports = {
	name: 'botinfo',
	description: 'Sends some information about the bot',
	category: 'info',
	execute(bot, message, args) {
        var descriptionText = `**Basic**\n`;
        descriptionText += `\`Name        :\` ${bot.settings.basic.name}\n`;
        descriptionText += `\`Description :\` ${bot.settings.basic.description}\n`;
        descriptionText += `\`Prefix      :\` ${bot.settings.basic.prefix}\n`;
        descriptionText += `\`Version     :\` ${bot.settings.basic.version}\n`;

        descriptionText += `\n**Activity**\n`;
        descriptionText += `\`Status      :\` ${bot.settings.activity.status}\n`;
        descriptionText += `\`Text        :\` ${bot.settings.activity.text}\n`;
        descriptionText += `\`Activity    :\` ${bot.settings.activity.activity}\n`;
        descriptionText += `\`Stream Link :\` ${bot.settings.activity.link}\n`;

        descriptionText += `\n**Other**\n`;
        descriptionText += `\`Latency     :\` ${Date.now() - message.createdTimestamp}ms\n`;
        descriptionText += `\`API latency :\` ${Math.round(bot.ws.ping)}ms\n`;
        descriptionText += `\`Stalking    :\` ${bot.settings.log.stalkingEnabled}\n`;

        const helpEmbed = new Discord.MessageEmbed()
            .setColor(bot.settings.basic.defaultColor)
            .setDescription(descriptionText)
            .setAuthor(`${bot.settings.basic.name}\'s bot informatie` , bot.user.displayAvatarURL(), '')
            .setTimestamp()
            .setFooter(`Info opgevraagd door ${message.author.username}`, message.author.displayAvatarURL({dynamic:  true}));
                      
        message.channel.send(helpEmbed);
	},
};