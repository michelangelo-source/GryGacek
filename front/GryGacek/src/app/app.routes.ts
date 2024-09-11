import { Routes } from '@angular/router';
import { TetrisComponent } from './gamesComponents/tetris/tetris.component';
import { ClickSlideComponent } from './gamesComponents/click-slide/click-slide.component';

import { StttComponent } from './gamesComponents/sttt/sttt.component';
import { KulkiComponent } from './gamesComponents/kulki/kulki.component';

export const routes: Routes = [
  { path: 'Tetris', component: TetrisComponent },
  { path: 'ClickAndSlide', component: ClickSlideComponent },
  { path: 'SuperTicTacToe', component: StttComponent },

  { path: 'Kulki', component: KulkiComponent },
];
