import {Injectable} from '@angular/core';
import {RootApiService} from "../root-api/root-api.service";

@Injectable()
export class AccountSettingsService {
    public header;

    constructor(public rootApi: RootApiService) {
        this.header = this.rootApi.getRootUrl();
    }

    // 账户设置页面信息
    getUserInfo() {
        return `${this.header}/user/users/show-sign-all`;
    }

    // 更新签约账户主体
    updateSignInfo() {
        return `${this.header}/user/users/update-sign-info`;
    }

    getFapiaoInfo() {
        return `${this.header}/user/hr-fapiao-info`;
    }

    // 发送验证码
    getCaptcha() {
        // return `${this.header}/user/users/send-captcha`;
        return `${this.header}/user/users/send-captcha-by-mobile`;

    }

    // 更新密码
    updatePw() {
        return `${this.header}/user/users/update-password`;
    }

    // 更新手机号码
    updateMobile() {
        return `${this.header}/user/users/update-mobile`;
    }

    // 更新账户联系人
    updateContact() {
        return `${this.header}/user/hr-contact-info/update`;
    }

    // 更新发票信息
    updateFapiao() {
        return `${this.header}/user/hr-fapiao-info/update`;
    }

    // 添加发票寄送地址
    addSend() {
        return `${this.header}/user/hr-address/store`;
    }

    updateSend(id) {
        return `${this.header}/user/hr-address/${id}/update`;
    }

    getSendAddr(id: any = '') {
        return `${this.header}/user/hr-address/${id}`;
    }

    // 营业执照上传
    uploadLicencePic() {
        return `${this.header}/user/users/upload-com-sn`;
    }

    // 合同上传
    uploadContractFront() {
        return `${this.header}/user/hr-contract/upload-outsource-front`;
    }

    uploadContractBack() {
        return `${this.header}/user/hr-contract/upload-outsource-back`;
    }

    uploadSaasFront() {
        return `${this.header}/user/hr-contract/upload-saas-front`;
    }

    uploadSaasBack() {
        return `${this.header}/user/hr-contract/upload-saas-back`;
    }

    // 微信二维码
    getQrCode() {
        return `${this.header}/user/users/wechat-subscribe-qrcode`;
    }

    // -->微信解绑
    getUnbindWechat() {
        return `${this.header}/user/users/unbind`;
    }
    // <-----

    // 下载合同第一页
    downloadContractFront() {
        return `${this.header}/user/hr-contract/preview-outsource-front`;
    }

    // 下载合同第二页
    downloadContractBack() {
        return `${this.header}/user/hr-contract/preview-outsource-back`;
    }


    // -->记新规则获取
    getSalaryRuleText() {
        return `${this.header}/salary/rule/preview`;
    }

    // <-----
}

