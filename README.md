# Youtube API

A Node.JS module, which provides an object oriented wrapper for the Youtube v3 API.

[![NPM](https://nodei.co/npm/youtube-api.png?downloads=true)](https://nodei.co/npm/youtube-api/)

## Installation

Install with the Node.JS package manager [npm](http://npmjs.org/):

```sh
$ npm install youtube-api
```

or

Install via `git`:

```sh
$ git clone git://github.com/IonicaBizau/youtube-api.git
$ cd youtube-api
$ npm install
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

## Example

```JS
var Youtube = require("youtube-api");

Youtube.authenticate({
    type: "oauth"
  , token: ACCESS_TOKEN
});

// List your channels
Youtube.channels.list({
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
      "playlistId": "YouTube Playlist ID"
    , "resourceId": {
       "videoId": "YouTube Video ID"
     , "kind": "youtube#video"
      }
    }
});
```

## Authentication

### OAuth
```JS
Youtube.authenticate({
    type: "oauth"
  , token: "your access token"
});
```

### Server Key
```JS
Youtube.authenticate({
    type: "key"
  , key: "your server key"
});
```

### JWT
```JS
Youtube.authenticate({
    type: "jwt"
  , email: "77....3vv@developer.gserviceaccount.com"
  , keyFile: "... auth.pem"
  , key: "fb....d50"
  , subject: "you@gmail.com" // optional
  , scopes: ["https://www.googleapis.com/auth/youtube"]
}).authorize(function (err, data) {
    if (err) { throw err; }
    /* Access resources */
});
```

## Running the Tests
Download and test this module using [this test application](https://github.com/IonicaBizau/test-youtube-api).

Note that a connection to the internet is required to run the tests.

## Contributors
See package.json file.

## Donate
Help the `youtube-api` NPM package development. Any donation is welcome and I will be thankful!

>[![](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=FHC8NQC3YK924)


## LICENSE
MIT license. See the LICENSE file for details.

## Changelog

### v0.3.2
 - Insert request example in README.

### v0.3.1
 - Fixes in documentation

### v0.3.0
 - JWT authentication type
 - All request types are supported (using `googleapis`)
 - Deprecacted `setConfig` method

### v0.2.2
 - Removed debugging message from index.js
 - Output an error in application logs if there is an unkwnown error in request
 - Minor fix in util.js

### v0.2.1
 - A mistake was corrected: [`channels` --> `subscriptions`](https://github.com/IonicaBizau/youtube-api/commit/62810585b6826cc03fe76dfeffd03d3934f444a8)

### v0.2.0
 - Added the key authentication.

    Example:

    ```js
    Youtube.authenticate({
        type: 'key'
      , key: 'AIz...OtE'
    });
    ```

### v0.1.1
 - Fixed #2 (pull request): fix in `videos` API requests.

### v0.1.0
 - Initial release
 - Supports only `GET` requests
