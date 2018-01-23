import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Http, URLSearchParams} from "@angular/http";
import {SalaryItemChangeApiService} from "../../api-service/salary-api/salary-item-change-api/salary-item-change-api.service";
import {HttpService} from "../../http-service/http.service";

@Injectable()
export class SalaryItemChangeService {
    // -->请求列表
    public salaryItemSource: Observable<any>;
    // <-----

    constructor(public http: Http,
                public httpService: HttpService,
                public salaryItemChangeApiService: SalaryItemChangeApiService) {
        this.salaryItemSource = this.httpService.myGet(this.salaryItemChangeApiService.getSalaryItemUrl());
    }
}
export class SalaryItemChangeClass {
    constructor(public inc_id: any,
                public type: any,
                public page?: any,
                public order?: any,
                public sort?: any,
                public name?: any) {}
}
