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

        let user = message.mentions.users.first();
        if (user === undefined) {
            user = message.member;    
        }

        if (!serverData.users[user.id])
        {
            serverData.users[user.id] = xpFunctions.defaultUserData(user);
            var schrijfData = JSON.stringify(serverData, null, 2);
            fs.writeFileSync(filePath, schrijfData);
        }

        return [serverData.users[user.id], (xpFunctions.checkLeaderboardPosition(serverData, user.id) + 1)];
	},
};