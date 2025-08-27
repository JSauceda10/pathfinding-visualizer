import { Component, Input, OnInit } from '@angular/core';
import { BoardService } from '../../services/board.service';
import { map, Observable, of } from 'rxjs';
import { AsyncPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-square',
  standalone: true,
  imports: [NgClass, AsyncPipe],
  templateUrl: './square.component.html',
  styleUrl: './square.component.scss'
})
export class SquareComponent implements OnInit{
  @Input() rowIndex: number = -1;
  @Input() colIndex: number = -1;

  isStart$: Observable<boolean> = of(false);
  isTarget$: Observable<boolean> = of(false); 

  constructor(private boardService: BoardService){
    // this.boardService.startEndpoint$.pipe(
    //   map(({row, col}))
    // )
  }

  

  ngOnInit() {
    this.isStart$ = this.boardService.startEndpoint$.pipe(
      map(
        (startEndpoint) =>
          this.rowIndex === startEndpoint.row &&
          this.colIndex === startEndpoint.col
      ),
    );

    this.isTarget$ = this.boardService.targetEndpoint$.pipe(
      map(
        (targetEndpoint) =>
          this.rowIndex === targetEndpoint.row &&
          this.colIndex === targetEndpoint.col
      )
    )

  }
}
