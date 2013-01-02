var twilio = require('twilio'),
    http = require('http'),
    qs = require('querystring');

//Get Twilio config
var config = {};

//prod/heroku
if (process.env.ACCOUNT_SID) {
    config.accountSid = process.env.ACCOUNT_SID;
    config.authToken = process.env.AUTH_TOKEN;
}

//local dev
else {
    config = require('config');
}

//Create HTTP server
var port = process.env.PORT || 5000;

//Will only respond to a POST
http.createServer(function (req, res) {

    if (req.method == 'POST') {
        var body = '';

        req.on('data', function (data) {
            body += data;
        });

        req.on('end', function () {

            var POST = qs.parse(body);
            // use POST

            //validate incoming request is from twilio
            var token = config.authToken,
                header = req.headers['x-twilio-signature'];

            console.log('headers: '+ JSON.stringify(req.headers));

            console.log('Got Twilio Header: '+header);
            console.log('Got POST params: '+JSON.stringify(POST));

            if (twilio.validateRequest(token, header, 'http://twilio-raw.herokuapp.com', POST)) {
                //generate a TwiML response
                var resp = new twilio.TwimlResponse();
                resp.say('hello, twilio!');

                res.writeHead(200, {
                    'Content-Type':'text/xml'
                });
                res.end(resp.toString());
            }
            else {
                res.writeHead(200, {
                    'Content-Type':'text/plain'
                });
                res.end('you are not twilio - take a hike.');
            }
        });
    }
    else {
        res.writeHead(200, {
            'Content-Type':'text/plain'
        });
        res.end('send a POST.');
    }

}).listen(port);