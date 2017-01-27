'use strict';

// Used Modules
const express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session')
var mysql = require('mysql');
var MySQLStore = require('express-mysql-session')(session);
var passwordHash = require('password-hash');
var validator = require('validator');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
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

var pool  = mysql.createPool({
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

function sendToLobbyClient(name,message){
    console.log('user connected to lobby '+name);
    io.emit(name, message);
}
io.on('connection', (socket) => {
    console.log('user connected');

	pool.getConnection(function(err, connection) {
		connection.query('SELECT idlobby,name from lobby ' , function(err, rows, fields) {
			connection.release();
			console.log(rows);
            for (var i = 0; i < rows.length; i++) {
            	console.log(rows[i].name);
                socket.on(rows[i].name, sendToLobbyClient.bind(null,rows[i].name));
            }
		});
	});

	socket.on('disconnect', function(){
		console.log('user disconnected');
	});

	socket.on('add-message', (message) => {
		console.log("sending message to add-message!");
		io.emit('message', message);
	});
});



http.listen(3002, function(){
    console.log('listening on *:3002');
});

app.get('/api', function (req, res) {
	pool.getConnection(function(err, connection) {
		pool.query('SELECT username,password from user', function(err, rows, fields) {
		  if (err) throw err;
		  console.log('The solution is: ', rows[1].username);
			res.send(rows[1].username);
		});	
	});
});

app.get('/api/logout',function(req,res){
	console.log("Session gonna be destroyed!");
	console.log(req.session);
	req.session.destroy(function(err) {
		if(err) {
			console.log(err);
			res.end("error");
		} else {
			res.end('success');
		}
	});
});

app.post('/api/login', function(req, res){
	pool.getConnection(function(err, connection) {
		connection.query('SELECT u.username,u.password,u.iduser,up.iduser_profile from user u join user_profile up on u.iduser = up.iduser', function(err, rows, fields) {
			connection.release();
			for (var i=0; i < rows.length; i++){
				if (rows[i].username === req.body.username && passwordHash.verify(req.body.password, rows[i].password)){
					var sess = req.session;
					if (sess.views) {
						sess.views++;
						console.log(req.sessionID);
						res.setHeader('Content-Type', 'text/html');
						res.write('<p>views: ' + sess.views + '</p>');
						res.write('<p>expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>');
						res.end();
					} else {
						if (rows[i].iduser === 12){
							sess.admin = true;
						}
						sess.iduser = rows[i].iduser;
						sess.iduser_profile = rows[i].iduser_profile;
						sess.views = 1;
						console.log(req.session);
						res.end(JSON.stringify(rows[i]));
					//	res.end();
					}
				}
			}
			res.end("fail");
		});	
	});
});



app.post('/api/register', function(req, res){
	pool.getConnection(function(err, connection) {
		console.log(req.body);
		if (!validator.isLength(req.body.username,{min : 4, max : 50})){
			res.send("Invalid Username!")
			connection.release();
			return;
		}
		if (!validator.isLength(req.body.password,{min : 4, max : 50})){
			res.send("Invalid Password!");
			connection.release();
			return;
		}
		if (!validator.isDate(req.body.birthdate)){
			res.send("Invalid Birthdate!")
			connection.release();
			return;
		}
		if (!validator.isEmpty(req.body.mail)){
			if (!validator.isEmail(req.body.mail)){
				res.send("Invalid Mail!");
				connection.release();
				return;
			}
		}
		if (!validator.isLength(req.body.firstname,{min : 0, max : 100})){
			res.send("Invalid Firstname");
			connection.release();
			return;
		}
		if (!validator.isLength(req.body.lastname,{min : 0, max : 100})){
			res.send("Invalid Lastname!");
			connection.release();
			return;
		}
		
		var hashedPassword = passwordHash.generate(req.body.password);
		connection.query('INSERT INTO user SET ?', {username:req.body.username,password:hashedPassword}, function(err, result) {
			console.log(err);
			connection.query('INSERT INTO user_profile SET ?', 
				{iduser:result.insertId,birthdate:req.body.birthdate,firstname:req.body.firstname,lastname:req.body.lastname,mail:req.body.mail},
				function(err, result) {
					console.log(err);
					console.log(result);
					connection.release();
					res.end("ok");
				});				
		});	
	
	});
});

app.get('/api/get/users', function(req, res){
	var sess = req.session;
	if (sess.views){
		sess.views++;
		pool.getConnection(function(err, connection) {
		console.log(req.body);
			connection.query('SELECT iduser_profile,username, birthdate, firstname, lastname, up.iduser, mail from user_profile up ' +
							  'INNER JOIN user u on up.iduser = u.iduser', function(err, rows, fields) {
				connection.release();
				console.log(err);
				console.log("Get Users Query Completed! Send it to the client!");
				res.send(rows);
			});	
		});
	}else{
		res.send("fail");
	}
});

app.get('/api/get/lobbies', function(req, res){
    var sess = req.session;
    console.log("Get Lobbies!")
    if (sess.views){
        sess.views++;
        pool.getConnection(function(err, connection) {
            console.log(req.body);
            connection.query('SELECT idlobby,name from lobby ' , function(err, rows, fields) {
                connection.release();
                console.log(err);
                console.log("Get Users Query Completed! Send it to the client!");
                res.send(rows);
            });
        });
    }else{
        res.send("fail");
    }
});

app.post('/api/update/user_profile',function(req, res){
	var sess = req.session;
	console.log(sess.admin);
	if (sess.admin || sess.iduser_profile == req.body.id){
		sess.views++;
		pool.getConnection(function(err, connection) {
			connection.query('UPDATE user_profile SET '+req.body.name+' = ? WHERE iduser_profile = ?', [req.body.value,req.body.id], function(err, results) {
			  console.log(err);
			  connection.release();
			  res.send("ok");
			});
		});
	}else{
		res.send("fail");
	}
});

app.post('/api/new/password',function(req, res){
	var sess = req.session;
	if (!sess.views){
		res.end("not logged in")
		return;
	}
	if (req.body.newPassword !== req.body.confirmPassword){
		res.end("newPassword and confrim password not the same");
		return;
	}
	if (!validator.isLength(req.body.newPassword,{min : 4, max : 50})){
		res.send("Invalid Password Length! Min: 4 Max: 50");
		return;
	}
	pool.getConnection(function(err, connection) {
		connection.query('SELECT password from user where iduser ='+sess.iduser, function(err, rows, fields) {
				if (passwordHash.verify(req.body.currentPassword, rows[0].password)){
					connection.query('UPDATE user SET password = ? WHERE iduser = ?',
					[passwordHash.generate(req.body.newPassword),sess.iduser], function(err, results) {
						console.log(err);
					  connection.release();
					  res.end("ok");
					});
				}else{
				  connection.release();
				  res.end("fail")
				}
			});
		});	
	});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);