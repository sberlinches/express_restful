require('./extensions.js');

var https       = require('https'),
    fs          = require('fs'),
    express    	= require('express'),
    bodyParser 	= require('body-parser'),
    cors        = require('cors'),
    app        	= express(),
    port        = 3443;

// bodyParser config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw({ type: 'application/vnd.api+json' }));

// CORS
app.use(cors());

// Routes
app.use(require('./controllers'));

// Start the server
https.createServer({
        key: fs.readFileSync('../../../ssl/private.key'),
        cert: fs.readFileSync('../../../ssl/certificate.pem')
    }, app)
    .listen(port, function () {
        console.log('Secure Server listening on port ' + port);
    });