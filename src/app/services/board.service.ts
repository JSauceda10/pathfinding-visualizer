import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime, fromEvent, tap } from 'rxjs';
import { Board, Endpoint, Square } from '../models/Board';
import { AlgorithmsService } from './algorithms.service';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  board$ = new BehaviorSubject<Board>([]);
  startEndpoint$ = new BehaviorSubject<Endpoint>({
    row: 13,
    col: 13
  });
  targetEndpoint$ = new BehaviorSubject<Endpoint>({
    row: 13,
    col: 23
  });

  numberOfRows = 14;
  numberOfColumns = 30;

  isMousePressed: boolean = false;
  isStartPressed: boolean = false;
  isTargetPressed: boolean = false;

  constructor(private algorithmService: AlgorithmsService){
    fromEvent(window, 'resize')
    .pipe(debounceTime(300))
    .subscribe(() => this.resetBoard());
  }

  //Reset board to initial state without any walls
  //weight, or animated squares
  resetBoard() {
    const newRowNumber = Math.floor(window.innerHeight/25);
    const newColNumber = Math.floor(window.innerWidth/25);
    const newBoard = [];

    for (let i = 0; i < newRowNumber; i++) {
      let row: Square[] = [];

      for(let j = 0; j < newColNumber; j++) {
        row.push({
          row: i,
          col: j,
          isWall: false,
          isPath: false,
          isVisited: false,
          previousNode: null,
          f: Infinity,
        });
      }
      newBoard.push(row);
    } 
    console.log('new board', newBoard);
    this.numberOfRows = newRowNumber;
    this.numberOfColumns = newColNumber;
    this.board$.next(newBoard);
  }
    

  handleMouseDown(square: Square){
    console.log('mouse down on', square);
    this.isMousePressed = true;

    if(this.isStartEndpoint(square)){
      this.isStartPressed = true;
      console.log('pressed start')
    }

    if(this.isTargetEndpoint(square)){
      this.isTargetPressed = true;
      console.log('pressed target')
    }
    
  }

  handleMouseEnter(square: Square){
    if(!this.isMousePressed) {
      return;
    }

    if(this.isStartPressed && !this.isTargetEndpoint(square)) {
      this.setStartEndpoint(square);
    }
    
    if(this.isTargetPressed && !this.isStartEndpoint(square)) {
      this.setTargetEndpoint(square);
    }

    //Prevent endpoints from being marked as walls
    if(this.isStartEndpoint(square) || this.isTargetEndpoint(square)) {
      return;
    }

    this.toggleIsWall(square);
  }

  handleMouseUp(square: Square) {
    this.isMousePressed = false;
    this.isStartPressed = false;
    this.isTargetPressed = false;
  }

  visualize() {
    const board = this.board$.getValue();
    const startEndpoint = this.startEndpoint$.getValue();
    const targetEndpoint = this.targetEndpoint$.getValue();
    const startSquare = board[startEndpoint.row][startEndpoint.col];
    const targetSquare = board[targetEndpoint.row][targetEndpoint.col];

    const visited = this.algorithmService.bfs(board,
      startSquare,
      targetSquare) as any;
    const path = this.algorithmService.getPathFromStartToTarget(targetSquare);
    console.log('start visualizing');
    this.animateVisitedSquares({ visited, shortestPath: path });
  }

  animateVisitedSquares({
    visited,
    shortestPath}: {
      visited: Square[],
      shortestPath: Square[]
    }) {
    const board = this.board$.getValue();
    
    //Animate visited squares
    for(let i = 0; i < visited.length; i++) {
      setTimeout(() => {
        const node = visited[i];
        board[node.row][node.col].isVisited = true;
      }, 2 * i); 
    }

    //Animate the shortest path
    if(!shortestPath.length){
      return
    }

    setTimeout(() => {
      for(let i = 0; i < shortestPath.length; i++) {
        setTimeout(() => {
          const node = shortestPath[i];
          board[node.row][node.col].isPath = true;
        }, 2 * i);
      }
    }, 2 * visited.length);
  }

  private isStartEndpoint(square: Square) {
    const startEndpoint = this.startEndpoint$.getValue();
    return square.row === startEndpoint.row &&
           square.col === startEndpoint.col;
  }

  private isTargetEndpoint(square: Square) {
    const targetEndpoint = this.targetEndpoint$.getValue();
    return square.row === targetEndpoint.row &&
           square.col === targetEndpoint.col;
  }

  private setStartEndpoint(square: Square){
    const {row, col} = square;
    const board = this.board$.getValue();
    board[row][col].isWall = false;

    this.startEndpoint$.next({row,col,});
  }

  private setTargetEndpoint(square: Square){
    const {row, col} = square;
    const board = this.board$.getValue();
    board[row][col].isWall = false;

    this.targetEndpoint$.next({row,col,});
  }

  private toggleIsWall(square: Square) {
    const { row, col } = square;

    const board = this.board$.getValue();
    board[row][col].isWall = !board[row][col].isWall;
  }
}
