const fetch = require('node-fetch');
const cron = require("node-cron");
const express = require('express');
let socket = require('socket.io');
let Twitter = require('twitter');

const path = require('path');
const app = express();


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
server = app.listen(port, function(){
  console.log(`server is running on port ${port}`)
})

io = socket(server);

let isLive = false;

io.on('connection', (socket) => {
  io.emit('twitchLive', {username: TWITCH_USERNAME, isLive: isLive});
  io.emit('twitterData', {data: twitterData});
});
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

let twitterData = {}
cron.schedule("* * * * *", function() {
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
      const tweethold = Object.keys(tweets).map
        (function(k){return{key:k, value:tweets[k]}}
      )
      //res.json(tweethold);
      twitterData = tweethold;
      io.emit('twitterData', {data: twitterData});
      }
      else{
        console.log(error);
      }
    });
});
/*======================================
=                TWITCH               =
======================================*/

cron.schedule("* * * * *", function() {
  isLive=true;
  fetch("https://api.twitch.tv/kraken/streams/"+TWITCH_USERNAME+"?client_id="+twitchKey)
    .then(res => res.json())
    .then(body => {
      if (body.stream){
        if (body.stream.stream_type==="live"){
          isLive = true;
          //console.log("true");
          io.emit('twitchLive', {username: TWITCH_USERNAME, isLive: isLive});
        }
        else {
          isLive = false;
          //console.log("false1");
          io.emit('twitchLive', {username: TWITCH_USERNAME, isLive: isLive});
        }
      }
      else {
        isLive = false;
        //console.log("false2");
        io.emit('twitchLive', {username: TWITCH_USERNAME, isLive: isLive});
      }
    }
  );
});
