import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UsersService} from "../../../shared/service/api-service/users/users.service";
import {HttpService} from "../../../shared/service/http-service/http.service";
import {Router} from "@angular/router";
import {LoginService} from "../../../shared/service/login/login.service";
import {mailValid, passwordValid, phoneValid} from "../../../shared/validators/staff-upload-validator";
import {ModalService} from "../../../shared/service/modal/modal.service";

@Component({
  selector: 'app-saas-register',
  templateUrl: './saas-register.component.html',
  styleUrls: ['./saas-register.component.css']
})
export class SaasRegisterComponent implements OnInit, OnDestroy {
  public protocol_acception = true;
  public tags_list = [{id: 1, name: '企业客户', selected: 1}, {id: 2, name: '个人客户'}];
  public reg_data;
  public before_submit = false;

  public submit_data = {};

  public show_type = 'password';

  public error_watch;
  public error_type: string;
  public error_msg: string;

  public modal_name;
  public modal_name_emitter;

  constructor(public fb: FormBuilder,
              public usersService: UsersService,
              public httpService: HttpService,
              public router: Router,
              public modalService: ModalService,
              public loginService: LoginService) {
    document.title = '注册';
    const event_data = decodeURIComponent(window.location.href.split('?')[1]);
    const format_data = {mobile: '', email: '', contact: ''};
    if (event_data) {
      event_data.split('&').forEach(item => {
        const [key, val] = item.split('=');
        format_data[key] =  val;
        console.log(key, val, format_data);
      });
    }
    // event_mobile = event_mobile ? event_mobile.split('=')[1] : '';
    this.modal_name_emitter = this.modalService.getModalNameEmit()
      .subscribe(data => {
        this.modal_name = data;
      });
    this.reg_data = fb.group({
      mobile: [format_data.mobile, [Validators.required, phoneValid]],
      password: ['', [Validators.required, passwordValid]],
      contact: [format_data.contact, Validators.required],
      email: [format_data.email, [Validators.required, mailValid]],
      company: ['', Validators.required]
    });
    this.error_watch = this.reg_data.controls['mobile'].valueChanges.subscribe(
      data => {
        this.error_type = '';
      }
    );
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.error_watch.unsubscribe();
    this.modal_name_emitter.unsubscribe();
  }

  // -->切换tag
  toggleTags(tag) {
    for (let i in this.tags_list) {
      this.tags_list[i]['selected'] = 0;
    }
    tag.selected = 1;
    if (tag.id == 2) {
      this.reg_data.get('company').disable();
    } else {
      this.reg_data.get('company').enable();
    }
  }

  // <-----

  // -->接受协议
  acceptProtocol() {
    this.protocol_acception = !this.protocol_acception;
  }

  // <-----
  // -->密码控制
  togglePassType() {
    if (this.show_type === 'text') {
      this.show_type = 'password';
    } else {
      this.show_type = 'text';
    }
  }

  // <-----


  openYgSelfLogin() {
    this.modal_name = 'yg_self_login';
  }

  // -->
  register() {
    console.log(this.protocol_acception);
    if (this.protocol_acception) {
      this.before_submit = true;
      if (this.tags_list[0]['selected']) {
        this.reg_data.get('company').setValidators(Validators.required);
        this.reg_data.get('company').updateValueAndValidity();
      } else {
        this.reg_data.get('company').clearValidators();
        this.reg_data.get('company').updateValueAndValidity();

      }
      console.log(this.reg_data.valid);
      if (this.reg_data.valid) {
        this.before_submit = false;
        console.log(this.reg_data.value);
        Object.assign(this.submit_data, this.reg_data.value);
        if (this.tags_list[1]['selected']) {
          delete this.submit_data['company'];
          this.httpService.myPost(this.usersService.getUserStorePersonal(), this.submit_data)
            .subscribe(data => {
              console.log(data);
              this.router.navigate(['/entry/phonecheck']);

            }, error => {
              const err = error.json();
              console.log(err);
              if (err.message === '手机号已被注册！') {
                this.error_msg = err.message;
                this.error_type = 'mobile';
                console.log(this.error_msg);
              }
            });
        } else {
          this.httpService.myPost(this.usersService.getUserStore(), this.submit_data)
            .subscribe(data => {
              console.log(data);
              let tmp = data.data;
              this.loginService.setStatus(tmp);
              this.loginService.setToken(tmp.token);
              this.router.navigate(['/entry/phonecheck']);
            }, error => {
              const err = error.json();
              console.log(err);
              if (err.message === '手机号已被注册！') {
                this.error_msg = err.message;
                this.error_type = 'mobile';
                console.log(this.error_msg);
              }
            });
        }

      }
    }
  }

  // <-----

  // -->
  toSaasLogin() {
    this.router.navigate(['/entry/login']);
  }

  // <-----

}
