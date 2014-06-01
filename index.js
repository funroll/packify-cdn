var packify = require('packify')

var express = require("express");
var logfmt = require("logfmt");
var cors = require('cors');

var app = express();

app.use(cors());
app.use(logfmt.requestLogger());

function rawBody(req, res, next) {
  req.setEncoding('utf8');
  req.rawBody = '';
  req.on('data', function(chunk) {
    req.rawBody += chunk;
  });
  req.on('end', function(){
    next();
  });
}

app.use(rawBody);
app.use(express.methodOverride());

app.post('/', function(req, res) {
  var body = req.rawBody;
  console.log('body: ' + body);
  packify(body, function(bundle) {
    res.send(bundle);
  });
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

