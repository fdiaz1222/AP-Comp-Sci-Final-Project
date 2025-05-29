const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
    [0, 1, 2],//these first three conditions check for three in a row
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],//the next three check for three in a column
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],//these check for three in a diagonal pattern
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked)); // Adds click event listener to all cells, making it interactive..
    restartBtn.addEventListener("click", restartGame); // Adds click event listener to restart button, making it interactive.
    statusText.textContent = `${currentPlayer}'s turn`; // Updates the status text to show the current player's turn
    running = true; // Starts the game
}
function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running){
        return;
    }
// Prevents selection of cell if the cell is already filled or the game isn't running
  
    updateCell(this, cellIndex);
    // changePlayer();
    checkWinner();
}
// Checks if there is a winner after each move

function updateCell(cell, index){
    options[index] = currentPlayer; // Updates the options array with the current player's turn

    cell.textContent = currentPlayer; // Displays the current player's symbol; 'X' or 'O' in the selected cell.
}
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X"; // Switches between 'X' and 'O' turns
    statusText.textContent = `${currentPlayer}'s turn`; // Updates the status text to show each player's turn
}
function checkWinner(){
  let roundWon = false;

  for(let i = 0; i < winConditions.length; i++){
      const condition = winConditions[i];
      const cellA = options[condition[0]];//checks to see if our board matches any of the winning conditions
      const cellB = options[condition[1]];
      const cellC = options[condition[2]];

    if(cellA == "" || cellB == "" || cellC == ""){
      continue; //checks if there are anay empty spaces
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;//checks if all characters in winning indexes are the same character, if true round is won
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `${currentPlayer} wins!`; // Displays winner message. "X wins!/ Y wins!"
        running = false; // Stops the game after there is a winner.
    }
    else if(!options.includes("")){ 
      // Checks if there are no empty spaces left. If there isn't any...
        statusText.textContent = `Draw!`; // The game comes to a DRAW and "Draw" is displayed. 
        running = false; // Ends game if its a draw.
    }
    else{
        changePlayer(); // Switches to the other player if there isn't a winner or draw. 
    }
}
function restartGame(){
    currentPlayer = "X"; // Resets the current player to 'X' as player 'X' will make the first move. 
    options = ["", "", "", "", "", "", "", "", ""]; // Clears the options array. This means that it resets the board. 
    statusText.textContent = `${currentPlayer}'s turn`; // Resets the status text to show 'X' is first. 
    cells.forEach(cell => cell.textContent = ""); // Deletes the text content of each cell. This marks a fresh start. 
    running = true; // resumes the game. Makes it all go again. 
}
