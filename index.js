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
                authObj = new  Google.auth.OAuth2();
                authObj.setCredentials({
                    access_token: options.access_token || options.token
                  , refresh_token: options.refresh_token
                });
                break;
            case "key":
                authObj = options.key;
                break;
            case "jwt":
                authObj = new googleapis.auth.JWT(
                    options.email
                  , authData.keyFile,
                  , authData.key,
                  , authData.scopes,
                  , authData.subject
                );
                break;
        }

        Google.options({ auth: authObj });
        config.auth = options;

        return authObj;
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
