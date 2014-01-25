/**
 *  Copyright 2013 Ionică Bizău
 *
 *  A Node.JS module, which provides an object oriented wrapper for the Youtube v3 API.
 *  Author: Ionică Bizău <bizauionica@gmail.com>
 *
 **/

var Util = require("../../util");

function list (options, callback) {
    var self = this;

    var url = Util.createUrl.apply(self, ["subscriptions", options]);
    var reqOptions = {
        url: url,
    };

    self.Client.request(reqOptions, callback);
}

function insert (options, callback) {

    // get self
    var self = this

        // create the request url
      , url = Util.createUrl.apply(self, ["subscriptions", {
            part:   options.part,
            fields: options.fields
        }])

        // create the request options
      , reqOptions = {
           uri: url,
           method: "POST",
           json: options.requestBody
       };

    // submit request and callback
    self.Client.request(reqOptions, callback);
}

function deleteItem (options, callback) {

    // get self
    var self = this

        // create the request url
      , url = Util.createUrl.apply(self, ["subscriptions", {
            id:   options.id
        }])

        // create the request options
      , reqOptions = {
           uri: url,
           method: "DELETE"
       };

    // submit request and callback
    self.Client.request(reqOptions, callback);
}

module.exports = {
    list: list,
    insert: insert,
    delete: deleteItem
};
