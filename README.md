# Kali-Visuals

> Social Media Monitoring via Sentiment Analysis

##  💾 Installing Dependencies
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
## 🔧 API Keys

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
## 🔑 Key Functionalities

## 👾 Technologies

* <p> <b>React</b> -  </p>
<p align = "center"><a href = ""><img src="/logos/react.png" width=150px></a></p>

* <p> <b>Firebase</b> -  </p>
<p align = "center"><a href = ""><img src="/logos/firebase.png" width=150px></a></p>

* <p> <b>Sentiment</b> -  </p>
<p align = "center"><a href = ""><img src="/logos/sentiment.png" width=150px></a></p>

* <p> <b>Twitter API</b> -  </p>
<p align = "center"><a href = ""><img src="/logos/twitter.png" width=150px></a></p>

* <p> <b>Cronjobs</b> -  </p>
<p align = "center"><a href = ""><img src="/logos/cronjob.png" width=150px></a></p>