import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../../shared/service/login/login.service";
import {HttpService} from "../../../shared/service/http-service/http.service";
import {UsersService} from "../../../shared/service/api-service/users/users.service";
import {Router} from "@angular/router";
import {AssistCenterApiService} from "../../../shared/service/api-service/assist-center-api/assist-center-api.service";
import {AssistModalService} from "../../../shared/service/assist-modal-service/assist-modal.service";

@Component({
    selector: 'app-saas-phonecheck',
    templateUrl: './saas-phonecheck.component.html',
    styleUrls: ['./saas-phonecheck.component.css']
})
export class SaasPhonecheckComponent implements OnInit {
    public phone_check: FormGroup;
    public before_submit = false;

    public mobile;
    public state = {
        count: 0
    };

    constructor(public fb: FormBuilder,
                public httpService: HttpService,
                public userService: UsersService,
                public assistCenterApiService: AssistCenterApiService,
                public assistModalService: AssistModalService,
                public router: Router) {
        document.title = '验证手机号';
    }

    ngOnInit() {
        this.phone_check = this.fb.group({
            code: ['', [Validators.required]]
        });
        this.httpService.myGet(this.userService.getMobile())
            .subscribe(data => {
                console.log(data);
                this.mobile = data.data.mobile.substr(7, 4);
                console.log(this.mobile);
            });
    }

    getVcode() {
        this.httpService.myPost(this.userService.getPhoneVcode(), {})
            .subscribe(data => {
                console.log(data);
                this.resendCaptcha();
            });
    }


    getCaptcha() {
        if (this.state.count >= 60) {
            this.getVcode();
        }
    }

    resendCaptcha() {
        let timer = null;
        this.state.count = 60;
        timer = setInterval(() => {
            this.state.count > 0 ? this.state.count-- : this.state.count = 0;
            console.log(this.state.count);
            if (this.state.count == 0) {
                clearInterval(timer);
                timer = null;
            }
        }, 1000);
    }

    getHelp() {
        this.httpService.myGet(this.assistCenterApiService.getTelephoneNum(), {})
            .subscribe(data => {
                console.log(data);
                this.assistModalService.openAssistModal('alert', {
                    message: [
                        `销售电话: ${data.data.sale_phone}`,
                        `客服电话: ${data.data.custom_phone}`
                    ]
                });
            });
    }

    submitCode() {
        this.before_submit = true;
        console.log(this.phone_check);
        if (this.phone_check.valid) {
            this.before_submit = false;
            this.httpService.myPost(this.userService.getPhoneCheckFirst(), this.phone_check.value)
                .subscribe(data => {
                        console.log(data);
                        window.localStorage.setItem('is_mobile_auth', '1');
                        window.localStorage.removeItem('mobile');
                        this.router.navigate(['/user']);
                    },
                    error => {
                        console.log(error);
                    });
        }
    }
}
