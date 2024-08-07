import { Component } from '@angular/core';

interface squere {
  color: string;
  x: number;
  y: number;
}

@Component({
  selector: 'app-kulki',
  standalone: true,
  imports: [],
  templateUrl: './kulki.component.html',
  styleUrl: './kulki.component.scss',
})
export class KulkiComponent {
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
  ngOnInit() {
    for (let i = 0; i < 9; i++) {
      let row: squere[] = [];
      for (let j = 0; j < 9; j++) {
        row.push({
          color: 'black',
          x: i,
          y: j,
        });
        this.empty.push({
          color: 'black',
          x: i,
          y: j,
        });
      }
      this.board.push(row);
    }
    while (this.empty.length > 1) {
      this.add_balls();
    }
  }
  chose_ball(x: number, y: number) {
    alert('x: ' + x + ' y:' + y);
  }
  add_balls() {
    if (this.empty.length < 3) {
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
