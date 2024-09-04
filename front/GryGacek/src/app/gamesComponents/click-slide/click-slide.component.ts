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
  seconds = 0;
  milisec = 0;
  is_solving = false;
  is_picture_changing = false;
  picture = 1;
  sizes: string[] = ['3x3', '4x4', '5x5', '6x6'];
  picture_size = 720;
  arrow_path = '/assets/images/arrow.png';
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
  mode = 'big';
  ngOnInit() {
    const keyframe1 = `
   @keyframes change_size_small {
  0% {
    width: 80px;
    height: 80px;
  }

  100% {
    width: 112px;
    height: 112px;
  }
}
  `;
    const keyframe2 = `
@keyframes change_size_normal {
  0% {
    width: 128px;
    height: 128px;
  }

  100% {
    width: 160px;
    height: 160px;
  }
}
 `;
    const keyframe3 = `
@keyframes change_size_big {
  0% {
    width: 160px;
    height: 160px;
  }

  100% {
    width: 192px;
    height: 192px;
  }
}
`;

    document.styleSheets[0].insertRule(keyframe1);
    document.styleSheets[0].insertRule(keyframe2);
    document.styleSheets[0].insertRule(keyframe3);

    if (window.innerWidth < 768) {
      this.mode = 'small';
      this.picture_size = 360;
      this.current_path = this.paths_mini[this.picture];
    } else {
      if (window.innerWidth <= 1280) {
        this.mode = 'normal';
      } else {
        this.mode = 'big';
      }
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
        this.mode = 'small';
        this.picture_size = 360;
        this.current_path = this.paths_mini[this.picture];
        if (!this.is_last_cut_to_small) {
          this.set_size(this.size);
          this.is_last_cut_to_small = true;
        }
      } else {
        if (window.innerWidth >= 1280) {
          this.mode = 'big';
        } else {
          this.mode = 'normal';
        }
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
  ngOnDestroy() {
    clearInterval(this.time_interval);
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
    this.shuffling();

    this.start_timer();
    this.is_solving = true;
  }
  start_timer() {
    clearInterval(this.time_interval);
    this.start_time = Date.now();

    this.time_interval = setInterval(() => {
      this.solving_time = Date.now() - this.start_time;
      this.milisec = this.solving_time % 1000;
      this.seconds = Math.floor(this.solving_time / 1000) % 60;
      this.minutes = Math.floor(this.solving_time / 60000) % 60;
      this.hours = Math.floor(this.solving_time / 3600000);
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
    this.is_picture_changing = true;
    this.picture += step;
    if (this.picture == -1) {
      this.picture = 2;
    }
    this.picture = this.picture % this.paths.length;

    let picture_0 = document.getElementById('picture_0');
    let picture_1 = document.getElementById('picture_1');
    let picture_2 = document.getElementById('picture_2');
    let deltaXend = 0;
    let deltaYend = 0;
    let deltaX = 0;
    let deltaY = 0;
    if (picture_0 && picture_1 && picture_2) {
      deltaXend =
        (picture_0.getBoundingClientRect().left -
          picture_2.getBoundingClientRect().left) /
        2;
      deltaYend =
        (picture_0.getBoundingClientRect().top -
          picture_2.getBoundingClientRect().top) /
        2;

      if (this.mode == 'big') {
        deltaX = 0;
        deltaY = (picture_0.getBoundingClientRect().height + 16) * -1;
      } else {
        deltaY = 0;
        deltaX = (picture_0.getBoundingClientRect().height + 16) * -1;
      }

      console.log('deltaXend:', deltaXend, 'deltaYend:', deltaYend);
      console.log('deltaX:', deltaX, 'deltaY:', deltaY);
      picture_0.style.transition = 'transform 1s ease';
      picture_1.style.transition = 'transform 1s ease';
      picture_2.style.transition = 'transform 1s ease';

      picture_1.style.animation = 'change_size_' + this.mode + ' 1s 1';
      picture_1.style.animationDirection = 'reverse';
      picture_1.style.animationTimingFunction = 'ease';

      if (step == 1) {
        picture_2.style.animation = 'change_size_' + this.mode + ' 1s 1';
        picture_2.style.animationTimingFunction = 'ease';

        picture_0.style.transform = `translate(${-2 * deltaXend}px, ${
          -2 * deltaYend
        }px)`;
        picture_1.style.transform = `translate(${deltaX}px, ${deltaY}px) `;
        picture_2.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      } else {
        picture_0.style.animation = 'change_size_' + this.mode + ' 1s 1';
        picture_0.style.animationTimingFunction = 'ease';
        picture_2.style.zIndex = '0';
        picture_1.style.zIndex = '1';
        picture_0.style.zIndex = '1';

        picture_0.style.transform = `translate(${deltaX * -1}px, ${
          deltaY * -1
        }px)`;
        picture_1.style.transform = `translate(${deltaX * -1}px, ${
          deltaY * -1
        }px)`;

        picture_2.style.transform = `translate(${2 * deltaXend}px, ${
          2 * deltaYend
        }px)`;
      }
    }

    setTimeout(() => {
      if (picture_0 && picture_1 && picture_2) {
        picture_0.style.animation = '';
        picture_1.style.animation = '';
        picture_2.style.animation = '';

        picture_0.style.transition = '';
        picture_1.style.transition = '';
        picture_2.style.transition = '';

        picture_0.style.transform = '';
        picture_1.style.transform = '';
        picture_2.style.transform = '';
        picture_1.classList.value =
          ' m-2 w-20 h-20 md:w-32 md:h-32 xl:w-40 xl:h-40';
        // picture_1.style.width = dimensions + 'px';
        // picture_1.style.height = dimensions + 'px';
        if (step == -1) {
          // picture_0.style.width = dimensions + 32 + 'px';
          // picture_0.style.height = dimensions + 32 + 'px';
          picture_2.style.zIndex = '0';
          picture_1.style.zIndex = '0';
          picture_0.style.zIndex = '0';
          document.getElementById('slider')?.insertBefore(picture_2, picture_0);
          picture_2.id = 'picture_0';
          picture_0.id = 'picture_1';
          picture_1.id = 'picture_2';
          picture_0.classList.value =
            'm-2 w-28 h-28 md:w-40 md:h-40 xl:w-48 xl:h-48';

          picture_2.classList.value =
            ' m-2 w-20 h-20 md:w-32 md:h-32 xl:w-40 xl:h-40';
        } else {
          // picture_2.style.width = dimensions + 32 + 'px';
          // picture_2.style.height = dimensions + 32 + 'px';
          document.getElementById('slider')?.insertBefore(picture_2, picture_0);
          document.getElementById('slider')?.insertBefore(picture_1, picture_2);
          picture_2.id = 'picture_1';
          picture_0.id = 'picture_2';
          picture_1.id = 'picture_0';
          picture_2.classList.value =
            'm-2 w-28 h-28 md:w-40 md:h-40 xl:w-48 xl:h-48';

          picture_0.classList.value =
            ' m-2 w-20 h-20 md:w-32 md:h-32 xl:w-40 xl:h-40';
        }
      }
      this.is_picture_changing = false;
      if (window.innerWidth < 768) {
        this.picture_size = 360;
        this.current_path = this.paths_mini[this.picture];
      } else {
        this.picture_size = 720;
        this.current_path = this.paths[this.picture];
      }
      this.set_size(this.size);
    }, 1000);
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

    if (this.is_solving) {
      setTimeout(() => {
        this.check_win();
      }, 10);
    }
  }
  check_win() {
    let win = true;
    for (let i = 0; i < this.background_pictures_coords.length; i++) {
      if (
        this.background_pictures_coords[i].id !=
        this.background_pictures_coords[i].place_id
      ) {
        win = false;
      }
    }

    if (win) {
      clearInterval(this.time_interval);
      this.is_solving = false;
      console.log(document.getElementById('timer')?.innerText);
    }
  }
  shuffling() {
    for (let i = 0; i < 300; i++) {
      let block_to_switch_index = Math.floor(
        Math.random() * this.switching_blocks.length
      );
      this.block_switch(this.switching_blocks[block_to_switch_index]);
    }
    if (!this.is_solvable(this.background_pictures_coords)) {
      this.shuffling();
    }
  }
  solved() {
    this.background_pictures_coords.forEach((element) => {
      element.id = element.place_id;
    });
    this.check_win();
  }
  is_solvable(coords: click_and_slide_coords[]): boolean {
    let inversions = 0;
    for (let i = 0; i < coords.length - 1; i++) {
      for (let j = i + 1; j < coords.length; j++) {
        if (coords[i].id > coords[j].id && coords[j].id !== coords.length - 1) {
          inversions++;
        }
      }
    }
    if (this.size % 2 === 1) {
      return inversions % 2 === 0;
    } else {
      let emptyRow = Math.floor(this.current_black_position / this.size);
      return (
        (inversions % 2 === 0 && emptyRow % 2 === 1) ||
        (inversions % 2 === 1 && emptyRow % 2 === 0)
      );
    }
  }
}
