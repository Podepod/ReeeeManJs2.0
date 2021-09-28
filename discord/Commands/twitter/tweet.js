const fs = require('fs');
const Discord = require('discord.js');
const Twitter = require('../../twitter.js');


module.exports = {
	name: 'tweet',
	description: 'Pls werk',
	category: 'twitter',
	guildOnly: true,
	execute(bot, message, args) {
		if (args.length == 0){
            return message.reply("Ik kan geen lege tweet versturen.");
        };

        bot.twitterSettings = JSON.parse(fs.readFileSync(__dirname + '/../../../datafiles/twitterSettings.json'));

        if (!bot.twitterSettings.enabled) {
            return message.reply('De twitter module is uitgeschakeld.');
        };
        if (bot.twitterSettings.ownerOnly && message.author.id != bot.settings.userIDs.owner) {
            return message.reply('Alleen de bot owner kan dit command uitvoeren.');
        };
        if (bot.twitterSettings.adminOnly && bot.twitterSettings.admins.indexOf(message.author.id) <= -1 && message.author.id != bot.settings.userIDs.owner) {
            return message.reply('Alleen de serveradmins kunnen dit command uitvoeren.');
        }

        tweetTxt = args.join(' '); // tweetTXT is nu dus de zin die moet verstuurd worden

        const tweetEmbed = new Discord.MessageEmbed()
            .setColor(bot.settings.basic.defaultColor)
            .setTitle('Twitter Alert')
            .setDescription(`\`Tweeter mens \`: ${message.author.username}\n\`Tweet Text   \`: '${tweetTxt}'\n\`Server       \`: ${message.guild.name}\n\`Twitter Link \`: https://twitter.com/Podepod`)
            .setAuthor(message.author.username, message.author.displayAvatarURL(), '')
            .setTimestamp()

        bot.guilds.fetch('564842932981596161')
			.then(guild => guild.members.fetch(bot.settings.userIDs.owner))
			.then(member => member.send(tweetEmbed));

        T = new Twitter(bot.twitterSettings.apiKey, bot.twitterSettings.apiSecretKey, bot.twitterSettings.accessToken, bot.twitterSettings.accessTokenSecret, bot.twitterSettings.bearerToken)
        T.tweet(tweetTxt);

        return message.channel.send('Je tweet is mogelijks verstuurd, kan ook dat er een error was idk.')
	},
};