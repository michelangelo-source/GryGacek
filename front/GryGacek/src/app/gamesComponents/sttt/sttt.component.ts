import { afterNextRender, afterRender, Component, inject } from '@angular/core';
import { BackToMenuComponent } from '../../back-to-menu/back-to-menu.component';
import { ActivatedRoute } from '@angular/router';
import { StttSocketService } from './sttt.service';
export type stttCell = {
  big_cell_id: number;
  small_cell_id: number;
  is_active: boolean;
  char: string;
};

@Component({
  selector: 'app-sttt',
  standalone: true,
  imports: [BackToMenuComponent],
  templateUrl: './sttt.component.html',
  styleUrl: './sttt.component.scss',
})
export class StttComponent {
  cross_path = '/assets/images/sttt/cross.png';
  circle_path = '/assets/images/sttt/circle.png';
  draw_path = '/assets/images/sttt/draw.png';
  path: { [result: string]: string } = {
    cross: this.cross_path,
    circle: this.circle_path,
    tie: this.draw_path,
  };
  joining_room_status: string = 'Not connected';
  mode: string = 'Local';
  role: string = '';
  player_nickname: string = '';
  room_id: string = '';
  opponent_move_big_table: number = -1;
  opponent_move_small_table: number = -1;
  route: ActivatedRoute = inject(ActivatedRoute);
  cell_table: stttCell[][] = [];
  who_moves: string = 'circle';
  player_who_moves: string = '';
  player_char: string = '';
  private big_cells_count = { cross: 0, circle: 0, tie: 0 };
  big_cells_results: stttCell[] = [];
  fail_message!: string;
  constructor(private stttSocketService: StttSocketService) {}
  ngOnDestroy() {
    this.stttSocketService.leaveRoom();
  }
  ngOnInit() {
    this.mode = this.route.snapshot.params['mode'];
    if (this.mode == 'Online') {
      this.onlineConfig();
    }
    for (let i = 0; i < 9; i++) {
      this.big_cells_results.push({
        big_cell_id: i,
        small_cell_id: i,
        is_active: true,
        char: 'none',
      });
      let tmp_cell_table: stttCell[] = [];
      for (let j = 0; j < 9; j++) {
        tmp_cell_table.push({
          big_cell_id: i,
          small_cell_id: j,
          is_active: true,
          char: 'none',
        });
      }
      this.cell_table.push(tmp_cell_table);
    }
  }

  onlineConfig() {
    this.role = this.route.snapshot.params['role'];
    this.player_nickname = this.route.snapshot.params['player'];
    this.room_id = this.route.snapshot.params['room'];
    this.stttSocketService.getisConnected().subscribe((connected) => {
      if (connected) {
        if (this.role === 'admin') {
          this.player_who_moves = this.player_nickname;
          this.player_char = 'circle';
          this.stttSocketService.createRoom().subscribe((res) => {
            this.room_id = res;
            this.onlineGame();
          });
        } else {
          this.player_char = 'cross';
          this.onlineGame();
        }
      }
    });
    this.stttSocketService.connect();
  }
  onlineGame() {
    this.stttSocketService.subscribeToRoom(
      this.room_id,
      this.player_nickname,
      (res) => {
        if (res.message) {
          console.log(res);
          console.log(res.message);
          if (res.joined) {
            this.joining_room_status = 'connected';
            this.player_who_moves = res.userWhoMoves;
          } else if (
            res.joined === false &&
            this.player_nickname === res.userWhoMoves
          ) {
            this.stttSocketService.dissconect();
            this.joining_room_status = 'failed';
            this.who_moves = 'nobody';
            this.fail_message = res.message;
          }
        } else {
          this.player_who_moves = res.userName;
          this.add_char(res.bigTableId, res.smallTableId);
        }
      }
    );
    this.joining_room_status = 'conectting...';
    this.stttSocketService.joinRoom(this.room_id, this.player_nickname);
  }
  sendMove(bigId: number, smalId: number) {
    this.joining_room_status === 'connected'
      ? this.stttSocketService.sendNumbers(bigId, smalId)
      : null;
  }
  get_picture_path(result: string) {
    return this.path[result];
  }
  check(table: stttCell[]) {
    //0,1,2
    //3,4,5
    //6,7,8
    for (let i = 0; i <= 6; i += 3) {
      if (
        table[i].char != 'none' &&
        table[i].char == table[i + 1].char &&
        table[i].char == table[i + 2].char
      ) {
        return table[i].char;
      }
    }
    for (let i = 0; i <= 2; i++) {
      if (
        table[i].char != 'none' &&
        table[i].char == table[i + 3].char &&
        table[i].char == table[i + 6].char
      ) {
        return table[i].char;
      }
    }
    if (table[4].char != 'none') {
      if (
        table[0].char != 'none' &&
        table[0].char == table[4].char &&
        table[0].char == table[8].char
      ) {
        return table[0].char;
      }
      if (
        table[2].char != 'none' &&
        table[2].char == table[4].char &&
        table[2].char == table[6].char
      ) {
        return table[2].char;
      }
    }
    return 'none';
  }

  add_char(iid: number, jid: number) {
    console.log(this.who_moves);
    //zmiana ruchu i znakow

    if (this.who_moves == 'cross') {
      this.who_moves = 'circle';
      this.cell_table[iid][jid].char = 'cross';
    } else {
      this.who_moves = 'cross';
      this.cell_table[iid][jid].char = 'circle';
    }
    // sprawdzanie malych wygranych
    let small_result = this.check(this.cell_table[iid]);
    if (small_result == 'cross') {
      this.big_cells_count.cross++;
      this.big_cells_results[iid].char = small_result;
    }
    if (small_result == 'circle') {
      this.big_cells_count.circle++;
      this.big_cells_results[iid].char = small_result;
    }

    //sprawdzanie remisu
    let check_tie = true;
    if (this.big_cells_results[iid].char == 'none') {
      for (let i = 0; i < 9; i++) {
        if (this.cell_table[iid][i].char == 'none') {
          check_tie = false;
          break;
        }
      }
      if (check_tie) {
        this.big_cells_results[iid].char = 'tie';
        this.big_cells_count.tie++;
      }
    }

    //aktualizacja dziur
    if (this.big_cells_results[jid].char == 'none') {
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          this.cell_table[i][j].is_active = false;
          if (i == jid && this.cell_table[i][j].char == 'none') {
            this.cell_table[i][j].is_active = true;
          }
        }
      }
    } else {
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          this.cell_table[i][j].is_active = false;
          if (
            this.cell_table[i][j].char == 'none' &&
            this.big_cells_results[i].char == 'none'
          ) {
            this.cell_table[i][j].is_active = true;
          }
        }
      }
    }

    ///wygrana w duzych
    if (this.big_cells_count.circle >= 3 || this.big_cells_count.cross >= 3) {
      let big_result = this.check(this.big_cells_results);
      if (big_result != 'none') {
        alert(big_result + ' wins');
      }
    }
    if (
      this.big_cells_count.circle +
        this.big_cells_count.cross +
        this.big_cells_count.tie >=
      9
    ) {
      alert('remis');
    }
  }
}
