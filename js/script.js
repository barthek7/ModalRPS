window.onload = function(){
    addUtilities();
};

const ROCK = 1;
const SCISSORS = 3;
const pS = document.querySelector('.player');
const Cs = document.querySelector('.computer');
const buttonNewGame = document.querySelector('.new-game-button');

var drawNumber = function () {
    return Math.floor(Math.random() * 3 + 1);
};

var params = {
    "roundNumber": 0,
    "playable": false,
    "playerScore": 0,
    "computerScore": 0,
    "numberOfRounds": null,
    "progress": []
};


var playerMove = function (arg) {
    var computerPlay = drawNumber();
    var playerPlay = this.getAttribute('data-move');
    var ob = {
        "roundNumber" : ++params.roundNumber,
        "playerMove" : playerPlay.toLocaleUpperCase(),
        "computerMove": '',
        "RoundScore": '',
        "OverallScore": ''
    };
    if (params.playable) {
        switch (playerPlay) {
            case 'rock':
                if (computerPlay === ROCK) {
                    result("DRAW, you picked " + playerPlay.toUpperCase() + " and computer picked ROCK");
                    ob.computerMove = 'ROCK';
                    ob.RoundScore = 'DRAW';
                    ob.OverallScore = params.playerScore + ' - ' + params.computerScore;
                    params.progress.push(ob);
                } else if (computerPlay === SCISSORS) {
                    result("You WIN, you picked " + playerPlay.toUpperCase() + " and computer picked SCISSORS");
                    params.playerScore++;
                    ob.computerMove = 'SCISSORS';
                    ob.RoundScore = 'PLAYER WIN';
                    ob.OverallScore = params.playerScore + ' - ' + params.computerScore;
                    params.progress.push(ob);
                    setScores(params.playerScore, params.computerScore);
                } else {
                    result("You LOST, you picked " + playerPlay.toUpperCase() + " and computer picked PAPER");
                    params.computerScore++;
                    ob.computerMove = 'PAPER';
                    ob.RoundScore = 'COMPUTER WIN';
                    ob.OverallScore = params.playerScore + ' - ' + params.computerScore;
                    params.progress.push(ob);
                    setScores(params.playerScore, params.computerScore);
                }
                break;
            case 'paper':
                if (computerPlay === ROCK) {
                    result("You WIN, you picked " + playerPlay.toUpperCase() + " and computer picked ROCK");
                    params.playerScore++;
                    ob.computerMove = 'ROCK';
                    ob.RoundScore = 'PLAYER WIN';
                    ob.OverallScore = params.playerScore + ' - ' + params.computerScore;
                    params.progress.push(ob);
                    setScores(params.playerScore, params.computerScore);
                } else if (computerPlay === SCISSORS) {
                    result("You LOST, you picked " + playerPlay.toUpperCase() + " and computer picked SCISSORS");
                    params.computerScore++;
                    ob.computerMove = 'SCISSORS';
                    ob.RoundScore = 'PLAYER LOST';
                    ob.OverallScore = params.playerScore + ' - ' + params.computerScore;
                    params.progress.push(ob);
                    setScores(params.playerScore, params.computerScore);
                } else {
                    result("DRAW, you picked " + playerPlay.toUpperCase() + " and computer picked PAPER");
                    ob.computerMove = 'PAPER';
                    ob.RoundScore = 'DRAW';
                    ob.OverallScore = params.playerScore + ' - ' + params.computerScore;
                    params.progress.push(ob);
                }
                break;
            case 'scissors':
                if (computerPlay === ROCK) {
                    result("You LOST, you picked " + playerPlay.toUpperCase() + " and computer picked ROCK");
                    params.computerScore++;
                    ob.computerMove = 'ROCK';
                    ob.RoundScore = 'PLAYER LOST';
                    ob.OverallScore = params.playerScore + ' - ' + params.computerScore;
                    params.progress.push(ob);
                    setScores(params.playerScore, params.computerScore);
                } else if (computerPlay === SCISSORS) {
                    result("DRAW, you picked " + playerPlay.toUpperCase() + " and computer picked SCISSORS");
                    ob.computerMove = 'SCISSORS';
                    ob.RoundScore = 'DRAW';
                    ob.OverallScore = params.playerScore + ' - ' + params.computerScore;
                    params.progress.push(ob);
                } else {
                    result("You WIN, you picked " + playerPlay.toUpperCase() + " and computer picked PAPER");
                    params.playerScore++;
                    ob.computerMove = 'PAPER';
                    ob.RoundScore = 'PLAYER WIN';
                    ob.OverallScore = params.playerScore + ' - ' + params.computerScore;
                    params.progress.push(ob);
                    setScores(params.playerScore, params.computerScore);
                }
                break;
        }

    }
    endGame();
};

var result = function (gameResult) {
    var output = document.getElementById('output');
    output.innerText = gameResult;
};
var setScores = function (playerScore, computerScore) {
    pS.innerText = playerScore;
    Cs.innerText = computerScore;
};

var setNumberOfRounds = function () {

    params.progress = [];
    params.roundNumber = 0;
    params.playerScore = 0;
    params.computerScore = 0;
    setScores(params.playerScore, params.computerScore);
    var rounds = parseInt(prompt('How many win rounds ends the game?'));
    while (isNaN(rounds)) {
        rounds = prompt('How many win rounds ends the game?(Enter a number, please)');
    }
    params.numberOfRounds = rounds;
    document.getElementById('number-of-rounds').innerText = params.numberOfRounds;
    params.playable = true;
    document.querySelector('#end-game-modal').innerHTML = '<a href="#" class="close">x</a>' +
        '<table id="scoreTable">' +
        '<thead>' +
        '<tr><th>Round Number</th><th>Player Move</th><th>Computer Move</th><th>Round Score</th><th>Overall Score</th></tr>' +
        '</thead>' +
        '<tbody id="tableBody"></tbody>'
        '</table>';
    addUtilities();
};
var playButtons = document.querySelectorAll('.player-move');

for (var i = 0; i < playButtons.length; i++) {
    playButtons[i].addEventListener('click', playerMove);
}
setScores(params.playerScore, params.computerScore);
buttonNewGame.addEventListener('click', setNumberOfRounds);

var endGame = function () {
    if(params.playable) {
        if (params.playerScore === params.numberOfRounds || params.computerScore === params.numberOfRounds) {
            if (params.playerScore === params.numberOfRounds) {
                document.querySelector('#end-game-modal a').insertAdjacentHTML('afterend', '<header>YOU WON THE ENTIRE GAME!</header>');
                var table = document.getElementById('tableBody');
                for(var i in params.progress){
                    var actualRow = table.insertRow(i);
                    for( var key in params.progress[i]){
                        actualRow.insertAdjacentHTML('beforeend', `<td>${params.progress[i][key]}</td>`);
                    }
                }
                document.getElementById('modal-overlay').classList.add('show');
                document.getElementById('end-game-modal').classList.add('show');
                params.playable = false;
            } else {
                document.querySelector('#end-game-modal a').insertAdjacentHTML('afterend', '<header>YOU LOST THE ENTIRE GAME!</header>');
                var table = document.getElementById('tableBody');
                for(var i in params.progress){
                    var actualRow = table.insertRow(i);
                    for(key in params.progress[i]){
                        actualRow.insertAdjacentHTML('beforeend', `<td>${params.progress[i][key]}</td>`);
                    }
                }
                document.getElementById('modal-overlay').classList.add('show');
                document.getElementById('end-game-modal').classList.add('show');
                params.playable = false;
            }
        }
    }
};

var hideModal = function (event) {
    event.preventDefault();
    document.querySelector('#modal-overlay').classList.remove('show');
};

function addUtilities() {
    var closeButtons = document.querySelectorAll('.modal .close');

    for (var i = 0; i < closeButtons.length; i++) {
        closeButtons[i].addEventListener('click', hideModal);
    }

    var overlay = document.getElementById('modal-overlay');
    overlay.addEventListener('click', hideModal);

    var modals = document.querySelectorAll('.modal');

    for (var i = 0; i < modals.length; i++) {
        modals[i].addEventListener('click', function (event) {
            event.stopPropagation();
        });
    }
}

