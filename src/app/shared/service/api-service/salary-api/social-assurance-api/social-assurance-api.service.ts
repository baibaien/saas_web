import {Injectable} from '@angular/core';
import {RootApiService} from "../../root-api/root-api.service";

@Injectable()
export class SocialAssuranceApiService {

    constructor(public rootApiService: RootApiService) {
    }
    // 获取社保
    getSocial() {
        return `${this.rootApiService.getRootUrl()}/social/index`;
    }
    // -->历史列表
    getSocialHistory() {
        return `${this.rootApiService.getRootUrl()}/social/history`;
    }
    // <-----
    // -->历史记录
    getSocialHistoryDetail() {
        return `${this.rootApiService.getRootUrl()}/social/show`;
    }
    // <-----
    // -->获取详情
    getSocialDetail() {
        return `${this.rootApiService.getRootUrl()}/social/detail`;
    }
    // <-----
    // -->表格下载
    getSocialExcel() {
        // return `${this.rootApiService.getRootUrl()}/salary/salary/socialAndFundDown/${month}`;
        return `${this.rootApiService.getRootUrl()}/salary/salary/socialAndFundDown`;

    }
    // <-----
}
