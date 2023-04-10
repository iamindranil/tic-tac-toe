const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");


let currentPlayer;
let gameGrid;//checking the status of the game

const winningPositions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


// create a function to initialize the game

function initGame(){
    currentPlayer='X';
    gameGrid=["","","","","","","","",""];
    boxes.forEach((box,index)=>{
        box.innerText=""
        boxes[index].style.pointerEvents='all'
        //initialize all css property again(green remove)
        box.classList=`box box${index+1}`;
    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText=`current player-${currentPlayer}`;

}
initGame();

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
});

function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents='none'
        //swap turn
        swapTurn();
        //check winning status 
        checkGameOver();
    }
}

function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer="O"
    }else{
        currentPlayer='X'
    }
    gameInfo.innerText=`current player-${currentPlayer}`;
}

function checkGameOver(){
    let answer="";
    winningPositions.forEach((position)=>{
        if((gameGrid[position[0]]!="" && gameGrid[position[1]]!="" && gameGrid[position[2]]!="")
         && (gameGrid[position[0]]===gameGrid[position[1]]) && (gameGrid[position[1]]===gameGrid[position[2]])
        ){
            if(gameGrid[position[0]]==='X'){
                answer="X"
            }else{
                answer="O"
            }

            // disable pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            //make ui green for winning box
            for(let i=0;i<3;i++){
                boxes[position[i]].classList.add("win");
            }
            
        }
    })

    //if winner is found
    if(answer !== "" ) {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
    }

    //We know, NO Winner Found, let's check whether there is tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "" )
            fillCount++;
    });

    //board is Filled, game is TIE
    if(fillCount === 9) {
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }

}

newGameBtn.addEventListener("click",initGame);
