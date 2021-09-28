const Discord = require('discord.js');
const catDescr = require('../../categoryDescriptions.json');

module.exports = {
	name: 'help',
	description: 'This help message.',
	category: 'basic',
	guildOnly: false,
    dmOnly: false,
	execute(bot, message, args) {
        commands = bot.commands;
        commandList = commands.map(cmd => commands.get(cmd.name));

        if (!args.length)
        {
            var count = commandList.length;
            var catTxtLen = 0;

            for (let i = 0; i < bot.commandCategories.length; i++)
            {
                if (bot.commandCategories[i].length > catTxtLen) catTxtLen = bot.commandCategories[i].length;
            }

            var descriptionText = `**Command Categoriën**\n`;

            for (let i = 0; i < bot.commandCategories.length; i++)
            {
                let j = bot.commandCategories[i].length;
                descriptionText += `\`${bot.commandCategories[i]}`;

                while (j < catTxtLen)
                {
                    descriptionText += ' ';
                    j++;
                }

                descriptionText += ` \`: ${catDescr[bot.commandCategories[i]]}\n`;
            }

            descriptionText += `\nOm de commands van een bepaalde categorie te bekijken, stuur \`${bot.settings.basic.prefix}help <categorie>\``;
        }

        else if (args.length == 1)
        {
            var count = commandList.length;
            var category = args[0].toLowerCase();
            var categoryCommandsList = [];
            var commandDescriptionList = [];
            var commandNameLen = 0;

            var descriptionText = `**${category} Commands**\n`;

            for (let i = 0; i < count; i++)
            {
                if (commandList[i].category == category)
                {
                    categoryCommandsList.push(commandList[i].name);
                    commandDescriptionList.push(commandList[i].description);
                    
                    if (commandList[i].name.length > commandNameLen) commandNameLen = commandList[i].name.length;
                }
            }

            // alias commands eruit hale
            categoryCommandsList = categoryCommandsList.filter((elem, pos) => { return categoryCommandsList.indexOf(elem) == pos; })
            commandDescriptionList = commandDescriptionList.filter((elem, pos) => { return commandDescriptionList.indexOf(elem) == pos; })

            for (let i = 0; i < categoryCommandsList.length; i++)
            {
                let j = categoryCommandsList[i].length;
                descriptionText += `\`${categoryCommandsList[i]}`;

                while (j < commandNameLen) 
                {
                    descriptionText += ' ';
                    j++;
                }

                descriptionText += ` \`: ${commandDescriptionList[i]}\n`;
            }

            if (!categoryCommandsList.length)
            {
                descriptionText = `**De categorie '${category}' bestaat niet**\n`;
            }
        }

        else
        {
            var category = args[0].toLowerCase();
            var command = args[1].toLowerCase();

            descriptionText = `\`${category}\`: ${command}\n${bot.commandCategories}`;

            if (bot.commandCategories.indexOf(category) <= -1) descriptionText = `Er bestaat geen categorie \`${category}\``;
            else if (typeof bot.commands.get(command) === 'undefined') descriptionText = `Er bestaat geen command \`${command}\` in de categorie \`${category}\``;
            else 
            {
                commandData = bot.commands.get(command);
                descriptionText = `\`Naam         \`: ${commandData.name}\n`;
                if (typeof commandData.aliases !== 'undefined') descriptionText += `\`Aliases      \`: ${commandData.aliases.join(', ')}\n`;
                descriptionText += `\`Beschrijving \`: ${commandData.description}\n`;
                descriptionText += `\`Categorie    \`: ${category}\n`;

                if (typeof commandData.guildOnly === 'undefined') descriptionText += '`Enkel server `: false\n';
                else descriptionText += `\`Enkel server \`: ${commandData.guildOnly}\n`;
                
                if (typeof commandData.dmOnly === 'undefined') descriptionText += '`Enkel DM\'s   `: false\n';
                else descriptionText += `\`Enkel DM\'s   \`: ${commandData.dmOnly}\n`;

                if (typeof commandData.ownerOnly === 'undefined') descriptionText += '`Enkel owner  `: false\n';
                else descriptionText += `\`Enkel owner  \`: ${commandData.ownerOnly}\n`;
                
                if (typeof commandData.adminOnly === 'undefined') descriptionText += '`Enkel admins `: false\n';
                else descriptionText += `\`Enkel admins \`: ${commandData.adminOnly}\n`;

                if (typeof commandData.helpText !== 'undefined') descriptionText += `\n${commandData.helpText}`;
            }
        }

        const helpEmbed = new Discord.MessageEmbed()
            .setColor(bot.settings.basic.defaultColor)
            .setDescription(descriptionText)
            .setAuthor(`${bot.settings.basic.name}\'s help functie` , bot.user.displayAvatarURL(), '')
            .setTimestamp()
            .setFooter(`Hulp opgevraagd door ${message.author.username}`, message.author.displayAvatarURL({dynamic : true}));
                      
        message.channel.send(helpEmbed);
    },
};