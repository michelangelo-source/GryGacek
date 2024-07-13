import { Component } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { TetrisComponent } from './gamesComponents/tetris/tetris.component';
import { Ttt3dComponent } from './gamesComponents/ttt3d/ttt3d.component';
import { StttComponent } from './gamesComponents/sttt/sttt.component';
import { ClickSlideComponent } from './gamesComponents/click-slide/click-slide.component';
import { KulkiComponent } from './gamesComponents/kulki/kulki.component';
import { BackToMenuComponent } from './back-to-menu/back-to-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MenuComponent,TetrisComponent,Ttt3dComponent,StttComponent,ClickSlideComponent,KulkiComponent,BackToMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'GryGacek';
  chosen_game:string="none"
  change_game(new_game:string){
    this.chosen_game=new_game
  }
}
