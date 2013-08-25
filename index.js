"use strict";
var Request = require("request");
var Client = module.exports = unction(config) {
    this.config = config;
    this.debug = Util.isTrue(config.debug);

    this.version = config.version;
    var cls = require("./api/v" + this.version);
    this[this.version] = new cls(this);
};

(function() {
    /**
     *  Client#authenticate(options) -> null
     *      - options (Object): Object containing the access token
     *          - token (String): OAuth2 token
     *
     *  Set an authentication method to have access to protected resources.
     *
     *  Example
     *
     *      github.authenticate({
     *          token: "..."
     *      });
     **/
    this.authenticate = function (options) {
        if (!options) {
            this.auth = false;
            return;
        }

        // TODO Does Youtube API support basic auth?
        options.type = "oauth";
        if (!options.type || "basic|oauth".indexOf(options.type) === -1)
            throw new Error("Invalid authentication type must be 'oauth'");
        if (options.type == "oauth" && !options.token)
            throw new Error("OAuth2 authentication requires a token to be set");

        this.auth = options;
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

        reqOptions.json = true;

        request(reqOptions, function (err, res, body) {

            if (!err && res.statusCode == 200) {
                return callback(null, body);
            }

            if (err) {
                return callback(err);
            }

            callback("Something wrong happened in the request (index.js:this.request) function.");
        });
    };
}).call();
