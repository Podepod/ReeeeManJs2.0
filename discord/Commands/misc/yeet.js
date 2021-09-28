module.exports = {
	name: 'yeet',
	description: 'Skeet',
	category: 'misc',
	guildOnly: true,
	dmOnly: false,
	execute(bot, message, args) {
		return message.channel.send('SKEET');
	},
};