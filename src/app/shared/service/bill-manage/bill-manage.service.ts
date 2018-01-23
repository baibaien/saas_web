import {EventEmitter, Injectable} from '@angular/core';
import {BillManageApiService} from "../api-service/bill-manage-api/bill-manage-api.service";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {HttpService} from "../http-service/http.service";

@Injectable()
export class BillManageService {
    public order_id;

    public count_emitter;
    // <-----


    public list_status;
    constructor(public http: Http,
                public httpService: HttpService) {
    }
    setListStatus(status) {
        this.list_status = status;
    }

    // -->订单号暂存
    setOrderId(id) {
        this.order_id = id;
        window.localStorage.setItem('order_id', this.order_id);
    }
    getOrderId() {
        return this.order_id;
    }
    // <-----


    // -->
    setCountEmitter(emitter) {
        this.count_emitter = emitter;

    }
    // <-----

    getCountEmitter() {
        return this.count_emitter;
    }
    // <-----
}
