/* 
Put together a script that creates a game board and a knight.
Treat all possible moves the knight could make as children in a tree. Don’t allow any moves to go off the board.
Decide which search algorithm is best to use for this case. Hint: one of them could be a potentially infinite series.
Use the chosen search algorithm to find the shortest path between the starting square (or node) and the ending square. Output what that full path looks like, 
e.g.:
  > knightMoves([3,3],[4,3])
  => You made it in 3 moves!  Here's your path:
    [3,3]
    [4,5]
    [2,4]
    [4,3]
*/

const Space = class {

    constructor(coords) {
        this.coords = coords; 
        this.parent = null;
    }

    coordsToString() { return `${this.coords[0]}, ${this.coords[1]}` }
}

const moveAdjustments = [
    [2,1],
    [2,-1],
    [-2,1],
    [-2, -1],
    [1, 2],
    [-1, 2],
    [1, -2],
    [-1, -2]
]

const ChessBoard = class {
    // given a starting point (e.g. (3,3)), check if the starting point is equal to the destination
    // if it is, return the starting point
    // if its not, create all possible moves as children (e.g. 1-2, 1-4, 2-1, 4-1, 5-2, 5-4, 2-5, 4-5)
    //      then, push starting point to visited, moves + 1
    // for each child, 
        // check 


    constructor() {
        this.graph = {};
    }

    buildGraph() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                this.graph[`${i}, ${j}`] = this.moveOptions(new Space([i, j]));
            }
        }
    }

    knightMoves(start, finish) {
        if (start === null) { return 'Invalid Input' }

        let visited = new Set();
        let q = [];
        const finishID = `${finish[0]}, ${finish[1]}`;

        const firstMove = new Space(start);
        console.log(firstMove);

        q.push(firstMove);

        while (q.length > 0) {
            const dq = q.shift();

            if (dq.coordsToString() === finishID) {
                const path = this.getPath(dq);
                console.log(`You Made it in ${path.length - 1} moves`)
                console.log(path);
                return path;
            }

            visited.add(dq.coordsToString());

            for (const move of this.moveOptions(dq)) {
                if (!visited.has(move.coordsToString())) {
                    q.push(move);
                }
            }
            
        }
    }

    moveOptions(space, product = []) {
        for (let i = 0; i < moveAdjustments.length; i++) {
            let newMove = [space.coords[0] + moveAdjustments[i][0], space.coords[1] + moveAdjustments[i][1]]
            if (newMove[0] >= 0 && newMove[0] < 8 && newMove[1] >= 0 && newMove[1] < 8) {
                const move = new Space (newMove);
                move.parent = space;
                product.push(move);
            }
        }
        return product;
    }

    getPath(space, path = []) {
        if (space.parent === null) { 
            return path.unshift(space.coords); 
        }
        else {
            path.unshift(space.coords);
            this.getPath(space.parent, path);
        }

        return path;
    }
}

const chess = new ChessBoard();
chess.knightMoves([0,0], [7,7]);
