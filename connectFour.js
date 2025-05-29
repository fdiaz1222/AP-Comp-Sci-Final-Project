const cells = document.querySelectorAll(".cell");
      const statusText = document.querySelector("#statusText");
      const restartBtn = document.querySelector("#restartBtn");
 const homeBtn = document.getElementById("homeBtn");
homeBtn.addEventListener("click",function(){
      window.location.href = "index.html";
});
      const winConditions = [ <!--this function will be called to see if the following are true for a player to win-->
        <!--Below are the possible horizontal wins-->
        [0,1,2,3],
        [1,2,3,4],
        [2,3,4,5],
        [3,4,5,6],
        
        [7,8,9,10],
        [8,9,10,11],
        [9,10,11,12],
        [10,11,12,13],
        
        [14,15,16,17],
        [15,16,17,18],
        [16,17,18,19],
        [17,18,19,20],
        
        [21,22,23,24],
        [22,23,24,25],
        [23,24,25,26],
        [24,25,26,27],
        
        [28,29,30,31],
        [29,30,31,32],
        [30,31,32,33],
        [31,32,33,34],
        
        [35,36,37,38],
        [36,37,38,39],
        [37,38,39,40],
        [38,39,40,41],

        <!--Below are the possible vertical wins-->
        [0,7,14,21],
        [7,14,21,28],
        [14,21,28,35],
        
        [1,8,15,22],
        [8,15,22,29],
        [15,22,29,36],
        
        [2,9,16,23],
        [9,16,23,30],
        [16,23,30,37],
        
        [3,10,17,24],
        [10,17,24,31],
        [17,24,31,38],
        
        [4,11,18,25],
        [11,18,25,32],
        [18,25,32,39],
        
        [5,12,19,26],
        [12,19,26,33],
        [19,26,33,40],
        
        [6,13,20,27],
        [13,20,27,34],
        [20,27,34,41],
        <!--Below are the possible left->right diagonal wins-->
        [0,8,16,24],
        [1,9,17,25],
        [2,10,18,26],
        [3,11,19,27],
        
        [7,15,23,31],
        [8,16,24,32],
        [9,17,25,33],
        [10,18,26,34],
        
        [14,22,30,38],
        [15,23,31,39],
        [16,24,32,40],
        [17,25,33,41],
        <!--Below are the possible right->left diagonal wins-->
        [3,9,15,21],
        [4,10,16,22],
        [5,11,17,23],
        [6,12,18,24],
        
        [31,25,19,13],
        [30,24,18,12],
        [29,23,17,11],
        [28,22,16,10],
        
        [38,32,26,20],
        [37,31,25,19],
        [36,30,24,18],
        [35,29,23,17],
      ];
      let options = ["", "", "", "", "", "","", "", "", "", "", "", "","", "", "", "", "", "", "","", "", "", "", "", "", "","", "", "", "", "", "", "","", "", "", "", "", "", "","", "", "", "", "", "", "","", "", "", "", "", "", "",""];       <!--this sets the game to start with blank cells-->


      
      let currentPlayer = "🔴";  <!--red player starts first-->
      let running = false;
      initializeGame();

      function initializeGame(){
          cells.forEach(cell => cell.addEventListener("click", cellClicked));  <!--when a cells is clicked, it'll change to the pressed version using the cellClicked function-->
          restartBtn.addEventListener("click", restartGame);<!--if the reset button is hit then the game resets-->
          statusText.textContent = `${currentPlayer}'s turn`;  //This updates the game and makes sure its the next person turn with whatever color is next -red or yellow-
          running = true; 
      }     <!--this function initializes the game, and notices when a cell is clicked-->

      function cellClicked(){
          const cellIndex = this.getAttribute("cellIndex"); <!--takes the value of(what is within) the pressed cell-->

          if(options[cellIndex] != "" || !running){ 
              return; 
          }
          updateCell(this, cellIndex);
          checkWinner();
      }
<!--this function checks for any updates to the game, could be a winner-->
      function updateCell(cell, index){
          options[index] = currentPlayer; 

          cell.textContent = currentPlayer; 
      }
      function changePlayer(){
          currentPlayer = (currentPlayer == "🔴") ? "🟡" : "🔴"; 
          statusText.textContent = `${currentPlayer}'s turn`; 
      }   <!--this allows for the next players turn to appear with a different color emoji-->
      function checkWinner(){
        let roundWon = false;<!--roundWon is automatically set to false(because no one wins immediately-->
        for(let i = 0; i < winConditions.length; i++){ <!--iterates through i for the length of the winConditions array-->
            const condition = winConditions[i]; <!--the "condition" will be set to the winConditions array at index i-->
            const cellA = options[condition[0]]; <!--cell A becomes a value from the options array. The index of this value in the options array is: the first value of the array of the given winCondition at index i(from above)-->
            const cellB = options[condition[1]]; <!--cell B becomes a value from the options array. The index of this value in the options array is: the second value of the array of the given winCondition at index i(from above)... and so on and so forth-->
            const cellC = options[condition[2]];
            const cellD = options[condition[3]];
          
          if(cellA == "" || cellB == "" || cellC == "" || cellD == ""){ <!--if any of cells A, B, C, or D are empty, there cannot be 4 in a row, so the game continues-->
            continue; 
              }
              if(cellA == cellB && cellB == cellC && cellA == cellD){ <!--if the values in all of the cells are the same(they all have the token of one of the players), they won the game and roundWon becomes true-->
                  roundWon = true;
                  break;
              }
          }

          if(roundWon){
              statusText.textContent =  `${currentPlayer} wins! 🏆 `; 
              running = false; 
          }
          else if(!options.includes("")){ 
              statusText.textContent = `Draw!`;
              running = false; 
          }
          else{
              changePlayer(); 
          }     <!--this checks for any winner, and or draws and if not then it will just be the next persons turn-->
      }
      function restartGame(){
          currentPlayer = "🔴";  
          options = ["", "", "", "", "", "","", "", "", "", "", "", "","", "", "", "", "", "", "","", "", "", "", "", "", "","", "", "", "", "", "", "","", "", "", "", "", "", "","", "", "", "", "", "", "","", "", "", "", "", "", "",""];
          statusText.textContent = `${currentPlayer}'s turn`; 
          cells.forEach(cell => cell.textContent = ""); 
          running = true; 
      
      }       <!--this resets the the game and allows for red to always start first, it also lets all the cells to reset and turn into empty spaces again-->
