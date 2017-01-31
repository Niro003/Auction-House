/**
 * Created by grill on 31.01.2017.
 */
var io = require('socket.io')(http);
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