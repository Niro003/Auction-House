/**
 * Created by grill on 31.01.2017.
 */
const express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session')
var mysql = require('mysql');
var MySQLStore = require('express-mysql-session')(session);
var validator = require('validator');
// make it global so it is accessible to the other node modules
var app = express();
httpTun = require('http');
http = httpTun.Server(app);
https = require('https');

// Constants
const PORT = 8080;
const uuidV4 = require('uuid/v4');
// App

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

pool  = mysql.createPool({
    connectionLimit : 10,
    host     : '127.0.0.1',
    user     : 'root',
    password : 'root',
    database : 'auctionhouse'
});

var sessionStore = new MySQLStore({}/* session store options */, pool);
app.set('trust proxy', 1); // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000,httpOnly: false ,secure: false},
    genid: function(req) {
        var uuid = uuidV4();
        console.log("Generated new SessionID: "+uuid);
        return uuid; // use UUIDs for session IDs
    }
}));

// own modules

require('./socket-connection/socket-connection')
const account = require('./account/account');
account(app);
const ebay = require('./ebay-api/ebay-interface-api');
ebay(app);
app.listen(PORT);
console.log('Running on http://localhost:' + PORT);


