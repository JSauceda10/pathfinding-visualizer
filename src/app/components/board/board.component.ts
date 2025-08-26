import { Component } from '@angular/core';
import { BoardService } from '../../services/board.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [NgIf, AsyncPipe, NgFor],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  readonly board$ = this.boardService.board$;

  constructor(private boardService: BoardService){
    this.boardService.resetBoard();
  }
  
  
}
