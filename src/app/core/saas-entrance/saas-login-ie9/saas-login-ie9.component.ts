import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../../shared/service/login/login.service";
import {HttpService} from "app/shared/service/http-service/http.service";
import {ModalService} from "app/shared/service/modal/modal.service";
import {UsersService} from "app/shared/service/api-service/users/users.service";
import {Router} from "@angular/router";
import {phoneValid} from "../../../shared/validators/staff-upload-validator";

@Component({
    selector: 'app-saas-login-ie9',
    templateUrl: './saas-login-ie9.component.html',
    styleUrls: ['./saas-login-ie9.component.css'],
})
export class SaasLoginIe9Component implements OnInit, OnDestroy {
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
        this.placeholderAdd();
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
            this.httpService.myJsonp(this.userService.getAuthorization(), {params: this.login_form.value})
                .subscribe(data => {
                    if (data.status_code == 200) {
                        this.toError();
                    } else {
                        this.checkError(data);
                    }
                });
        }
    }

    openYgSelfLogin() {
        this.modal_name = 'yg_self_login';
    }

    toSaasReg() {
        this.router.navigate(['/entry/register-ie9']);
    }

    toPassback() {
        this.router.navigate(['/entry/passback']);
    }

    checkError(err) {
        if (err.message === '用户密码错误' || err.message === '用户不存在') {
            this.error_type = 'all';
            this.error_msg = '用户账号或密码错误';
        } else {
            this.toError();
        }
    }

    toError() {
        this.router.navigate(['/error/ie9']);
    }

    placeholderAdd() {
        const _self = this;
        if (!('placeholder' in document.createElement('input'))) {
            // 将返回的nodeList对象转为数组
            let nodes = Array.prototype.slice.call(document.querySelectorAll('[placeholder]'));
            nodes.forEach(function (item, index) {
                let cloneNode = item.cloneNode();
                cloneNode.setAttribute('type', 'text');
                item.addEventListener('focus', function () {
                    this.nextSibling.style.display = 'none';
                });
                item.addEventListener('blur', function () {
                    if (!this.value) {
                        this.style.display = 'none';
                        this.nextSibling.style.display = 'inline';
                    }
                });
                // 如果[type='password']类型，则转为text
                console.log(cloneNode.getAttribute('type'));
                cloneNode.setAttribute('value', cloneNode.getAttribute('placeholder'));
                cloneNode.style.display = 'none';
                item.insertAdjacentHTML('afterend', cloneNode.outerHTML);
                item.nextSibling.addEventListener('focus', function () {
                    this.style.display = 'none';
                    this.previousSibling.style.display = 'inline';
                    this.previousSibling.focus();
                    this.setAttribute('type', 'text');
                });
                if (!item.value) {
                    item.style.display = 'none';
                    item.nextSibling.style.display = 'inline';
                }
            });
        }
    }

    deleteEvent(event, formControlName) {
        this.login_form.get(formControlName).setValue(event.target.value);
        this.login_form.updateValueAndValidity();
        if (event.keyCode) {
            if (event.keyCode == 13)
                this.login();
        } else {
            if (event.which == 13)
                this.login();
        }
    }
}
