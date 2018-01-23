import {EventEmitter, Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {FilterTermService} from "../filter-term/filter-term.service";
import {StaffsService} from "../../api-service/staff-directory/staffs/staffs.service";
import {HttpService} from "../../http-service/http.service";

@Injectable()
export class StaffListService {

    public staffUrl;
    // -->获取员工列表变量
    public staffSource: Observable<any>;
    public submit_data = {};
    public staff_list_emit = new EventEmitter();
    // <-----

    constructor(public http: Http,
                public httpService: HttpService,
                public filterTermService: FilterTermService,
                public staffsService: StaffsService) {
        // 员工列表请求
        // url设置
        this.staffUrl = this.staffsService.getStaffs();
        this.staffSource = this.httpService.myPost(this.staffUrl, this.submit_data);
    }
}