import { Component } from '@angular/core';
import { stttCell } from '../../../models/stttCell';

@Component({
  selector: 'app-sttt',
  standalone: true,
  imports: [],
  templateUrl: './sttt.component.html',
  styleUrl: './sttt.component.scss',
})
export class StttComponent {
  cell_table: stttCell[][] = [];
  who_moves: boolean = true;
  private big_cells_count = { cross: 0, circle: 0 };
  big_cells_results: stttCell[] = [];
  ngOnInit() {
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

  add_chart(iid: number, jid: number) {
    //zmiana ruchu i znakow
    this.who_moves = !this.who_moves;
    if (this.who_moves) {
      this.cell_table[iid][jid].char = 'cross';
    } else {
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
        window.location.reload();
      }
    }
    if (this.big_cells_count.circle + this.big_cells_count.cross >= 9) {
      alert('remis');
      window.location.reload();
    }
  }
}
