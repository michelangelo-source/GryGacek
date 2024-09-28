import { Component, Output, EventEmitter } from '@angular/core';
import { game } from '../../models/game';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  games: game[] = [
    { id: 0, name: 'Minesweeper', url_path: 'minesweeper' },
    { id: 1, name: 'Super Tic Tac Toe', url_path: 'sttt_menu' },
    { id: 2, name: 'Tetris', url_path: 'tetris' },
    { id: 3, name: 'Click And Slide', url_path: 'clickandslide' },
    { id: 4, name: 'Kulki', url_path: 'kulki' },
  ];
}
