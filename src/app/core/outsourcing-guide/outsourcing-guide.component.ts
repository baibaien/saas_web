import {Component, OnInit} from '@angular/core';
import {SalaryOutsourcingApiService} from "../../shared/service/api-service/salary-outsourcing-api/salary-outsourcing-api.service";
import {HttpService} from "../../shared/service/http-service/http.service";
import {UsersService} from "../../shared/service/api-service/users/users.service";
import {LoginService} from "../../shared/service/login/login.service";
import {checkOutsourcingStatus} from "../../shared/service/common-service/outsourcing-status/outsourcing-status";
import {UserStatusService} from "../../shared/service/user-status-service/user-status.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-outsourcing-guide',
    templateUrl: './outsourcing-guide.component.html',
    styleUrls: ['./outsourcing-guide.component.css']
})
export class OutsourcingGuideComponent implements OnInit {
    public is_outsource_use;
    public is_saas_use;
    public outsource_status;
    public saas_status;
    public active_status;


    public show_status;

    constructor(public salaryOutsourcingApiService: SalaryOutsourcingApiService,
                public userStatusService: UserStatusService,
                public router: Router,
                public usersService: UsersService,
                public httpService: HttpService,
                public loginService: LoginService) {
        this.is_outsource_use = window.localStorage.getItem('is_outsource_use');
        this.outsource_status = window.localStorage.getItem('outsource_sign_status');
        this.active_status = window.localStorage.getItem('is_self_active_status');

        if (this.outsource_status == 0) {
            this.show_status = 0;
        } else if (this.outsource_status == -1) {
            if (this.active_status == 0) {
                this.show_status = 1;
            } else if (this.active_status == 1) {
                this.show_status = 0;
            }
        }
    }

    ngOnInit() {
        if(this.userStatusService.checkOutsourceUse() == 1) {
            this.router.navigate(['/user/dashboard']);
        }
    }

    activeOutsourcing() {
        this.httpService.myGet(this.salaryOutsourcingApiService.getOutsourcingActive(), {})
            .subscribe(data => {
                this.httpService.myGet(this.usersService.getUserStatus())
                    .subscribe(data1 => {
                        console.log(data1);
                        checkOutsourcingStatus(data1.data);
                        this.userStatusService.emitUserStatusChange(true);
                    });
            });
    }
}
