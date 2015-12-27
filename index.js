var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var MailChimpAPI = require('mailchimp').MailChimpAPI;
var mailchimp_api = 'a73945ca916173c3fa7b75cb0fe32269-us12';
var mailchimp_list_id = 'fa1a2a4e7b';

try { 
    var api = new MailChimpAPI(mailchimp_api, { version : '2.0' });
} catch (error) {
    console.log(error.message);
}


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

    var mandrill_events = JSON.parse(req.body.mandrill_events);

    for (var i=0; i<mandrill_events.length; i++) {
    	if (mandrill_events[i]['type'] == 'blacklist' &&
    		mandrill_events[i]['action'] == 'add') {
    		console.log(mandrill_events[i]['reject']['reason']);
    		console.log(mandrill_events[i]['reject']['email']);

			api.call('lists', 'subscribe', { id: mailchimp_list_id, email: { email: mandrill_events[i]['reject']['email'] }, double_optin: false}, function (error, data) {
			    if (error)
			        console.log(error.message);
			    else
			        console.log(JSON.stringify(data)); // Do something with your data!

				api.call('lists', 'unsubscribe', { id: mailchimp_list_id, email: { email: mandrill_events[i]['reject']['email'] }}, function (error, data) {
				    if (error)
				        console.log(error.message);
				    else
				        console.log(JSON.stringify(data)); // Do something with your data!
				});

			});
    	}
	}    	

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Post request received');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

