const Koa = require('koa');
const http = require('http');
const socket = require('socket.io');

const app = new Koa();
const server = http.createServer(app.callback());
const io = socket(server);

const SERVER_HOST = 'localhost';
const SERVER_PORT = 8080;

server.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(`Server is running at http://${SERVER_HOST}:${SERVER_PORT}`);
});

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