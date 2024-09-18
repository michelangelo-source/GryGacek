import { Component } from '@angular/core';
import { coords } from '../../../models/cords';
import { BackToMenuComponent } from '../../back-to-menu/back-to-menu.component';
import { HighscoreBtnComponent } from '../../highscore-btn/highscore-btn.component';
import { SaveScoreComponent } from '../../save-score/save-score.component';
export interface squere extends coords {
  color: string;
  is_selected: boolean;
  is_path: boolean;
}
export interface path_node extends coords {
  cost: number;
  prev?: path_node;
  visited: boolean;
}

@Component({
  selector: 'app-kulki',
  standalone: true,
  imports: [BackToMenuComponent, HighscoreBtnComponent, SaveScoreComponent],
  templateUrl: './kulki.component.html',
  styleUrl: './kulki.component.scss',
})
export class KulkiComponent {
  navy_path: string = '/assets/images/kulki/navy.png';
  blue_path: string = '/assets/images/kulki/blue.png';
  green_path: string = '/assets/images/kulki/green.png';
  red_path: string = '/assets/images/kulki/red.png';
  yellow_path: string = '/assets/images/kulki/yellow.png';
  purple_path: string = '/assets/images/kulki/purple.png';
  orange_path: string = '/assets/images/kulki/orange.png';
  white_path: string = '/assets/images/kulki/white.png';
  paths: { [color: string]: string } = {
    white: this.white_path,
    green: this.green_path,
    blue: this.blue_path,
    red: this.red_path,
    yellow: this.yellow_path,
    purple: this.purple_path,
    orange: this.orange_path,
    navy: this.navy_path,
  };
  selected_interval: NodeJS.Timeout = setTimeout(() => {}, 0);
  animation_interval: NodeJS.Timeout = setTimeout(() => {}, 0);
  is_animation_on_going: boolean = false;
  selected_squere: squere = {
    x: 9,
    y: 9,
    color: '',
    is_selected: false,
    is_path: false,
  };
  points = 0;
  board: squere[][] = [];
  empty: coords[] = [];
  colors: string[] = [
    'white',
    'blue',
    'red',
    'yellow',
    'green',
    'purple',
    'orange',
    'navy',
  ];
  is_end: boolean = false;

  pythagoras(x1: number, y1: number, x2: number, y2: number) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }
  reset() {
    this.selected_squere = {
      x: 9,
      y: 9,
      color: '',
      is_selected: false,
      is_path: false,
    };
    this.points = 0;
    this.board = [];
    this.empty = [];
    this.is_end = false;
    clearInterval(this.animation_interval);
    clearInterval(this.selected_interval);
    this.ngOnInit();
  }
  ngOnInit() {
    for (let i = 0; i < 9; i++) {
      let row: squere[] = [];
      for (let j = 0; j < 9; j++) {
        row.push({
          color: 'black',
          x: i,
          y: j,
          is_selected: false,
          is_path: false,
        });
        this.empty.push({
          x: i,
          y: j,
        });
      }
      this.board.push(row);
    }

    this.add_balls();
  }
  ngOnDestroy() {
    clearInterval(this.animation_interval);
    clearInterval(this.selected_interval);
  }
  get_color_path(color: string) {
    return this.paths[color];
  }
  chose_ball(selected_squre: squere) {
    if (!this.is_animation_on_going) {
      if (selected_squre.color != 'black') {
        if (
          selected_squre.x == this.selected_squere.x &&
          selected_squre.y == this.selected_squere.y
        ) {
          clearInterval(this.selected_interval);
          selected_squre.is_selected = false;
          this.selected_squere = {
            x: 9,
            y: 9,
            color: '',
            is_selected: false,
            is_path: false,
          };
        } else {
          clearInterval(this.selected_interval);
          if (this.selected_squere.x != 9) {
            this.board[this.selected_squere.x][
              this.selected_squere.y
            ].is_selected = false;
          }
          this.selected_squere = selected_squre;
          selected_squre.is_selected = !selected_squre.is_selected;
          this.selected_interval = setInterval(() => {
            selected_squre.is_selected = !selected_squre.is_selected;
          }, 500);
        }
      } else {
        if (this.selected_squere.x != 9) {
          clearInterval(this.selected_interval);
          this.board[this.selected_squere.x][
            this.selected_squere.y
          ].is_selected = false;
          let path_elem = this.find_path(selected_squre);
          if (path_elem.cost != 999) {
            let path: path_node[] = [];
            while (path_elem.prev) {
              this.board[path_elem.x][path_elem.y].is_path = true;
              path.unshift(path_elem);
              path_elem = path_elem.prev;
            }
            this.board[path_elem.x][path_elem.y].is_path = true;
            path.unshift(path_elem);
            let i = 0;
            this.is_animation_on_going = true;
            this.animation_interval = setInterval(() => {
              this.ball_step(
                path[i].x,
                path[i].y,
                path[i + 1].x,
                path[i + 1].y
              );
              i++;
              if (i == path.length - 1) {
                clearInterval(this.animation_interval);
                this.board[path[i].x][path[i].y].is_path = false;
                for (let j = 0; j < this.empty.length; j++) {
                  if (
                    this.empty[j].x == path[path.length - 1].x &&
                    this.empty[j].y == path[path.length - 1].y
                  ) {
                    this.empty[j] = {
                      x: path[0].x,
                      y: path[0].y,
                    };
                    break;
                  }
                }
                this.is_animation_on_going = false;
                this.check();
              }
            }, 200);
          } else {
            this.board[path_elem.x][path_elem.y].is_path = true;
            setTimeout(() => {
              this.board[path_elem.x][path_elem.y].is_path = false;
            }, 200);
          }
        }
      }
    }
  }
  ball_step(x1: number, y1: number, x2: number, y2: number) {
    this.board[x2][y2].color = this.board[x1][y1].color;
    this.board[x1][y1].color = 'black';
    this.board[x1][y1].is_path = false;
  }
  find_path(destination: squere) {
    let start: path_node = {
      visited: false,
      x: this.selected_squere.x,
      y: this.selected_squere.y,
      cost: 999,
    };

    let visited: path_node[] = [start];
    let i = 0;

    while (i < 81) {
      let elem = visited[0];
      for (let i = 0; i < visited.length - 1; i++) {
        if (!visited[i].visited) {
          elem = visited[i];
          visited[i].visited = true;
          break;
        }
      }

      if (elem.x <= 7 && this.board[elem.x + 1][elem.y].color == 'black') {
        let can_create = true;

        for (let i = 0; i < visited.length - 1; i++) {
          if (visited[i].x == elem.x + 1 && visited[i].y == elem.y) {
            can_create = false;
          }
        }

        if (can_create) {
          let new_node: path_node = {
            visited: false,
            prev: elem,
            x: elem.x + 1,
            y: elem.y,
            cost:
              this.pythagoras(
                elem.x + 1,
                elem.y,
                destination.x,
                destination.y
              ) +
              this.pythagoras(
                elem.x + 1,
                elem.y,
                this.selected_squere.x,
                this.selected_squere.y
              ),
          };

          if (new_node.x == destination.x && new_node.y == destination.y) {
            visited.unshift(new_node);
            break;
          } else {
            visited.push(new_node);
            visited.sort((a, b) => {
              return a.cost - b.cost;
            });
          }
        }
      }
      if (elem.x >= 1 && this.board[elem.x - 1][elem.y].color == 'black') {
        let can_create = true;
        for (let i = 0; i < visited.length - 1; i++) {
          if (visited[i].x == elem.x - 1 && visited[i].y == elem.y) {
            can_create = false;
          }
        }
        if (can_create) {
          let new_node: path_node = {
            visited: false,
            prev: elem,
            x: elem.x - 1,
            y: elem.y,
            cost:
              this.pythagoras(
                elem.x - 1,
                elem.y,
                destination.x,
                destination.y
              ) +
              this.pythagoras(
                elem.x - 1,
                elem.y,
                this.selected_squere.x,
                this.selected_squere.y
              ),
          };

          if (new_node.x == destination.x && new_node.y == destination.y) {
            visited.unshift(new_node);
            break;
          } else {
            visited.push(new_node);
            visited.sort((a, b) => {
              return a.cost - b.cost;
            });
          }
        }
      }
      if (elem.y <= 7 && this.board[elem.x][elem.y + 1].color == 'black') {
        let can_create = true;
        for (let i = 0; i < visited.length - 1; i++) {
          if (visited[i].x == elem.x && visited[i].y == elem.y + 1) {
            can_create = false;
          }
        }
        if (can_create) {
          let new_node: path_node = {
            visited: false,
            prev: elem,
            x: elem.x,
            y: elem.y + 1,
            cost:
              this.pythagoras(
                elem.x,
                elem.y + 1,
                destination.x,
                destination.y
              ) +
              this.pythagoras(
                elem.x,
                elem.y + 1,
                this.selected_squere.x,
                this.selected_squere.y
              ),
          };

          if (new_node.x == destination.x && new_node.y == destination.y) {
            visited.unshift(new_node);
            break;
          } else {
            visited.push(new_node);
            visited.sort((a, b) => {
              return a.cost - b.cost;
            });
          }
        }
      }
      if (elem.y >= 1 && this.board[elem.x][elem.y - 1].color == 'black') {
        let can_create = true;
        for (let i = 0; i < visited.length - 1; i++) {
          if (visited[i].x == elem.x && visited[i].y == elem.y - 1) {
            can_create = false;
          }
        }
        if (can_create) {
          let new_node: path_node = {
            visited: false,
            prev: elem,
            x: elem.x,
            y: elem.y - 1,
            cost:
              this.pythagoras(
                elem.x,
                elem.y - 1,
                destination.x,
                destination.y
              ) +
              this.pythagoras(
                elem.x,
                elem.y - 1,
                this.selected_squere.x,
                this.selected_squere.y
              ),
          };

          if (new_node.x == destination.x && new_node.y == destination.y) {
            visited.unshift(new_node);
            break;
          } else {
            visited.push(new_node);
            visited.sort((a, b) => {
              return a.cost - b.cost;
            });
          }
        }
      }

      i++;
    }
    this.selected_squere = {
      x: 9,
      y: 9,
      color: '',
      is_selected: false,
      is_path: false,
    };

    if (i == 81) {
      return start;
    } else {
      return visited[0];
    }
  }
  check() {
    let to_clear: squere[] = [];

    for (let i = 0; i < 9; i++) {
      if (this.board[4][i].color !== 'black') {
        let jdown = 4,
          jup = 4;
        let step = 0;
        while (step < 4) {
          if (this.board[jdown + 1][i].color == this.board[4][i].color) {
            jdown++;
          }
          if (this.board[jup - 1][i].color == this.board[4][i].color) {
            jup--;
          }
          step++;
        }
        if (jdown - jup >= 4) {
          this.points += jdown - jup + 1;
          for (jup; jup <= jdown; jup++) {
            to_clear.push(this.board[jup][i]);
          }
        }
      }

      if (this.board[i][4].color !== 'black') {
        let jright = 4,
          jleft = 4;
        let step = 0;
        while (step < 4) {
          if (this.board[i][jright + 1].color == this.board[i][4].color) {
            jright++;
          }
          if (this.board[i][jleft - 1].color == this.board[i][4].color) {
            jleft--;
          }
          step++;
        }
        if (jright - jleft >= 4) {
          this.points += jright - jleft + 1;
          for (jleft; jleft <= jright; jleft++) {
            to_clear.push(this.board[i][jleft]);
          }
        }

        let jright_down = 4;
        let jleft_up = 4;
        step = 0;
        let index_last_left_up = i;
        while (step <= 4) {
          if (
            i + step <= 8 &&
            jright_down + 1 <= 8 &&
            this.board[i + step][jright_down + 1].color ==
              this.board[i][4].color
          ) {
            jright_down++;
          }
          if (
            i - step >= 0 &&
            jleft_up - 1 >= 0 &&
            this.board[i - step][jleft_up - 1].color == this.board[i][4].color
          ) {
            jleft_up--;
            index_last_left_up = i - step;
          }
          step++;
        }
        if (jright_down - jleft_up >= 4) {
          this.points += jright_down - jleft_up + 1;
          for (jleft_up; jleft_up <= jright_down; jleft_up++) {
            to_clear.push(this.board[index_last_left_up][jleft_up]);
            index_last_left_up++;
          }
        }

        let jleft_down = 4;
        let jright_up = 4;
        step = 0;
        let index_last_left_down = i;
        while (step <= 4) {
          if (
            i - step >= 0 &&
            jright_up + 1 <= 8 &&
            this.board[i - step][jright_up + 1].color == this.board[i][4].color
          ) {
            jright_up++;
          }
          if (
            i + step <= 8 &&
            jleft_down - 1 >= 0 &&
            this.board[i + step][jleft_down - 1].color == this.board[i][4].color
          ) {
            jleft_down--;
            index_last_left_down = i + step;
          }
          step++;
        }
        if (jright_up - jleft_down >= 4) {
          this.points += jright_up - jleft_down + 1;
          for (jleft_down; jleft_down <= jright_up; jleft_down++) {
            to_clear.push(this.board[index_last_left_down][jleft_down]);
            index_last_left_down--;
          }
        }
      }
    }

    if (to_clear.length == 0) {
      this.add_balls();
    } else {
      to_clear.forEach((element) => {
        this.board[element.x][element.y] = {
          color: 'black',
          x: element.x,
          y: element.y,
          is_selected: false,
          is_path: false,
        };
        this.empty.push({
          x: element.x,
          y: element.y,
        });
      });
    }
  }
  add_balls() {
    if (this.empty.length <= 3) {
      this.gameover();
    } else {
      for (let i = 0; i < 3; i++) {
        let color_index = Math.floor(Math.random() * 8);
        let squere_index = Math.floor(Math.random() * (this.empty.length - 1));
        this.board[this.empty[squere_index].x][
          this.empty[squere_index].y
        ].color = this.colors[color_index];
        this.empty.splice(squere_index, 1);
      }
    }
  }
  gameover() {
    this.is_end = true;
  }
}
