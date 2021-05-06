//Variables for sections on the page
const game = document.querySelector("#game");
const winOrLose = document.querySelector("#winOrLose");

//Variables to show or not show part of the code
const winnerOrLoser = document.querySelector(".winnerOrLoser");
const matchResult = document.querySelector(".matchResult");

//Buttons
const restart = document.querySelector("#restart");

//score
const scoreContainer = document.querySelector("#score");
const scoreDisplayed = document.querySelector(".actual-score");

//Circles inside game section
const gameCircles = document.querySelectorAll("#game .circle");

//Circle picked by player inside winOrLose
const playerPicked = document.querySelector(".picked-container figure");
const playerPickedImg = document.querySelector(".picked-container figure img");

//Circle picked by opponent
const opponentPicked = document.querySelector(".house-picked-container figure");
const opponentPickedImg = document.querySelector(".house-picked-container figure img");


//variables for the game
const choices = ["paper", "scissors", "rock"];
let picked = "";
let score = 0;

const rulesButton = document.querySelector("#rules-btn");
const rulesOverview = document.querySelector("#rules-overview");
const exitFromRules = document.querySelector(".exitFromRules");

//Wait status
const waitStatusWrapper = document.querySelector('.wait-status-wrapper');
const waitStatusText = document.querySelector('.wait-status-text');

rulesButton.addEventListener("click", function (e) {
    e.stopPropagation()
    rulesOverview.style.display = "flex";
    rulesOverview.style.background = "rgba(0,0,0, 0.50)"
    exitFromRules.addEventListener("click", function () {
        e.stopPropagation()
        rulesOverview.style.display = "none";
    })
})

/**
 * Add restart event to restart button
 */
restart.addEventListener("click", function () {
    restartGame();
});

/**
 * This helper function will display the result for both user
 * @param result the result to be displayed
 */
function displayResult(result) {
    if (result === 1) {
        playerPicked.classList.add("winner");
        result = "You Win"
    } else if (result === -1) {
        opponentPicked.classList.add("winner");
        result = "You Lose"
    } else {
        result = "Fair"
    }

    getResult(result)
}

//store and modify depending on the picked one
function choiceModifier(subject, subjectImg, chose) {
    //This sill set up the class of the subject to 0 and add circle and the value picked
    subject.classList = "";
    subject.classList.add("circle");
    subject.classList.add(chose);

    //This will set the image
    subjectImg.src = "images/icon-" + chose + ".svg";
    waitStatusText.innerHTML = ``

}

//This change only the display from the first choice page to the win or lose one
function callNewPage(currentPage, NextPage) {
    currentPage.style.display = "none";
    NextPage.style.display = "grid";
}


//Change the text of the result and give display
function getResult(result) {
    matchResult.textContent = result;
    winnerOrLoser.style.display = "grid";
    if (result === "You Win") {
        score += 1;
        scoreDisplayed.textContent = score;
    } else if (result === "You Lose") {
        //score -= 1;
        if (score < 0) {
            score = 0;
        }
        scoreDisplayed.textContent = score;
    }
}

//Restart the game
function restartGame() {
    picked = "";
    winOrLose.style.display = "none";
    //scoreDisplayed.textContent = "";
    opponentPickedImg.src = "";
    game.style.display = "flex";
    matchResult.textContent = "";
    socket.emit('restart')
}

//This is the full game
for (let i = 0; i < gameCircles.length; i++) {
    gameCircles[i].addEventListener("click", function () {
        for (let i = 0; i < this.classList.length; i++) {
            switch (this.classList[i]) {
                case choices[0]:
                    picked = choices[0];
                    break;
                case choices[1]:
                    picked = choices[1];
                    break;
                case choices[2]:
                    picked = choices[2];
                    break;
                default:
                    break;
            }
        }
        socket.emit('player-pick', {
            picked
        })
        choiceModifier(playerPicked, playerPickedImg, picked);
        callNewPage(game, winOrLose);
    })
}

function showGame() {
    game.classList.remove("none")
    scoreContainer.classList.remove("none")
    rulesButton.classList.remove("none")
    waitStatusWrapper.classList.remove("out-of-bound")
}


function hideGame() {
    game.classList.add("none")
    scoreContainer.classList.add("none")
    rulesButton.classList.add("none")
    waitStatusWrapper.classList.add("out-of-bound")
}
