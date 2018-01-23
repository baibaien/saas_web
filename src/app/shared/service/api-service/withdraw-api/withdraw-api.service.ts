import {Injectable} from '@angular/core';
import {RootApiService} from "../root-api/root-api.service";

@Injectable()
export class WithdrawApiService {

    constructor(public rootApiService: RootApiService) {
    }

    /**
     * getWithdrawData----get
     * 函数描述
     * 获取提现展示数据的函数
     * @params:
     * @return:
     */
    getWithdrawData() {
        return `${this.rootApiService.getRootUrl()}/withdraw/index`;
    }

    /**
     * getWithdrawSubmit----post
     * 函数描述
     * 提交提现信息
     * @params:
     * @return:
     */
    getWithdrawSubmit() {
        return `${this.rootApiService.getRootUrl()}/withdraw/submit`;
    }


    getWithdrawCaptcha() {
        return `${this.rootApiService.getRootUrl()}/withdraw/send-captcha`;
    }

    /**
     * 确认提现
     * 函数描述
     * getWithdrawSure
     * @params:
     * @return:
     */
    getWithdrawSure() {
        return `${this.rootApiService.getRootUrl()}/withdraw/sure`;
    }
}
