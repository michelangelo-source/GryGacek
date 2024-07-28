import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-back-to-menu',
  standalone: true,
  imports: [],
  templateUrl: './back-to-menu.component.html',
  styleUrl: './back-to-menu.component.scss',
})
export class BackToMenuComponent {
  back_to_menu() {
    window.location.reload();
  }
}
