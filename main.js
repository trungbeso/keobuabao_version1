let score = JSON.parse(localStorage.getItem('score')) || {
    win: 0,
    losses: 0,
    ties: 0
};

updateScoreElement();

document.querySelector('.js-rock-button').addEventListener('click', () => {
    playGame('rock');
});
document.querySelector('.js-paper-button').addEventListener('click', () => {
    playGame('paper');
});
document.querySelector('.js-scissors-button').addEventListener('click', () => {
    playGame('scissors');
});

document.querySelector('.js-auto-play-btn').addEventListener('click', () => {
    autoPlay();
});
document.querySelector('.js-reset-score-btn').addEventListener('click', () => {
    score.win = 0;
    score.lossed = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
});
//================
document.body.addEventListener('keydown', (event) => {

    if (event.key === 'a') {
        playGame('rock');
    } else if (event.key === 's') {
        playGame('paper');
    } else if (event.key === 'd') {
        playGame('scissors');
    } else if (event.key === 'q') {
        autoPlay();
    } else if (event.key === 'Backspace') {
        score.win = 0;
        score.lossed = 0;
        score.ties = 0;
        localStorage.removeItem('score');
        updateScoreElement();
    }
})

//================
function playGame(playerMove) {

    const computerMove = pickComputerMove();

    let result = '';


    if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'Thắng';
        } else if (computerMove === 'paper') {
            result = 'Thua';
        } else if (computerMove === 'scissors') {
            result = 'Hòa';
        }

    } else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'Thắng';
        } else if (computerMove === 'paper') {
            result = 'Hòa';
        } else if (computerMove === 'scissors') {
            result = 'Thua';
        }

    } else if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'Hòa';
        } else if (computerMove === 'paper') {
            result = 'Thua';
        } else if (computerMove === 'scissors') {
            result = 'Thắng';
        }
    }

    if (result === 'Thắng') {
        score.win++;
    } else if (result === 'Thua') {
        score.lossed++;
    } else if (result === 'Hòa') {
        score.ties++;
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();

    document.querySelector('.js-result').innerHTML = result;

    document.querySelector('.js-move').innerHTML = `Bạn Chọn
<img src="./img/${playerMove}-emoji.png" alt="" class="move-icon">
<img src="./img/${computerMove}-emoji.png" alt="" class="move-icon">
Máy Chọn`;

}

function updateScoreElement() {
    document.querySelector('.js-score')
        .innerHTML = `Thắng: ${score.win} , Thua: ${score.lossed} , Hòa: ${score.ties} `;
}


//---------------xuc xac function----------------------

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function pickComputerMove() {
    const randomNumber = getRandomInt(3);

    let computerMove = '';

    if (randomNumber === 0) {
        computerMove = 'rock';
    } else if (randomNumber === 1) {
        computerMove = 'paper';
    } else if (randomNumber === 2) {
        computerMove = 'scissors';
    }

    return computerMove;
}

let isAutoPlaying = false;
//Interval return an ID for each run, save it in a variable
let intervalID;

function autoPlay() {

    if (!isAutoPlaying) {
        intervalID = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);
        isAutoPlaying = true;
        document.querySelector('.js-auto-play-btn').innerHTML = 'Dừng Tự Động Chơi';
    } else {
        clearInterval(intervalID);
        isAutoPlaying = false;
        document.querySelector('.js-auto-play-btn').innerHTML = 'Tự Động Chơi';
    }

}