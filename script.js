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