const fs = require('fs');
const xpFunctions = require(__dirname + '/../functions.js');

module.exports = {
	name: 'leaderboard',
	description: 'Shows you the xp leaderboard',
	execute(message, args) {
		const filePath = __dirname + `/../datafiles/guilds/${message.guild.id}.json`;
        const nbrOfLeaders = 3;
        const maxNbrOfLeaders = 10;
        let leaderboard = [];

        if (!fs.existsSync(filePath))
        {
            var serverData = xpFunctions.defaultServerData(message);
        }
        else 
        {
            var rawData = fs.readFileSync(filePath);
    	    var serverData = JSON.parse(rawData);
        }

        for (var i = 0; i < nbrOfLeaders && i < serverData.leaders.length; i++)
        {
            leaderboard.push(serverData.users[serverData.leaders[i]]);
        }

        return leaderboard;
	},
};