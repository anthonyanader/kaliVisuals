const express = require('express');
const bodyParser = require('body-parser');
const twit = require('twit');
const Tweet = require('./tweet.js');
const Sentiment = require('sentiment');
const util = require('util');
 
const twitter = new twit({
    consumer_key: '',
    consumer_secret:'',
    access_token:'',
    access_token_secret: '',
    timeout_ms:           60*1000,
    strictSSL:            true,
  });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

var sentiment = new Sentiment();

app.get('/tweets/:search', (req,res) => {
    twitter.get('search/tweets', { 
        q: req.params.search, 
        count: 10 
    },(err, data, response) => {
        res.json(data);
        createTweetObjects(data.statuses);

    }).catch((err) => {
        console.log(err);
    })
    console.log(req.params.search);
});

function createTweetObjects(statuses) {
    var tweets = [];
    for (var i = 0; i < statuses.length; i++){
        var result = sentiment.analyze(statuses[i].text);
        tweets.push(new Tweet({ content: result }));       
    }
    // let arrayOfTweets = tweets.map(tweet => tweet.content);
    
    console.log(tweets);
    
}
 
app.listen(3000)
