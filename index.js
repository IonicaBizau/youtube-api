/**
 *  Copyright 2013-14 Ionică Bizău
 *
 *  A Node.JS module, which provides an object oriented wrapper for the Youtube v3 API.
 *  Author: Ionică Bizău <bizauionica@gmail.com>
 *
 **/

"use strict";
var Google = require('googleapis');

var Client = module.exports = function(config) {};

(function() {
    var config = {};
    /**
     *  Client#authenticate(options) -> null
     *      - options (Object): Object containing the access token
     *          - token (String): OAuth2 token
     *
     *  Set an authentication method to have access to protected resources.
     *
     *  Example
     *
     *      Youtube.authenticate({
     *          token: "..."
     *      });
     **/
    this.authenticate = function (options) {
        if (!options) {
            config.auth = undefined;
            return;
        }

        var authObj = null;
        switch (options.type) {
            case "oauth":
                authObj = options.token;

                break;
        }

        Google.options({ auth: authObj });
        config.auth = options;
    };

    /**
     *  Client#getConfig() -> config
     *
     *  Returns Client configuration object
     **/
    this.getConfig = function () {
        return config;
    };

    /**
     *  Client#setConfig(config) -> config
     *
     *  Sets the Client configuration object.
     **/
    this.setConfig = function (conf) {
        return config = conf;
    };

    var GoogleYoutube = Google.youtube("v3");
    for (var f in GoogleYoutube) {
        this[f] = GoogleYoutube[f];
    }

}).call(Client);
