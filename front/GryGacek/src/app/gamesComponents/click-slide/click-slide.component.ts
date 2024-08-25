import { Component } from '@angular/core';
import { coords } from '../../../models/cords.type';

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
  background_pictures_coords: coords[] = [];
  ngOnInit() {
    this.set_size(this.size);
  }
  get_current_path() {
    return this.current_path;
  }
  get_box_size() {
    return 720 / this.size;
  }
  set_size(size: number) {
    this.size = size;
    this.background_pictures_coords = [];
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        this.background_pictures_coords.push({
          x: (720 / this.size) * j * -1,
          y: (720 / this.size) * i * -1,
        });
      }
    }
    console.log(this.background_pictures_coords);
  }
}
