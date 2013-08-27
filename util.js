/**
 *  Copyright 2013 Ionică Bizău
 *
 *  A Node.JS module, which provides an object oriented wrapper for the Youtube v3 API.
 *  Author: Ionică Bizău <bizauionica@gmail.com>
 *
 **/

var Util = require("util");
var API_URL = "https://www.googleapis.com/youtube/v3/";

function createUrl (api, options) {

    var url = API_URL + api;

    options.access_token = (this.Client.getConfig().auth || {}).token;

    var i = -1;
    for (var opt in options) {
        var value = options[opt];
        url += (++i === 0 ? "?" : "&") + opt + "=" + value;
    }

    return url;
}

exports.createUrl = createUrl;
