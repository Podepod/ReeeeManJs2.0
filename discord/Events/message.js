const fs = require('fs');

module.exports = {
	name: 'message',
	execute(message, bot) {
        if (!message.content.startsWith(bot.settings.basic.prefix) || message.author.bot) // gewoon bericht
        {
            if (message.author.bot) return; // filter de bot berichten weg
            
            // REGEX
            const regexFiles = fs.readdirSync(__dirname + '/../Regex').filter(file => file.endsWith('.js'));

            for (const file of regexFiles) {
                const regexCheck = require(`${__dirname}/../Regex/${file}`);
                if (regexCheck.enabled)
                {
                    regexCheck.execute(bot, message);
                }
            }
            // einde REGEX

            // XP System
            const xpFile = require(__dirname + '/../XPsystem/xp.js');
            if (xpFile.enabled && message.channel.type === 'text')
            {
                xpFile.execute(bot, message);
            }
        }
        else // Command
        {
            const args = message.content.slice(bot.settings.basic.prefix.length).trim().split(/ +/);
            const commandName = args.shift().toLowerCase();	

            if (!bot.commands.has(commandName)) return;

            const command = bot.commands.get(commandName);

            try {
                if (typeof command.guildOnly !== 'undefined' && command.guildOnly && message.channel.type === 'dm') 
                {
                    return message.reply('Ik kan dit command niet uitvoeren in onze DM\'s!');
                }
                else if (typeof command.dmOnly !== 'undefined' && command.dmOnly && message.channel.type === 'text')
                {
                    return message.reply('Ik kan dit command alleen uitvoeren in onze DM\'s!');
                }
                else if (typeof command.ownerOnly !== 'undefined' && command.ownerOnly && message.author.id != bot.settings.userIDs.owner)
                {
                    return message.reply('Alleen de bot owner kan dit command uitvoeren.');
                }
                else if (typeof command.adminOnly !== 'undefined' && command.adminOnly && !message.member.hasPermission('ADMINISTRATOR') && message.author.id != bot.settings.userIDs.owner)
                {
                    return message.reply('Alleen server administrators kunnen dit command uitvoeren.');
                }
                // serverowner only

                command.execute(bot, message, args);
            } catch (error) {
                console.error(error);
                message.reply('Er was een probleem bij het uitvoeren van dit command.');
            }
        }
	},
};