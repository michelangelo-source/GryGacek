import { Routes } from '@angular/router';
import { TetrisComponent } from './gamesComponents/tetris/tetris.component';
import { ClickSlideComponent } from './gamesComponents/click-slide/click-slide.component';
import { Ttt3dComponent } from './gamesComponents/ttt3d/ttt3d.component';
import { StttComponent } from './gamesComponents/sttt/sttt.component';
import { KulkiComponent } from './gamesComponents/kulki/kulki.component';

export const routes: Routes = [
    {path:'Tetris',component:TetrisComponent},
    {path:'ClickAndSlide',component:ClickSlideComponent},
    {path:'SuperTicTacToe',component:StttComponent},
    {path:'3DTicTacToe',component:Ttt3dComponent},
    {path:'Kulki',component:KulkiComponent},


];
