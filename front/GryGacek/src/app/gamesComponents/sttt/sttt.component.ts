import { Component, inject } from '@angular/core';
import { BackToMenuComponent } from '../../back-to-menu/back-to-menu.component';
import { ActivatedRoute } from '@angular/router';
import { StttSocketService } from './sttt.service';
import {
  StttOnlineConfig,
  StttOnlineConfigComponent,
} from './sttt-online-config/sttt-online-config.component';
export type stttCell = {
  big_cell_id: number;
  small_cell_id: number;
  is_active: boolean;
  char: string;
};

@Component({
  selector: 'app-sttt',
  standalone: true,
  imports: [BackToMenuComponent, StttOnlineConfigComponent],
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
  private stttSocketService = inject(StttSocketService);
  subscribe_status: boolean = false;
  is_end = false;
  result: string = '';
  get_players: boolean = true;
  players: string[] = [];
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
  message: string = '';
  moves_count: number = 0;

  ngOnDestroy() {
    if (this.subscribe_status) {
      this.stttSocketService.dissconect();
    }
  }
  ngOnInit() {
    this.mode = this.route.snapshot.params['mode'];
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
  onlineConfig(config: StttOnlineConfig) {
    this.role = config.role;
    this.player_nickname = config.player_nickname;
    if (this.role === 'admin') {
      this.player_who_moves = this.player_nickname;
      this.player_char = 'circle';
      this.stttSocketService.createRoom().subscribe((roomId) => {
        this.room_id = roomId;
        this.joinRoom();
      });
    } else {
      config.roomId ? (this.room_id = config.roomId) : null;
      this.player_char = 'cross';
      this.joinRoom();
    }
  }
  joinRoom() {
    this.stttSocketService
      .joinRoom(this.room_id, this.player_nickname)
      .subscribe((res) => {
        this.message = res.message;
        setTimeout(() => {
          this.clear_message();
        }, 2000);
        if (res.joined) {
          this.onlineGame();
        } else if (res.joined === false) {
          setTimeout(() => {
            this.role = '';
          }, 2000);
          this.who_moves = 'nobody';
        }
      });
  }

  onlineGame() {
    this.stttSocketService.getIsConnected().subscribe((connected) => {
      if (connected) {
        this.stttSocketService.subscribeToRoom((res) => {
          let addressees: string[] = res.addressees;
          let access = false;
          addressees.forEach((nicknames) => {
            if (nicknames === this.player_nickname) {
              access = true;
            }
          });
          if (access) {
            if (res.users) {
              this.players = res.users;
              this.player_who_moves = this.players[0];
            } else if (res.message) {
              this.message = res.message;
              setTimeout(() => {
                this.clear_message();
              }, 2000);
            } else {
              this.add_char(res.bigTableId, res.smallTableId);
              this.moves_count++;

              this.player_who_moves = this.players[this.moves_count % 2];
            }
          }
        });
      }
    });
    this.stttSocketService.getIsSubscribed().subscribe((subscribed) => {
      if (subscribed) {
        this.subscribe_status = true;
        this.stttSocketService.getPlayers();
      }
    });
    this.stttSocketService.connect();
  }
  sendMove(bigId: number, smalId: number) {
    if (this.players.length < 2) {
      this.message = 'Wait for another player';
      setTimeout(() => {
        this.clear_message();
      }, 2000);
    } else {
      this.stttSocketService.sendNumbers(bigId, smalId);
    }
  }
  clear_message() {
    this.message = '';
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
        this.is_end = true;
        if (this.mode === 'Online') {
          this.result = this.player_who_moves + ' wins';
        } else {
          this.result = big_result + ' wins';
        }
      }
    }
    if (
      this.big_cells_count.circle +
        this.big_cells_count.cross +
        this.big_cells_count.tie >=
      9
    ) {
      this.is_end = true;
      this.result = 'draw';
    }
  }
}
