import {Component, OnInit} from '@angular/core';
import {LoginService} from './shared/service/login/login.service';
import {ModalService} from './shared/service/modal/modal.service';
import {AssistModalService} from "./shared/service/assist-modal-service/assist-modal.service";
import {HttpService} from "./shared/service/http-service/http.service";
import {NavigationEnd, Router, RoutesRecognized} from "@angular/router";
import {ie8Test, isPhone} from "./shared/function/browser-compatible";
import {
    EXG_ROUTER_ENTRY, EXG_ROUTER_ERROR, EXG_ROUTER_INDEX, EXG_ROUTER_PHONE_CHECK, EXG_ROUTER_THIRD_PLATFORM_LOGIN,
    EXG_ROUTER_USER
} from "./shared/RegExp/router-RegExp";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    public has_modal;

    // -->
    // <-----
    constructor(public loginService: LoginService,
                public modalService: ModalService,
                public router: Router,
                public assistModalService: AssistModalService,
                public httpService: HttpService) {
        // --> 推广页注册进入
        // <-----


        const storage = window.location.href.split('?')[1];
        const event_jump_data = {};
        if (storage && storage['token']) {
            storage.split('&').forEach((item) => {
                event_jump_data[item.split('=')[0]] = item.split('=')[1];
            });
            this.loginService.setStatus(event_jump_data);
            this.loginService.setToken(event_jump_data['token']);
        }

        this.router.events.subscribe(data => {
            if (data instanceof RoutesRecognized) {
                const router_now = data.urlAfterRedirects;

                if (EXG_ROUTER_INDEX.test(router_now)) {
                    var _hmt = _hmt || [];
                    (function () {
                        var hm = document.createElement("script");
                        hm.src = "https://hm.baidu.com/hm.js?060328b2f455a6b2027c4bf1fba681af";
                        var s = document.getElementsByTagName("script")[0];
                        s.parentNode.insertBefore(hm, s);
                    })();
                } else if (EXG_ROUTER_ERROR.test(router_now)) {
                } else if (EXG_ROUTER_THIRD_PLATFORM_LOGIN.test(router_now)) {
                    this.loginService.deleteToken();
                } else if (EXG_ROUTER_PHONE_CHECK.test(router_now)) {
                } else if (EXG_ROUTER_ENTRY.test(router_now)) {
                    if (this.loginService.hasToken()) {
                        this.loginService.checkStatus();
                        this.loginService.checkModalSetting();
                        this.router.navigate(['/user']);
                        return;
                    }
                } else {
                    if (!this.loginService.hasToken()) {
                        this.router.navigate(['/entry']);
                        return;
                    } else {
                        this.loginService.setToken(window.localStorage.getItem('mayihr_token'));
                        this.loginService.checkStatus();
                        this.loginService.checkModalSetting();
                    }
                }
            }
        });
        this.modalService.getScrollEmit().subscribe((res) => {
            this.has_modal = res !== '' && res;
        });
    }

    ngOnInit() {

    }
}

