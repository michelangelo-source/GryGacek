import { Component } from '@angular/core';

interface squere {
  color: string;
  x: number;
  y: number;
  is_selected: boolean;
}

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
  selected_interval: NodeJS.Timeout = setTimeout(() => {}, 0);
  selected_squere: squere = { x: 9, y: 9, color: '', is_selected: false };
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
          is_selected: false,
        });
        this.empty.push({
          color: 'black',
          x: i,
          y: j,
          is_selected: false,
        });
      }
      this.board.push(row);
    }

    this.add_balls();
    this.add_balls();
    this.add_balls();
    this.add_balls();
    this.add_balls();
    this.add_balls();
  }
  chose_ball(selected_squre: squere) {
    if (selected_squre.color != 'black') {
      if (
        selected_squre.x == this.selected_squere.x &&
        selected_squre.x == this.selected_squere.y
      ) {
        ///////////////////////////////////////////////////////////////do tegho ifa nie wchodzi odklikanie

        clearInterval(this.selected_interval);
        selected_squre.is_selected = false;
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
      alert('czarne');
    }

    //html dla wszystkich kolorów

    //ruch
    //sprawdzanie 5 i wiećej
    //pkt
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
