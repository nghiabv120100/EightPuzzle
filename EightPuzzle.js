/*
This is only work for 2d board
*/
function deepcopy(board){
    var cop = new Array(board.length);
    for(var i=0;i<board.length;i++){
        cop[i] = new Array(board[0].length);
    }
    for(var i=0;i<board.length;i++){
        for(var j=0;j<board[i].length;j++){
            cop[i][j] = board[i][j];
        }
    }
    return cop;
}
class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}
class State{
    constructor(board,cost,point,parent,step){
        this.board = board;
        this.cost = cost
        this.point = point;
        this.parent = parent;
        this.prev_step = step;
    }
}

/*
    Priority queue, https://lowrey.me/priority-queue-in-es6-javascript/
*/
class PriorityQueue {
    constructor() {
        this.data = [];
    }
    push(value, priority = 0) {
        return this.data.push({
            value: value,
            priority: priority
        });
    }
    pop() {
        let index = 0;
        let min = Infinity;
        for (let i = 0; i < this.data.length; i++) {
            let priority = this.data[i].priority;
            if (Math.min(min, priority) === priority) {
                min = priority;
                index = i;
            }
        }
        return this.data.splice(index, 1)[0].value;
    }
    size() {
        return this.data.length;
    }
}
/*
    Main class, implement some search algorithms on 8-Puzzle problems
*/
class EightPuzzle{
    constructor(state){
        this.state = state;
    }
    left(state){
        let board = deepcopy(state.board);
        let point = state.point;
        let x = point.x;
        let y = point.y;
        if(y>0){
            board[x][y] = board[x][y-1];
            board[x][y-1] = 0;
            return new State(board,state.cost+1,new Point(x,y-1),state,'L');
        }
        else{
            return null;
        }
    }
    right(state){
        let board = deepcopy(state.board);
        let point = state.point;
        let x = point.x;
        let y = point.y;
        if(y<2){
            board[x][y] = board[x][y+1];
            board[x][y+1] = 0;
            return new State(board,state.cost+1,new Point(x,y+1),state,'R');
        }
        else{
            return null;
        }
    }
    up(state){
        let board = deepcopy(state.board);
        let point = state.point;
        let x = point.x;
        let y = point.y;
        if(x>0){
            board[x][y] = board[x-1][y];
            board[x-1][y] = 0;
            return new State(board,state.cost+1,new Point(x-1,y),state,'U');
        }
        else{
            return null;
        }
    }
    down(state){
        let board = deepcopy(state.board);
        let point = state.point;
        let x = point.x;
        let y = point.y;
        if(x<2){
            board[x][y] = board[x+1][y];
            board[x+1][y] = 0;
            return new State(board,state.cost+1,new Point(x+1,y),state,'D');
        }
        else{
            return null;
        }
    }
    
    gen_all_steps(){
        /*
            Output: Array of all valid next states 
        */
        let lst = [];
        let left = this.left(this.state);
        if(left){
            lst.push(left);
        }

        let right = this.right(this.state);
        if(right){
            lst.push(right);
        }

        let up = this.up(this.state);
        if(up){
            lst.push(up);
        }

        let down = this.down(this.state);
        if(down){
            lst.push(down);
        }
        return lst;
    }
    is_goal(board){
        oy = board.length 
        ox = board[0].length
        for(var i =0;i<oy;i++){
            for(var j =0;j<ox;j++){
                if(board[i][j]!=this.goal[i][j])
                    return false;
            }
        }
        return true;
    }
}
/*
    This function is used to scored the board with Manhattan distance
    */
let goal =  [[0,1,2],
            [3,4,5],
            [6,7,8]];
function score(board){
    let score = 0;
    oy = board.length 
    ox = board[0].length
    for(var i =0;i<oy;i++){
        for(var j =0;j<ox;j++){
            value = board[i][j];
            if(value>0){
                let x = value%ox;
                let y = Math.floor(value/oy);
                score += Math.abs(x-j)+Math.abs(y-i);
            }
        }
    }
    return score;
}
// function score(board){
//     let score = 0;
//     oy = board.length;
//     ox = board[0].length;
//     for(var i =0;i<oy;i++){
//         for(var j =0;j<ox;j++){
//             if(board[i][j]!=i*oy+j && board[i][j]!=0){
//                 score +=1;
//             }
//         }
//     }
//     return score;
// }


function generateInit(){
    let board = [[ 1,0,2],
                [ 3,4,5],
                [ 6,7,8]];
    return new State(board, 0, new Point(0,1),null,null);
}

function a_star_heuristic(state){
    return state.cost*2 + score(state.board); f = h + g
}

function gen_path(state){
    path = [state]
    while(state.parent){
        state = state.parent;
        path.unshift(state);
    }
    return path;
}

function a_star_search(init_state){
    queue = new PriorityQueue();
    let path = []
    queue.push(init_state,a_star_heuristic(init_state));
    while(true){
        state = queue.pop();
        if(score(state.board)==0){
            path = gen_path(state);
            break;
        }
        else{
            puzzle = new EightPuzzle(state);
            lst_next = puzzle.gen_all_steps();
            lst_next.forEach((element)=>{
                queue.push(element,a_star_heuristic(element));
            });
        }
    }
    path.forEach((element)=>{
        console.log(element);
    })
}
let init = generateInit();
a_star_search(init);
// let queue = new PriorityQueue();
// queue.push(init);

// init = queue.pop();
// puzzle = new EightPuzzle(init);
// lst_next = puzzle.gen_all_steps();
// lst_next.forEach((element)=>{
//     queue.push(element,a_star_heuristic(element));
// });
// console.log(queue);