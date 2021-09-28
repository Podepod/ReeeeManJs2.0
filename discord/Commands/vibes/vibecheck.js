const fs = require('fs');

module.exports = {
	name: 'vibecheck',
	description: 'Do a quick vibecheck',
	category: 'vibes',
	guildOnly: true,
	dmOnly: false,
	execute(bot, message, args) {
        const categories = ["positive", "negative", "neutral", "neither"];
		var rawData = fs.readFileSync(__dirname + '/../../../datafiles/vibes.json');
    	var vibes = JSON.parse(rawData);

        // random vibe category
        var cat = Math.floor(Math.random() * 4);

        // random vibe from category
        var vibe = vibes[categories[cat]][Math.floor(Math.random() * vibes[categories[cat]].length)];

        message.channel.send(vibe.text);
	},
};