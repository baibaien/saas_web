import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../../shared/service/http-service/http.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-third-platform-error',
    templateUrl: './third-platform-error.component.html',
    styleUrls: ['./third-platform-error.component.css']
})
export class ThirdPlatformErrorComponent implements OnInit {
    public code;
    public current;
    public registered;

    constructor(public httpService: HttpService,
                public router: Router) {
    }

    ngOnInit() {
        this.code = window.localStorage.getItem('third-platform-error');
        if (this.code == '250019') {
            this.current = window.localStorage.getItem('current_company');
            this.registered = window.localStorage.getItem('registered_company');
        }
    }

    backToIndex() {
        this.router.navigate(['/index']);
    }

}
