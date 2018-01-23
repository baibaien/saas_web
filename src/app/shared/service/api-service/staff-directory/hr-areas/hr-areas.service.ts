import {Injectable} from '@angular/core';
import {RootApiService} from "../../root-api/root-api.service";

@Injectable()
export class HrAreasService {
    // 开通地区API
    constructor(public rootApiService: RootApiService) {
    }

    // 列表 get
    getHrAreas() {
        return `${this.rootApiService.getRootUrl()}/staff/hr-areas/`;
    }

}
