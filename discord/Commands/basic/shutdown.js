const colors = require('colors');

module.exports = {
	name: 'shutdown',
	description: 'Shutsdown the bot',
	category: 'basic',
	guildOnly: false,
	dmOnly: false,
	ownerOnly: true,
	execute(bot, message, args) {
		message.channel.send(`Tot de volgende keer. :smiling_face_with_tear:`).then(m => {
			console.log("Bot has been shut down.\n".red);
			bot.destroy();
		});
	},
};