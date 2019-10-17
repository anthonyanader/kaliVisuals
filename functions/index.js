const functions = require('firebase-functions');
const admin = require('firebase-admin');
const moment = require('moment');
const Sentiment = require('sentiment');
const twit = require('twit');

const twitterApiKeys = require('./twitterApiKeys');

const sentiment = new Sentiment();
const twitter = new twit(twitterApiKeys);

admin.initializeApp();

const database = admin.database();

exports.getTwitterData = functions.database
  .ref('monitoredTags/{tagId}')
  .onCreate((snapshot, context) => {
    const tagId = context.params.tagId;

    console.log(`New Tag Added: ${tagId}`);

    const tagData = snapshot.val();
    const hashtag = `%23${tagData.tagName}`;

    const twitterDataPromise = new Promise((resolve, reject) => {
      twitterStatuses(hashtag)
        .then(statuses => {
          resolve(calculateSentiment(statuses));
          return;
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });

    twitterDataPromise
      .then(sentimentScore => {
        const sentimentObject = {
          sentimentScore: sentimentScore,
          date: moment().format()
        };

        database
          .ref('/monitoredTags')
          .child(tagId)
          .child('sentimentBucket')
          .push()
          .set(sentimentObject);

        this.scheduledSentimentBatch();
        return;
      })
      .catch(err => {
        console.log(err);
      });

    return null;
  });

const twitterStatuses = hashtag => {
  return new Promise((resolve, reject) => {
    twitter.get(
      'search/tweets',
      {
        q: hashtag,
        count: 100
      },
      (err, data, res) => {
        if (err) {
          reject(err);
        } else {
          const statuses = data.statuses;
          resolve(statuses);
        }
      }
    );
  });
};

const calculateSentiment = statuses => {
  let totalSentiment = 0;

  for (status in statuses) {
    let individualSentiment = sentiment.analyze(statuses[status].text);
    totalSentiment += individualSentiment.score;
  }

  return totalSentiment;
};

exports.scheduledSentimentBatch = functions.https.onRequest((req, res) => {
  database.ref('/monitoredTags').once(
    'value',
    data => {
      const monitoredTags = data.val();
      console.log('Successfully obtained monitored tags!');
      const keys = Object.keys(monitoredTags);

      for (let i = 0; i < keys.length; i++) {
        let id = keys[i];
        let hashtag = `%23${monitoredTags[id].tagName}`;
        let endTime = monitoredTags[id].monitorEndDate;

        if (moment().isBefore(endTime)) {
          getNewSentimentBatch(id, hashtag);
        }
      }
      res
        .status(200)
        .send('Added daily aggregate sentiment to each monitored tweet.');
    },
    err => {
      console.log('Error! ', err);
    }
  );
});

function getNewSentimentBatch(id, hashtag) {
  twitter
    .get(
      'search/tweets',
      {
        q: hashtag,
        count: 100
      },
      (_err, data) => {
        const statuses = data.statuses;
        const aggregateSentiment = calculateSentiment(statuses);

        const sentimentObject = {
          tagId: id,
          sentimentScore: aggregateSentiment,
          date: moment().format()
        };

        database
          .ref('/monitoredTags')
          .child(id)
          .child('sentimentBucket')
          .push(sentimentObject);
      }
    )
    .catch(err => {
      console.log(err);
    });
}
