import {EventEmitter, Injectable} from '@angular/core';
import {isUndefined} from "util";
import {Router} from "@angular/router";

@Injectable()
export class UserStatusService {


    public user_status_watcher = new EventEmitter();


    constructor(public router: Router) {
    }

    checkOutsourceUse() {

        const is_outsource_use = window.localStorage.getItem('outsource_sign_status');
        const is_active = window.localStorage.getItem('is_self_active_status');

        if (isUndefined(is_outsource_use) || isUndefined(is_active)) {
            this.router.navigate(['/entry/login']);
            return;
        } else {
            if (Number(is_outsource_use) === 1) {
                return 1;
            } else if (Number(is_outsource_use) === 0) {
                return 0;
            } else if (Number(is_outsource_use) === -1) {
                if (Number(is_active) === 2) {
                    return 1;
                } else {
                    return 0;
                }
            }
        }
    }


    /**
     * getUserStatusWatcher
     * 函数描述
     * 用户状态流获取
     * @params:
     * @return:
     */
    getUserStatusWatcher() {
        return this.user_status_watcher;
    }

    emitUserStatusChange(is_route = false) {
        this.user_status_watcher.emit(is_route);
    }
}
