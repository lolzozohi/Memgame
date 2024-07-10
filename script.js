document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const restartButton = document.getElementById('restart-button');
    const tryCountDisplay = document.getElementById('try-count');
    const darkModeSwitch = document.getElementById('dark-mode-switch');
    const winScreen = document.getElementById('win-screen');
    const playAgainButton = document.getElementById('play-again-button');
    const cardSymbols = ['🍎', '🍌', '🍓', '🍉', '🍇', '🍒', '🍍', '🥝'];
    let cards = [];
    let flippedCards = [];
    let matchedCards = [];
    let tryCount = 0;
    const maxTries = 20;

    function createBoard() {
        cards = shuffle([...cardSymbols, ...cardSymbols]);
        gameBoard.innerHTML = '';
        tryCount = 0;
        tryCountDisplay.textContent = `Tries: ${tryCount}`;
        winScreen.classList.add('hidden');
        cards.forEach(symbol => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.symbol = symbol;

            const frontFace = document.createElement('div');
            frontFace.classList.add('front');
            frontFace.textContent = symbol;

            const backFace = document.createElement('div');
            backFace.classList.add('back');

            card.appendChild(frontFace);
            card.appendChild(backFace);

            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
        });
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function flipCard() {
        if (flippedCards.length < 2 && !this.classList.contains('flipped') && tryCount < maxTries) {
            this.classList.add('flipped');
            flippedCards.push(this);

            if (flippedCards.length === 2) {
                tryCount++;
                tryCountDisplay.textContent = `Tries: ${tryCount}`;
                checkMatch();
            }
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;
        if (card1.dataset.symbol === card2.dataset.symbol) {
            matchedCards.push(card1, card2);
            flippedCards = [];
            if (matchedCards.length === cards.length) {
                setTimeout(showWinScreen, 500);
            }
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                flippedCards = [];
            }, 1000);
        }

        if (tryCount >= maxTries && matchedCards.length < cards.length) {
            setTimeout(() => alert('Game over! You have reached the maximum number of tries.'), 500);
        }
    }

    function showWinScreen() {
        winScreen.classList.remove('hidden');
    }

    restartButton.addEventListener('click', createBoard);
    playAgainButton.addEventListener('click', createBoard);
    
    darkModeSwitch.addEventListener('change', (e) => {
        document.body.classList.toggle('dark-mode', e.target.checked);
    });

    createBoard();
});
