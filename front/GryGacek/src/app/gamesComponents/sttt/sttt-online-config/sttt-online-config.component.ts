import { CommonModule } from '@angular/common';
import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export type StttOnlineConfig = {
  player_nickname: string;
  role: string;
  roomId?: string;
};
@Component({
  selector: 'app-sttt-online-config',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sttt-online-config.component.html',
  styleUrl: './sttt-online-config.component.scss',
})
export class StttOnlineConfigComponent {
  player_nickname: string = '';
  role: string = '';
  step: string = 'nickname';
  roomId: string = '';
  onlineConfig = output<StttOnlineConfig>();
  onSubmit() {
    if (this.player_nickname.length > 0) {
      this.step = 'role';
    }
  }
  setRole(role: string) {
    this.role = role;
    if (role === 'admin') {
      this.onlineConfig.emit({
        player_nickname: this.player_nickname,
        role: this.role,
      });
    } else {
      this.step = 'insertRoomId';
    }
  }
  joinRoom() {
    this.onlineConfig.emit({
      player_nickname: this.player_nickname,
      role: this.role,
      roomId: this.roomId,
    });
  }
}
