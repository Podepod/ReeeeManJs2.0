const fs = require('fs');

module.exports = {
	name: 'searchWords',
	description: 'Sends a message back at certain strings',
	enabled: true,
	execute(bot, message) {
		var rawData = fs.readFileSync(__dirname + '/../../datafiles/regexReactions.json');
    	var searchWords = JSON.parse(rawData);

		var re;
        for (var i = 0; i < searchWords.length; i++)
		{
			if (searchWords[i].enabled)
			{
				re = new RegExp(searchWords[i].regex, searchWords[i].flags);
				if (re.test(message.content))
				{
					message.react(searchWords[i].reaction);
				}
			}
		}
	},
};