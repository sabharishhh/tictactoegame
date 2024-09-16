let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#reset-btn");
let newGameButton = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let win = document.querySelector(".win");
let draw = document.querySelector(".draw");

let count = 0;

let turnX = true; //playerX, playerY

let winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnX = true;
    enableBoxes();

}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box clicked");

        if (!box.classList.contains("disabled")) {
            if (turnX === true) {
                box.innerText = "X";
                turnX = false;
            } else {
                box.innerText = "O";
                turnX = true;
            }

            box.classList.add("disabled");
            count++;
            
            checkWinner();
        }
    });
});


const disableBoxes = () => {
    boxes.forEach((box) => {
        box.classList.add("disabled");
    });
}

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.classList.remove("disabled");
        box.innerText = " ";
    });
    
    msgContainer.classList.add("hide");
}

const showWinner = (winner) => {
    console.log("winner: " + winner);
    msg.innerText = "Congratulations, \nWinner is " + winner;
    disableBoxes();

    msgContainer.classList.remove("hide");
    win.classList.remove("hide");
    draw.classList.add("hide");
}

const checkWinner = () => {
    let winnerFound = false;
    for (let pattern of winPatterns) {
    /*  console.log(pattern[0], pattern[1], pattern[2]);
        console.log(
            boxes[pattern[0]].innerText, 
            boxes[pattern[1]].innerText, 
            boxes[pattern[2]].innerText
        );  */

        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 === pos2 && pos2 === pos3) {
                console.log("Winner");
                showWinner(pos1);
                winnerFound = true;
                count = 0;
                return;
            }
        }
    }

    if (count === 9 && !winnerFound) {
        drawGame();
        count = 0;
    }
}

const drawGame = () => {
    console.log("It's a draw");
    msg.innerText = "It's a draw";
    disableBoxes();

    msgContainer.classList.remove("hide");
    draw.classList.remove("hide");
    win.classList.add("hide");
}

newGameButton.addEventListener("click", resetGame);
resetButton.addEventListener("click", resetGame);