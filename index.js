const fetch = require('node-fetch');
const cron = require("node-cron");
const express = require('express');
let socket = require('socket.io');

const path = require('path');
const app = express();


let twitchKey;
let TWITCH_USERNAME;

let json = require('./config.json');
twitchKey = json.twitchKey;
TWITCH_USERNAME = json.twitchName;

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
