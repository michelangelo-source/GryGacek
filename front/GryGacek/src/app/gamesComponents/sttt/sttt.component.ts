import { Component } from '@angular/core';

@Component({
  selector: 'app-sttt',
  standalone: true,
  imports: [],
  templateUrl: './sttt.component.html',
  styleUrl: './sttt.component.scss',
})
export class StttComponent {
  boards_table: number[][] = [];
  ngOnInit() {
    for (let i = 0; i < 9; i++) {
      this.boards_table.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }
  }

  add_chart(iid: number, jid: number) {
    alert(iid + ' ' + jid);
  }
}
