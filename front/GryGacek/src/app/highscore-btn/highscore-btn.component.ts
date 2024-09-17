import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-higscore-btn',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './highscore-btn.component.html',
  styleUrl: './highscore-btn.component.scss',
})
export class HighscoreBtnComponent {
  @Input() game: string = '';
}
