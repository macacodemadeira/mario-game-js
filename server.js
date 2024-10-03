const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path'); // Importa o módulo 'path' para lidar com caminhos

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const connections = {};  // Para armazenar pares de controle/display por ID

// Middleware para servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    socket.on('register', ({ id, type }) => {
        // Registra o dispositivo como display ou controle
        connections[id] = connections[id] || {};
        connections[id][type] = socket.id;

        if (connections[id].control && connections[id].display) {
            console.log(`Conexão estabelecida entre ${connections[id].control} e ${connections[id].display}`);
        }
    });

    socket.on('moveCursor', ({ id, x, y }) => {
        if (connections[id] && connections[id].display) {
            io.to(connections[id].display).emit('updateCursor', { x, y });
        }
    });

    socket.on('textUpdate', ({ id, text }) => {
        if (connections[id] && connections[id].display) {
            io.to(connections[id].display).emit('textUpdate', { text });
        }
    });

    socket.on('buttonPressed', ({ id }) => {
        if (connections[id] && connections[id].display) {
            io.to(connections[id].display).emit('buttonPressed');
        }
    });
});

// Inicia o servidor na porta 4444
server.listen(4444, () => {
    console.log('Servidor rodando na porta 4444');
});
