import { Component, Input, OnInit } from '@angular/core';
import { BoardService } from '../../services/board.service';
import { map, Observable, of } from 'rxjs';
import { AsyncPipe, NgClass } from '@angular/common';
import { Square } from '../../models/Board';

@Component({
  selector: 'app-square',
  standalone: true,
  imports: [NgClass, AsyncPipe],
  templateUrl: './square.component.html',
  styleUrl: './square.component.scss'
})
export class SquareComponent implements OnInit {
  @Input() square!: Square;
  

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
          this.square.row === startEndpoint.row &&
          this.square.col === startEndpoint.col
      ),
    );

    this.isTarget$ = this.boardService.targetEndpoint$.pipe(
      map(
        (targetEndpoint) =>
          this.square.row === targetEndpoint.row &&
          this.square.col === targetEndpoint.col
      )
    )

  }

  mouseDownHandler(event: MouseEvent){
    event.preventDefault();
    this.boardService.handleMouseDown(this.square);
  }

  mouseEnterHandler(event: MouseEvent){
    event.preventDefault();
    this.boardService.handleMouseEnter(this.square);
  }

  mouseUpHandler(event: MouseEvent){
    event.preventDefault();
    this.boardService.handleMouseUp(this.square);
  }

}
