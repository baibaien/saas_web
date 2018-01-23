import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../../shared/service/http-service/http.service";
import {UsersService} from "../../../shared/service/api-service/users/users.service";
import {ActivatedRoute} from "@angular/router";
import {htmlDecodeByRegExp} from "../../../shared/function/code-decode";

@Component({
    selector: 'app-notification-detail',
    templateUrl: './notification-detail.component.html',
    styleUrls: ['./notification-detail.component.css']
})
export class NotificationDetailComponent implements OnInit {
    public detail_info;

    constructor(public httpService: HttpService,
                public activatedRoute: ActivatedRoute,
                public usersService: UsersService) {
        document.title = '通知详情';
    }

    ngOnInit() {
        this.httpService.myGet(this.usersService.getNotificationDetail(this.activatedRoute.snapshot.params['id']))
            .subscribe(data => {
                this.detail_info = data.data.data;
                document.title = `通知详情: ${this.detail_info.title}`;
                this.detail_info.content = htmlDecodeByRegExp(this.detail_info.content);
            });
    }

}
