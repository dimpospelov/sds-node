var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    console.log('GET /');
    //console.log(req);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Get request received');

});

app.post('/', function (req, res){
    console.log('POST /');

    if (req.query.u != '3e835487dc4ee6ebf5edfde70')
    	return res.end('Wrong key');

    var mandrill_events = req.body.mandrill_events;
    console.log(mandrill_events["0"]["event"]);
    console.log(mandrill_events.event);
    console.log(mandrill_events.0.event);
    	

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Post request received');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

