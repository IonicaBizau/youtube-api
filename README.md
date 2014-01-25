# Youtube API

A Node.JS module, which provides an object oriented wrapper for the Youtube v3 API.

[![NPM](https://nodei.co/npm/youtube-api.png?downloads=true)](https://nodei.co/npm/youtube-api/)

## Donate

Help the `youtube-api` NPM package development. Any donation is welcome and I will be thankful!

>[![](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=FHC8NQC3YK924)

## Installation

Install with the Node.JS package manager [npm](http://npmjs.org/):

```sh
$ npm install youtube-api
```

or

Install via git clone:

```sh
$ git clone git://github.com/IonicaBizau/youtube-api.git
$ cd youtube-api
$ npm install
```

## Documentation

You can find the docs for the API of this client at [http://ionicabizau.github.io/youtube-api/](http://ionizabicau.github.io/youtube-api/)

Additionally, the [official Youtube documentation](https://developers.google.com/youtube/v3/docs/) is a very useful resource.

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

<table>
  <thead>
    <tr><th><div>Resource Type</div></th>
    <th><div>Supported Operations</div></th>
  </tr></thead>
  <tbody><tr>
    <td></td>
    <td><strong><span>list</span></strong></td>
    <td><strong><span>insert</span></strong></td>
    <td><strong><span>update</span></strong></td>
    <td><strong><span>delete</span></strong></td>
  </tr>
  <tr>
    <td><b>activity</b></td>
    <td>yes</td>
    <td>yes</td>
    <td>no</td>
    <td>no</td>
  </tr>
  <tr>
    <td><b>channel</b></td>
    <td>yes</td>
    <td>no</td>
    <td>no</td>
    <td>no</td>
  </tr>
  <tr>
    <td><b>guideCategory</b></td>
    <td>yes</td>
    <td>no</td>
    <td>no</td>
    <td>no</td>
  </tr>
  <tr>
    <td><b>playlist</b></td>
    <td>yes</td>
    <td>yes</td>
    <td>yes</td>
    <td>yes</td>
  </tr>
  <tr>
    <td><b>playlistItem</b></td>
    <td>yes</td>
    <td>yes</td>
    <td>yes</td>
    <td>yes</td>
  </tr>
  <tr>
    <td><b>search result</b></td>
    <td>yes</td>
    <td>no</td>
    <td>no</td>
    <td>no</td>
  </tr>
  <tr>
    <td><b>subscription</b></td>
    <td>yes</td>
    <td>no</td>
    <td>no</td>
    <td>no</td>
  </tr>
  <tr>
    <td><b>video</b></td>
    <td>yes</td>
    <td>yes</td>
    <td>yes</td>
    <td>yes</td>
  </tr>
  <tr>
    <td><b>videoCategory</b></td>
    <td>yes</td>
    <td>no</td>
    <td>no</td>
    <td>no</td>
  </tr>
</tbody></table>

## Example

```JS
var Youtube = require("youtube-api");

Youtube.authenticate({
    type: "oauth",
    token: ACCESS_TOKEN
});

Youtube.channels.list({
    "part": "id",
    "mySubscribers": true,
    "maxResults": 50
}, function (err, data) {
    console.log(err, data);
});
```

## Authentication

```JS
Youtube.authenticate({
    type: "oauth",
    token: "your access token"
});
```

## Implemented Youtube APIs

All APIs that don't require `POST`, `PUT` or `DELETE` request methods are supported.
More features will be added in the next versions.

## Running the Tests

Download and test this module using [this test application](https://github.com/IonicaBizau/test-youtube-api).

Note that a connection to the internet is required to run the tests.

## Contributors
See package.json file.

## LICENSE

MIT license. See the LICENSE file for details.

## Changelog

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
        type: 'key',
        key: 'AIz...OtE'
    });
    ```

### v0.1.1
 - Fixed #2 (pull request): fix in `videos` API requests.

### v0.1.0
 - Initial release
 - Supports only `GET` requests
