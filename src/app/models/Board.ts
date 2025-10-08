export interface Square {
    row: number;
    col: number;
    isWall: boolean;
    isVisited: boolean;
    isPath: boolean;
    previousNode: Square | null;
    //Evaluation function (for A* and Greedy)
    f: number;
    //cost function for astar
    g: number;
}

export interface Endpoint {
    row: number;
    col: number;
}

export type Board = Square[][]