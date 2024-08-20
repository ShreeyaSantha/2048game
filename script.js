//formatting the 2042 grid box 
//formatting the 2042 grid box 
let gridContainer = document.querySelector(".grid");
gridContainer.style.gridTemplateColumns = "repeat(4, 1fr)"


var board = [[0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]]

var globalscore = 0

var game = false


function updatescore(){
   let sum = 0
   for(let i = 0; i < 4; ++i){
       for(let j = 0; j < 4; ++j) {
           sum += board[i][j]
       }
   }
   document.querySelector(".score").innerHTML = `Score ${sum}`
   if (globalscore < sum) {
       document.querySelector(".record").innerHTML = `Best Score ${sum}`
       globalscore = sum
   } 

} 

function updatetile(index1,index2,num) {
   //console.log(`.p${index1}-${index2}`);
   let tile = document.querySelector(`.p${index1}-${index2}`)
   let last = tile.classList[2]
   tile.classList.replace(last,`v${num}`)
   
   tile.innerHTML = (num != 0) ? num: "" 
   board[index1][index2] = num
} 


async function addtile() {
   //find all empty spots in the grid 
   let empty = []
   for(let i = 0; i < 4; ++i){
       for(let j = 0; j < 4; ++j) {
           if (board[i][j] == 0){
               empty.push([i,j])
           }
       }
   }
   if (empty.length == 0) {
      console.log(empty.length)
   }
   //find random index 
   let index = empty[Math.floor(Math.random() * empty.length)]
   let num = (Math.random() >= 0.8) ? 2 : 4
   await updatetile(index[0],index[1],num)
   await updatescore()

   await new Promise(resolve => setTimeout(resolve, 0)); // This introduces a brief pause, ensuring the DOM update is completed.
}

const restart = ()=>{
    //find all elemnts that do not equal zero
    //changes class to v0
    for(let i = 0; i < 4; ++i){
        for(let j = 0; j < 4; ++j) {
            if (board[i][j] != 0){
                console.log(i,j)
                updatetile(i,j,0)
            }
        }
    }

    document.querySelector(".score").innerHTML ="SCORE 0"
}

function merge(arr) {
    //remove all 0
    let newarr = arr.filter((value) => value != 0);
    console.log(newarr)
    for(let i = 0; i < newarr.length - 1; ++i){
        if(newarr[i] == newarr[i + 1]){
            newarr[i] += newarr[i + 1]
            newarr[i + 1] = 0 
        }
    }
    console.log(newarr)
    
    //remove all 0 after merging again 
    return newarr.filter((value) => value != 0);


}


function moveleft() {
    for(let i = 0; i < 4; ++i){
        let mergedarr = merge(board[i])
        while (mergedarr.length < 4){
            mergedarr.push(0)
        }
        board[i] = mergedarr

        //update all tiles: 
        for(let j = 0; j < 4; ++j){
            updatetile(i,j,board[i][j])
        }

    }
    console.log(board)
}

function moveright() {
    for(let i = 0; i < 4; ++i){
        let mergedarr = merge(board[i])
        if(mergedarr.length == 3 && mergedarr.every((value) => mergedarr[i] === value)){
            mergedarr.reverse
        }
        while(mergedarr.length < 4) {
            mergedarr.unshift(0)
        }
        board[i] = mergedarr
        for(let j = 0; j < 4; ++j){
            updatetile(i,j,board[i][j])
        }

    }
    console.log(board)
}


function moveup() {
    for (let i= 0; i < 4; ++i){

        //building columns 
        let column = [];
        for (let j = 0; j < 4; ++j) {
            if (board[j][i] != 0){
                    column.push(board[j][i]);
            }
        }
        //Merging columns 
        let mergedarr = merge(column)
        //Adding zeros back 
        while (mergedarr.length < 4) {
            mergedarr.push(0)
        }
        console.log(mergedarr)

        //"copying column back to board + date tiles"
        for (let j = 0; j < 4; ++j) {
            updatetile(j,i,mergedarr[j])
        }

        console.log(board)
    }

}

function movedown() {
    for(let i = 0; i < 4; ++i) {
         //building columns 
         let column = [];
         for (let j = 0; j < 4; ++j) {
             if (board[j][i] != 0){
                     column.push(board[j][i]);
             }
         }
         //Merging columns 
         let mergedarr = merge(column)

         while(mergedarr.length < 4) {
            mergedarr.unshift(0)
         }
         console.log(mergedarr)

         for(let j = 0; j < 4; ++j) {
            updatetile(j,i,mergedarr[j])
         }

         console.log(board)
    }
}

function gameover() {
    let empty = []
    for(let i = 0; i < 4; ++i){
        for(let j = 0; j < 4; ++j) {
            if (board[i][j] == 0){
                empty.push([i,j])
            }
        }
    }
  if (empty.length != 0) {
    return;
  }
  //check if there is possible points of merging 
console.log("check possible merges")
for (let i = 0; i < 4; ++i){
    for (let j = 0; j < 3; ++j) {
        if (board[i][j] == board[i][j+1]){
            return; 
        }
        if (board[j][i] == board[j+1][i]){
            return; 
        }
    }
}
console.log("Game over")
alert("GAME OVER, click new game to try again")
}

//start function 
const start = document.querySelector(".start")
start.addEventListener("click", () => {
    restart()
    addtile()
    addtile()
    game = true
})

document.addEventListener("keydown",(e) => {

    if (!game) {
        console.log("Please press start")
        return; 
    }
    if (e.key === "ArrowUp") {
    moveup()
    console.log("up arrow pressed");
  } else if (e.key === "ArrowDown") {
    console.log("down arrow pressed");
    movedown()
  } else if (e.key === "ArrowLeft") {
    moveleft()
    console.log("left arrow pressed");
  } else if (e.key === "ArrowRight") {
    moveright()
    console.log("right arrow pressed");
  }
  addtile()
  gameover()
})





