# Kali-Visuals

> Social Media Monitoring via Sentiment Analysis

## 💾 - Installing Dependencies
```    
# clone this repository
    git clone

# cd into the project directory
    cd kaliVisuals

# install frontend dependencies
    cd frontend
    npm install
    
# install functions dependencies
    cd functions
    npm install

# install backend dependencies (optional)
    cd functions
    npm install
```
## 🔧 - API Keys

```
# go to the functions directory
    cd functions

# create new file
    touch twitterApiKeys.js

# update the following after obtaining your keys

    module.exports = {
        consumer_key: 'YOUR_CONSUMER_KEY',
        consumer_secret: 'YOUR_CONSUMER_SECRET',
        access_token:'YOUR_ACCESS_TOKEN',
        access_token_secret: 'YOUR_TOKEN_SECRET',
        timeout_ms: 60*1000,
        strictSSL:true,
    }
```
## 👾 - Technologies

* <p> <b>React</b> -  The entire client side is built using React and styled using Semantic-UI-React. </p>
<p align = "center"><a href = "https://reactjs.org"><img src="/logos/react.png" width=200px></a></p>

* <p> <b>Firebase</b> - Firebase Auth, Firebase Realtime Database abd Cloud Functions are powering the entire backend of this web application. </p>
<p align = "center"><a href = "https://firebase.google.com"><img src="/logos/firebase.png" width=200px></a></p>

* <p> <b>Sentiment</b> - AFINN-based sentiment analysis for Node.js. </p>
<p align = "center"><a href = "https://github.com/thisandagain/sentiment"><img src="/logos/sentiment.png" width=150px></a></p>

* <p> <b>Twitter API</b> - Parsing hundreds of tweets/call/day and aggregating sentiment score. </p>
<p align = "center"><a href = "https://developer.twitter.com/content/developer-twitter/en.html"><img src="/logos/twitter.png" width=150px></a></p>

* <p> <b>Cronjob</b> - Scheduled execution of scripts. </p>
<p align = "center"><a href = "https://cron-job.org/en/"><img src="/logos/cronjob.png" width=200px></a></p>

##  🐜 - Known Bugs
* Warning -- when user deletes a monitored hashtag, warning is emitted because chart did not unmount correctly

## 🔗 - Coming Features
* Change user avatar
