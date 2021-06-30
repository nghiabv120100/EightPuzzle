import {EightPuzzle} from EightPuzzle;
var initial = [ [-1,-1,-1,-1,-1],
                [-1, 2, 3, 4,-1],
                [-1, 1, 5, 7,-1],
                [-1, 8, 0, 6,-1],
                [-1,-1,-1,-1,-1]]


var goal =    [ [-1,-1,-1,-1,-1],
                [-1, 0, 1, 2,-1],
                [-1, 3, 4, 5,-1],
                [-1, 6, 7, 8,-1],
                [-1,-1,-1,-1,-1]]

window.onload = function() {
    // var puzzle = new EightPuzzle() ;
    drawPuzzle(initial);
}

drawPuzzle = function() {
   
    var view = document.getElementById('view-puzzle');
    view.innerHTML="";
    for (var i=1;i<4;i++) {
        var row = document.createElement("div");
        for (var j=1; j<4; j++) {
            let node = document.createElement("input");
            node.type = "button";
            node.value = initial[i][j];
            node.addEventListener('click',function() {          
                swapNode(node.value)
            });
            row.appendChild(node);
        }
        view.appendChild(row);
    }
}

function swapNode(value) {

    var xA,yA; // a position of '0'
    var xB,yB; // a position of node clicked
    console.log(value)
    for (let i = 1; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
            console.log(initial[i])
            //Get a position of "0"
            if (initial[i][j] == 0) {
                xA=i;
                yA=j;
            }
            //Get a position of node clicked
            if (initial[i][j] == value) {
                xB=i;
                yB=j;
            }
        }
    }

    // Swap
    if (initial[xB-1][yB] == 0 || initial[xB+1][yB] == 0 || initial[xB][yB-1] == 0 || initial[xB][yB+1] == 0) {
        // console.log(initial)
        initial[xA][yA] = initial[xB][yB];
        initial[xB][yB] = 0;
        // console.log(puzzle)
    }
    drawPuzzle(initial);

    let flag = isWin();
    if (flag == true) {
        console.log('You win!')
    }
}

function isWin() {
    return JSON.stringify(initial) === JSON.stringify(goal)
}