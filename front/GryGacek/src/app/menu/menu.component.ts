import { Component, Output,EventEmitter } from '@angular/core';
import { game } from '../../models/game';



@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
      games:game[]=[{id:0,name:"3D Tic Tac Toe"},{id:1,name:"Super Tic Tac Toe"},{id:2,name:"Tetris"},
        {id:3,name:"Click And Slide"},{id:4,name:"Kulki"}]

      @Output() new_game=new EventEmitter<string>()
      chsoen_game(game_name:string){
        this.new_game.emit(game_name)
      }
      
}
