const express = require('express');
const socketio = require('socket.io'); // uppercase server in docs
const app = express();

app.use(express.static(`${__dirname}/public`));

const express_server = app.listen(9000);

const io = socketio(express_server); // lowercase server in docs

io.on('connection', (socket) => { // socket = indiviual sockets for interacting with browser
    socket.emit('dataFromServer', { data: 'Welcome to the socket.io server'});

    socket.on('dataToServer', (dataFromClient) => {
        console.log(dataFromClient);
    });
    
    
    socket.on('newMessageToServer', (msg) => {
        console.log(msg);
        io.emit('messageToClient', {text: msg.text})
    });

});

io.of('/admin').on('connection', (socket) => {
    console.log('Connected to admin namespace')
    socket.emit('welcome', 'Welcome to the admin')
})