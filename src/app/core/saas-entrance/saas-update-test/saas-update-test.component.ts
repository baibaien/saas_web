import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {LoginService} from "../../../shared/service/login/login.service";
import {HttpService} from "../../../shared/service/http-service/http.service";
import {UsersService} from "app/shared/service/api-service/users/users.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-saas-update-test',
    templateUrl: './saas-update-test.component.html',
    styleUrls: ['./saas-update-test.component.css']
})
export class SaasUpdateTestComponent implements OnInit {

    public box;

    constructor(public fb: FormBuilder,
                public httpService: HttpService,
                public usersService: UsersService,
                public router: Router,
                public loginService: LoginService) {
        this.box = this.fb.group({
            mobile: [''],
            test_uid: [''],
            test_key: ['Ilt1HVRQQ$@TM^hzIw9o^RlS9wn72h99']
        });
    }

    ngOnInit() {
    }

    login() {
        this.httpService.myPost(this.usersService.getAuthorization(), this.box.value)
            .subscribe(data => {
                console.log(data);
                this.loginService.setToken(data.data.token);
                this.loginService.checkStatus();
                this.loginService.checkModalSetting();
                this.router.navigate(['/user']);
            });
    }
}
