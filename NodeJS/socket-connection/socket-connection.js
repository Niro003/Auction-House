/**
 * Created by grill on 31.01.2017.
 */
var fs = require('fs');
var serverPort = 3002;
var options = {
    key: fs.readFileSync('./file.pem'),
    cert: fs.readFileSync('./file.crt')
};
var server = https.createServer(options, app);
var io = require('socket.io')(server);
function sendToLobbyClient(name,message){
    console.log('user connected to lobby '+name);
    io.emit(name, message);
}
io.on('connection', (socket) => {
    console.log('user connected');

pool.getConnection(function(err, connection) {
    connection.query('SELECT idlobby,name from lobby ' , function(err, rows, fields) {
        connection.release();
        for (var i = 0; i < rows.length; i++) {
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



server.listen(serverPort, function(){
    console.log('listening on *:' + serverPort);
});