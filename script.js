document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const restartButton = document.getElementById('restart-button');
    const cardSymbols = ['🍎', '🍌', '🍓', '🍉', '🍇', '🍒', '🍍', '🥝'];
    let cards = [];
    let flippedCards = [];
    let matchedCards = [];

    function createBoard() {
        cards = shuffle([...cardSymbols, ...cardSymbols]);
        gameBoard.innerHTML = '';
        cards.forEach(symbol => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.symbol = symbol;
            card.innerHTML = symbol;
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
        if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
            this.classList.add('flipped');
            flippedCards.push(this);

            if (flippedCards.length === 2) {
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
                setTimeout(() => alert('Congratulations! You won!'), 500);
            }
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                flippedCards = [];
            }, 1000);
        }
    }

    restartButton.addEventListener('click', createBoard);

    createBoard();
});

