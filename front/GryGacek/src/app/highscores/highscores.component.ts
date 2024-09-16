import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackToMenuComponent } from '../back-to-menu/back-to-menu.component';
import { Score } from '../../models/score.type';
import { HttpClient } from '@angular/common/http';
import { backend_PORT, backend_URL } from '../../properties';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-highscores',
  standalone: true,
  imports: [CommonModule, FormsModule, BackToMenuComponent],
  templateUrl: './highscores.component.html',
  styleUrl: './highscores.component.scss',
})
export class HighscoresComponent {
  player_nickname = '';
  private http = inject(HttpClient);
  scores: Score[] = [];
  route: ActivatedRoute = inject(ActivatedRoute);
  game = '';
  constructor() {
    this.game = this.route.snapshot.params['game'];
    this.bests();
  }
  onSubmit() {
    this.nickname_scores(this.player_nickname);
  }
  bests() {
    this.scores = [];
    this.http
      .get<Score[]>(
        backend_URL + ':' + backend_PORT + '/' + this.game + '/results/bests'
      )
      .subscribe((res) => {
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
    this.http
      .get<Score[]>(
        backend_URL + ':' + backend_PORT + '/' + this.game + '/date/' + today
      )
      .subscribe((res) => {
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
    this.http
      .get<Score[]>(
        backend_URL + ':' + backend_PORT + '/' + this.game + '/date/' + week_ago
      )
      .subscribe((res) => {
        this.scores = res;
      });
  }
  nickname_scores(nickname: string) {
    this.scores = [];
    this.http
      .get<Score[]>(
        backend_URL + ':' + backend_PORT + '/' + this.game + '/' + nickname
      )
      .subscribe((res) => {
        this.scores = res;
      });
  }
}
