module.exports = {
    defaultServerData(message)
    {
        return {
            name: message.guild.name,
            icon: message.guild.iconURL(),
            useGlobalAccounts: false,
            adminCheats: false,
            xpTrading: false,
            notifications: {
                enabled: false,
                channel: null
            },
            daily: {
                enabled: true,
                startAmount: 50,
                multiplier: 1.4,
                maxStreak: 10
            },
            users: {
                [`${message.author.id}`]: this.defaultUserData(message),
            },
            booster: {
                enabled: false,
                alwaysOn: false,
                multiplier: 2,
                description: "Boost xp on the server",
                duration: 0,
                endTime: "2021-05-22T18:33:36.396Z"
            },
            leaders: [],
            roles: {},
            squads: {
                enabled: false,
                booster: {
                    enabled: false,
                    multiplier: 2
                },
                cost: {
                    start: 5000,
                    daily: 0,
                    weekly: 0,
                    monthly: 0
                },
                maxMembers: -1,
                squads: {}
            }
        };
    },

    defaultUserData(member)
    {
        return {
            name: member.user.username,
            xp: 0,
            level: 0,
            levelXp: 0,
            dailyStreak: {
                streak: 0,
                last: "2021-05-22T18:33:36.396Z",
            },
            inSquad: false,
            prestige: 0,
        }
    },

    calculateNextLevel(lvl, lvlXp)
    {
        //https://www.desmos.com/calculator/gugv5l7ua8?lang=nl
        const formula = {
            a: 50,
            b: 1.5,
            h: -10,
            k: -10
        }
        //var lvlXp = Math.round(formula.a * Math.sqrt(formula.b * lvl - formula.h) + formula.k);
        return lvlXp + Math.round(formula.a * Math.sqrt(formula.b * (lvl + 1) - formula.h) + formula.k);
    },

    checkForNextLevel(xp, lvl, lvlXp)
    {
        var nextLvl = this.calculateNextLevel(lvl, lvlXp);
        if (xp >= nextLvl) return true;
        return false;
    },

    calculateXpForLevel(level)
    {
        let lvl = 0;
        let xp = 0;
        let lvlXp = 0;

        while (level > lvl)
        {
            xp++;
            if(this.checkForNextLevel(xp, lvl, lvlXp))
            {
                lvlXp = this.calculateNextLevel(lvl, lvlXp);
                lvl++;
            }
        }

        return xp;
    },

    makeLeaderboard(serverData, id)
    {
        for (var i = 0; i < serverData.leaders.length; i++)
        {
            if (id == serverData.leaders[i])
            {
                serverData.leaders.splice(i, 1);
                break;
            }
        }

        if (serverData.leaders.length === 0) 
        {
            return [id];
        }

        let added = false;
        for (var i = 0; i < serverData.leaders.length; i++)
        {
            if (serverData.users[id].xp > serverData.users[serverData.leaders[i]].xp)
            {
                serverData.leaders.splice(i, 0, id);
                added = true;
                break;
            }
        }
        if (!added)
        {
            serverData.leaders.push(id);
        }

        console.log(serverData.leaders);
        return serverData.leaders;
    },

    checkLeaderboardPosition(serverData, id)
    {
        let pos;
        for (var i = 0; i < serverData.leaders.length; i++)
        {
            if (id == serverData.leaders[i])
            {
                pos = i;
                break;
            }
        }
        return pos;
    },

    checkDaily(userData)
    {
        let today = new Date();
        let lastDaily = new Date(userData.dailyStreak.last);
        
        if (lastDaily <= today - (1 * 24 * 60 * 60 * 1000) && lastDaily >= today - (2 * 24 * 60 * 60 * 1000)) // day * hour * min * sec * msec
        {
            return 1;
        }
        else if (lastDaily < today - (2 * 24 * 60 * 60 * 1000))
        {
            return 2;
        }
        return 0;
    }
};