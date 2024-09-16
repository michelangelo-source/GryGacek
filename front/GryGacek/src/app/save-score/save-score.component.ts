import { Component, inject, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { backend_PORT, backend_URL } from '../../properties';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-save-score',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './save-score.component.html',
  styleUrl: './save-score.component.scss',
})
export class SaveScoreComponent {
  private http = inject(HttpClient);

  is_end = true;
  player_nickname = '';
  @Input() score: number | string = 0;
  @Input() mode?: string;
  @Input() game: string = '';
  @Output() end = new EventEmitter<boolean>();
  save_score(is_saved: boolean) {
    this.is_end = false;
    if (is_saved) {
      if (this.player_nickname.length > 0) {
        this.http
          .post(backend_URL + ':' + backend_PORT + '/' + this.game, {
            nickname: this.player_nickname,
            result: this.score,
          })
          .subscribe(() => {});
      } else {
        alert('please insert your nick');
        this.is_end = true;
        return;
      }
    }
    this.end.emit(true);
  }
}
