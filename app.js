var config = require('config'),
    twilio = require('twilio'),
    http = require('http');

var port = process.env.PORT || 5000;

http.createServer(function (req, res) {
    //hard code this for heroku deployment
    twilio.validateRequest(config.authToken, res.he)

    var resp = new twilio.TwimlResponse();
    resp.say('hello world!');

    res.writeHead(200, {
        'Content-Type':'text/xml'
    });
    res.end('Hello World\n');
}).listen(port);