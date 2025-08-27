export interface Square {
    row: number;
    col: number;
    isWall: boolean;
}

export interface Endpoint {
    row: number;
    col: number;
}

export type Board = Square[][]