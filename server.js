"use strict";

require('./functions');

const config        = require('./config'),
    express    	    = require('express'),
    app        	    = express(),
    https           = require('https'),
    bodyParser 	    = require('body-parser'),
    cors            = require('cors'),
    compression     = require('compression'),
    session         = require('express-session'),
    RedisStore      = require('connect-redis')(session),
    fs              = require('fs'),
    key             = fs.readFileSync(config.keyPath),
    cert            = fs.readFileSync(config.certPath),
    server          = https.createServer({ key: key, cert: cert }, app),
    expressWs       = require('express-ws')(app, server);

config.session.store = new RedisStore(config.redis);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded(config.bodyParser.urlencoded));
app.use(session(config.session));
app.use(cors());
app.use(require('./controllers'));
if(config.isProduction) app.use(compression());

server.listen(config.node.port, config.node.host, function() {
    console.log('Server available at https://%s', config.node.host + ':' + config.node.port);
});