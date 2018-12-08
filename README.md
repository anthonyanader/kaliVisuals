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

* [**React**](https://reactjs.org) -  The entire client side is built using React and styled using Semantic-UI-React

* [**Firebase**](https://firebase.google.com) - Firebase Auth, Firebase Realtime Database and Cloud Functions are powering the entire backend of this web application

* [**Sentiment**](https://github.com/thisandagain/sentiment) - AFINN-based sentiment analysis for Node.js

* [**Twitter API**]("https://developer.twitter.com/content/developer-twitter/en.html") - Parsing hundreds of tweets/call/day and aggregating sentiment score. Working in conjunction with cloud functions running Node, to parse tweets and calculate sentiment

* [**Cron-Job**](https://cron-job.org/en/) - Daily scheduled execution of fetching and analyzing sentiment data before displaying the data on the dashboard. *looking to move the scheduling of tasks to google compute engine*

##  🐜 - Known Bugs
* Warning -- upon user deletion of a monitored hashtag, a warning is emitted due to chart unmounting incorrectly. Most probably have to do with the DB listeners still attached to chart after deletion

## 🔗 - Coming Features
* Change user avatar
