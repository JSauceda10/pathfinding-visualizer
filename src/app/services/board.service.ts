import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime, fromEvent, tap } from 'rxjs';
import { Board, Endpoint, Square } from '../models/Board';

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

  numberOfRows = 22;
  numberOfColumns = 60;

  isMousePressed: boolean = false;
  isStartPressed: boolean = false;
  isTargetPressed: boolean = false;

  constructor(){
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
          col: j
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
  }

  handleMouseUp(square: Square) {
    this.isMousePressed = false;
    this.isStartPressed = false;
    this.isTargetPressed = false;
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
    this.startEndpoint$.next({
      row: square.row,
      col: square.col
    })
  }

  private setTargetEndpoint(square: Square){
    this.targetEndpoint$.next({
      row: square.row,
      col: square.col
    })
  }
}
