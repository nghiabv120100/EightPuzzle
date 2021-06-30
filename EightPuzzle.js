class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}
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
class EightPuzzle{
    constructor(){
        this.state,this.point = generateInit();
        this.goal = [[0,1,2],
                    [3,4,5],
                    [6,7,8]];
    }
    generateInit(){
        return [[ 2, 3, 4],
                [ 1, 5, 7],
                [ 8, 0, 6]], Point(2,1);
    }
    left(board,point){
        let x = point.x;
        let y = point.y;
        if(y>0){
            board[x][y] = board[x][y-1];
            board[x][y-1] = 0;
            return board,Point(x,y-1)
        }
        else{
            return None;
        }
    }
    right(board,point){
        let x = point.x;
        let y = point.y;
        if(y<2){
            board[x][y] = board[x][y+1];
            board[x][y+1] = 0;
            return board,Point(x,y+1)
        }
        else{
            return None;
        }
    }
    up(board,point){
        let x = point.x;
        let y = point.y;
        if(x>0){
            board[x][y] = board[x-1][y];
            board[x-1][y] = 0;
            return board,Point(x-1,y)
        }
        else{
            return None;
        }
    }
    down(board,point){
        let x = point.x;
        let y = point.y;
        if(x<2){
            board[x][y] = board[x+1][y];
            board[x+1][y] = 0;
            return board,Point(x,y+1)
        }
        else{
            return None;
        }
    }
    gen_all_steps(board,point){
        let lst = [];
        let current = deepcopy(board);
        left = this.left(current,point);
        if(left){
            lst.push(left);
        }

        current = deepcopy(board);
        right = this.right(current,point);
        if(right){
            lst.push(right);
        }

        current = deepcopy(board);
        top = this.top(current,point);
        if(top){
            lst.push(top);
        }

        current = deepcopy(board);
        down = this.down(current,point);
        if(down){
            lst.push(down);
        }
        return lst;
    }
}