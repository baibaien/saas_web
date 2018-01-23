import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../../shared/service/http-service/http.service";
import {RootApiService} from "../../../shared/service/api-service/root-api/root-api.service";

@Component({
    selector: 'app-xm-mobile-img',
    templateUrl: './xm-mobile-img.component.html',
    styleUrls: ['./xm-mobile-img.component.css']
})
export class XmMobileImgComponent implements OnInit {

    public is_admin;
    constructor(public httpService: HttpService,
                public rootService: RootApiService) {
    }

    ngOnInit() {
        const token = window.location.href.split('?')[1];
        // const token = 'eyJhcHBJZCI6MjAyNzQ5ODUsIm9yZ0lkIjoxMDgyOTYsInNjb3BlSWQiOjIyMzM3LCJzaWduYXR1cmUiOiIwYmViNWNkMmRiN2YzOGNmODAyMGIyZGMyNTc3YTlkMCIsInNpdGVJZCI6MSwidGltZXN0YW1wIjoxNTE1MDM4MTA1MDMwLCJ1aWQiOiIxMDEwMTAwMTE4ODIwNjQ2NCJ9';
        this.httpService.myGet(`${this.rootService.getRootUrl()}/third-platform/third-platform/xm-is-admin?${token}`)
            .subscribe(data => {
                console.log(data);
                this.is_admin = data.data.is_admin;
            });
    }

}
