var Util = require("../../util");

function list (options, callback) {
    var self = this;

    var url = Util.createUrl.apply(self, ["videoCategories", options]);
    var reqOptions = {
        url: url,
    };

    self.Client.request(reqOptions, callback);
}

module.exports = {
    list: list
};
