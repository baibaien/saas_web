import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpService} from "../../../shared/service/http-service/http.service";
import {UsersService} from "../../../shared/service/api-service/users/users.service";
import {Router} from "@angular/router";
import {phoneValid} from "../../../shared/validators/staff-upload-validator";
import {AssistModalService} from "../../../shared/service/assist-modal-service/assist-modal.service";

@Component({
    selector: 'app-saas-passback',
    templateUrl: './saas-passback.component.html',
    styleUrls: ['./saas-passback.component.css']
})
export class SaasPassbackComponent implements OnInit {
    public pass_back: FormGroup;
    public before_submit = false;


    public vcode_key;
    public vcode_url = '';

    public show_alert = false;

    constructor(public assistModalService: AssistModalService,
                public fb: FormBuilder,
                public httpService: HttpService,
                public userService: UsersService,
                public router: Router) {
        document.title = '找回密码';
        this.getVCode();
    }

    ngOnInit() {
        this.pass_back = this.fb.group({
            mobile: ['', [Validators.required, phoneValid]],
            vcode: ['', [Validators.required, Validators.minLength(4)]]
        });
    }

    findPass() {
        this.before_submit = true;
        if (this.pass_back.valid) {
            this.before_submit = false;
            const submit_data = Object.assign(this.pass_back.value, {vcode_key: this.vcode_key});
            this.httpService.myPost(this.userService.getResetPassword(), submit_data).subscribe(
                data => {
                    this.assistModalService.openAssistModal('toast', '密码重置短信已发送，请注意查收', () => {
                        this.router.navigate(['/entry/login']);
                    });
                }, error => {
                    const err = error.json();
                    if (err.message === '验证码错误') {
                        this.getVCode();
                    }
                }
            );
        }
    }

    getVCode() {
        this.httpService.myGet(this.userService.getShowRestPassword())
            .subscribe(data => {
                this.vcode_key = data.data.vcode_key;
                this.vcode_url = `${this.userService.getVCodeUrl()}?vcode_key=${this.vcode_key}`;
            });
    }

    openAssist() {
        this.show_alert = true;
    }
    closeAlert() {
        this.show_alert = false;
    }

    toSaasLogin() {
        this.router.navigate(['/entry/login']);
    }
}
