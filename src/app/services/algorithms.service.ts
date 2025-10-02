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
          visited.push(adjacentSquare);
        
        }
        
      }
    }

    return visited;
  }

  greedy(board: Board, start: Square, target: Square) {
    //TODO; use priority queue instead of arrays
    const queue: Square[] = [];
    const visited: Square[] = [];

    const h = this.directDistance(target);

    start.f  = h(start);
    queue.push(start);
    
    while(queue.length) {
      // TODO return sorting when a priority is used
      //sort unvisited squares by evaluation value
      queue.sort((a, b) => a.f - b.f);

      //visit the closest square
      const node: Square = queue.shift() as Square;

      if(node.isWall) {
        continue;
      }

      if(!visited.includes(node)) {
        visited.push(node);
      }

      if(node === target) {
        return visited;
      }

      const adjacentSquares = this.getAdjacentSquares(node, board);

      for(const adjacentSquare of adjacentSquares) {
        if(adjacentSquare.isWall) {
          continue;
        }

        if(!visited.includes(adjacentSquare)) {
          adjacentSquare.previousNode = node;
          adjacentSquare.f = h(adjacentSquare);

          if (!queue.includes(adjacentSquare)) {
            queue.push(adjacentSquare);
          }
        }
      }
    }

    return visited
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

  private directDistance = (a: Square) => (b: Square) => {
    return Math.hypot(Math.abs(a.col - b.col), Math.abs(a.row - b.row))
  }

  constructor() { }
}
