import {Injectable} from '@angular/core';
import {RootApiService} from "../../root-api/root-api.service";

@Injectable()
export class StaffFamiliesService {
    // 员工家庭信息
    constructor(public rootApiService: RootApiService) {
    }

    // 列表  GET
    // 查看  get    url/id
    // 删除 delete    url/id
    // 更新  post   url/id/update
    getStaffFamilies() {
        return `${this.rootApiService.getRootUrl()}/staff/families`;
    }
    // 添加  POST
    getStaffFamiliesStore() {
        return `${this.rootApiService.getRootUrl()}/staff/families/store`;
    }

}
