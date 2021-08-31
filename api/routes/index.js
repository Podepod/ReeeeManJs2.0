var express = require('express');
var fs = require('fs');
var router = express.Router();

function readJsonFile(filename)
{
    return JSON.parse(fs.readFileSync(__dirname + '/../../datafiles/' + filename));
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('api is working top');
});

router.get('/nav', (req, res, next) => {
  return res.send(readJsonFile('webPages.json'));
})

module.exports = router;
