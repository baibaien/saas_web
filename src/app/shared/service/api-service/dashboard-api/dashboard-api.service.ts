import {Injectable} from '@angular/core';
import {RootApiService} from "../root-api/root-api.service";

@Injectable()
export class DashboardApiService {
    constructor(public rootApiService: RootApiService) {
    }

    getDashboard() {
        return `${this.rootApiService.getRootUrl()}/user/users/dashboard`;
    }

    getUnreadNoticeAmount() {
        return `${this.rootApiService.getRootUrl()}/user/me/unread-notice-amount`;
    }


    // 信息待补全员工列表
    getStaffUncompletedList() {
        return `${this.rootApiService.getRootUrl()}/user/miss-info/index`;
    }

    // 信息待补全员工内容
    getStaffAddInfo() {
        return `${this.rootApiService.getRootUrl()}/user/miss-info/detail`;
    }

    //保存社保公积金状态
    getStoreSocialStatus() {
        return `${this.rootApiService.getRootUrl()}/user/miss-info/store-status`;
    }

    //更新补全信息
    getAddInfoStore() {
        return `${this.rootApiService.getRootUrl()}/user/miss-info/update`;
    }

    // -->
    // <-----
    // --> 通知弹窗
    getNoticeModal() {
        return `${this.rootApiService.getRootUrl()}/user/notices/dialog-detail`;
    }

    // <-----

}
