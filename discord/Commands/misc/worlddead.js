const request = require('request');
var cheerio = require('cheerio');

module.exports = {
	name: 'worlddead',
	description: 'Has the large hadroncollider destroyed the world yet?',
	category: 'misc',
	execute(bot, message, args) {
		request({
            method: 'GET',
            uri: `http://www.hasthelargehadroncolliderdestroyedtheworldyet.com/`,
        }, function (error, response, body){
            if(!error && response.statusCode == 200){
                const $ = cheerio.load(body);
                const details = $('body').find('noscript');
                message.reply(details.html());
            }
        });
	}
};