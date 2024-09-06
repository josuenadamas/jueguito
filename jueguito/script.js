document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('start-screen');
    const gameScreen = document.getElementById('game-screen');
    const endScreen = document.getElementById('end-screen');
    const startButton = document.getElementById('start-button');
    const virusArea = document.getElementById('virus-area');
    const progressBar = document.getElementById('progress-bar');
    const restartButton = document.getElementById('restart-button');

    let score = 0;
    const maxScore = 20;
    let virusInterval;

    function startGame() {
        startScreen.style.opacity = 0;
        setTimeout(() => {
            startScreen.style.display = 'none';
            gameScreen.style.display = 'flex';
            setTimeout(() => {
                gameScreen.style.opacity = 1;
                score = 0;
                progressBar.style.width = '0%';
                spawnVirus();
                virusInterval = setInterval(spawnVirus, 1000); // Aparecer un virus cada segundo
            }, 10);
        }, 1000);
    }

    function endGame() {
        clearInterval(virusInterval); // Detener la aparición de virus
        gameScreen.style.opacity = 0;
        setTimeout(() => {
            gameScreen.style.display = 'none';
            endScreen.style.display = 'flex';
            setTimeout(() => {
                endScreen.style.opacity = 1;
            }, 10);
        }, 1000);
    }

    function restartGame() {
        endScreen.style.opacity = 0;
        setTimeout(() => {
            endScreen.style.display = 'none';
            startScreen.style.display = 'flex';
            startScreen.style.opacity = 1;
        }, 1000);
    }

    function spawnVirus() {
        const virusButton = document.createElement('button');
        virusButton.classList.add('virus-btn');

        const x = Math.random() * (virusArea.offsetWidth - 50);
        const y = Math.random() * (virusArea.offsetHeight - 50);

        virusButton.style.left = `${x}px`;
        virusButton.style.top = `${y}px`;

        virusButton.addEventListener('click', () => {
            score++;
            updateScore();
            virusButton.remove();
        });

        virusArea.appendChild(virusButton);
    }

    function updateScore() {
        const progress = (score / maxScore) * 100;
        progressBar.style.width = `${progress}%`;
        if (score >= maxScore) {
            endGame();
        }
    }

    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', restartGame);
});
