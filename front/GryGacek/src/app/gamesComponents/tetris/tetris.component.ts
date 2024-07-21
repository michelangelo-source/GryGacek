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
  falling_interval: NodeJS.Timeout = setTimeout(() => {}, 0);
  board: cellTetris[][] = [];
  // let color: string[] = [
  //   'blue',
  //   'green',
  //   'red',
  //   'yellow',
  //   'purple',
  //   'orange',
  //   'navy',
  // ];
  ///////// block i spada po can_fall
  //w boki po kolumnach push pop

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
      row.push({ color: 'black', occupied: true, can_fall: false });
    }
    this.board.push(row);
    this.nextblock();
  }
  gameover() {
    alert('dupa');
  }
  nextblock() {
    if (this.board[0][5].color != 'white') {
      this.gameover();
      return;
    }
    let block = Math.floor(Math.random() * 7);

    switch (block) {
      case 0:
        this.board[0][7] = { color: 'blue', occupied: true, can_fall: true };
        this.board[0][4] = { color: 'blue', occupied: true, can_fall: true };
        this.board[0][5] = { color: 'blue', occupied: true, can_fall: true };
        this.board[0][6] = { color: 'blue', occupied: true, can_fall: true };

        break;
      case 1:
        this.board[0][5] = { color: 'green', occupied: true, can_fall: true };
        this.board[0][6] = { color: 'green', occupied: true, can_fall: true };
        this.board[1][5] = { color: 'green', occupied: true, can_fall: true };
        this.board[1][4] = { color: 'green', occupied: true, can_fall: true };

        break;
      case 2:
        this.board[0][5] = { color: 'red', occupied: true, can_fall: true };
        this.board[0][4] = { color: 'red', occupied: true, can_fall: true };
        this.board[1][5] = { color: 'red', occupied: true, can_fall: true };
        this.board[1][6] = { color: 'red', occupied: true, can_fall: true };
        break;
      case 3:
        this.board[0][5] = { color: 'yellow', occupied: true, can_fall: true };
        this.board[0][6] = { color: 'yellow', occupied: true, can_fall: true };
        this.board[1][5] = { color: 'yellow', occupied: true, can_fall: true };
        this.board[1][6] = { color: 'yellow', occupied: true, can_fall: true };
        break;
      case 4:
        this.board[0][5] = { color: 'purple', occupied: true, can_fall: true };
        this.board[0][4] = { color: 'purple', occupied: true, can_fall: true };
        this.board[0][6] = { color: 'purple', occupied: true, can_fall: true };
        this.board[1][5] = { color: 'purple', occupied: true, can_fall: true };
        break;
      case 5:
        this.board[0][5] = { color: 'orange', occupied: true, can_fall: true };
        this.board[0][4] = { color: 'orange', occupied: true, can_fall: true };
        this.board[0][6] = { color: 'orange', occupied: true, can_fall: true };
        this.board[1][6] = { color: 'orange', occupied: true, can_fall: true };
        break;
      case 6:
        this.board[0][5] = { color: 'navy', occupied: true, can_fall: true };
        this.board[0][6] = { color: 'navy', occupied: true, can_fall: true };
        this.board[0][4] = { color: 'navy', occupied: true, can_fall: true };
        this.board[1][4] = { color: 'navy', occupied: true, can_fall: true };
        break;
    }

    this.falling_interval = setInterval(() => this.fall(), 200);
  }
  stand() {
    this.board.forEach((element) => {
      element.forEach((el) => {
        el.can_fall = false;
      });
    });
  }
  fall() {
    for (let i = 19; i >= 0; i--) {
      for (let j = 1; j <= 10; j++) {
        if (
          this.board[i][j].can_fall == true &&
          this.board[i + 1][j].occupied == true &&
          this.board[i + 1][j].can_fall == false
        ) {
          this.stand();
          this.nextblock();
          clearInterval(this.falling_interval);
          return false;
        }
      }
    }

    for (let i = 19; i >= 0; i--) {
      for (let j = 1; j <= 10; j++) {
        if (this.board[i][j].can_fall == true) {
          this.board[i + 1][j] = this.board[i][j];
          this.board[i][j] = {
            color: 'white',
            occupied: false,
            can_fall: false,
          };
        }
      }
    }
    return true;
  }
  move(dircetion: boolean) {
    if (dircetion) {
      console.log('prawo');
    } else {
      console.log('lewo');
    }
  }
}
