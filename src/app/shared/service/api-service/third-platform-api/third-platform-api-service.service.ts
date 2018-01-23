import {Injectable} from '@angular/core';
import {RootApiService} from "../root-api/root-api.service";

@Injectable()
export class ThirdPlatformApiServiceService {

    constructor(public rootApiService: RootApiService) {
    }


    /**
     * getThirdPlatformPayment
     * 函数描述
     * 第三方支付接口
     * @params:
     * @return:
     */
    getThirdPlatformPayment() {
        return `${this.rootApiService.getRootUrl()}/third-platform/third-platform/payment`;
    }
}
