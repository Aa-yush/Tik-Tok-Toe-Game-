// Basic Script 

var origBoard;      
const huPlayer = '0';       // Human Player sign as '0'
const aiPlayer = 'X';       // Artificial Intelligence sign as 'X'
const winCombos = [         // These are the  winning Combos where we determine the winning senerio
    [0 ,1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
]

const cells = document.querySelectorAll('.cell');  //select all the class which has class as cell
startGame();  //call startGame method

function startGame(){
    document.getElementById('endgame').style.display = "none"; // When user press restart button than set the result div property as null
    origBoard = Array.from(Array(9).keys()); // initialize the origBoard array containing 0-9 values
    for(var i = 0; i < cells.length ; i++){
        cells[i].innerText = '';                            //When we press retart button make all the cells text as null
        cells[i].style.removeProperty('background-color');  //remove background color whcih we  color when anyone wining that game
        cells[i].addEventListener('click',turnClick,false);  // When gamer click on any cell call turnClick method
        }
    }
    function turnClick(square){       
        if(typeof origBoard[square.target.id] == 'number')            // Check is it 0 or X because 0 is number        
        turn(square.target.id,huPlayer);                               // If 0 , Call the turn function with the info where the gamer had clicked and sign of human
        if(!checkTie()) turn(bestSpot(),aiPlayer);                   // If X , Check for Tie if not call turn function with  bestSpot call method and 'X' value
    }

    function turn(squareId,player){         
        origBoard[squareId] = player;                       // set and store where the gamer had clicked
        document.getElementById(squareId).innerText = player;   // Show the 0 sign on board
        let gameWon = checkWin(origBoard,player);              // At every time we check if the gamer wins or not , So call the checkWin method
        if(gameWon)                                     
            gameOver(gameWon);
    }

    function checkWin(board, player) {                      
        let plays = board.reduce((a, e, i) => 
            (e === player) ? a.concat(i) : a, []);                  // Find the index of player had played 
        let gameWon = null;                                         // set gameWon as null
        for (let [index, win] of winCombos.entries()) {             
            if (win.every(elem => plays.indexOf(elem) > -1)) {     // Check for every Win combos - > Here win is like a loop for every winCombos
                gameWon = {index: index, player: player};           // means player won -> and send info by which index user had won
                break;      
            }
        }
        return gameWon;                             // If nobody wins return null and game continue
    }
    
    function gameOver(gameWon) {
        for (let index of winCombos[gameWon.index]) {              // loop for every wining combos cell
            document.getElementById(index).style.backgroundColor =
                gameWon.player == huPlayer ? "lightblue" : "lightcoral";            //set the color for user winning combos cell
        }
        for (var i = 0; i < cells.length; i++) {
            cells[i].removeEventListener('click', turnClick, false);     // Now user cant click anywhere  
        }
        declareWinner(gameWon.player == huPlayer ? "You Win !":"You Lose!");
    }
    
    function declareWinner(who) {
        document.getElementById("endgame").style.display = "block";
        document.getElementById("text").innerText = who;
    }
    
    function emptySquares() {
        return origBoard.filter(s => typeof s == 'number');         //find the empty fields in board and return it
    }
    
    function bestSpot() {
        return emptySquares()[0];               
    }
    
    function checkTie() {
        if (emptySquares().length == 0) {
            for (var i = 0; i < cells.length; i++) {
                cells[i].style.backgroundColor = "green";
                cells[i].removeEventListener('click', turnClick, false);
            }
            declareWinner("Tie Game!")
            return true;
        }
        return false;
    }