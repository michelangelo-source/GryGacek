import { Component } from '@angular/core';
export type cellTetris = {
  color: string;
  occupied: boolean;
  can_fall: boolean;
};
@Component({
  selector: 'app-tetris',
  standalone: true,
  imports: [],
  templateUrl: './tetris.component.html',
  styleUrl: './tetris.component.scss',
})
export class TetrisComponent {
  board: cellTetris[][] = [];

  /////////dopisac dwie 2 puste u gory tam sie respi block i spada po can_fall

  ngOnInit() {
    let row: cellTetris[] = [];
    for (let i = 0; i < 20; i++) {
      row = [];
      row.push({ color: 'black', occupied: true, can_fall: false });
      for (let j = 0; j < 10; j++) {
        row.push({ color: 'white', occupied: false, can_fall: false });
      }
      row.push({ color: 'black', occupied: true, can_fall: false });

      this.board.push(row);
    }
    row = [];
    for (let j = 0; j < 12; j++) {
      row.push({ color: 'black', occupied: false, can_fall: false });
    }
    this.board.push(row);
    setTimeout(() => {}, 1000);
    this.nextblock();
  }
  gameover() {
    alert('dupa');
  }
  nextblock() {
    if (this.board[0][5].color == 'white') {
      let can_blacok_fall = true;
    } else {
      this.gameover();
    }
    let block = Math.floor(Math.random() * 7);
    this.fall(block);
    // switch (block) {
    //   case 0:
    //     this.board[0][5].color = 'blue';
    //     break;
    //   case 1:
    //     this.board[0][5].color = 'green';
    //     break;
    //   case 2:
    //     this.board[0][5].color = 'red';
    //     break;
    //   case 3:
    //     this.board[0][5].color = 'yellow';
    //     break;
    //   case 4:
    //     this.board[0][5].color = 'purple';
    //     break;
    //   case 5:
    //     this.board[0][5].color = 'orange';
    //     break;
    //   case 6:
    //     this.board[0][5].color = 'navy';
    //     break;
    // }
  }
  fall(block: number) {
    let color: string[] = [
      'blue',
      'green',
      'red',
      'yellow',
      'purple',
      'orange',
      'navy',
    ];
    this.board[0][5].color = color[block];
  }
}
