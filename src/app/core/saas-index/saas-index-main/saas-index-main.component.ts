import {Component, OnInit} from '@angular/core';
import {FormControl, Validators, FormBuilder, FormGroup} from "@angular/forms";
import {phoneValid} from "../../../shared/validators/staff-upload-validator";
import {SaasIndexService} from "../../../shared/service/saas-index/saas-index.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-saas-index-main',
  templateUrl: './saas-index-main.component.html',
  styleUrls: ['./saas-index-main.component.css', '../index-main.less']
})
export class SaasIndexMainComponent implements OnInit {
// 轮播图状态： prev, next, active , none
  public cursoul_direction = 1;
  public cursoul_item = [1, 2, 3];
  public cursoul_item_state = ['prev', 'active', 'next', ''];
  public url = '/assets/index/main/display';
  public cursoul_item_url = this.cursoul_item.map(item => `${this.url}${item}.png`);
  public timer;
  public is_animate = false;
  public cursoul_item_style = this.cursoul_item_state.map(item => `${item} out-wrapper`);
  public cursoul_content = [
    {
      title: '蚂蚁HR完成千万级A轮融资',
      content: '今日，36氪此前报道过的蚂蚁HR正式宣布，完成了千万元级的A轮融资，领投方为启赋资本，春晓资本跟投。据蚂蚁HR CEO黎阳介绍，此轮融资所筹得的资金，将主要用于扩张公司网点，以及研发相应产品以切入30人至300人的中型企业市场。'
    }
    , {
      title: '蚂蚁HR荣膺2016年最具投资价值创业公司',
      content: '2016年的冬至，IT桔子与拓扑社联合主办的“企途时代：IT桔子2016年企业服务创投峰会”在北京隆重举行。活动现场还发布了2016年四项企业服务领域重磅榜单，其中，专注企业人力资源服务的蚂蚁HR荣获最具投资价值创业公司奖项，企业价值获得肯定。'
    }
    , {
      title: '蚂蚁HR:“互联网+”时代的云端人力资源部',
      content: '新的需求催生出新的行业，社保代理服务在互联网时代也形成了新的服务模式，相应的新产品、新团队层出，作为他们中的领先者，蚂蚁HR带来了让人眼前一亮的社保代理一站式服务。'
    }];
  public sign_msg: FormGroup;
  public mobile_tip = '输入您的手机号';

  constructor(public fb: FormBuilder,
              public saasIndexService: SaasIndexService,
              public router: Router) {
    this.sign_msg = this.fb.group({
      mobile: ['', [Validators.required, phoneValid]],
      contact: [''],
      comment: ['']
    });
  }

  ngOnInit() {
  }


  transferClass(direction) {
    let arr = ['cursoul_item', 'cursoul_item_state', 'cursoul_content', 'cursoul_item_url', 'cursoul_item_style']
    this.cursoul_direction = direction;
    if (direction > 0) {
      this.cursoul_item_state.unshift('');
      this.cursoul_item.push(this.cursoul_item[0]);
      this.cursoul_content.push(this.cursoul_content[0]);
    } else {
      this.cursoul_item_state.push('');
      this.cursoul_item.unshift(this.cursoul_item[2]);
      this.cursoul_content.unshift(this.cursoul_content[2]);
    }
    this.cursoul_item_url = this.cursoul_item.map(item => `${this.url}${item}.png`);
    const timer = setTimeout(() => {
      if (direction > 0) {
        arr.forEach((item) => {
          this[item].shift();
        });
      } else {
        arr.forEach((item) => {
          this[item].pop();
        });
      }

      clearTimeout(timer);
    }, 200);
    this.is_animate = false;
  }

  showCurrent(direction = 1) {
    // let i = 0;
    // this.timer = setInterval(() => {
    this.transferClass(direction);
    this.cursoul_item_style = this.cursoul_item_state.map(item => `${item} out-wrapper handle`);
    // i++;
    // clearInterval(150)
    // }, 150);
  }

  preSign() {
    let mobile = this.sign_msg.get('mobile');
    let email = this.sign_msg.get('email');
    let submit_data = {type: 1};
    if (mobile.valid) {
      submit_data = Object.assign({mobile: mobile.value});
      this.saasIndexService.preSign(submit_data)
        .subscribe(data => {
          if (data.status_code == 200) {
            alert('提交成功，客服将在一个工作日内与您联系。');
            let jump_url = `${window.location.href.split('#')[0]}/#/entry/register?mobile=${mobile.value}`;
            window.location.href = jump_url;
          } else {
            alert(data.message ? data.message : '提交失败');
          }
        });
    }else {
      this.sign_msg.get('mobile').setValue('');
      this.mobile_tip = '请填写正确的手机号码！'
    }
  }

  login() {
    // this.before_submit = true;
    // if (this.login_form.valid && !this.error_type) {
    //   this.httpService.myJsonp(this.userService.getAuthorization(), {params: this.login_form.value})
    //     .subscribe(data => {
    //       if (data.status_code == 200) {
    //         this.toError();
    //       } else {
    //         this.checkError(data);
    //       }
    //     });
    // }
  }

  deleteEvent(event, formControlName) {
    // this.mobile.setValue(event.target.value);
    // this.login_form.updateValueAndValidity();
    if (event.keyCode) {
      if (event.keyCode == 13)
        this.login();
    } else {
      if (event.which == 13)
        this.login();
    }
  }
  setPlaceholder() {
    this.mobile_tip = '输入您的手机号';
  }
}
