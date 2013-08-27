 var fs = require("fs");

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
        fs.writeFileSync(apis[i] + ".js", "");
    }
