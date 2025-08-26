import { Component } from '@angular/core';
import { BoardService } from '../../services/board.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { SquareComponent } from '../square/square.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [NgIf, AsyncPipe, NgFor, SquareComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  readonly board$ = this.boardService.board$;

  constructor(private boardService: BoardService){
    this.boardService.resetBoard();
  }
  
  
}
