const socket = io(); // Conexão com o servidor
const iframe = document.getElementById('gameIframe');

// Emitir evento de registro do display
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');
socket.emit('register', { id: userId, type: 'display' });

// Receber comandos de controle e repassá-los para o iframe do jogo
socket.on('buttonPressed', () => {
    // Cria um evento de teclado usando os dados da tecla pressionada
    var keyEvent = new KeyboardEvent('keydown', {
        key: ' ',
        code: 'Space',
        keyCode: 32,
        which: 32,
        bubbles: true,  // para garantir que o evento seja propagado
    });

    // Criar e despachar um evento de teclado para o iframe
    iframe.contentWindow.document.dispatchEvent(keyEvent);
    console.log('Botão clicado!'); 
});
