document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const gameContainer = document.querySelector('.game-container');
    const restartButton = document.getElementById('restart-button');
    const tryCountDisplay = document.getElementById('try-count');
    const darkModeSwitch = document.getElementById('dark-mode-switch');
    const winScreen = document.getElementById('win-screen');
    const playAgainButton = document.getElementById('play-again-button');
    const volumeControl = document.getElementById('volume-control');
    const backgroundMusic = document.getElementById('background-music');
    const musicSelector = document.getElementById('music-selector');
    const levelSelector = document.getElementById('level-selector');
    const symbolSelector = document.getElementById('symbol-selector');
    
    const foodSymbols = ['🍎', '🍌', '🍓', '🍉', '🍇', '🍒', '🍍', '🥝', '🍋', '🍑', '🍈', '🍏', '🍐', '🍊', '🥥','🫐','🧄','🧅'];
    const peopleSymbols = ['😀', '😂', '😅', '😍', '😎', '😭', '😡', '😱', '😜', '🤔', '🙄', '😴', '🤤', '😷', '🤢','😈','🤬','🤯'];
    const flagSymbols = ['🏴‍☠️', '🇧🇩', '🇦🇷', '🇮🇳', '🇯🇵', '🇲🇽', '🇺🇸', '🇰🇷', '🇯🇲', '🇭🇷', '🇩🇪', '🇺🇾', '🇪🇺', '🇨🇳', '🇧🇪','🇨🇦','🇦🇺','🇦🇫'];
    const sportSymbols = ['⚽️', '🏀', '🏈', '⚾️', '🎾', '🏐', '🥋', '🏏', '🥊', '🎳', '🏹', '🥏', '🎱', '🏸', '🛷','🏒','🚴‍♂️','🤺'];
    const vehicleSymbols = ['🚎', '🚋', '🚙', '🚕', '🚗', '🏎️', '🚑', '🚓', '🚒', '🚜', '🛵', '🏍️', '🛺', '✈️', '🚢','🚁','🚀','🚤'];
    
    
    let cards = [];
    let flippedCards = [];
    let matchedCards = [];
    let tryCount = 0;
    let maxTries = 20;

    function setMaxTries(level) {
        if (level === 2) {
            maxTries = 4;
        } else if (level === 4) {
            maxTries = 20;
        } else if (level === 6) {
            maxTries = 35;
        }
    }

    function createBoard(size) {
        setMaxTries(size);
        adjustContainerMargin(size);
        const symbols = getSelectedSymbols().slice(0, (size * size) / 2);
        cards = shuffle([...symbols, ...symbols]);
        gameBoard.style.gridTemplateColumns = `repeat(${size}, 100px)`;
        gameBoard.style.gridTemplateRows = `repeat(${size}, 100px)`;
        gameBoard.innerHTML = '';
        tryCount = 0;
        tryCountDisplay.textContent = `Tries: ${tryCount}`;
        winScreen.classList.add('hidden');
        matchedCards = [];
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

    function getSelectedSymbols() {
        if (symbolSelector.value === 'people') {
            return peopleSymbols;
        }
        else if (symbolSelector.value === 'flags') {
            return flagSymbols;
        }
        else if (symbolSelector.value === 'sports') {
            return sportSymbols;
        }
        else if (symbolSelector.value === 'vehicles') {
            return vehicleSymbols;
        }
        return foodSymbols;
    }

    function adjustContainerMargin(size) {
        gameContainer.classList.remove('small', 'medium', 'large');
        if (size === 2) {
            gameContainer.classList.add('small');
        } else if (size === 4) {
            gameContainer.classList.add('medium');
        } else if (size === 6) {
            gameContainer.classList.add('large');
        }
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

    restartButton.addEventListener('click', () => createBoard(parseInt(levelSelector.value)));
    playAgainButton.addEventListener('click', () => createBoard(parseInt(levelSelector.value)));

    darkModeSwitch.addEventListener('change', (e) => {
        document.body.classList.toggle('dark-mode', e.target.checked);
    });

    volumeControl.addEventListener('input', (e) => {
        backgroundMusic.volume = e.target.value;
    });

    musicSelector.addEventListener('change', (e) => {
        backgroundMusic.src = e.target.value;
        backgroundMusic.play();
    });

    levelSelector.addEventListener('change', () => createBoard(parseInt(levelSelector.value)));
    symbolSelector.addEventListener('change', () => createBoard(parseInt(levelSelector.value)));

    backgroundMusic.volume = volumeControl.value;
    backgroundMusic.play();

    createBoard(parseInt(levelSelector.value));
});

