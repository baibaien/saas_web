import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ModalService} from '../../../../shared/service/modal/modal.service';
import {phoneValid, PwValid, requireNum} from '../../../../shared/validators/staff-upload-validator';
import {SettingsService} from '../../../../shared/service/settings/settings.service';
import {AssistModalService} from '../../../../shared/service/assist-modal-service/assist-modal.service';

@Component({
    selector: 'app-safe-setting',
    templateUrl: './safe-setting.component.html',
    styleUrls: ['./safe-setting.component.css']
})
export class SafeSettingComponent implements OnInit {
    @Input() modal_name;
    @Input() modal_info;
    @Input() modal_callback = null;

    public is_disabled = false;
    public resend_text: String = '获取验证码';
    public transformed_password;
    public transformed_pw: FormControl;
    public update;
    public before_submit = {
        account_mobile: true,
        account_safe: true,
        password: true
    };
    public password = {
        text: '显示密码',
        flag: false,
        type: 'password'
    };
    public account_safe: FormGroup;
    public account_mobile: FormGroup;


    constructor(fb: FormBuilder,
                public modalService: ModalService,
                public settingsService: SettingsService,
                public assistModalService: AssistModalService) {
        this.account_safe = fb.group({
            old_password: ['', [Validators.required, Validators.minLength(6)]],
            password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20), PwValid]]
        });
        this.account_mobile = fb.group({
            mobile: ['', [Validators.required, phoneValid]],
            vcode: ['', [Validators.required, requireNum]],      // 验证码错误的返回值？怎样提示
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
        this.transformed_pw = fb.control(['']);
    }

    ngOnInit() {
        console.log(this.modal_info);
        if (this.modal_info.flag === 'account_safe') {
            this.update = 'updatePw';
        } else {
            this.update = 'updateMobile';
        }
    }

    getCaptcha() {
        // console.log(this.account_mobile.get('mobile').value);
        this.settingsService.getCaptcha({mobile: this.account_mobile.get('mobile').value}).subscribe((res) => {
            let timer = null;
            let count = 60;
            this.is_disabled = true;
            timer = window.setInterval(() => {
                if (count > 0) {
                    count--;
                    this.resend_text = `重新发送（${count}s）`;
                }
                if (count === 0) {
                    this.is_disabled = false;
                    this.resend_text = '获取验证码';
                    window.clearInterval(timer);
                    timer = null;
                }
            }, 1000);
        });
    }

    // 是否显示密码
    showPw() {
        const pw = this.account_safe.get('password').value;
        if (!this.password.flag) {
            this.password.text = '隐藏密码';
            this.password.type = 'text';
            this.transformed_password = pw;
        } else {
            this.password.text = '显示密码';
            this.password.type = 'password';
        }
        this.password.flag = !this.password.flag;
    }


    cancelModal() {
        // this.account_mobile.reset('');
        // this.account_safe.reset('');
        this.modalService.setModalName('');
        this.modalService.emitModalName();
    }

    saveMsg(formdata: FormGroup) {
        this.before_submit.account_mobile = false;
        this.before_submit.account_safe = false;
        this.before_submit.password = false;
        if (formdata.valid) {
            this.before_submit.account_mobile = true;
            this.before_submit.account_safe = true;
            this.before_submit.password = true;
            const submit_data = {};
            for (const obj in formdata.value) {
                submit_data[obj] = formdata.value[obj];
            }
            this.settingsService[this.update](submit_data).subscribe(res => {
                this.assistModalService.openAssistModal('toast', '保存成功', () => {
                    this.modal_callback();
                    this.modalService.setModalName('');
                    this.modalService.emitModalName();
                });
            }, error => {
                let err = error.json();
                if (err.message === '用户密码错误') {
                    this.assistModalService.openAssistModal('alert', '用户密码错误');
                }
            });
        }
    }

    // checkError(error, form_group, reset = false) {
    //     if (reset) {
    //         for (let  i in this.error_list) {
    //             for (let j in this.error_list[i]) {
    //                 this.error_list[i][j] = false;
    //             }
    //         }
    //     } else {
    //         if (error.hasOwnProperty('status_code') && error['status_code'] === 417) {
    //             if (error.message === '新手机号已被人使用') {
    //                 form_group.get('mobile').markAsPristine({onlySelf: true});
    //                 this.error_list.mobile.been_used = true;
    //             }
    //         }
    //     }
    // }
}
