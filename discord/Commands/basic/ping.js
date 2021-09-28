module.exports = {
	name: 'ping',
	description: 'Pong!!',
	category: 'basic',
	guildOnly: false,
	dmOnly: false,
	execute(bot, message, args) {
		message.channel.send(`🏓 Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ws.ping)}ms`);
	},
};