import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BackToMenuComponent } from '../../../back-to-menu/back-to-menu.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sttt-online-config',
  standalone: true,
  imports: [CommonModule, FormsModule, BackToMenuComponent, RouterModule],
  templateUrl: './sttt-online-config.component.html',
  styleUrl: './sttt-online-config.component.scss',
})
export class StttOnlineConfigComponent {
  player_nickname: string = '';
  is_joining: boolean = false;
  roomId: string = '';
  joining_room() {
    this.is_joining = true;
  }
}
