import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoginService} from "../../../shared/service/login/login.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {passwordValid, phoneValid} from "../../../shared/validators/staff-upload-validator";
import {HttpService} from "../../../shared/service/http-service/http.service";
import {UsersService} from "../../../shared/service/api-service/users/users.service";
import {Router} from "@angular/router";
import {ModalService} from "../../../shared/service/modal/modal.service";

@Component({
    selector: 'app-saas-login',
    templateUrl: './saas-login.component.html',
    styleUrls: ['./saas-login.component.css']
})
export class SaasLoginComponent implements OnInit, OnDestroy {
    public login_form: FormGroup;
    public before_submit = false;

    public error_watch;

    public error_msg: string;
    public error_type: string;

    public modal_name;
    public modal_name_emitter;

    constructor(public loginService: LoginService,
                public fb: FormBuilder,
                public httpService: HttpService,
                public userService: UsersService,
                public modalService: ModalService,
                public router: Router) {
        document.title = '登录';

        this.modal_name_emitter = this.modalService.getModalNameEmit()
            .subscribe(data => {
                this.modal_name = data;
            });
    }

    ngOnInit() {
        // this.httpService.myGet('saas.mayitest.cn/api-js/user/hr-help-list/index')
        //     .subscribe(data => {
        //         console.log(data);
        //     });
        this.login_form = this.fb.group({
            mobile: ['', [Validators.required, phoneValid]],
            password: ['', [Validators.required]]
        });

        this.error_watch = this.login_form.valueChanges.subscribe(
            data => {
                this.error_type = '';
            }
        );
    }

    ngOnDestroy() {
        if (this.error_watch) {
            this.error_watch.unsubscribe();
        }
        this.modal_name_emitter.unsubscribe();
    }

    login() {
        this.before_submit = true;
        if (this.login_form.valid && !this.error_type) {
            this.httpService.myPost(this.userService.getAuthorization(), this.login_form.value)
                .subscribe(data => {
                    const d = data.data;
                    console.log(d);
                    this.loginService.setToken(d.token);
                    this.loginService.setStatus(d);
                    this.loginService.checkStatus();
                    this.loginService.checkModalSetting();
                    console.log(data.data.is_mobile_auth);
                    if (data.data.is_mobile_auth) {
                        this.router.navigate(['user']);
                    } else {
                        this.router.navigate(['/entry/phonecheck']);
                    }
                }, error => {
                    const err = error.json();
                    console.log(err.message);
                    this.checkError(err);
                });
        }
    }
    openYgSelfLogin() {
        this.modal_name = 'yg_self_login';
    }

    toSaasReg() {
        this.router.navigate(['/entry/register']);
    }

    toPassback() {
        this.router.navigate(['/entry/passback']);
    }

    checkError(err) {
        // if (err.message === '用户密码错误') {
        //     this.error_msg = err.message;
        //     this.error_type = 'password';
        // } else if (err.message === '用户不存在') {
        //     this.error_msg = err.message;
        //     this.error_type = 'mobile';
        //
        // }
        this.error_type = 'all';
        this.error_msg = '用户账号或密码错误';
    }
    enterLogin(event) {
        if (event.keyCode) {
            if (event.keyCode == 13)
                this.login();
        } else {
            if (event.which == 13)
                this.login();
        }
    }


    getNum(event) {
        // console.log(event);
    }

}
