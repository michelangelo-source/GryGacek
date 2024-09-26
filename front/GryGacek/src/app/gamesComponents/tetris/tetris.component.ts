import { Component, HostListener } from '@angular/core';
import { rotations } from './tetris.rotations';
import { starting_positions } from './tetris.startingPositions';
import { CommonModule } from '@angular/common';
import { SaveScoreComponent } from '../../save-score/save-score.component';
import { BackToMenuComponent } from '../../back-to-menu/back-to-menu.component';
import { RouterModule } from '@angular/router';
import { HighscoreBtnComponent } from '../../highscore-btn/highscore-btn.component';

export type cellTetris = {
  color: string;
  occupied: boolean;
  can_fall: boolean;
  can_rotate_now: boolean;
};

@Component({
  selector: 'app-tetris',
  standalone: true,
  imports: [
    CommonModule,
    SaveScoreComponent,
    BackToMenuComponent,
    HighscoreBtnComponent,
    RouterModule,
  ],
  templateUrl: './tetris.component.html',
  styleUrl: './tetris.component.scss',
})
export class TetrisComponent {
  next_block_preview_id: number = 0;
  falling_interval: NodeJS.Timeout | undefined = undefined;
  board: cellTetris[][] = [];
  current_block_id: number = 0;
  current_block_position: number = 0;
  line_removed: number = 0;
  level: number = 1;
  fall_time: number = 1000;
  is_end = false;
  preview: string[][] = [];
  hold_block_id = Infinity;
  start = false;
  hold_block: string[][] = [];
  blue_path: string = '/assets/images/tetris/blue.png';
  green_path: string = '/assets/images/tetris/green.png';
  red_path: string = '/assets/images/tetris/red.png';
  yellow_path: string = '/assets/images/tetris/yellow.png';
  purple_path: string = '/assets/images/tetris/purple.png';
  orange_path: string = '/assets/images/tetris/orange.png';
  navy_path: string = '/assets/images/tetris/navy.png';
  black_path: string = '/assets/images/tetris/black.png';
  color: string[] = [
    'blue',
    'green',
    'red',
    'yellow',
    'purple',
    'orange',
    'navy',
  ];
  paths: { [color: string]: string } = {
    green: this.green_path,
    blue: this.blue_path,
    red: this.red_path,
    yellow: this.yellow_path,
    purple: this.purple_path,
    orange: this.orange_path,
    navy: this.navy_path,
    black: this.black_path,
  };
  @HostListener('window:keyup.c', ['$event'])
  hold_block_keyup() {
    this.hold_block_preview();
  }

  @HostListener('window:keyup.arrowleft', ['$event'])
  arrow_left() {
    this.move(false);
  }
  @HostListener('window:keyup.arrowright', ['$event'])
  arrow_right() {
    this.move(true);
  }
  @HostListener('window:keyup.arrowdown', ['$event'])
  arrow_down() {
    this.fall();
  }
  @HostListener('window:keyup.arrowup', ['$event'])
  arrow_up() {
    this.rotate();
  }
  @HostListener('window:keyup.space', ['$event'])
  space() {
    let falling = this.fall();
    while (falling) {
      falling = this.fall();
    }
  }

  reset() {
    this.start = false;
    this.ngOnInit();
  }
  ngOnDestroy() {
    this.stopFalling();
  }
  private stopFalling() {
    if (this.falling_interval) {
      clearInterval(this.falling_interval);
      this.falling_interval = undefined;
    }
  }
  private startFalling() {
    this.stopFalling();
    this.falling_interval = setInterval(() => this.fall(), this.fall_time);
  }
  ngOnInit() {
    this.hold_block_id = Infinity;
    this.next_block_preview_id = 0;
    this.current_block_id = 0;
    this.current_block_position = 0;
    this.fall_time = 1000;
    this.preview = [];
    clearInterval(this.falling_interval);
    this.board = [];
    this.line_removed = 0;
    this.level = 1;
    this.is_end = false;
    let row: cellTetris[] = [];
    this.hold_block = [];
    for (let i = 0; i < 6; i++) {
      let row: string[] = [];
      for (let j = 0; j < 8; j++) {
        if (i == 0 || i == 5 || j == 0 || j == 7) {
          row.push('black');
        } else {
          row.push('white');
        }
      }
      this.hold_block.push(row);
    }
    for (let i = 0; i < 20; i++) {
      row = [];
      row.push({
        color: 'black',
        occupied: true,
        can_fall: false,
        can_rotate_now: false,
      });
      for (let j = 0; j < 10; j++) {
        row.push({
          color: 'white',
          occupied: false,
          can_fall: false,
          can_rotate_now: false,
        });
      }
      row.push({
        color: 'black',
        occupied: true,
        can_fall: false,
        can_rotate_now: false,
      });
      this.board.push(row);
    }
    row = [];
    for (let j = 0; j < 12; j++) {
      row.push({
        color: 'black',
        occupied: true,
        can_fall: false,
        can_rotate_now: false,
      });
    }
    this.board.push(row);
    this.next_block_preview_id = Math.floor(Math.random() * 7);
    this.next_block_preview();
    this.start = false;
  }
  get_color_path(color: string) {
    return this.paths[color];
  }
  gameover() {
    this.is_end = true;
  }
  private next_block_preview() {
    this.preview = [];
    for (let i = 0; i < 6; i++) {
      let row: string[] = [];
      for (let j = 0; j < 8; j++) {
        if (i == 0 || i == 5 || j == 0 || j == 7) {
          row.push('black');
        } else {
          row.push('white');
        }
      }
      this.preview.push(row);
    }
    for (let i = 0; i < 4; i++) {
      this.preview[starting_positions[this.next_block_preview_id][i].x][
        starting_positions[this.next_block_preview_id][i].y - 2
      ] = this.color[this.next_block_preview_id];
    }
  }
  private hold_block_preview() {
    for (let i = 19; i >= 0; i--) {
      for (let j = 1; j <= 10; j++) {
        if (this.board[i][j].can_fall == true) {
          this.board[i][j] = {
            color: 'white',
            occupied: false,
            can_fall: false,
            can_rotate_now: false,
          };
        }
      }
    }

    this.hold_block = [];
    for (let i = 0; i < 6; i++) {
      let row: string[] = [];
      for (let j = 0; j < 8; j++) {
        if (i == 0 || i == 5 || j == 0 || j == 7) {
          row.push('black');
        } else {
          row.push('white');
        }
      }
      this.hold_block.push(row);
    }
    for (let i = 0; i < 4; i++) {
      this.hold_block[starting_positions[this.current_block_id][i].x][
        starting_positions[this.current_block_id][i].y - 2
      ] = this.color[this.current_block_id];
    }
    if (this.hold_block_id == Infinity) {
      this.hold_block_id = this.current_block_id;
      this.next_block_preview_id = Math.floor(Math.random() * 7);
      this.next_block_preview();
      this.nextblock(this.next_block_preview_id);
    } else {
      const old_hold_block_id = this.hold_block_id;
      this.hold_block_id = this.current_block_id;

      this.nextblock(old_hold_block_id);
    }
  }
  play() {
    this.start = true;
    this.nextblock(Math.floor(Math.random() * 7));
  }
  nextblock(block_id: number) {
    if (this.board[2][5].color != 'white') {
      this.gameover();
      return;
    }
    this.current_block_id = block_id;
    this.current_block_position = 0;
    for (let i = 0; i < 4; i++) {
      this.board[starting_positions[this.current_block_id][i].x][
        starting_positions[this.current_block_id][i].y
      ] = {
        color: this.color[this.current_block_id],
        occupied: true,
        can_fall: true,
        can_rotate_now: true,
      };
    }
    this.level = Math.floor(this.line_removed / 10) + 1;
    this.fall_time = Math.max(100, 2000 - 50 * this.level);
    this.startFalling();
  }
  private stand() {
    this.board.forEach((element) => {
      element.forEach((el) => {
        el.can_fall = false;
      });
    });
    this.clear();
  }
  fall() {
    for (let i = 19; i >= 0; i--) {
      for (let j = 1; j <= 10; j++) {
        if (
          this.board[i][j].can_fall == true &&
          this.board[i + 1][j].occupied == true &&
          this.board[i + 1][j].can_fall == false
        ) {
          clearInterval(this.falling_interval);
          this.stand();
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
            can_rotate_now: false,
          };
        }
      }
    }
    return true;
  }
  move(direction: boolean) {
    let i = 0;
    let step = 0;
    if (direction) {
      step = -1;
    } else {
      step = 1;
    }

    for (let j = 0; j < 20; j++) {
      for (i = direction ? 10 : 1; i > 0 && i < 11; i += step) {
        if (
          this.board[j][i].can_fall == true &&
          this.board[j][i - step].occupied == true &&
          this.board[j][i - step].can_fall == false
        ) {
          return;
        }
      }
    }

    for (let j = 0; j < 20; j++) {
      for (i = direction ? 10 : 1; i > 0 && i < 11; i += step) {
        if (this.board[j][i].can_fall == true) {
          this.board[j][i - step] = this.board[j][i];
          this.board[j][i] = {
            color: 'white',
            occupied: false,
            can_fall: false,
            can_rotate_now: false,
          };
        }
      }
    }
  }
  rotate() {
    let already_moved_block = 0;
    let tmp: cellTetris;
    for (let i = 0; i < 20; i++) {
      for (let j = 1; j < 11; j++) {
        if (this.board[i][j].can_fall && this.board[i][j].can_rotate_now) {
          if (
            this.board[
              i +
                rotations[this.current_block_id][
                  this.current_block_position % 4
                ][already_moved_block].x
            ][
              j +
                rotations[this.current_block_id][
                  this.current_block_position % 4
                ][already_moved_block].y
            ].color != 'white' &&
            this.board[
              i +
                rotations[this.current_block_id][
                  this.current_block_position % 4
                ][already_moved_block].x
            ][
              j +
                rotations[this.current_block_id][
                  this.current_block_position % 4
                ][already_moved_block].y
            ].can_fall == false
          ) {
            return;
          }

          already_moved_block++;
        }
      }
    }
    already_moved_block = 0;
    for (let i = 0; i < 20; i++) {
      for (let j = 1; j < 11; j++) {
        if (this.board[i][j].can_fall && this.board[i][j].can_rotate_now) {
          tmp =
            this.board[
              i +
                rotations[this.current_block_id][
                  this.current_block_position % 4
                ][already_moved_block].x
            ][
              j +
                rotations[this.current_block_id][
                  this.current_block_position % 4
                ][already_moved_block].y
            ];

          this.board[
            i +
              rotations[this.current_block_id][this.current_block_position % 4][
                already_moved_block
              ].x
          ][
            j +
              rotations[this.current_block_id][this.current_block_position % 4][
                already_moved_block
              ].y
          ] = this.board[i][j];

          this.board[
            i +
              rotations[this.current_block_id][this.current_block_position % 4][
                already_moved_block
              ].x
          ][
            j +
              rotations[this.current_block_id][this.current_block_position % 4][
                already_moved_block
              ].y
          ].can_rotate_now = false;

          this.board[i][j] = tmp;

          already_moved_block++;
        }
      }
    }
    this.current_block_position++;
    this.board.forEach((element) => {
      element.forEach((el) => {
        if (el.can_fall) {
          el.can_rotate_now = true;
        }
      });
    });
  }
  private clear() {
    let full_line = true;
    this.board.forEach((element, index) => {
      full_line = true;
      element.forEach((el) => {
        if (el.color == 'white' || index == 20) {
          full_line = false;
        }
      });
      if (full_line) {
        this.removing_animation(index);
      }
    });

    const next_block_id = this.next_block_preview_id;
    this.next_block_preview_id = Math.floor(Math.random() * 7);
    this.next_block_preview();
    this.nextblock(next_block_id);
  }
  private delete(index: number) {
    this.board.splice(index, 1);
    let row = [];
    row.push({
      color: 'black',
      occupied: true,
      can_fall: false,
      can_rotate_now: false,
    });
    for (let j = 0; j < 10; j++) {
      row.push({
        color: 'white',
        occupied: false,
        can_fall: false,
        can_rotate_now: false,
      });
    }
    row.push({
      color: 'black',
      occupied: true,
      can_fall: false,
      can_rotate_now: false,
    });
    this.board.unshift(row);
  }
  async removing_animation(removing_line: number) {
    this.line_removed++;
    await Promise.all(
      this.board[removing_line].map((el, index) => {
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            el.color = 'black';
            resolve();
          }, 50 * index);
        });
      })
    );

    this.delete(removing_line);
  }
}
