// ---------------- Var(s) ----------------
 
// Global var(s) de comandos do jogo
const restartButton = document.querySelector('.restartButton')
const divGameInfo = document.querySelector('.divGameInfo')
const gameImg = document.querySelector('.gameImg')

// Global var(s) de animações
const clouds = document.querySelector('.clouds')
const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')

// Global var(s) da pontuação
const score = document.querySelector('.score')
var scoreValue = 0

// ---------------- Function(s) ----------------

// Function para por o Mário à pular
function jump() {
    mario.classList.add('jump')

    setTimeout(() => {
        mario.classList.remove('jump')
    }, 500)
}

// Function para parar com as animações
function gameOver(pipePosition, cloudsPosition, marioPosition) {
    pipe.classList.remove('pipeAnimation')
    pipe.style.left = `${pipePosition}px`

    clouds.classList.remove('cloudsAnimation')
    clouds.style.left = `${cloudsPosition}px`

    mario.classList.remove('marioAnimation')
    mario.style.bottom = `${marioPosition}px`

    mario.classList.add('OverMario')
    mario.src = './images/game-over.png'

    gameStatus()
    clearInterval(loopGame)
    clearInterval(loopScore)

    document.addEventListener('click', restartGame)
    document.addEventListener('keydown', restartGame)
    restartButton.addEventListener('click', restartGame)
}

// Function para mandar o Game Over na tela
function gameStatus() {
    gameImg.src = "./images/logoGameOver.png"
    restartButton.textContent = 'Recomeçar!'
}

// Function para recarregar a página
function restartGame() {
    location.reload()    
}

// ---------------- Loop(s) ----------------

// Loop principal do Jogo
const loopGame = setInterval(() => {
    const pipePosition = pipe.offsetLeft
    const cloudsPosition = clouds.offsetLeft
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '')

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        gameOver(pipePosition, cloudsPosition, marioPosition)
    }
}, 10)

// Loop dos pontos
const loopScore = setInterval(() => {
    scoreValue += 1
    score.textContent = scoreValue
}, 500)

// ---------------- Event(s) ----------------

// Event(s) do click e tecla pressionada
document.addEventListener('click', jump)
document.addEventListener('keydown', jump)
