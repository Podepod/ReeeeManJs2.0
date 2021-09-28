const Discord = require('discord.js');

module.exports = {
    name: 'someone',
    description: 'Tag someone random',
    category: 'misc',
    guildOnly: false,
    dmOnly: false,
    execute(bot, message, args) {
        message.guild.members.fetch({ withPresences: true }).then(fetchedMembers => {
            const nonBots = fetchedMembers.filter(member => member.user.bot === false)
            console.log(nonBots);
            console.log("\n\n");
            let fetchedMemberList = Array.from(nonBots);
            console.log(fetchedMemberList);
            console.log("\n\n")
            var randomUser = fetchedMemberList[Math.floor(Math.random() * fetchedMemberList.length)];
            console.log(randomUser[1].user)
            console.log(randomUser[0])
            message.channel.send(randomUser[1].user.username)
        });
    },
};