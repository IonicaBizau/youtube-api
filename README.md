# youtube-api [![Support this project][donate-now]][paypal-donations]

A Node.JS module, which provides an object oriented wrapper for the Youtube v3 API.

## Installation

```sh
$ npm i --save youtube-api
```

## Example

```js
/**
 * This script uploads a video (specifically `video.mp4` from the current
 * directory) to YouTube,
 *
 * To run this script you have to create OAuth2 credentials and download them
 * as JSON and replace the `credentials.json` file. Then install the
 * dependencies:
 *
 * npm i r-json lien opn bug-killer
 *
 * Don't forget to run an `npm i` to install the `youtube-api` dependencies.
 * */

// Dependencies
var Youtube = require("youtube-api")
  , Fs = require("fs")
  , ReadJson = require("r-json")
  , Lien = require("lien")
  , Logger = require("bug-killer")
  , Opn = require("opn")
  ;

// Constants
// I downloaded the file from OAuth2 -> Download JSON
const CREDENTIALS = ReadJson("./credentials.json");

// Init lien server
var server = new Lien({
    host: "localhost"
  , port: 5000
});

// Authenticate
// You can access the Youtube resources via OAuth2 only.
// https://developers.google.com/youtube/v3/guides/moving_to_oauth#service_accounts
var oauth = Youtube.authenticate({
    type: "oauth"
  , client_id: CREDENTIALS.web.client_id
  , client_secret: CREDENTIALS.web.client_secret
  , redirect_url: CREDENTIALS.web.redirect_uris[0]
});

Opn(oauth.generateAuthUrl({
    access_type: "offline"
  , scope: ["https://www.googleapis.com/auth/youtube.upload"]
}));

// Handle oauth2 callback
server.page.add("/oauth2callback", function (lien) {
    Logger.log("Trying to get the token using the following code: " + lien.search.code);
    oauth.getToken(lien.search.code, function(err, tokens) {
        if (err) { lien(err, 400); return Logger.log(err); }
        oauth.setCredentials(tokens);
        Youtube.videos.insert({
            resource: {
                // Video title and description
                snippet: {
                    title: "Testing YoutTube API NodeJS module"
                  , description: "Test video upload via YouTube API"
                }
                // I don't want to spam my subscribers
              , status: {
                    privacyStatus: "private"
                }
            }
            // This is for the callback function
          , part: "snippet,status"

            // Create the readable stream to upload the video
          , media: {
                body: Fs.createReadStream("video.mp4")
            }
        }, function (err, data) {
            if (err) { return lien.end(err, 400); }
            lien.end(data);
        });
    });
});
```

## Documentation

The [official Youtube documentation](https://developers.google.com/youtube/v3/docs/) is a very useful resource.

 - [Activities](https://developers.google.com/youtube/v3/docs/activities)
 - [ChannelBanners](https://developers.google.com/youtube/v3/docs/channelBanners)
 - [Channels](https://developers.google.com/youtube/v3/docs/channels)
 - [GuideCategories](https://developers.google.com/youtube/v3/docs/guideCategories)
 - [PlaylistItems](https://developers.google.com/youtube/v3/docs/playlistItems)
 - [Playlists](https://developers.google.com/youtube/v3/docs/playlists)
 - [Search](https://developers.google.com/youtube/v3/docs/search)
 - [Subscriptions](https://developers.google.com/youtube/v3/docs/subscriptions)
 - [Thumbnails](https://developers.google.com/youtube/v3/docs/thumbnails)
 - [VideoCategories](https://developers.google.com/youtube/v3/docs/videoCategories)
 - [Videos](https://developers.google.com/youtube/v3/docs/videos)

If you have any questions, just [open an issue](https://github.com/IonicaBizau/youtube-api/issues/new).
### Authentication
#### OAuth (Access Token)
```js
Youtube.authenticate({
    type: "oauth"
  , token: "your access token"
});
```
#### OAuth (Refresh Token)
```js
Youtube.authenticate({
    type: "oauth"
  , refresh_token: "your refresh token"
  , client_id: "your client id"
  , client_secret: "your client secret"
  , redirect_url: "your refresh url"
});
```
#### Server Key
Only for requests that don't require [user authorization](https://developers.google.com/youtube/v3/guides/authentication) (certain list operations)
```js
Youtube.authenticate({
    type: "key"
  , key: "your server key"
});
```

## How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].

## Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:

 - [`anitube`](https://github.com/temperman/animeClowler) by kikura-yuichiro

 - [`kyot-sunday-playlists`](https://github.com/apandichi/kyot-sunday-playlists) by Alin Pandichi

 - [`mediacenterjs`](http://www.mediacenterjs.com) by Jan Smolders

 - [`mediacenterjs-youtube`](http://www.mediacenterjs.com) by Jan Smolders

 - [`node-red-node-youtube`](https://github.com/jlong23/node-red-node-youtube#readme) by Jay Long

 - [`node-youtubeapi-simplifier`](https://github.com/Haidy777/node-youtubeAPI-simplifier) by Haidy777

 - [`pullplaylist`](https://github.com/sameid/pullplaylist) by Sameid Usmani

 - [`pully`](https://github.com/JimmyBoh/pully#readme) by Jim Buck

 - [`steam-chat-bot`](https://steam-chat-bot.github.io/node-steam-chat-bot) by See contributors

 - [`test-youtube-api`](https://github.com/IonicaBizau/test-youtube-api)

 - [`youtube-playlist-info`](https://github.com/benkaiser/youtube-playlist-info) by Benjamin Kaiser

 - [`youtube-vanitystats`](https://npmjs.com/package/youtube-vanitystats) by Sebastian Patten

## License

[MIT][license] © [Ionică Bizău][website]

[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(http%3A%2F%2Fionicabizau.net)&year=2013#license-mit
[website]: http://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md