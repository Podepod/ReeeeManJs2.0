const fs = require('fs');
const Discord = require('discord.js');
const colors = require('colors');
const xpFunctions = require(__dirname + '/functions.js');

module.exports = {
	name: 'xp',
	description: 'main xp system thingy',
	enabled: true,
	execute(bot, message) {
        const filePath = __dirname + `/datafiles/guilds/${message.guild.id}.json`;
        console.log(filePath);
        var levelUp = false;

        if (fs.existsSync(filePath))
        {
            var rawData = fs.readFileSync(filePath);
    	    var serverData = JSON.parse(rawData);
        }
        else
        {
            var serverData = xpFunctions.defaultServerData(message);
            console.log("New server added to xp system".blue);
        }

        if (!serverData.users[message.member.id])
        {
            serverData.users[message.member.id] = xpFunctions.defaultUserData(message.member);
        }

        extraXP = (Math.floor(Math.random() * 14) + 1);

        if (serverData.booster.enabled)
        {
            extraXP *= serverData.booster.multiplier;
        }
        if (serverData.users[message.author.id].inSquad && serverData.squads.enabled && serverData.squads.booster.enabled)
        {
            extraXP *= serverData.squads.booster.multiplier;
        }

        serverData.users[message.author.id].xp += extraXP;
        var user = serverData.users[message.author.id];
        while (xpFunctions.checkForNextLevel(user.xp, user.level, user.levelXp))
        {
            serverData.users[message.author.id].levelXp = xpFunctions.calculateNextLevel(serverData.users[message.author.id].level, serverData.users[message.author.id].levelXp);
            serverData.users[message.author.id].level += 1;
            user = serverData.users[message.author.id];
            levelUp = true;
        }

        serverData.leaders = xpFunctions.makeLeaderboard(serverData, message.author.id);

        console.log(serverData.users[message.author.id]);

        var schrijfData = JSON.stringify(serverData, null, 2);
        fs.writeFileSync(filePath, schrijfData, () => {return});
        console.log("file written".green)
	},
};