var Youtube = require('./index');

Youtube.authenticate({
    type: 'key',
    key: 'AIzaSyAN2S1NSmmUEWGa1ev9fFyIpWsBPNogOtE'
});

Youtube.channels.list({
    "part": "id",
    "maxResults": 50
}, function (err, data) {
    console.log(err, data);
});
