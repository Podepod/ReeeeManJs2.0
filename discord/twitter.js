const request = require('request');
const OAuth = require('oauth');

'use strict';

class Twitter {
    constructor(apiKey, apiSecretKey, accessToken, accessTokenSecret, bearerToken){
        this.apiKey = apiKey;
        this.apiSecretKey = apiSecretKey;
        this.accessToken = accessToken;
        this.accessTokenSecret = accessTokenSecret;
        this.bearerToken = bearerToken;        
    }

    tweet(text){
        //https://gist.github.com/jaredpalmer/138f17a142d2d8770a1d752b0e00bd31
        let oauth = new OAuth.OAuth(
            'https://api.twitter.com/oauth.request_token',
            'https://api.twitter.com/oauth/access_token',
            this.apiKey,
            this.apiSecretKey,
            '1.0A',
            null,
            'HMAC-SHA1'
        );

        let postBody = {
            'status': text
        }

        // console.log('Ready to Tweet article:\n\t', postBody.status);
        oauth.post('https://api.twitter.com/1.1/statuses/update.json',
            this.accessToken,  // oauth_token (user access token)
            this.accessTokenSecret,  // oauth_secret (user secret)
            postBody,  // post body
            '',  // post content type ?
            function(err, data, res) {
                if (err) {
                    console.log(err);
                } else {
                    // console.log(data);
                }
        });
    }

    lookup(username){
        let options = {
            'method': 'GET',
            'url': `https://api.twitter.com/2/users/by/username/${username}`,
            'headers': {
                'Authorization': `Bearer ${this.bearerToken}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        request(options, function (error, response) {
            if (error) throw new Error(error);
            console.log(response.body);
        });
    }
};

module.exports = Twitter;