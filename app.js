var twilio = require('twilio'),
http = require('http');

http.createServer(function (req, res) {
	res.writeHead(200, {
		'Content-Type': 'text/plain'
	});
	res.end('Hello World\n');
	}).listen(process.env.port || 8080);