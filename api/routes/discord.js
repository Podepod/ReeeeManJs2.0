var express = require('express');
var router = express.Router();
var fs = require('../fileStuff');

var FileStuff = fs.FileStuff;
var discordSettings = new FileStuff('botSettings.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  discordSettings.update();
  res.send('api is working top');
});

router.get('/settings', (req, res, next) => {
  res.send(discordSettings.update());
})

router.post('/settings', (req, res, next) => {
  let nieuweSettings = discordSettings.update()

  // basic
  nieuweSettings.basic.token = req.body.basictoken;
  nieuweSettings.basic.prefix = req.body.basicprefix;
  nieuweSettings.basic.name = req.body.basicname;
  nieuweSettings.basic.description = req.body.basicdescription;
  nieuweSettings.basic.version = req.body.basicversion;
  nieuweSettings.basic.defaultColor = req.body.basicdefaultColor;

  // activity
  nieuweSettings.activity.status = req.body.activitystatus;
  nieuweSettings.activity.text = req.body.activitytext;
  nieuweSettings.activity.link = req.body.activitylink;
  nieuweSettings.activity.activity = req.body.activityactivity;

  // log
  nieuweSettings.log.channelID = req.body.logchannelID;
  nieuweSettings.log.stalkingEnabled = (req.body.logstalkingEnabled == 'true');
  nieuweSettings.log.stalkChannelID = req.body.logstalkChannelID;

  // userIDs
  nieuweSettings.userIDs.owner = req.body.userIDsowner;
  nieuweSettings.userIDs.bot = req.body.userIDsbot;

  discordSettings.change(nieuweSettings);

  if(req.body.redirect){
    res.redirect(req.body.redirect);
  }
  else{
    res.send(twitterSettings.data);
  }
})


// zo goed als altijd get en post (data vragen en veranderen)

/*
    Settings
    RegexSearchwords
    RegexReactions
    RegexBans
    PickupLines
    Vibes
*/

module.exports = router;
