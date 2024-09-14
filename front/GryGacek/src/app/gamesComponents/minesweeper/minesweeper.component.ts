import { Component } from '@angular/core';
import { coords } from '../../../models/cords.type';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
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
  imports: [CommonModule, FormsModule],
  templateUrl: './minesweeper.component.html',
  styleUrl: './minesweeper.component.scss',
})
export class MinesweeperComponent {
  flag_path = '/assets/images/minesweeper/flag.png';
  bomb_path = '/assets/images/minesweeper/bomb.png';
  start_time = Date.now();
  solving_time = Date.now();
  hours = 0;
  minutes = 0;
  seconds = 0;
  milisec = 0;
  time_interval: NodeJS.Timeout = setTimeout(() => {}, 0);
  firstwin = true;
  flagmode_active = false;
  modes: string[] = ['easy', 'normal', 'hard', 'custom'];
  col = 8;
  row = 8;
  bomb = 10;
  mode = this.modes[0];
  board: minesweeper_cell[][] = [];
  not_bomb: minesweeper_cell[] = [];
  is_first_click = true;

  onSubmit() {
    this.mode = 'custom_end';
    this.restart();
  }
  start_timer() {
    clearInterval(this.time_interval);
    this.start_time = Date.now();

    this.time_interval = setInterval(() => {
      this.solving_time = Date.now() - this.start_time;
      this.milisec = this.solving_time % 1000;
      this.seconds = Math.floor(this.solving_time / 1000) % 60;
      this.minutes = Math.floor(this.solving_time / 60000) % 60;
      this.hours = Math.floor(this.solving_time / 3600000);
    }, 1);
  }
  set_flagmode() {
    this.flagmode_active = !this.flagmode_active;
  }
  set_mode(index_mode: number) {
    if (index_mode != 3) {
      switch (index_mode) {
        case 0: {
          this.row = 8;
          this.col = 8;
          this.bomb = 10;

          break;
        }
        case 1: {
          this.row = 16;
          this.col = 16;
          this.bomb = 40;
          break;
        }
        case 2: {
          this.row = 16;
          this.col = 30;
          this.bomb = 99;
          break;
        }
      }
      this.restart();
    }
    this.mode = this.modes[index_mode];
  }
  ngOnInit() {
    this.create_board(this.col, this.row, this.bomb, -999, -999);
  }
  ngOnDestroy() {
    clearInterval(this.time_interval);
  }
  flag(event: Event, x: number, y: number) {
    event.preventDefault();
    this.board[x][y].is_flag = !this.board[x][y].is_flag;
  }
  restart() {
    this.is_first_click = true;
    this.create_board(this.col, this.row, this.bomb, -999, -999);
  }
  create_board(
    col: number,
    row: number,
    bomb: number,
    first_x: number,
    first_y: number
  ) {
    clearInterval(this.time_interval);
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.milisec = 0;
    this.firstwin = true;
    if (bomb > (col * row) / 3) {
      alert('to many bombs, reduced to ' + Math.floor((col * row) / 3) + ' ');
      bomb = Math.floor((col * row) / 3);
      this.bomb = bomb;
    }

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
        if (
          (i == first_x && j == first_y) ||
          (i == first_x + 1 && j == first_y) ||
          (i == first_x - 1 && j == first_y) ||
          (i == first_x && j == first_y - 1) ||
          (i == first_x + 1 && j == first_y - 1) ||
          (i == first_x - 1 && j == first_y - 1) ||
          (i == first_x && j == first_y + 1) ||
          (i == first_x + 1 && j == first_y + 1) ||
          (i == first_x - 1 && j == first_y + 1)
        ) {
        } else {
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
      }
      this.board.push(row);
    }
    for (let i = 0; i < bomb; i++) {
      let squere_index = Math.floor(Math.random() * (empty.length - 1));

      let x = empty[squere_index].x;
      let y = empty[squere_index].y;

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
  check_bomb(x: number, y: number) {
    if (x == this.row || y == this.col || x < 0 || y < 0) {
      return;
    }
    if (this.is_first_click) {
      this.is_first_click = false;
      this.create_board(this.col, this.row, this.bomb, x, y);
      this.check_bomb(x, y);
      this.start_timer();
      return;
    }

    this.board[x][y].is_coverd = false;
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
      return;
    }
    this.check_win();
    if (this.board[x][y].is_bomb) {
      this.game_over();
    }
  }
  check_win() {
    let win = true;
    this.board.forEach((element) => {
      element.forEach((el) => {
        if (el.is_coverd && !el.is_bomb) {
          win = false;
        }
      });
    });
    if (win && this.firstwin) {
      clearInterval(this.time_interval);
      this.firstwin = false;
      console.log(document.getElementById('timer')?.innerText);
      setTimeout(() => {
        alert('wygrana');
      }, 200);
    }
  }
  game_over() {
    clearInterval(this.time_interval);
    this.board.forEach((element) => {
      element.forEach((el) => {
        if (el.is_bomb) {
          el.is_coverd = false;
        }
      });
    });
    setTimeout(() => {
      alert('dupa');
      this.restart();
    }, 200);
  }
}
