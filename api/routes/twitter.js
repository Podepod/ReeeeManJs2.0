var express = require('express');
var router = express.Router();
var fs = require('../fileStuff');

var FileStuff = fs.FileStuff;
var twitterSettings = new FileStuff('twitterSettings.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  twitterSettings.update();
  res.send('api is working top');
});

router.get('/settings', (req, res, next) => {
  res.send(twitterSettings.update());
})

router.post('/settings', (req, res, next) => {
  let nieuweSettings = twitterSettings.update()

  nieuweSettings.enabled = (req.body.enabled == 'true');
  nieuweSettings.ownerOnly = (req.body.ownerOnly == 'true');
  nieuweSettings.adminOnly = (req.body.adminOnly == 'true');

  nieuweSettings.apiKey = req.body.apiKey;
  nieuweSettings.apiSecretKey = req.body.apiSecretKey;
  nieuweSettings.accessToken = req.body.accessToken;
  nieuweSettings.accessTokenSecret = req.body.accessTokenSecret;
  nieuweSettings.bearerToken = req.body.bearerToken;

  twitterSettings.change(nieuweSettings);

  if(req.body.redirect){
    res.redirect(req.body.redirect);
  }
  else{
    res.send(twitterSettings.data);
  }
})

// zo goed als altijd get en post (data vragen en veranderen)

/*
    settings
    tweet
    twitter lookup
    twitter stream? --> ja voor eigen tweets te monitorren
*/



module.exports = router;
