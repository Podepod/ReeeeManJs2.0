#!/usr/bin/nodejs
const fs = require('fs');
const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');

const botIntents = new Intents();
botIntents.add(
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_PRESENCES, 
    Intents.FLAGS.GUILD_MESSAGES, 
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING
)

const bot = new Client({ intents: botIntents});
bot.commands = new Discord.Collection();

var rawData = fs.readFileSync(__dirname + '/../datafiles/botSettings.json');
bot.settings = JSON.parse(rawData);



const eventFiles = fs.readdirSync(__dirname + '/Events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`${__dirname}/Events/${file}`);
	if (event.once) {
		bot.once(event.name, (...args) => event.execute(...args, bot));
	} else {
		bot.on(event.name, (...args) => event.execute(...args, bot));
	}
}

const commandFolders = fs.readdirSync(__dirname + '/Commands');
bot.commandCategories = commandFolders;

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`${__dirname}/Commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`${__dirname}/Commands/${folder}/${file}`);
		bot.commands.set(command.name, command);

		if (typeof command.aliases !== 'undefined'){
			command.aliases.forEach((aliasName) => {
				let checkAlias = bot.commands.get(aliasName);
				if (typeof checkAlias === 'undefined'){
					bot.commands.set(aliasName, command);
				}
				else {
					throw `Duplicate alias name for ${command.name} (category: ${command.category}): ${aliasName}\nDuplicate of ${checkAlias.name} (category: ${checkAlias.category})\n\n`;
				}
			})
		}
	}
}

bot.login(bot.settings.basic.token);