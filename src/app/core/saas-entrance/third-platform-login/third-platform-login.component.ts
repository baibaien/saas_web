import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../../shared/service/http-service/http.service";
import {RootApiService} from "../../../shared/service/api-service/root-api/root-api.service";
import {LoginService} from "../../../shared/service/login/login.service";
import {Router} from "@angular/router";
import {
    EXG_ROUTER_THIRD_PLATFORM_LOGIN_XM
} from "../../../shared/RegExp/router-RegExp";

@Component({
    selector: 'app-third-platform-login',
    templateUrl: './third-platform-login.component.html',
    styleUrls: ['./third-platform-login.component.css'],
})
export class ThirdPlatformLoginComponent implements OnInit {
    public params;


    public show_text_obj = {
        title: '正在跳转...',
        remark: '如长时间停留在此页面尝试重进入',
        url: '/assets/error/jumping.png'
    };

    constructor(public httpService: HttpService,
                public rootApiService: RootApiService,
                public loginService: LoginService,
                public router: Router) {
    }

    ngOnInit() {
        this.params = window.location.href.split('?');
        if (EXG_ROUTER_THIRD_PLATFORM_LOGIN_XM.test(this.params[0])) {
            // 迅萌登陆
            this.httpService.myGet(`${this.rootApiService.getRootUrl()}/third-platform/third-platform/xm-login?${this.params[1] || ''}`)
                .subscribe(data => {
                    console.log(data);
                    const d = data.data;
                    this.loginService.setToken(d.token);
                    this.loginService.setStatus(d);
                    this.loginService.checkModalSetting();
                    if (data.data.is_mobile_auth) {
                        this.router.navigate(['user']);
                    } else {
                        this.router.navigate(['/entry/phonecheck']);
                    }
                }, err => {
                    const error = err.json();
                    console.log(error);
                    if (error.errors) {
                        Object.keys(error.errors).map((val) => {
                            window.localStorage.setItem(val, error.errors[val]);
                        });
                    }
                    window.localStorage.setItem('third-platform-error', error.code);
                    this.router.navigate(['/entry/third-platform-error']);
                });

        } else {
            // 其他第三方登陆
            this.httpService.myGet(`${this.rootApiService.getRootUrl()}/third-platform/third-platform/login?${this.params[1]}`)
                .subscribe(data => {
                    const d = data.data;
                    this.loginService.setToken(d.token);
                    this.loginService.setStatus(d);
                    this.loginService.checkModalSetting();
                    if (data.data.is_mobile_auth) {
                        if (data.data.yg_not_existence) {
                            this.router.navigate(['/user/staff/staff-batch-upload']);
                        } else {
                            this.router.navigate(['/user']);
                        }
                    } else {
                        this.router.navigate(['/entry/phonecheck']);
                    }
                });
        }
    }

}
