import { Component } from '@angular/core';

@Component({
  selector: 'app-click-slide',
  standalone: true,
  imports: [],
  templateUrl: './click-slide.component.html',
  styleUrl: './click-slide.component.scss',
})
export class ClickSlideComponent {
  sizes: string[] = ['3x3', '4x4', '5x5', '6x6'];
  mask_path = '/assets/images/click_and_slide/mask.jpg';
  sunflower_path = '/assets/images/click_and_slide/sunflower.jpg';
  balck_sheep_path = '/assets/images/click_and_slide/black_sheep.jpg';
  paths = [this.mask_path, this.sunflower_path, this.balck_sheep_path];
  current_path = this.paths[0];
  size = 3;
  set_size(size: number) {
    this.size = size;
    console.log(this.size);
  }
}
