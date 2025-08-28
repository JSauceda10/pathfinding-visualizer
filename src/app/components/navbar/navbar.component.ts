import { Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEraser, faPlay, faRedo, faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FaIconComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  faPlay = faPlay;
  faRedoAlt = faRedoAlt;
  faEraser = faEraser;

  constructor(private boardService: BoardService){
    
  }

  visualize() {
    this.boardService.visualize();
  }
}
