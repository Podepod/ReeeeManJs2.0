const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	name: 'banroulette',
	description: 'IN DEVELOPMENT - t lukt gwn ni',
	category: 'misc',
	guildOnly: true,
	execute(bot, message, args) {
		var rawData = fs.readFileSync(__dirname + '/../../../datafiles/banroulette.json');
		rData = JSON.parse(rawData); // Roulette data

		var nogNietInit = false;

		if (args.length == 0) // geeft banroulette introductie
		{
			descriptionText = "**Ban Roulette**\n";
			descriptionText += "Ban Roulette is een minigame vol spanning en sensatie die je kan spelen met vrienden en familie.\n";
			descriptionText += `Alles wat je moet doen om mee te spelen is het commando \`${bot.settings.basic.prefix}banroulette play\` sturen!\n`;
			descriptionText += `Als er genoeg andere spelers meespelen kan je dan het spel starten door het commando \`${bot.settings.basic.prefix}banroulette start\`.\n`;

			descriptionText += "\n**Instructies**\n";
			descriptionText += `\`${bot.settings.basic.prefix}banroulette init\`: initialiseer de server\n`;
			descriptionText += `\`${bot.settings.basic.prefix}banroulette play\`: schrijf je in om mee te spelen\n`;
			descriptionText += `\`${bot.settings.basic.prefix}banroulette signin\`: schrijf je in om mee te spelen\n`;
			descriptionText += `\`${bot.settings.basic.prefix}banroulette start\`: start het spel (enkel als er genoeg spelers zijn)\n`;

			if (rData[message.channel.guild.id])
			{
				descriptionText += "\n**Server Settings**\n";
				descriptionText += `\`Enabled\`: ${rData[message.channel.guild.id].enabled}\n`;
				descriptionText += `\`Minimum spelers\`: ${rData[message.channel.guild.id].minPlayers}\n`;

				descriptionText += `\`Spelers\`:`;
				if (rData[message.channel.guild.id].players.length > 0)
				{
					for (var i = 0; i < rData[message.channel.guild.id].players.length; i++)
					{
						descriptionText += ` ${rData[message.channel.guild.id].players[i].name}`;
						if (i != rData[message.channel.guild.id].players.length - 1)
						{
							descriptionText += ",";
						}
					}
					descriptionText += "\n";
				}
				else
				{
					descriptionText += " Nog geen spelers\n";
				}

				descriptionText += `\`Keren gespeeld\`: ${rData[message.channel.guild.id].gamesPlayed}\n`;
			}
			else
			{
				descriptionText += "**\nServer Nog Niet Geïnitialiseerd**\n";
				descriptionText += `Voer het commando \`${bot.settings.basic.prefix}banroulette init\` uit om de server te initialiseren.\n`;
			}

			const infoEmbed = new Discord.MessageEmbed()
				.setColor(bot.settings.basic.defaultColor)
				.setDescription(descriptionText)
				.setAuthor(`Ban roulette info` , bot.user.displayAvatarURL(), '')
				.setTimestamp()
				.setFooter(`Info opgevraagd door ${message.author.username}`, message.author.displayAvatarURL({dynamic : true}));
                      
        	return message.channel.send(infoEmbed);
		}
		else if (/\binit\b/gmi.test(args[0]))
		{
			if (rData[message.channel.guild.id])
			{
				// Bestaat al, geen init meer nodig
				return message.reply("Deze server is al eens geïnitialiseerd, dit hoef je niet nog eens te doen.");
			}
			else
			{
				// Maak aan in file
				rData[message.channel.guild.id] = {
					"enabled": true,
					"minPlayers": 3,
					"players": [], 
					"gamesPlayed": 0
				}

				var descriptionText = "**Server Geïnitialiseerd**\n";

				descriptionText += "\n**Server Settings**\n";
				descriptionText += `\`Enabled\`: ${rData[message.channel.guild.id].enabled}\n`;
				descriptionText += `\`Minimum spelers\`: ${rData[message.channel.guild.id].minPlayers}\n`;
				descriptionText += `\`Spelers\`: Nog geen spelers\n`;
				descriptionText += `\`Keren gespeeld\`: ${rData[message.channel.guild.id].gamesPlayed}\n`;

				var reply = new Discord.MessageEmbed()
					.setColor(bot.settings.basic.defaultColor)
					.setDescription(descriptionText)
					.setAuthor(`Ban roulette server initialisatie` , bot.user.displayAvatarURL(), '')
					.setTimestamp()
					.setFooter(`Server geïnitialiseerd door ${message.author.username}`, message.author.displayAvatarURL({dynamic : true}));
			}
		}
		else if (/\b(signup)|(play)\b/gmi.test(args[0]))
		{
			if (rData[message.channel.guild.id])
			{
				var playerExists = false;
				for (var i = 0; i < rData[message.channel.guild.id].players.length; i++)
				{
					if (rData[message.channel.guild.id].players[i].id == message.author.id)
					{
						playerExists = true;
						break;
					}
				}

				if (playerExists)
				{
					var descriptionText = `**${message.author.username} is al een speler**\n`;
				}
				else
				{
					rData[message.channel.guild.id].players.push({
							"id": message.author.id,
							"name": message.author.username,
					});
					var descriptionText = `**${message.author.username} toegevoegd als speler**\n`;
				}

				descriptionText += "\n**Server Settings**\n";
				descriptionText += `\`Enabled\`: ${rData[message.channel.guild.id].enabled}\n`;
				descriptionText += `\`Minimum spelers\`: ${rData[message.channel.guild.id].minPlayers}\n`;

				descriptionText += `\`Spelers\`:`;
				if (rData[message.channel.guild.id].players.length > 0)
				{
					for (var i = 0; i < rData[message.channel.guild.id].players.length; i++)
					{
						descriptionText += ` ${rData[message.channel.guild.id].players[i].name}`;
						if (i != rData[message.channel.guild.id].players.length - 1)
						{
							descriptionText += ",";
						}
					}
					descriptionText += "\n";
				}
				else
				{
					descriptionText += " Nog geen spelers\n";
				}

				descriptionText += `\`Keren gespeeld\`: ${rData[message.channel.guild.id].gamesPlayed}\n`;

				var reply = new Discord.MessageEmbed()
					.setColor(bot.settings.basic.defaultColor)
					.setDescription(descriptionText)
					.setAuthor(`Ban roulette signup` , bot.user.displayAvatarURL(), '')
					.setTimestamp()
					.setFooter(`Speler: ${message.author.username}`, message.author.displayAvatarURL({dynamic : true}));	
			}
			else
			{
				nogNietInit = true;
			}
		}
		else if (/\bstart\b/gmi.test(args[0]))
		{
			if (rData[message.channel.guild.id])
			{
				// check of de message.author in de player list zit
				var playerExists = false;
				for (var i = 0; i < rData[message.channel.guild.id].players.length; i++)
				{
					if (rData[message.channel.guild.id].players[i].id == message.author.id)
					{
						playerExists = true;
						break;
					}
				}

				if (playerExists)
				{
					if (rData[message.channel.guild.id].players.length >= rData[message.channel.guild.id].minPlayers)
					{
						var randomPlayer = Math.floor(Math.random() * rData[message.channel.guild.id].players.length);

						var reply = `player die gebanned zou worden is: ${rData[message.channel.guild.id].players[randomPlayer].name}`;
						console.log(`player die gebanned zou worden is: ${rData[message.channel.guild.id].players[randomPlayer].name}`);
						var user = message.guild.members.cache.get(rData[message.channel.guild.id].players[randomPlayer].id);

						message.guild.members.forEach(member => console.log(member.user.username));

						user.ban();
					}
					else
					{
						var reply = "not enough players.";
					}
				}
				else
				{
					return message.reply(`enkel spelers kunnen het spel starten, om mee te doen stuur \`${bot.settings.basic.prefix}banroulette play\`.`);
				}
			}
			else
			{
				nogNietInit = true;
			}
		}

		// disable banroulette --> check admin

		// verander minimum spelers --> check admin

		else
		{
			// fout argument meegeven
			return message.reply(`${args[0]} is geen geldig banroulette argument`);
		}

		if (nogNietInit)
		{
			var descriptionText = "**\nServer Nog Niet Geïnitialiseerd**\n";
			descriptionText += `Voer het commando \`${bot.settings.basic.prefix}banroulette init\` uit om de server te initialiseren.\n`;

			const initInfo = new Discord.MessageEmbed()
					.setColor(bot.settings.basic.defaultColor)
					.setDescription(descriptionText)
					.setAuthor(`Geen Server Gevonden` , bot.user.displayAvatarURL(), '')
					.setTimestamp()
					.setFooter(`Command geprobeerd door ${message.author.username}`, message.author.displayAvatarURL({dynamic : true}));

			return message.channel.send(initInfo);
		}

		var schrijfData = JSON.stringify(rData, null, 2);
    	fs.writeFile(__dirname + '/../../../datafiles/banroulette.json', schrijfData, () => {return});

		return message.channel.send(reply);
	},
};