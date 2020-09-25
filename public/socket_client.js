
const socket = io('http://localhost:9000');
const socket2 = io('http://localhost:9000/admin');

socket.on('dataFromServer', (dataFromServer) => {
    console.log(dataFromServer)
    socket.emit('dataToServer', {data: 'Data from client'});
});

socket2.on('welcome', (dataFromServer) => {
    console.log(dataFromServer);
});
    
document.querySelector('#message-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const new_message = document.querySelector('#user-message').value;
    socket.emit('newMessageToServer', {text: new_message});
    console.log('[newMessageToServer] ',new_message);
});

socket.on('messageToClient', (message) => {
    console.log('[messageToClient] ',message)
    document.querySelector('#messages').innerHTML += `<li>${message.text}<li>` ;
})
