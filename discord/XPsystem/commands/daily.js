const fs = require('fs');
const xpFunctions = require(__dirname + '/../functions.js');

module.exports = {
	name: 'profile',
	description: 'Displays a users xp system profile',
	execute(message, args) {
		const filePath = __dirname + `/../datafiles/guilds/${message.guild.id}.json`;

        if (!fs.existsSync(filePath))
        {
            var serverData = xpFunctions.defaultServerData(message);
        }
        else 
        {
            var rawData = fs.readFileSync(filePath);
    	    var serverData = JSON.parse(rawData);
        }

        if (!serverData.daily.enabled) // niet enabled returnt -1
        {
            return -1;
        }

        if (!serverData.users[message.member.id])
        {
            serverData.users[message.member.id] = xpFunctions.defaultUserData(message.member);
        }
        
        switch (xpFunctions.checkDaily(serverData.users[message.author.id]))
        {
            case 0:
                // nog niet lang genoeg gewacht
                return -2;
            case 1:
                // de daily wordt gewoon zoals gewoonlijk gegeven
                break;

            case 2:
                // reset streak, te lang gewacht
                serverData.users[message.author.id].dailyStreak.streak = 0;
                break;
        }

        const startAmount = serverData.daily.startAmount;
        const base = serverData.daily.multiplier;
        var exponent =  serverData.users[message.author.id].dailyStreak.streak;

        if (exponent > serverData.daily.maxStreak)
        {
            exponent = serverData.daily.maxStreak;
        }

        var dailyReward = Math.floor(startAmount * Math.pow(base, exponent));
        serverData.users[message.author.id].xp += dailyReward;
        serverData.users[message.author.id].dailyStreak.streak += 1;
        serverData.users[message.author.id].dailyStreak.last = new Date().toISOString();

        var user = serverData.users[message.author.id];
        while (xpFunctions.checkForNextLevel(user.xp, user.level, user.levelXp))
        {
            serverData.users[message.author.id].levelXp = xpFunctions.calculateNextLevel(serverData.users[message.author.id].level, serverData.users[message.author.id].levelXp);
            serverData.users[message.author.id].level += 1;
            user = serverData.users[message.author.id];
            levelUp = true;
        }

        serverData.leaders = xpFunctions.makeLeaderboard(serverData, message.author.id);

        var schrijfData = JSON.stringify(serverData, null, 2);
        fs.writeFileSync(filePath, schrijfData, () => {return});

        return dailyReward;
	},
};