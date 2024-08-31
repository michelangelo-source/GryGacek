import { Component } from '@angular/core';
import { coords } from '../../../models/cords.type';
import { NgClass } from '@angular/common';
interface click_and_slide_coords extends coords {
  id: number;
  place_id: number;
  can_switch: boolean;
}
@Component({
  selector: 'app-click-slide',
  standalone: true,
  imports: [NgClass],
  templateUrl: './click-slide.component.html',
  styleUrl: './click-slide.component.scss',
})
export class ClickSlideComponent {
  picture = 0;
  is_mixing = false;
  sizes: string[] = ['3x3', '4x4', '5x5', '6x6'];
  mask_path = '/assets/images/click_and_slide/mask.jpg';
  sunflower_path = '/assets/images/click_and_slide/sunflower.jpg';
  balck_sheep_path = '/assets/images/click_and_slide/black_sheep.jpg';
  paths = [this.mask_path, this.sunflower_path, this.balck_sheep_path];
  current_path = this.paths[this.picture];
  size = 3;
  switching_blocks = [
    this.size * this.size - 2,
    this.size * (this.size - 1) - 1,
  ];
  current_black_position = this.size * this.size - 1;
  background_pictures_coords: click_and_slide_coords[] = [];
  mixing_interval: NodeJS.Timeout = setTimeout(() => {}, 0);
  //mieszanie to tablica id ktore mozna ruszyc i wywlas block switch z losowym elementem duzo razy
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
    this.current_black_position = this.size * this.size - 1;
    this.background_pictures_coords = [];
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        this.background_pictures_coords.push({
          id: i * this.size + j,
          place_id: i * this.size + j,
          can_switch: false,
          x: (720 / this.size) * j * -1,
          y: (720 / this.size) * i * -1,
        });
      }
    }
    this.switching_blocks = [
      this.size * this.size - 2,
      this.size * (this.size - 1) - 1,
    ];
    for (let i = 0; i < this.switching_blocks.length; i++) {
      this.background_pictures_coords[this.switching_blocks[i]].can_switch =
        true;
    }

    this.mixing();
  }
  get_number_of_cols(size: number) {
    const number_of_cols: { [number: number]: string } = {
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
    };
    return number_of_cols[size];
  }
  change_picture(step: number) {
    this.picture += step;
    if (this.picture == -1) {
      this.picture = 2;
    }
    this.picture = this.picture % this.paths.length;
    this.current_path = this.paths[this.picture];
    this.set_size(this.size);
  }
  block_switch(block_position: number) {
    for (let i = 0; i < this.switching_blocks.length; i++) {
      this.background_pictures_coords[this.switching_blocks[i]].can_switch =
        false;
    }
    this.switching_blocks = [];

    let temp_block =
      this.background_pictures_coords[this.current_black_position];
    let temp_id = this.background_pictures_coords[block_position].place_id;
    this.background_pictures_coords[this.current_black_position] =
      this.background_pictures_coords[block_position];
    this.background_pictures_coords[this.current_black_position].place_id =
      temp_block.place_id;
    this.background_pictures_coords[block_position] = temp_block;
    this.background_pictures_coords[block_position].place_id = temp_id;

    this.current_black_position = block_position;

    let border = this.current_black_position % this.size;
    if (border != 0) {
      this.switching_blocks.push(this.current_black_position - 1);
    }
    if (border != this.size - 1) {
      this.switching_blocks.push(this.current_black_position + 1);
    }
    if (
      this.current_black_position + this.size <=
      this.background_pictures_coords.length - 1
    ) {
      this.switching_blocks.push(this.current_black_position + this.size);
    }
    if (this.current_black_position - this.size >= 0) {
      this.switching_blocks.push(this.current_black_position - this.size);
    }
    for (let i = 0; i < this.switching_blocks.length; i++) {
      this.background_pictures_coords[this.switching_blocks[i]].can_switch =
        true;
    }
    console.log(this.current_black_position);
    console.log(this.switching_blocks);
    if (!this.is_mixing) {
      setTimeout(() => {
        this.check_win();
      }, 1);
    }
  }
  check_win() {
    let win = true;
    this.background_pictures_coords.forEach((element) => {
      if (element.id != element.place_id) {
        win = false;
      }
    });
    if (win) {
      alert('koniec');
    }
  }
  mixing() {
    let i = 0;
    this.is_mixing = true;

    this.mixing_interval = setInterval(() => {
      let index = Math.floor(Math.random() * this.switching_blocks.length);
      this.block_switch(
        this.background_pictures_coords[this.switching_blocks[index]].id
      );

      if (i > 80) {
        clearInterval(this.mixing_interval);
        this.is_mixing = false;
      }
      i++;
    }, 100);
  }
}
