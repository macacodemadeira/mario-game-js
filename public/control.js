const socket = io(); // Conexão com o servidor
const jump_button = document.getElementById('jump_button'); // Jump Button
// Extraindo parâmetros da URL
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');
const displayId = urlParams.get('displayId');

// Emitir evento de registro do controlador
socket.emit('register', { id: userId, type: 'control' });

// Capturar o evento de quando o botao é clicado
jump_button.addEventListener('click', function() {
    socket.emit('buttonPressed', { id: displayId });
    console.log('Botão clicado!'); 
});
