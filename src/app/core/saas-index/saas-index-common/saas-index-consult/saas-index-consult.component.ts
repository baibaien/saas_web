import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {phoneValid} from "../../../../shared/validators/staff-upload-validator";
import {SaasIndexService} from "../../../../shared/service/saas-index/saas-index.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-saas-index-consult',
  templateUrl: './saas-index-consult.component.html',
  styleUrls: ['./saas-index-consult.component.css', '../../index-main.less']
})
export class SaasIndexConsultComponent implements OnInit {
  public sign_msg: FormGroup;
  public sumit_error = false;
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

  preSign() {
    let submit_data = {type: 2};
    const mobile = this.sign_msg.get('mobile');
    const contact = this.sign_msg.get('contact');
    if (!this.sign_msg.get('mobile').valid) {
      this.sumit_error = true;
    }
    if (this.sign_msg.valid) {
      submit_data = Object.assign(this.sign_msg.value);
      console.log('mobile', mobile.value, 'contact', contact.value);
      this.saasIndexService.preSign(submit_data)
        .subscribe(data => {
          if (data.status_code == 200) {
            alert('提交成功，客服将在一个工作日内与您联系。');
            let jump_url = `${window.location.href.split('#')[0]}/#/entry/register?mobile=${mobile.value.trim()}&contact=${contact.value.trim()}`;
            window.location.href = jump_url;
          } else {
            alert(data.message ? data.message : '提交失败');
          }
        });
    }
  }
}
