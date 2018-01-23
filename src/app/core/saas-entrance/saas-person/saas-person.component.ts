import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-saas-person',
  templateUrl: './saas-person.component.html',
  styleUrls: ['./saas-person.component.css']
})
export class SaasPersonComponent implements OnInit {
  // 轮播图状态： prev, next, active , none
  public cursoul_item = [1, 2, 3, 4];
  public cursoul_item_state = ['active', 'next', '', ''];
  public url = '/assets/entry/entry-person-';
  public cursoul_item_url = this.cursoul_item.map(item => `${this.url}${item}.png`);
  public timer;
  public is_animate = false;
  public cursoul_item_style = this.cursoul_item_state.map(item => `${item} out-wrapper`);
  public cursoul_content = [{top: '1. 验证手机', bottom: '输入手机号，接收验证码，完成注册'}
    , {top: '2. 填写基本信息', bottom: '填写社保信息，选择社保城市'}
    , {top: '3. 生成账单', bottom: '确认社保基数和缴纳月份，生成账单'}
    , {top: '4. 支付账单', bottom: '支付账单，等待小蚁通知您好消息吧~'}]

  constructor() {
  }

  ngOnInit() {
    this.autoMove();
  }

  autoMove() {
    const length = this.cursoul_item_state.length;
    this.timer = setInterval(() => {
      this.is_animate = true;
      const index = this.cursoul_item_state.indexOf('active');
      this.transferClass(index, length);
      this.cursoul_item_style = this.cursoul_item_state.map(item => `${item} out-wrapper`);
    }, 3000);
  }

  transferClass(index, length) {
    this.cursoul_item_state = this.cursoul_item_state.map(item => '');
    if (index >= 0) {
      this.cursoul_item_state[index] = 'prev';
    } else {
      this.cursoul_item_state[length - 1] = 'prev';
    }
    if (index + 1 < length) {
      this.cursoul_item_state[index + 1] = 'active';
    } else {
      this.cursoul_item_state[0] = 'active';
    }
    if (index + 2 < length) {
      this.cursoul_item_state[index + 2] = 'next';
    } else if (index + 2 >= length) {
      this.cursoul_item_state[index + 2 - length] = 'next';
    }
    this.is_animate = false;
  }

  showCurrent(index) {
    clearInterval(this.timer);
    this.timer = null;
    const current_index = this.cursoul_item_state.indexOf('active');
    let i = 0;
    const m = Math.abs(index - current_index) / (index - current_index);
    this.timer = setInterval(() => {
      if (i <= Math.abs(index - current_index)) {
        this.transferClass(current_index - 1 + i * m, this.cursoul_item_state.length);
        this.cursoul_item_style = this.cursoul_item_state.map(item => `${item} out-wrapper handle`);
        i++;
      } else {
        clearInterval(this.timer);
        this.autoMove();
      }
    }, 150);
  }
}
