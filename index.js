const fetch = require('node-fetch');
const cron = require("node-cron");
const express = require('express');
let socket = require('socket.io');
let Twitter = require('twitter');

const path = require('path');
const app = express();
const http = require("http");

let twitchKey;
let TWITCH_USERNAME;
let TWITTER_USERNAME;
let consumerKey;
let consumerSecret;
let accessToken;
let accessSecret;

let json = require('./config.json');
twitchKey = json.twitchKey;
TWITCH_USERNAME = json.twitchName;
TWITTER_USERNAME = json.twitterName;
consumerKey= json.consumerkey;
consumerSecret = json.consumersecret;
accessToken = json.accesstoken;
accessSecret = json.accesssecret;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


const port = process.env.PORT || 1506;

/*======================================
=           SOCKET IO           =
======================================*/
const server = http.createServer(app);
const io = socket(server);

let socialMediaData = {
  twitterData:{},
  twitterFollowers: {},
  twitchVodData: {},
  twitchFollowers: {},
  isLive: {},
};

io.on('connection', (socket) => {
  socket.emit('socialMediaData', socialMediaData);
});

cron.schedule("* * * * *", function() {
  io.emit('socialMediaData', socialMediaData);
});

server.listen(port, () => console.log(`Listening on port ${port}`));
/*======================================
=                TWITTER               =
======================================*/
let params = {screen_name: TWITTER_USERNAME, count:10, tweet_mode: 'extended',};

let client = new Twitter({
  consumer_key: consumerKey,
  consumer_secret: consumerSecret,
  access_token_key: accessToken,
  access_token_secret: accessSecret
 });

cron.schedule("* * * * *", function() {
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
    const tweethold = Object.keys(tweets).map
      (function(k){return{key:k, value:tweets[k]}}
    )
    //res.json(tweethold);
    socialMediaData.twitterData = tweethold;
    }
    else{
      console.log(error);
    }
  });
  client.get('users/show', params, function(error, data, response) {
    if (!error) {
      socialMediaData.twitterFollowers = data.followers_count;
    }
  });
});
/*======================================
=                TWITCH               =
======================================*/

cron.schedule("* * * * *", function() {

  /* twitch is live */
  fetch("https://api.twitch.tv/kraken/streams/"+TWITCH_USERNAME+"?client_id="+twitchKey)
    .then(res => res.json())
    .then(body => {
      if (body.stream){
        if (body.stream.stream_type==="live"){
          socialMediaData.isLive = true;

        }
        else {
          socialMediaData.isLive = false;
        }
      }
      else {
        socialMediaData.isLive = false;
      }
    }
  );
  /* twitch follower count */
  fetch("https://api.twitch.tv/kraken/channels/"+TWITCH_USERNAME+"?client_id="+twitchKey)
    .then(res => res.json())
    .then(body => {
      if (body.followers){
        socialMediaData.twitchFollowers = body.followers;
      }
      else {
      }
    }
  );

  /* twitch vods */
  fetch("https://api.twitch.tv/kraken/channels/"+TWITCH_USERNAME+"/videos?client_id="+twitchKey+"&broadcasts=true")
    .then(res => res.json())
    .then(body => {
      if (body){
        socialMediaData.twitchVodData = body.videos;
    }
  }
  );
});
