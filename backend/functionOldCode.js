const functions = require('firebase-functions');
const admin = require('firebase-admin');
const moment = require('moment');
const Sentiment = require('sentiment');
const twit = require('twit');

const twitterApiKeys = require('./twitterApiKeys');

const SECONDS_IN_MINUTE = 60 * 60;
const SECONDS_IN_DAY = 24 * SECONDS_IN_MINUTE;

// const sentiment = new Sentiment();
// const twitter = new twit(twitterApiKeys);

admin.initializeApp();

const database = admin.database();

// exports.tagToMonitor = functions.https.onRequest((req, res) => {
//     const hashtagToMonitor = req.query.hashtag;
//     const monitoringDuration = req.query.duration;

//     const startTime = moment().unix();
//     const endTime = startTime + (monitoringDuration * SECONDS_IN_DAY);
//     return database.ref('/tagsToMonitor').push({
//         hashtag: '%23' + hashtagToMonitor,
//         startTime: startTime,
//         endTime: endTime,
//         duration: monitoringDuration
//         }).then(() => {
//             console.log(`Logging hashtag: ${hashtagToMonitor} to DB, monitored for: ${monitoringDuration} days.`);
//             return res.status(303).send('Successfuly posted hashtag to db!');
//         });
// });
// exports.scheduledSentimentBatch = functions.https.onRequest((req, res) => {
//     database.ref('/tagsToMonitor').once('value', (data) => {
//         const monitoredTags = data.val();
//         console.log('Successfully obtained monitored tags!')
//         const keys = Object.keys(monitoredTags);
    
//         for(var i=0; i < keys.length; i++){
//             var id = keys[i];
//             var hashtag = monitoredTags[id].hashtag;
//             var endTime = monitoredTags[id].endTime;
//             var currentTime = moment().unix();
            
//             if(!moment(currentTime).isAfter(endTime)){
//                 console.log('Getting new tweets for: ', hashtag);
//                 getNewSentimentBatch(id, hashtag);
//             }
//         }
//         res.status(200).send('Added daily aggregate sentiment to each monitored tweet.')
//     }, (err) =>{
//         console.log('Error! ', err);
//     });
// });
// exports.getDBSnapshot = functions.https.onRequest((req, res) => {
//     database.ref('/tagsToMonitor').once('value', (data) => {
//         res.json(data);
//     })
// });

exports.getTwitterData = functions.database.ref('monitoredTags/{tagId}').onCreate((snapshot, context) => {
    const tagId = context.params.tagId
    console.log(`New Tag Added: ${tagId}`)
    

    return snapshot.ref.update({
        
    })
})

// function getNewSentimentBatch(id, hashtag){
//     twitter.get('search/tweets', { 
//         q: hashtag, 
//         count: 100
//     },(_err, data, res) => {
//         const statuses = data.statuses;
//         const aggregateSentiment = calculateAggregateSentiment(statuses);

//         const sentimentObject = {
//             sentimentScore: aggregateSentiment,
//             date: moment().toISOString()
//         }

//         database.ref('/tagsToMonitor')
//                 .child(id)
//                 .child('sentimentBucket').push(sentimentObject);

//     }).catch((err) => {
//         console.log(err);
//     });
    
// }
// function calculateAggregateSentiment(statuses){        
//     let totalSentiment = 0;

//     for(status in statuses){
//         let individualSentiment = sentiment.analyze(statuses[status].text);
//         totalSentiment += individualSentiment.score
//     }

//     return totalSentiment;
// }