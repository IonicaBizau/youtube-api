/**
 *  Copyright 2013-14 Ionică Bizău
 *
 *  A Node.JS module, which provides an object oriented wrapper for the Youtube v3 API.
 *  Author: Ionică Bizău <bizauionica@gmail.com>
 *
 **/

// Dependencies
var Request = require("request");
var Api     = require("./api");
var Debug   = require("bug-killer");

var Client = module.exports = function(config) {
    this.config = config;
    config.logLevel = typeof config.logLevel === "number" ? config.logLevel : 0;
    Debug._config.logLevel = config.logLevel;
};

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
            Debug.log("Clearing auth info.", "info");
            config.auth = undefined;
            return;
        }

        options.type = options.type || "oauth";

        var err = null;
        if (!options.type || "oauth|key".indexOf(options.type) === -1) {
            err = new Error("Invalid authentication type must be 'oauth' or 'key'");
        } else if (options.type == "key" && !options.key) {
            err = new Error("Key authentication requires a key to be set");
        } else if (options.type == "oauth" && !options.token) {
            err = new Error("OAuth2 authentication requires a token to be set");
        }

        if (err) {
            Debug.log(err, "error");
            throw err;
        }

        Debug.log("Authenticating via " + options.type + ".", "info");

        config.auth = options;
    };

    /**
     *  Client#getConfig() -> config
     *
     *  Returns Client configuration object
     **/
    this.getConfig = function () {
        Debug.log("Getting config.", "info");
        return config;
    };

    /**
     *  Client#setConfig(config) -> config
     *
     *  Sets the Client configuration object.
     **/
    this.setConfig = function (conf) {
        Debug.log("Setting config.", "info");
        return config = conf;
    };

    /**
     *  Client#request(options, callback) -> null
     *      - options (Object): parameters to send as the request body
     *      - callback (Function): function to be called when the request returns.
     *          If the the request returns with an error, the error is passed to
     *          the callback as its first argument (NodeJS-style).
     *
     *  Send an HTTP request to the server and pass the result to a callback.
     **/
    this.request = function(options, callback) {

        var reqOptions = {};

        if (typeof options === "string") {
            reqOptions.url = options;
        }

        for (var option in options) {
            reqOptions[option] = options[option];
        }

        if (reqOptions.json == undefined) {
            reqOptions.json = true;
        }

        Debug.log("Running request with the following options: " + JSON.stringify(options, null, 4), "info");
        Request(reqOptions, function (err, res, body) {

            if (!err && res.statusCode == 200) {
                Debug.log("Request was successfull", "info");
                return callback(null, body);
            }

            // no content
            if (res && res.statusCode === 204) {
                Debug.log("Request was successfull, but no content was returned.", "warn");
                return callback(null, "");
            }

            if (body && body.error) {
                err = body.error.message || body.error;
            }

            if (err) {
                Debug.log("Request failed: " + err, "error");
                return callback(err);
            }

            // unknown error
            callback("Something wrong happened in the request (index.js:this.request) function. Check the logs for more information.");
            Debug.log(
                 "Request failed: " +
                 "\n---- Submit an issue with the following information ----" +
                 "\nIssues: https://github.com/IonicaBizau/youtube-api/issues" +
                 "\nDate: "         + new Date().toString() +
                 "\nError: "        + JSON.stringify(err) +
                 "\nStatus Code:: " + JSON.stringify(res.statusCode) +
                 "\nBody: "         + JSON.stringify(body) +
                 "\n------------------"
            , "error");
        });
    };
}).call(Client);
Api.call(Client);
