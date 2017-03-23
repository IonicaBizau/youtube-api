
# youtube-api

 [![Support me on Patreon][badge_patreon]][patreon] [![Buy me a book][badge_amazon]][amazon] [![PayPal][badge_paypal_donate]][paypal-donations] [![Version](https://img.shields.io/npm/v/youtube-api.svg)](https://www.npmjs.com/package/youtube-api) [![Downloads](https://img.shields.io/npm/dt/youtube-api.svg)](https://www.npmjs.com/package/youtube-api)

> A Node.JS module, which provides an object oriented wrapper for the Youtube v3 API.

## :cloud: Installation

```sh
$ npm i --save youtube-api
```


## :clipboard: Example



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

const Youtube = require("youtube-api")
    , fs = require("fs")
    , readJson = require("r-json")
    , Lien = require("lien")
    , Logger = require("bug-killer")
    , opn = require("opn")
    , prettyBytes = require("pretty-bytes")
    ;

// I downloaded the file from OAuth2 -> Download JSON
const CREDENTIALS = readJson(`${__dirname}/credentials.json`);

// Init lien server
let server = new Lien({
    host: "localhost"
  , port: 5000
});

// Authenticate
// You can access the Youtube resources via OAuth2 only.
// https://developers.google.com/youtube/v3/guides/moving_to_oauth#service_accounts
let oauth = Youtube.authenticate({
    type: "oauth"
  , client_id: CREDENTIALS.web.client_id
  , client_secret: CREDENTIALS.web.client_secret
  , redirect_url: CREDENTIALS.web.redirect_uris[0]
});

opn(oauth.generateAuthUrl({
    access_type: "offline"
  , scope: ["https://www.googleapis.com/auth/youtube.upload"]
}));

// Handle oauth2 callback
server.addPage("/oauth2callback", lien => {
    Logger.log("Trying to get the token using the following code: " + lien.query.code);
    oauth.getToken(lien.query.code, (err, tokens) => {

        if (err) {
            lien.lien(err, 400);
            return Logger.log(err);
        }

        Logger.log("Got the tokens.");

        oauth.setCredentials(tokens);

        lien.end("The video is being uploaded. Check out the logs in the terminal.");

        var req = Youtube.videos.insert({
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
                body: fs.createReadStream("video.mp4")
            }
        }, (err, data) => {
            console.log("Done.");
            process.exit();
        });

        setInterval(function () {
            Logger.log(`${prettyBytes(req.req.connection._bytesDispatched)} bytes uploaded.`);
        }, 250);
    });
});
```

## :question: Get Help

There are few ways to get help:

 1. Please [post questions on Stack Overflow](https://stackoverflow.com/questions/ask). You can open issues with questions, as long you add a link to your Stack Overflow question.
 2. For bug reports and feature requests, open issues. :bug:
 3. For direct and quick help from me, you can [use Codementor](https://www.codementor.io/johnnyb). :rocket:


## :memo: Documentation

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

If you have any questions, please [ask them on **Stack Overflow**](https://stackoverflow.com/questions/ask) and eventually [open an issue](https://github.com/IonicaBizau/youtube-api/issues/new) and link your question there.

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

## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].


## :sparkling_heart: Support my projects

I open-source almost everything I can, and I try to reply everyone needing help using these projects. Obviously,
this takes time. You can integrate and use these projects in your applications *for free*! You can even change the source code and redistribute (even resell it).

However, if you get some profit from this or just want to encourage me to continue creating stuff, there are few ways you can do it:

 - Starring and sharing the projects you like :rocket:
 - [![PayPal][badge_paypal]][paypal-donations]—You can make one-time donations via PayPal. I'll probably buy a ~~coffee~~ tea. :tea:
 - [![Support me on Patreon][badge_patreon]][patreon]—Set up a recurring monthly donation and you will get interesting news about what I'm doing (things that I don't share with everyone).
 - **Bitcoin**—You can send me bitcoins at this address (or scanning the code below): `1P9BRsmazNQcuyTxEqveUsnf5CERdq35V6`

    ![](https://i.imgur.com/z6OQI95.png)

Thanks! :heart:


## :dizzy: Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:


 - [`adasq-services-ytv`](https://github.com/adasq/adasq-services-ytv#readme)—It creates news feed from youtube search result, for specific queries
 - [`anitube`](https://github.com/temperman/animeClowler) (by kikura-yuichiro)—node module for getting youtube video url of japanese animation OP/ED movie
 - [`kyot-sunday-playlists`](https://github.com/apandichi/kyot-sunday-playlists) (by Alin Pandichi)—Kyot Sunday Playlists
 - [`mediacenterjs`](http://www.mediacenterjs.com) (by Jan Smolders)—A NodeJS based mediacenter for your browser
 - [`mediacenterjs-youtube`](http://www.mediacenterjs.com) (by Jan Smolders)—A Youtube app for mediacenterjs
 - [`muzier-cli`](https://github.com/kevin940726/muzier-cli#readme) (by Kai Hao)—The muzier command line interface.
 - [`node-red-contrib-youtube`](https://github.com/StefanWerW/node-red-contrib-youtube#readme) (by scaw.dev)—Youtube nodes for node-red
 - [`node-red-node-youtube`](https://github.com/jlong23/node-red-node-youtube#readme) (by Jay Long)—A Node-RED node to access Youtube Data API.
 - [`node-youtubeapi-simplifier`](https://github.com/Haidy777/node-youtubeAPI-simplifier) (by Haidy777)—The Youtube-API probably isn't the simplest api in the world. So why isn't there a simplifier? Well, don't worry, now there is one :)
 - [`pullplaylist`](https://github.com/sameid/pullplaylist) (by Sameid Usmani)—Youtube video downloader in pure javascript.
 - [`steam-chat-bot`](https://steam-chat-bot.github.io/node-steam-chat-bot) (by See contributors)—Simplified interface for a steam chat bot with lots of built-in functionality
 - [`test-youtube-api`](https://github.com/IonicaBizau/test-youtube-api)—Test Youtube API NodeJS module
 - [`ydown`](https://npmjs.com/package/ydown)—Downloads Youtube links and playlists (Audio only)
 - [`YouSlackBot`](https://npmjs.com/package/YouSlackBot) (by SoNiKBooM)—Insert Youtube videos posted to Slack into a Youtube playlist.
 - [`youtube-album-uploader`](https://github.com/jpchip/youtube-album-uploader) (by Jared Chapiewsky)—Uploads an mp3 album to Youtube
 - [`youtube-dler`](https://github.com/iguider/youtube-dler#readme) (by Ayoub Ider AGHBAL)—A command line tool to download youtube videos/audio and playlists
 - [`youtube-playlist-info`](https://github.com/benkaiser/youtube-playlist-info) (by Benjamin Kaiser)—Youtube playlist information fetcher.
 - [`youtube-vanitystats`](https://npmjs.com/package/youtube-vanitystats) (by Sebastian Patten)—A scheduled job that will will query YouTube's API for a given video ID. It will then email you the number of views and amount of revenue you have made since the last time it was run.

## :scroll: License

[MIT][license] © [Ionică Bizău][website]

[badge_patreon]: http://ionicabizau.github.io/badges/patreon.svg
[badge_amazon]: http://ionicabizau.github.io/badges/amazon.svg
[badge_paypal]: http://ionicabizau.github.io/badges/paypal.svg
[badge_paypal_donate]: http://ionicabizau.github.io/badges/paypal_donate.svg
[patreon]: https://www.patreon.com/ionicabizau
[amazon]: http://amzn.eu/hRo9sIZ
[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(https%3A%2F%2Fionicabizau.net)&year=2013#license-mit
[website]: https://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
