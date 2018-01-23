import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {UsersService} from "app/shared/service/api-service/users/users.service";
import {HttpService} from "../../../shared/service/http-service/http.service";
import {ModalService} from "app/shared/service/modal/modal.service";
import {Router} from "@angular/router";
import {LoginService} from "../../../shared/service/login/login.service";
import {mailValid, passwordValid} from "app/shared/validators/staff-upload-validator";
import {phoneValid} from "app/shared/validators/staff-upload-validator";
import {Jsonp} from "@angular/http";
import {AssistModalService} from "../../../shared/service/assist-modal-service/assist-modal.service";

@Component({
    selector: 'app-saas-register-ie9',
    templateUrl: './saas-register-ie9.component.html',
    styleUrls: ['./saas-register-ie9.component.css'],
})
export class SaasRegisterIe9Component implements OnInit, OnDestroy {
    public protocol_acception = true;
    public tags_list = [{id: 1, name: '企业客户', selected: 1}, {id: 2, name: '个人客户'}];
    public reg_data;
    public before_submit = false;

    public test;

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
                public assistModalService: AssistModalService,
                public loginService: LoginService) {
        document.title = '注册';


        this.modal_name_emitter = this.modalService.getModalNameEmit()
            .subscribe(data => {
                this.modal_name = data;
            });
        this.reg_data = fb.group({
            mobile: ['', [Validators.required, phoneValid]],
            password: ['', [Validators.required, passwordValid]],
            contact: ['', Validators.required],
            email: ['', [Validators.required, mailValid]],
            company: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.error_watch = this.reg_data.controls['mobile'].valueChanges.subscribe(
            data => {
                this.error_type = '';
            }
        );
        this.placeholderAdd();
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
        if (this.tags_list[0]['selected']) {
            this.reg_data.get('company').setValidators(Validators.required);
            this.reg_data.get('company').updateValueAndValidity();
        } else {
            this.reg_data.get('company').clearValidators();
            this.reg_data.get('company').updateValueAndValidity();

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
    jsonpCallback(result) {
        alert(result);
    }

    register() {
        if (this.protocol_acception) {
            this.before_submit = true;
            if (this.tags_list[0]['selected']) {
                this.reg_data.get('company').setValidators(Validators.required);
                this.reg_data.get('company').updateValueAndValidity();
            } else {
                this.reg_data.get('company').clearValidators();
                this.reg_data.get('company').updateValueAndValidity();
            }
            if (this.reg_data.valid) {
                this.before_submit = false;
                Object.assign(this.submit_data, this.reg_data.value);
                if (this.tags_list[1]['selected']) {
                    delete this.submit_data['company'];
                    this.httpService.myJsonp(`${this.usersService.getUserStorePersonal()}`, {params: this.submit_data})
                        .subscribe(data => {
                            if (data.status_code == 200) {
                                this.assistModalService.openAssistModal('toast', '注册成功', () => {
                                    this.router.navigate(['/entry/login-ie9']);

                                });
                            } else {
                                if (data.message === '手机号已被注册！') {
                                    this.error_msg = data.message;
                                    this.error_type = 'mobile';
                                } else if (data.code == 250011) {
                                    this.router.navigate(['/error/ie9']);
                                }
                            }
                        });
                } else {
                    this.httpService.myJsonp(`${this.usersService.getUserStore()}`, {params: this.submit_data})
                        .subscribe(data => {
                            if (data.status_code == 200) {
                                this.assistModalService.openAssistModal('toast', '注册成功', () => {
                                    this.router.navigate(['/entry/login-ie9']);

                                });
                            } else {
                                if (data.message === '手机号已被注册！') {
                                    this.error_msg = data.message;
                                    this.error_type = 'mobile';
                                }
                            }
                        });
                }
            }
        }
    }

    changeData(data) {
        let result = '';
        for (let i in this.submit_data) {
            result += `${i}=${this.submit_data[i]}&`;
        }
        // result.replace(/.$/, '');
        return result;
    }


    // <-----


    toSaasLogin() {
        this.router.navigate(['/entry/login-ie9']);
    }

    // <-----

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
        this.reg_data.get(formControlName).setValue(event.target.value);
        this.reg_data.updateValueAndValidity();

    }
}
