const fs = require('fs');
const { calculateNextLevel } = require('../functions');
const xpFunctions = require(__dirname + '/../functions.js');

module.exports = {
	name: 'setlevel',
	description: 'Sets the level of a user to a given level',
	execute(message, args) {
		const filePath = __dirname + `/../datafiles/guilds/${message.guild.id}.json`;
        let msg = null;

        if (!fs.existsSync(filePath))
        {
            var serverData = xpFunctions.defaultServerData(message);
        }
        else 
        {
            var rawData = fs.readFileSync(filePath);
    	    var serverData = JSON.parse(rawData);
        }

        let user = message.mentions.users.first();
        if (user === undefined) {
            user = message.member;    
        }

        if (!serverData.users[user.id])
        {
            serverData.users[user.id] = xpFunctions.defaultUserData(user);
        }

        // valid args check
        if (!Number.isInteger(Number(args[0])) || Number(args[0]) > 9999 || Number(args[0]) < 0)
        {
            if (!Number.isInteger(Number(args[0])))
            {
                msg = `${args[0]} is geen geheel getal.`;
            }
            else if (Number(args[0]) > 9999)
            {
                msg = `${args[0]} is te groot, het grootste level dat je kan zetten is 9999.`;
            }
            else
            {
                msg = `${args[0]} is een getal onder 0, je kan geen negatieve levels instellen.`;
            }
        }
        else
        {
            if (serverData.adminCheats)
            {
                let xpForLevel = xpFunctions.calculateXpForLevel(Number(args[0]));
                serverData.users[user.id].xp = xpForLevel;
                serverData.users[user.id].levelXp = xpForLevel;
                serverData.users[user.id].level = Number(args[0]);

                serverData.leaders = xpFunctions.makeLeaderboard(serverData, user.id);
            }
            else
            {
                msg = "Admin cheats zijn uitgeschakeld op deze server.\nOm dit aan te zetten type ...";
            }
        }

        var schrijfData = JSON.stringify(serverData, null, 2);
        fs.writeFileSync(filePath, schrijfData);

        return [serverData.users[user.id], (xpFunctions.checkLeaderboardPosition(serverData, user.id) + 1), msg];
	},
};