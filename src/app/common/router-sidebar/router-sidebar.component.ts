import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserStatusService} from "../../shared/service/user-status-service/user-status.service";

@Component({
    selector: 'app-router-sidebar',
    templateUrl: './router-sidebar.component.html',
    styleUrls: ['./router-sidebar.component.css']
})
export class RouterSidebarComponent implements OnInit {
    // public is_outsource_use;
    // public is_saas_use;
    // public is_active;
    public outsource_status;

    public more_func_show = false;


    public user_status_watcher;

    constructor(public router: Router,
                public userStatusService: UserStatusService) {
        this.user_status_watcher = this.userStatusService.getUserStatusWatcher().subscribe(data => {
            this.outsource_status = this.userStatusService.checkOutsourceUse();
            if (data) {
                this.router.navigate(['/user/salary-outsourcing']);
            }
        });
    }

    ngOnInit() {
        this.outsource_status = this.userStatusService.checkOutsourceUse();
    }

    toggleMoreFuncShow() {
        this.more_func_show = !this.more_func_show;
    }

    toDocumentCenter() {
        this.more_func_show = false;
        this.router.navigate(['/user/document-center']);
    }

    toSocialAssuranceCalc() {
        this.more_func_show = false;
        window.open(`${window.location.protocol}//${window.location.host}/#/social-assurance-calc`);
    }
}
