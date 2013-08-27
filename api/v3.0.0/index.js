/**
 *  Copyright 2013 Ionică Bizău
 *
 *  A Node.JS module, which provides an object oriented wrapper for the Youtube v3 API.
 *  Author: Ionică Bizău <bizauionica@gmail.com>
 *
 **/

module.exports = function () {
    var apis = [
        "activities",
        "channelBanners",
        "channels",
        "guideCategories",
        "playlistItems",
        "playlists",
        "search",
        "subscriptions",
        "thumbnails",
        "videoCategories",
        "videos"
    ];

    for (var i in apis) {
        var api = require("./" + apis[i]);
        this[apis[i]] = api;
        this[apis[i]].Client = this;
    }
};
