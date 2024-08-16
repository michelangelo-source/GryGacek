import { Component } from '@angular/core';

export type squere = {
  color: string;
  x: number;
  y: number;
  is_selected: boolean;
  is_path: boolean;
};
export type path_node = {
  cost: number;
  prev?: path_node;
  x: number;
  y: number;
  visited: boolean;
};

@Component({
  selector: 'app-kulki',
  standalone: true,
  imports: [],
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
  selected_squere: squere = {
    x: 9,
    y: 9,
    color: '',
    is_selected: false,
    is_path: false,
  };
  board: squere[][] = [];
  empty: squere[] = [];
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

  pythagoras(x1: number, y1: number, x2: number, y2: number) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
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
          color: 'black',
          x: i,
          y: j,
          is_selected: false,
          is_path: false,
        });
      }
      this.board.push(row);
    }

    this.add_balls();
  }
  get_color_path(color: string) {
    return this.paths[color];
  }
  chose_ball(selected_squre: squere) {
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
        this.board[this.selected_squere.x][this.selected_squere.y].is_selected =
          false;
        let path_elem = this.find_path(selected_squre);
        console.log(path_elem);
        if (path_elem.cost != 999) {
          let path: path_node[] = [];
          while (path_elem.prev) {
            this.board[path_elem.x][path_elem.y].is_path = true;
            path.unshift(path_elem);
            path_elem;
            path_elem = path_elem.prev;
          }
          let i = 0;
          // this.ball_step(path[i].x, path[i].y, path[i + 1].x, path[i + 1].y);
          // this.animation_interval = setInterval(() => {
          //   this.ball_step(path[i].x, path[i].y, path[i + 1].x, path[i + 1].y);
          //   i++;
          //   if (i == path.length - 2) {
          //     clearInterval(this.animation_interval);
          //   }
          // }, 200);
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
    console.log(this.selected_squere);
    console.log(destination);

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
      this.check();
      return visited[0];
    }
  }
  check() {
    console.log('check');
    //krzyz w srodku
    //4tablice rzedzy kolumny skosy rosnoce malejace
    this.add_balls();
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
    alert('dupa');
  }
}
