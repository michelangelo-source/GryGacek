import { Routes } from '@angular/router';
import { TetrisComponent } from './gamesComponents/tetris/tetris.component';
import { ClickSlideComponent } from './gamesComponents/click-slide/click-slide.component';
import { StttComponent } from './gamesComponents/sttt/sttt.component';
import { KulkiComponent } from './gamesComponents/kulki/kulki.component';
import { MinesweeperComponent } from './gamesComponents/minesweeper/minesweeper.component';
import { HighscoresComponent } from './highscores/highscores.component';
import { MenuComponent } from './menu/menu.component';
export const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    title: 'Menu',
  },
  {
    path: 'minesweeper',
    component: MinesweeperComponent,
    title: 'Minesweeper',
  },
  {
    path: 'sttt',
    component: StttComponent,
    title: 'Super Tic-tac-toe',
  },
  {
    path: 'tetris',
    component: TetrisComponent,
    title: 'Tetris',
  },
  {
    path: 'clickandslide',
    component: ClickSlideComponent,
    title: 'Click and slide',
  },
  {
    path: 'kulki',
    component: KulkiComponent,
    title: 'Kulki',
  },
  {
    path: 'highscore/:game',
    component: HighscoresComponent,
    title: 'Hgihscores',
  },
];
