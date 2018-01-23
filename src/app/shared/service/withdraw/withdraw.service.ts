import {Injectable} from '@angular/core';

@Injectable()
export class WithdrawService {

    public withdraw_status: Object;

    constructor() {
    }

    setStatus(data) {
        this.withdraw_status = data;
    }

    getStatus() {
        return this.withdraw_status;
    }

}
