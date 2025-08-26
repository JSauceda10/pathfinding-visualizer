import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Board, Square } from '../models/Board';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  board$ = new BehaviorSubject<Board>([]);

  numberOfRows = 22;
  numberOfColumns = 60;

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
    
}
