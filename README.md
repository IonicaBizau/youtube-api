Youtube API
===========

A Node.JS module, which provides an object oriented wrapper for the Youtube v3 API.

## Reference
 - [Activities](https://developers.google.com/youtube/v3/docs/activities)
 - [ChannelBanners](https://developers.google.com/youtube/v3/docs/channelbanners)
 - [Channels](https://developers.google.com/youtube/v3/docs/channels)
 - [GuideCategories](https://developers.google.com/youtube/v3/docs/guidecategories)
 - [PlaylistItems](https://developers.google.com/youtube/v3/docs/playlistitems)
 - [Playlists](https://developers.google.com/youtube/v3/docs/playlists)
 - [Search](https://developers.google.com/youtube/v3/docs/search)
 - [Subscriptions](https://developers.google.com/youtube/v3/docs/subscriptions)
 - [Thumbnails](https://developers.google.com/youtube/v3/docs/thumbnails)
 - [VideoCategories](https://developers.google.com/youtube/v3/docs/videocategories)
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

## Changelog

### v0.1.0
 - Initial release
 - Supports only `GET` requests
