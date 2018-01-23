import {Injectable} from '@angular/core';
import {RootApiService} from "../../root-api/root-api.service";

@Injectable()
export class StaffWorksService {
    // 工作经历API
    constructor(public rootApiService: RootApiService) {
    }

    // 列表 get
    getStaffWorkList() {
        return `${this.rootApiService.getRootUrl()}/user/hr-gs-zhiwei?search=`;
    }

    // 删除 delete    url/id
    // 查看 get       url/id
    // 更新 post      url/id/update
    getStaffWorks() {
        return `${this.rootApiService.getRootUrl()}/staff/works`;
    }

    // 添加新工作 POST
    getAddStaffWork() {
        return `${this.rootApiService.getRootUrl()}/user/hr-gs-zhiwei/store`;
    }

    // 更新 post
    getStaffWorksStore() {
        return `${this.rootApiService.getRootUrl()}/staff/works/store`;
    }

    //
}
