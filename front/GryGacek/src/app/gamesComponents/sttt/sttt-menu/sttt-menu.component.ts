import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BackToMenuComponent } from '../../../back-to-menu/back-to-menu.component';

@Component({
  selector: 'app-sttt-menu',
  standalone: true,
  imports: [RouterModule, BackToMenuComponent],
  templateUrl: './sttt-menu.component.html',
  styleUrl: './sttt-menu.component.scss',
})
export class StttMenuComponent {}
