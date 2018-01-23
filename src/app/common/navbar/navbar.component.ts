import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../shared/service/login/login.service";
import {ActivatedRoute, NavigationEnd, Router, RoutesRecognized} from "@angular/router";
import {HttpService} from "../../shared/service/http-service/http.service";
import {AssistCenterApiService} from "../../shared/service/api-service/assist-center-api/assist-center-api.service";
import {isNullOrUndefined} from "util";
import {ie9Test} from "../../shared/function/browser-compatible";
import {
    EXG_ROUTER_ASSIST, EXG_ROUTER_CALC,
    EXG_ROUTER_ENTRY, EXG_ROUTER_ERROR, EXG_ROUTER_INDEX, EXG_ROUTER_PHONE_CHECK,
    EXG_ROUTER_THIRD_PLATFORM_LOGIN
} from "../../shared/RegExp/router-RegExp";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    public showMenu = false;
    public hide_setting = true;
    public is_assist = false;
    public is_error = false;
    public is_calc = false;
    public is_phonecheck = false;
    public is_third_login = false;
    public assist_list;

    public is_token;
    public hide_navbar = true;

    constructor(public loginService: LoginService,
                public router: Router,
                public httpService: HttpService,
                public assistCenterApiService: AssistCenterApiService,
                public activatedRoute: ActivatedRoute) {
        this.router.events.subscribe(data => {
            this.is_token = !isNullOrUndefined(window.localStorage.getItem('mayihr_token'));
            console.log(data);
            if (data instanceof NavigationEnd) {

                const router_now = data.urlAfterRedirects;
                if (!EXG_ROUTER_INDEX.test(router_now)) {
                    const tmp = document.getElementById('newBridge');
                    if (tmp) {
                        tmp.style.display = 'none';
                    }
                } else {
                    const tmp = document.getElementById('newBridge');
                    if (tmp) {
                        tmp.style.display = 'block';
                    }
                }
                if (ie9Test()) {
                    if (!EXG_ROUTER_INDEX.test(router_now) && !EXG_ROUTER_ERROR.test(router_now)) {
                        window.localStorage.clear();
                        switch (window.location.hash) {
                            case '#/entry/register':
                            case '#/entry/register-ie9':

                                this.router.navigate(['/entry/register-ie9']);
                                break;
                            case '#/entry/login':
                            case '#/entry/login-ie9':

                                this.router.navigate(['/entry/login-ie9']);
                                break;
                            case '#/entry/service-confirm':

                                this.router.navigate(['/entry/service-confirm']);
                                break;
                            default:
                                this.router.navigate(['error/ie9']);
                                return;
                        }
                    }
                }
                this.hide_navbar = EXG_ROUTER_INDEX.test(router_now);
                if (EXG_ROUTER_ENTRY.test(router_now)) {
                    if (EXG_ROUTER_THIRD_PLATFORM_LOGIN.test(router_now)) {
                        this.loginService.deleteToken();
                        this.is_third_login = true;
                        return;
                    } else if (EXG_ROUTER_PHONE_CHECK.test(router_now)) {
                        this.is_phonecheck = true;
                        this.hide_setting = false;
                    } else {
                        this.is_phonecheck = false;
                        this.hide_setting = true;
                        if (this.is_token) {
                            this.router.navigate(['/user']);
                            return;
                        }
                    }
                } else {
                    this.is_third_login = false;
                    this.is_phonecheck = false;
                    this.hide_setting = false;
                }
                this.is_assist = EXG_ROUTER_ASSIST.test(data.urlAfterRedirects);
                this.is_calc = EXG_ROUTER_CALC.test(data.urlAfterRedirects);
                this.is_error = EXG_ROUTER_ERROR.test(data.urlAfterRedirects);
                if (this.is_assist) {
                    this.httpService.myGet(this.assistCenterApiService.getAssistList()).subscribe((data1) => {
                        this.assist_list = data1.data;
                        this.assist_list.map((val, index) => {
                            val.url = `/assist/assist-list/${val.id}`;
                        });
                    });
                }
            }
        });
    }

    ngOnInit() {
    }

    logOut() {
        this.loginService.logOut();
    }

    toSetting(url) {
        this.showMenu = false;
        this.router.navigate([`/user/settings/${url}-setting`]);
    }

    toNotification() {
        this.router.navigate(['/user/notification']);
    }

    toHome() {
        if (this.is_assist) {
            this.router.navigate(['/assist']);
            return;
        }
        if (this.is_token) {
            this.router.navigate(['/user']);
        }
    }
}
