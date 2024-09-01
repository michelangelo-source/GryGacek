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
  is_last_cut_to_small = false;
  start_time = Date.now();
  solving_time = Date.now();
  hours = 0;
  minutes = 0;
  sec = 0;
  milisec = 0;
  is_solving = false;
  picture = 1;
  is_mixing = false;
  sizes: string[] = ['3x3', '4x4', '5x5', '6x6'];
  picture_size = 720;

  mask_path = '/assets/images/click_and_slide/mask.jpg';
  sunflower_path = '/assets/images/click_and_slide/sunflower.jpg';
  balck_sheep_path = '/assets/images/click_and_slide/black_sheep.jpg';

  mask_path_mini = '/assets/images/click_and_slide/mask_mini.jpg';
  sunflower_path_mini = '/assets/images/click_and_slide/sunflower_mini.jpg';
  balck_sheep_path_mini = '/assets/images/click_and_slide/black_sheep_mini.jpg';

  paths = [this.sunflower_path, this.mask_path, this.balck_sheep_path];
  paths_mini = [
    this.sunflower_path_mini,
    this.mask_path_mini,
    this.balck_sheep_path_mini,
  ];
  current_path = this.paths[this.picture];
  size = 3;
  switching_blocks = [
    this.size * this.size - 2,
    this.size * (this.size - 1) - 1,
  ];
  box_size = 120;
  current_black_position = this.size * this.size - 1;
  background_pictures_coords: click_and_slide_coords[] = [];
  time_interval: NodeJS.Timeout = setTimeout(() => {}, 0);

  //mieszanie to tablica id ktore mozna ruszyc i wywlas block switch z losowym elementem duzo razy
  ngOnInit() {
    if (window.innerWidth < 768) {
      this.picture_size = 360;
      this.current_path = this.paths_mini[this.picture];
    } else {
      this.picture_size = 720;
      this.current_path = this.paths[this.picture];
    }
    if (this.picture_size == 360) {
      this.is_last_cut_to_small = true;
    } else {
      this.is_last_cut_to_small = false;
    }
    this.box_size = this.picture_size / this.size;
    this.set_size(this.size);
    window.addEventListener('resize', () => {
      if (window.innerWidth < 768) {
        this.picture_size = 360;
        this.current_path = this.paths_mini[this.picture];
        if (!this.is_last_cut_to_small) {
          this.set_size(this.size);
          this.is_last_cut_to_small = true;
        }
      } else {
        this.picture_size = 720;
        this.current_path = this.paths[this.picture];
        if (this.is_last_cut_to_small) {
          this.set_size(this.size);
          this.is_last_cut_to_small = false;
        }
      }
      this.box_size = this.picture_size / this.size;
    });
  }
  get_current_path() {
    return this.current_path;
  }

  set_size(size: number) {
    this.size = size;
    this.box_size = this.picture_size / this.size;
    this.is_solving = false;
    this.current_black_position = this.size * this.size - 1;
    this.background_pictures_coords = [];
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        this.background_pictures_coords.push({
          id: i * this.size + j,
          place_id: i * this.size + j,
          can_switch: false,
          x: (this.picture_size / this.size) * j * -1,
          y: (this.picture_size / this.size) * i * -1,
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
    this.start_timer();
    this.mixing();
    console.log(this.isSolvable(this.background_pictures_coords, this.size));
  }
  start_timer() {
    this.start_time = Date.now();
    this.is_solving = true;
    this.time_interval = setInterval(() => {
      this.solving_time = Date.now() - this.start_time;
      this.milisec = this.solving_time % 1000;
      this.sec = Math.floor(this.solving_time / 1000);
      this.minutes = Math.floor(this.sec / 60);
      this.hours = Math.floor(this.minutes / 60);
    }, 1);
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
    if (window.innerWidth < 768) {
      this.picture_size = 360;
      this.current_path = this.paths_mini[this.picture];
    } else {
      this.picture_size = 720;
      this.current_path = this.paths[this.picture];
    }
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
      this.is_solving = false;
      clearInterval(this.time_interval);
      alert(this.solving_time);
    }
  }
  mixing() {
    this.is_mixing = true;
    for (let i = 0; i < 400; i++) {
      const index = Math.floor(Math.random() * this.switching_blocks.length);
      const selected_move = this.switching_blocks[index];
      this.block_switch(this.background_pictures_coords[selected_move].id);
    }
    this.is_mixing = false;
  }

  isSolvable(coords: click_and_slide_coords[], size: number): boolean {
    // Flatten the 2D array of IDs to a 1D array of IDs
    const flatIds = coords.map((coord) => coord.id);

    // Count the number of inversions
    let inversions = 0;
    for (let i = 0; i < flatIds.length - 1; i++) {
      for (let j = i + 1; j < flatIds.length; j++) {
        if (flatIds[i] > flatIds[j] && flatIds[j] !== flatIds.length - 1) {
          inversions++;
        }
      }
    }

    // For odd-sized grids, just check the number of inversions
    // For even-sized grids, also need to check the row of the empty space
    if (size % 2 === 1) {
      // Odd-sized grids: inversion count must be even
      return inversions % 2 === 0;
    } else {
      // Even-sized grids: row of empty space affects solvability
      const emptyRow = Math.floor(flatIds.indexOf(flatIds.length - 1) / size);
      return (
        (inversions % 2 === 0 && emptyRow % 2 === 1) ||
        (inversions % 2 === 1 && emptyRow % 2 === 0)
      );
    }
  }
}
