var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  //response.render('pages/index');
 //  if (req.query.u != 'key')
 //  	return res.end(':(') 

	// res.end(':)') 


    console.log('GET /')
    //console.log(req);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Get request received');

});

app.post('/', function (req, res){
    console.log('POST /');
    console.log(req.query);
    //console.log(req);

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Post request received');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

