module.exports = {
	name: 'psst',
	description: 'Psssssst',
	category: 'misc',
    aliases: ['pssst', 'psssst', 'pssssst'],
	guildOnly: true,
	dmOnly: false,
	helpText: 'Sends you a simple dm.',
	execute(bot, message, args) {
        message.author.send('Pssssssssst');
	},
};