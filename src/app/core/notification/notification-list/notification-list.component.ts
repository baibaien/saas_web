import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from "../../../shared/service/http-service/http.service";
import {UsersService} from "../../../shared/service/api-service/users/users.service";
import {GlobalFuncService} from "../../../shared/service/global-func/global-func.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-notification-list',
    templateUrl: './notification-list.component.html',
    styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {
    // -->列表数据
    public notification_list;
    public pagination;
    public list_url;
    // <-----

    public all_read = true;

    constructor(public httpService: HttpService,
                public router: Router,
                public globalFuncService: GlobalFuncService,
                public usersService: UsersService) {
        document.title = '通知列表';
    }

    ngOnInit() {
        this.requestList();
    }

    /**
     * listRequest
     * 函数描述
     * 请求列表
     * @params:
     * @return:
     */
    requestList(submit_data = {}) {
        console.log(submit_data);
        this.httpService.myGet(this.usersService.getNotificationList(), {search: submit_data})
            .subscribe(data => {
                this.all_read = true;
                this.notification_list = data.data.data.map(val => {
                    if (val.status == 1) {
                        this.all_read = false;
                    }
                    return val;
                });
                this.pagination = data.data.meta.pagination;
            });
    }


    /**
     * refreshPaging
     * 函数描述
     * 分页器触发
     * @params:
     * @return:
     */
    refreshPaging(event) {
        this.requestList(event);
    }


    /**
     * markAsRead
     * 函数描述
     * 全部标记为已读
     * @params:
     * @return:
     */
    markAsRead() {
        this.httpService.myGet(this.usersService.getMarkAsRead(), {})
            .subscribe(data => {
               this.requestList();
            });
    }

    toNotificationDetail(i) {
        this.router.navigate([`/user/notification/list/${i.id}/detail`]);
    }
}
