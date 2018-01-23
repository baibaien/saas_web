import {Injectable} from '@angular/core';
import {RequestOptions} from "@angular/http";
import {Router} from "@angular/router";
import {MayihrFilterService} from "../mayihr-filter/mayihr-filter.service";
import {HttpService} from "../http-service/http.service";
import {UsersService} from "../api-service/users/users.service";
import {isUndefined} from "util";
import {UserStatusService} from "../user-status-service/user-status.service";
import {ie9Test} from "../../function/browser-compatible";

// -->
// 此模块用于进行登录的token检测，及token发放功能
// <-----
@Injectable()
export class LoginService {

    public mobile;

    constructor(public requestOptions: RequestOptions,
                public router: Router,
                public httpService: HttpService,
                public usersService: UsersService,
                public userStatusService: UserStatusService,
                public mayihrFilterService: MayihrFilterService) {
    }

    /**
     * setToken
     * 函数描述
     * 设置token---包括header和localstorage的同步
     * @params:
     * @return:
     */
    setToken(data) {
        this.deleteToken();
        this.requestOptions.headers.append('Authorization', `bearer ${data}`);
        window.localStorage.setItem('mayihr_token', `${data}`);
    }

    /**
     * deleteToken
     * 函数描述
     * 删除token---包括header和localstorage的同步
     * @params:
     * @return:
     */
    deleteToken() {
        this.requestOptions.headers.delete('Authorization');
        window.localStorage.removeItem('mayihr_token');
    }

    /**
     * hasToken
     * 函数描述
     * 校验是否以有token
     * @params:
     * @return:
     */
    hasToken() {
        return window.localStorage.getItem('mayihr_token') !== null;
    }

    checkToken() {
        if (!this.hasToken()) {
            this.deleteToken();
            if (ie9Test()) {
                this.router.navigate(['/entry/login-ie9']);
            } else {
                this.router.navigate(['/entry/login']);
            }
        }
    }

    checkStatus() {
        this.httpService.myGet(this.usersService.getUserStatus())
            .subscribe(data => {
                const tmp = data.data;
                // 签约状态
                window.localStorage.setItem('is_outsource_use', tmp.is_outsource_use);
                // 是否为saas用户
                window.localStorage.setItem('is_saas_use', tmp.is_saas_use);
                // 是否通过手机验证
                window.localStorage.setItem('is_mobile_auth', tmp.is_mobile_auth);
                // 外包状态
                window.localStorage.setItem('outsource_sign_status', tmp.outsource_sign_status);
                // saas状态
                window.localStorage.setItem('saas_sign_status', tmp.saas_sign_status);
                // 激活状态
                window.localStorage.setItem('is_self_active_status', tmp.is_self_active_status);
                this.userStatusService.emitUserStatusChange();
            });
        // this.checkModalSetting();
    }

    checkModalSetting() {
        this.httpService.myGet(this.usersService.getModalHideSettings())
            .subscribe(data => {
                for (let i in data.data) {
                    window.localStorage.setItem(i, data.data[i]);
                }
            });
    }


    setStatus(input_status) {
        const tmp_arr = ['is_outsource_use', 'is_saas_use', 'is_mobile_auth',
            'outsource_sign_status', 'saas_sign_status', 'is_self_active_status'];
        // // 签约状态
        // window.localStorage.setItem('is_outsource_use', is_outsource_use);
        // // 是否为saas用户
        // window.localStorage.setItem('is_saas_use', is_saas_use);
        // // 是否通过手机验证
        // window.localStorage.setItem('is_mobile_auth', is_mobile_auth);
        // // 外包状态
        // window.localStorage.setItem('outsource_sign_status', outsource_sign_status);
        // // saas状态
        // window.localStorage.setItem('saas_sign_status', saas_sign_status);
        // // 激活状态
        // window.localStorage.setItem('is_self_active_status', is_self_active_status);
        tmp_arr.map((val) => {
            window.localStorage.setItem(val, input_status[val]);
        });
    }

    logOut() {
        this.mayihrFilterService.resetFilterItem();
        this.deleteToken();
        this.router.navigate(['/entry/login']);
    }
}