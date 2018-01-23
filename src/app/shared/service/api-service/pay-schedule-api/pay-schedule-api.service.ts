import {Injectable} from '@angular/core';
import {RootApiService} from "../root-api/root-api.service";

@Injectable()
export class PayScheduleApiService {

    constructor(public rootApiService: RootApiService) {
    }

    // --缴纳进度
    getPayProgress() {
        return `${this.rootApiService.getRootUrl()}/pay/pay-progress`;
    }
    getPayProgressDetail() {
        return `${this.rootApiService.getRootUrl()}/pay/pay-progress-detail`;
    }
    // <-----
}
