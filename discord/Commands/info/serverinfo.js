const Discord = require('discord.js');

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

module.exports = {
	name: 'serverinfo',
	description: 'Sends some information about the current server',
    guildOnly: true,
	category: 'info',
	execute(bot, message, args) {
        var guild = message.guild;
        var descriptionText = `**Basic**\n`;
        descriptionText += `\`Name         :\` ${guild.name}\n`;
        descriptionText += `\`Description  :\` ${guild.description}\n`;
        descriptionText += `\`Owner        :\` ${guild.owner.user.username} (${guild.owner.nickname})\n`;
        descriptionText += `\`Created at   :\` ${guild.createdAt.toLocaleString('nl-BE', {
            weekday: 'long', // long, short, narrow
            day: 'numeric', // numeric, 2-digit
            year: 'numeric', // numeric, 2-digit
            month: 'long', // numeric, 2-digit, long, short, narrow
            hour: 'numeric', // numeric, 2-digit
            minute: 'numeric', // numeric, 2-digit
            second: 'numeric', // numeric, 2-digit
        }).capitalize()}\n`;
        descriptionText += `\`Region       :\` ${guild.region.capitalize()}\n`;
        descriptionText += `\`Verification :\` level ${guild.verification}\n`;

        descriptionText += `\n**Text Channels**\n`;

        var TextChannels = message.guild.channels.cache.filter(ch => ch.deleted == false && ch.type === 'text');
        var txtChannels = Array.from(TextChannels);
        var lengte = 0;
        for (var i = 0; i < txtChannels.length; i++)
        {
            if (txtChannels[i][1].name.length > lengte)
            {
                lengte = txtChannels[i][1].name.length;
            }            
            //descriptionText += `\`${txtChannels[i][1].name}\`\n`;
        }

        for (var i = 0; i < txtChannels.length; i++)
        {
            descriptionText += `\`${txtChannels[i][1].name} `;
            for (var j = 0; j < lengte - txtChannels[i][1].name.length; j++)
            {
                descriptionText += ` `;
            }
            descriptionText += `\`\n`;
        }

        descriptionText += `\n**Voice Channels**\n`;

        var VoiceChannels = message.guild.channels.cache.filter(ch => ch.deleted == false && ch.type === 'voice');
        var vcChannels = Array.from(VoiceChannels);
        lengte = 0;
        for (var i = 0; i < vcChannels.length; i++)
        {
            if (vcChannels[i][1].name.length > lengte)
            {
                lengte = vcChannels[i][1].name.length;
            }            
            //descriptionText += `\`${txtChannels[i][1].name}\`\n`;
        }

        for (var i = 0; i < vcChannels.length; i++)
        {
            descriptionText += `\`${vcChannels[i][1].name} `;
            for (var j = 0; j < lengte - vcChannels[i][1].name.length; j++)
            {
                descriptionText += ` `;
            }
            descriptionText += `\`\n`;
        }

        const helpEmbed = new Discord.MessageEmbed()
            .setColor(bot.settings.basic.defaultColor)
            .setDescription(descriptionText)
            .setThumbnail(guild.iconURL())
            .setAuthor(`Server informatie` , '', '')
            .setTimestamp()
            .setFooter(`Info opgevraagd door ${message.author.username}`, message.author.displayAvatarURL({dynamic:  true}));
                      
        message.channel.send(helpEmbed);
	},
};