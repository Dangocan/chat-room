import express from 'express';
import socket from 'socket.io';
import http from 'http';

const app = express();
const server = http.createServer(app);
const io = socket(server);

server.listen(8080, () => console.log('Servidor rodando na porta 8080'));

io.on('connection', (socket) => {
    console.log('Server has a new connection');
    socket.on('chat.message', (data) => {
        console.log('chat.message -->', data);
        io.emit('chat.message', data);
    });
    socket.on('disconnect', () => {
        console.log('A connection was disconnected');
    });
});