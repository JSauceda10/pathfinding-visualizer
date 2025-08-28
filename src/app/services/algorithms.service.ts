import { Injectable } from '@angular/core';
import { Board, Square } from '../models/Board';

@Injectable({
  providedIn: 'root'
})
export class AlgorithmsService {
  bfs(board: Board, start: Square, target: Square){
    const queue = [];
    const visited = [];

    queue.push(start);
    visited.push(start);

    while(queue.length) {
      const node = queue.shift() as Square;

      //if(node === target) break;

      const adjacentSquares = this.getAdjacentSquares(node, board);

      for(const adjacentSquare of adjacentSquares) {
        if(adjacentSquare.isWall) {
          continue;
        }

        if(!visited.includes(adjacentSquare)) {
          adjacentSquare.previousNode = node; 
          queue.push(adjacentSquare);

          if(adjacentSquare === target) {
            visited.push(adjacentSquare);
            return visited;
          }
        }
        visited.push(adjacentSquare);
        
      }
    }

    return visited;
  }

  getPathFromStartToTarget(target: Square) {
    const path:Square[] = [];
    for(let currentNode = target; !!currentNode; currentNode = currentNode.previousNode as Square) {
      path.unshift(currentNode)
    }
    return path;
  }

  private getAdjacentSquares(square: Square, board: Board) {
    const adjacent: Square[] = [];
    const { row, col } = square;

    //North
    if(row > 0)
      adjacent.push(board[row-1][col]);
    //West
    if(col > 0)
      adjacent.push(board[row][col-1]);
    //South
    if(row < board.length-1)
      adjacent.push(board[row + 1][col]);
    //East
    if(col < board[0].length-1)
      adjacent.push(board[row][col + 1]);
    return adjacent;
  }

  constructor() { }
}
