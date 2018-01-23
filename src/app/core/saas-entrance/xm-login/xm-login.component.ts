import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpService} from "../../../shared/service/http-service/http.service";
import {RootApiService} from "../../../shared/service/api-service/root-api/root-api.service";
import {LoginService} from "../../../shared/service/login/login.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-xm-login',
    templateUrl: './xm-login.component.html',
    styleUrls: ['./xm-login.component.css'],
})
export class XmLoginComponent implements OnInit {
    public params;


    constructor(public httpService: HttpService,
                public rootApiService: RootApiService,
                public loginService: LoginService,
                public router: Router) {
    }

    ngOnInit() {
        this.params = window.location.href.split('?')[1];
        // third-platform/third-platform/xm-login   get提交
        this.httpService.myGet(`${this.rootApiService.getRootUrl()}/third-platform/third-platform/xm-login?${this.params || ''}`)
            .subscribe(data => {
                console.log(data);
                const d = data.data;
                this.loginService.setToken(d.token);
                this.loginService.setStatus(d);
                // this.loginService.checkStatus();
                this.loginService.checkModalSetting();
                if (data.data.is_mobile_auth) {
                    this.router.navigate(['user']);
                } else {
                    this.router.navigate(['/entry/phonecheck']);
                }
            });

    }
}
