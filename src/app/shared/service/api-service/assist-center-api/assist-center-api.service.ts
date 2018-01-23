import {Injectable} from '@angular/core';
import {RootApiService} from "../root-api/root-api.service";

@Injectable()
export class AssistCenterApiService {

    constructor(public rootApiService: RootApiService) {
    }

    // 帮助种类
    getAssistList() {
        return `${this.rootApiService.getRootUrl()}/user/hr-help-list/get-types`;
    }

    // 帮助种类下列表
    getAssistQuestion() {
        return `${this.rootApiService.getRootUrl()}/user/hr-help-list/index`;
    }

    // -->问题列表
    getQuestionList() {
        return `${this.rootApiService.getRootUrl()}/user/hr-help-list/index`;
    }

    // <-----
    getQuestionShow() {
        return `${this.rootApiService.getRootUrl()}/user/hr-help-list/show`;
    }

    // 提交留言
    getAddMessage() {
        return `${this.rootApiService.getRootUrl()}/user/feedback/store`;
    }

    // 留言列表
    getMessageList() {
        return `${this.rootApiService.getRootUrl()}/user/feedback/index`;
    }

    // --> 留言详情
    getMessageDetail() {
        return `${this.rootApiService.getRootUrl()}/user/feedback/show`;
    }

    // <-----

    // -->客服电话
    getTelephoneNum() {
        return `${this.rootApiService.getRootUrl()}/user/users/custom-services`;
    }

    // <-----
}
