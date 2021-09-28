const colors = require('colors');
const fs = require('fs');

module.exports = {
	name: 'ready',
	once: true,
	execute(bot) {
        var botInfo = `                                              \n`;
        botInfo += ` +------------------------------------------+ \n`;
        botInfo += ` | Started - ${new Date().toLocaleString()}           | \n`
        botInfo += ` +------------------------------------------+ \n`;
        botInfo += ` | LucifeR                                  | \n`;
        botInfo += ` | Version: ${bot.settings.basic.version}                           | \n`;
        botInfo += ` | Prefix: ${bot.settings.basic.prefix}                                | \n`;
        botInfo += ` +------------------------------------------+ \n`;
        botInfo += ` | Ready and waiting for events to happen   | \n`;
        botInfo += ` +------------------------------------------+ \n`;
        botInfo += `                                              \n`;
        console.info(botInfo.red);

        // types: https://discord.js.org/#/docs/main/stable/typedef/ActivityType
	    bot.user.setPresence({ activity: { type: 'COMPETING', name: `Hell (${bot.settings.basic.prefix})`, url: "https://www.twitcht.tv/codemiko" }, status: 'idle', afk: true })
  		    .then()
  		    .catch(console.error);

        bot.setInterval(() => {
            bot.settings = JSON.parse(fs.readFileSync(__dirname + '/../../datafiles/botSettings.json'));
            bot.twitterSettings = JSON.parse(fs.readFileSync(__dirname + '/../../datafiles/twitterSettings.json'));

            // zet status naar die dat het moet zijn
        }, 5 * 60 * 1000);
	},
};