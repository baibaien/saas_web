import {Injectable} from '@angular/core';
import {RootApiService} from "../root-api/root-api.service";
import {BaseRequestOptions} from "@angular/http";

@Injectable()
export class UsersService {
    public token: string;

    // 用户API
    constructor(public rootApiService: RootApiService) {
    }

    // 用户列表API

    getUsers() {
        return `${this.rootApiService.getRootUrl()}/user/users`;
    }

    // 创建用户 get
    getUsersCreate() {
        return `${this.rootApiService.getRootUrl()}/user/users/create`;
    }

    // 首页表头列表更新 get
    getUsersColumns() {
        return `${this.rootApiService.getRootUrl()}/user/users/update-columns`;
    }

    //Authorization相关
    getAuthorization() {
        return `${this.rootApiService.getRootUrl()}/user/users/authenticate`;
    }

    // 登陆

    // 注册
    // 企业注册
    getUserStore() {
        return `${this.rootApiService.getRootUrl()}/user/users/store`;
    }

    // 个人注册
    getUserStorePersonal() {
        return `${this.rootApiService.getRootUrl()}/user/users/store-personal`;
    }

    // / 首次登陆验证手机
    getPhoneVcode() {
        return `${this.rootApiService.getRootUrl()}/user/users/send-captcha`;
    }

    getPhoneCheckFirst() {
        return `${this.rootApiService.getRootUrl()}/user/users/check-sms`;
    }

    // -->获取密文手机号
    getMobile() {
        return `${this.rootApiService.getRootUrl()}/user/users/get-mobile`;
    }

    // <-----

    // 刷新用户状态
    getUserStatus() {
        return `${this.rootApiService.getRootUrl()}/user/users/get-refresh-info`;
    }

    // -->找回密码模块
    getShowRestPassword() {
        return `${this.rootApiService.getRootUrl()}/user/users/show-reset-password`;
    }

    getVCodeUrl() {
        return `${this.rootApiService.getRootUrl()}/user/users/get-vcode`;
    }

    getResetPassword() {
        return `${this.rootApiService.getRootUrl()}/user/users/reset-password`;
    }

    // <-----

    /**
     * getModalHideSettings
     * 函数描述
     * 获取不再提示modal的状态
     * @params:
     * @return:
     */
    getModalHideSettings() {
        return `${this.rootApiService.getRootUrl()}/user/users/get-prompt`;
    }

    getSetModalHide() {
        return `${this.rootApiService.getRootUrl()}/user/users/add-prompt`;
    }


    // 通知相关API

    /**
     * getUnreadNotificationAmount
     * 函数描述
     * 获取未读通知数
     * @params:
     * @return:
     */
    getUnreadNotificationAmount() {
        return `${this.rootApiService.getRootUrl()}/user/me/unread-notice-amount`;
    }

    /**
     * getNotificationList
     * 函数描述
     * 获取通知列表
     * @params:
     * @return:
     */
    getNotificationList() {
        return `${this.rootApiService.getRootUrl()}/user/me/notices`;
    }

    /**
     * getNotificationDetail()
     * 函数描述
     * 获取通知详情
     * @params:
     * @return:
     */
    getNotificationDetail(id) {
        return `${this.rootApiService.getRootUrl()}/user/${id}/notice`;
    }

    /**
     * getMarkAsRead
     * 函数描述
     * 全部标记为已读
     * @params:
     * @return:
     */
    getMarkAsRead() {
        return `${this.rootApiService.getRootUrl()}/user/notices/set-readed`;
    }

    getSocialConfig() {
        return `${this.rootApiService.getRootUrl()}/staff/staffs/social-setting`;
    }


    // -->文档中心
    getDocumentCenter() {
        return `${this.rootApiService.getRootUrl()}/user/hr-files/public-documents`;
    }

    getDownloadDoc() {
        return `${ this.rootApiService.getRootUrl()}/user/hr-files/download`;
    }

    getSelfUploadDoc() {
        return `${this.rootApiService.getRootUrl()}/user/hr-files/user-documents`;
    }

    getUploadDoc() {
        return `${this.rootApiService.getRootUrl()}/user/hr-files/upload`;
    }

    getDeleteSelfDoc() {
        return `${this.rootApiService.getRootUrl()}/user/hr-files/destroy`;
    }

    // <-----
}
export class MyRequestOptions extends BaseRequestOptions {
    constructor() {
        super();
        this.headers.append('Content-type', 'application/json');
    }
}

