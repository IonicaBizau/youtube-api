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

    var url = Util.createUrl.apply(self, ["search", options]);
    var reqOptions = {
        url: url,
    };

    self.Client.request(reqOptions, callback);
}

module.exports = {
    list: list
};
