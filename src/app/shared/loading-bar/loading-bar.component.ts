import { Component, OnInit } from '@angular/core';
import { LoadingBarService } from './loading-bar.service';
@Component({
  selector: 'loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.less']
})
export class LoadingBarComponent implements OnInit {
  show = false;
  timer = [];

  mask_show = false;
  constructor() {
    LoadingBarService.loading = this;
  }

  ngOnInit() {
  }

  open() {
      this.mask_show = true;
      this.timer.push(setTimeout(() => {
          this.show = true;
      }, 500));
  }

  close() {
      this.timer.forEach((c, i) => {
          clearTimeout(this.timer[i]);
      });
    this.show = false;
    this.mask_show = false;
  }
}
