// Dependencies
var Youtube = require("../lib");

// Authenticate using an access token
Youtube.authenticate({
    type: "oauth"
  , token: "your access token"
});

// List your subcribers
Youtube.subscriptions.list({
    "part": "id"
  , "mySubscribers": true
  , "maxResults": 50
}, function (err, data) {
    console.log(err || data);
});

// Add a Video to a playlist
Youtube.playlistItems.insert({
    "part": "snippet"
  , "resource": {
        "snippet": {
            "playlistId": "YouTube Playlist ID"
          , "resourceId": {
                "kind" : "youtube#video"
              , "videoId" : "YouTube Video ID"
            }
        }
    }
}, function (err, data) {
    console.log(err || data);
});
