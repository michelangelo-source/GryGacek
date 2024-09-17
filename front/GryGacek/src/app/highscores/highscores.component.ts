import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackToMenuComponent } from '../back-to-menu/back-to-menu.component';
import { Score } from '../../models/score.type';
import { HttpClient } from '@angular/common/http';
import { backend_PORT, backend_URL } from '../../properties';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Minesweeper_modes } from '../gamesComponents/minesweeper/minesweeper.component';
import { ClickAndSlide_sizes } from '../gamesComponents/click-slide/click-slide.component';

@Component({
  selector: 'app-highscores',
  standalone: true,
  imports: [CommonModule, FormsModule, BackToMenuComponent],
  templateUrl: './highscores.component.html',
  styleUrl: './highscores.component.scss',
})
export class HighscoresComponent {
  player_nickname = '';
  modes: string[] = [];
  mode_index: number = 0;
  private http = inject(HttpClient);
  scores: Score[] = [];
  route: ActivatedRoute = inject(ActivatedRoute);
  game = '';
  constructor() {
    this.game = this.route.snapshot.params['game'];
    if (this.game == 'minesweeper') {
      this.modes = [...Minesweeper_modes];
      this.modes.pop();
    } else if (this.game == 'clickandslide') {
      this.modes = ClickAndSlide_sizes;
    }
    this.bests();
  }
  onSubmit() {
    if (this.player_nickname.length > 0) {
      this.nickname_scores(this.player_nickname);
    }
  }
  set_mode(index: number) {
    this.mode_index = index;
    this.bests();
  }
  bests() {
    this.scores = [];
    let url = '';
    if (this.modes.length > 0) {
      url =
        backend_URL +
        ':' +
        backend_PORT +
        '/' +
        this.game +
        '/results/bests/' +
        this.modes[this.mode_index];
    } else {
      url =
        backend_URL + ':' + backend_PORT + '/' + this.game + '/results/bests';
    }
    this.http.get<Score[]>(url).subscribe((res) => {
      this.scores = res;
    });
  }
  today() {
    this.scores = [];

    let core_date = new Date();
    let today: string = core_date.getFullYear() + '-';
    if (core_date.getMonth() + 1 < 10) {
      today += '0';
    }
    today += core_date.getMonth() + 1 + '-';
    if (core_date.getDate() < 10) {
      today += '0';
    }
    today += core_date.getDate();
    let url = '';
    if (this.modes.length > 0) {
      url =
        backend_URL +
        ':' +
        backend_PORT +
        '/' +
        this.game +
        '/date/' +
        today +
        '/' +
        this.modes[this.mode_index];
    } else {
      url =
        backend_URL + ':' + backend_PORT + '/' + this.game + '/date/' + today;
    }
    this.http.get<Score[]>(url).subscribe((res) => {
      this.scores = res;
    });
  }
  week() {
    this.scores = [];
    let core_date = new Date();
    core_date.setDate(core_date.getDate() - 7);
    let week_ago: string = core_date.getFullYear() + '-';
    if (core_date.getMonth() + 1 < 10) {
      week_ago += '0';
    }
    week_ago += core_date.getMonth() + 1 + '-';
    if (core_date.getDate() < 10) {
      week_ago += '0';
    }
    week_ago += core_date.getDate();
    let url = '';
    if (this.modes.length > 0) {
      url =
        backend_URL +
        ':' +
        backend_PORT +
        '/' +
        this.game +
        '/date/' +
        week_ago +
        '/' +
        this.modes[this.mode_index];
    } else {
      url =
        backend_URL +
        ':' +
        backend_PORT +
        '/' +
        this.game +
        '/date/' +
        week_ago;
    }
    this.http.get<Score[]>(url).subscribe((res) => {
      this.scores = res;
    });
  }
  nickname_scores(nickname: string) {
    this.scores = [];

    let url = '';
    if (this.modes.length > 0) {
      url =
        backend_URL +
        ':' +
        backend_PORT +
        '/' +
        this.game +
        '/' +
        nickname +
        '/' +
        this.modes[this.mode_index];
    } else {
      url = backend_URL + ':' + backend_PORT + '/' + this.game + '/' + nickname;
    }
    this.http.get<Score[]>(url).subscribe((res) => {
      this.scores = res;
    });
  }
}
