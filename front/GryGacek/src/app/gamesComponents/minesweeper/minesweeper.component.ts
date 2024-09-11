import { Component, HostListener } from '@angular/core';
import { coords } from '../../../models/cords.type';
import { create } from 'domain';
interface minesweeper_cell extends coords {
  id: number;
  is_bomb: boolean;
  is_coverd: boolean;
  bombs_around_number: number;
  is_flag: boolean;
  was_here_to_check_zero: boolean;
}
@Component({
  selector: 'app-minesweeper',
  standalone: true,
  imports: [],
  templateUrl: './minesweeper.component.html',
  styleUrl: './minesweeper.component.scss',
})
export class MinesweeperComponent {
  modes: string[] = ['small', 'medium', 'big ', 'custom'];
  col = 8;
  row = 8;
  bomb = 10;
  mode: string = this.modes[0];
  board: minesweeper_cell[][] = [];
  not_bomb: minesweeper_cell[] = [];
  is_first_click = true;

  ngOnInit() {
    this.create_board(this.col, this.row, this.bomb, -999, -999);
  }
  create_board(
    col: number,
    row: number,
    bomb: number,
    first_x: number,
    first_y: number
  ) {
    this.board = [];
    let empty: minesweeper_cell[] = [];
    for (let i = 0; i < row; i++) {
      let row: minesweeper_cell[] = [];
      for (let j = 0; j < col; j++) {
        row.push({
          id: j + i * col,
          x: i,
          y: j,
          is_bomb: false,
          is_coverd: true,
          bombs_around_number: 0,
          is_flag: false,
          was_here_to_check_zero: false,
        });

        empty.push({
          id: j + i * col,
          x: i,
          y: j,
          is_bomb: false,
          is_coverd: true,
          bombs_around_number: 0,
          is_flag: false,
          was_here_to_check_zero: false,
        });
      }
      this.board.push(row);
    }
    for (let i = 0; i < bomb; i++) {
      let squere_index = Math.floor(Math.random() * (empty.length - 1));
      let x = empty[squere_index].x;
      let y = empty[squere_index].y;
      if (
        x == first_x ||
        x == first_x + 1 ||
        x == first_x - 1 ||
        y == first_y ||
        y == first_y + 1 ||
        y == first_y - 1
      ) {
        i--;
      } else {
        this.board[x][y].is_bomb = true;
        empty.splice(squere_index, 1);

        if (x < row - 1) {
          if (y < col - 1) {
            this.board[x + 1][y + 1].bombs_around_number++;
          }
          this.board[x + 1][y].bombs_around_number++;
          if (y > 0) {
            this.board[x + 1][y - 1].bombs_around_number++;
          }
        }
        if (y < col - 1) {
          this.board[x][y + 1].bombs_around_number++;
        }
        if (y > 0) {
          this.board[x][y - 1].bombs_around_number++;
        }
        if (x > 0) {
          if (y < col - 1) {
            this.board[x - 1][y + 1].bombs_around_number++;
          }
          this.board[x - 1][y].bombs_around_number++;
          if (y > 0) {
            this.board[x - 1][y - 1].bombs_around_number++;
          }
        }
      }
    }
  }
  check_bomb(x: number, y: number) {
    if (x == this.row || y == this.col || x < 0 || y < 0) {
      return;
    }
    if (this.is_first_click) {
      this.is_first_click = false;
      this.create_board(this.col, this.row, this.bomb, x, y);
      this.check_bomb(x, y);
      return;
    }

    if (
      this.board[x][y].bombs_around_number == 0 &&
      !this.board[x][y].was_here_to_check_zero &&
      !this.board[x][y].is_bomb
    ) {
      this.board[x][y].was_here_to_check_zero = true;
      this.check_bomb(x + 1, y - 1);
      this.check_bomb(x + 1, y);
      this.check_bomb(x + 1, y + 1);

      this.check_bomb(x, y + 1);
      this.check_bomb(x, y - 1);

      this.check_bomb(x - 1, y - 1);
      this.check_bomb(x - 1, y);
      this.check_bomb(x - 1, y + 1);
    }
    this.board[x][y].is_coverd = false;
    this.check_win();
    if (this.board[x][y].is_bomb) {
      this.game_over();
    }
  }
  check_win() {
    let win = true;
    this.board.forEach((element) => {
      element.forEach((el) => {
        if (!el.is_coverd && !el.is_bomb) {
        }
      });
    });
  }
  game_over() {
    this.board.forEach((element) => {
      element.forEach((el) => {
        if (el.is_bomb) {
          el.is_coverd = false;
        }
      });
    });
    alert('dupa');
  }
}
