import {EventEmitter, Injectable} from '@angular/core';
import {SalaryApiService} from "../../api-service/salary-api/salary-api.service";
import {Http, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {HttpService} from "../../http-service/http.service";

@Injectable()
export class AttendanceAdjustService {



    // -->制定员工快捷调整
    public staffAdjustSource;
    public staff_adjust_emit = new EventEmitter();
    public staff_adjust_params = new URLSearchParams();
    // <-----

    // -->快捷调整
    public quickChnageSource: Observable<any>;
    // <-----
    constructor(public salaryApiService: SalaryApiService,
                public httpService: HttpService,
                public http: Http) {
    }
    // -->制定员工详情
    setStaffAdjust(inc_id, yg_id) {
        this.staffAdjustSource = this.httpService.myGet(`${this.salaryApiService.getAttendanceChange()}/${inc_id}/${yg_id}`);
    }
    getStaffAdjustSource() {
        return this.staffAdjustSource;
    }
    getStaffAdjustEmit() {
        return this.staff_adjust_emit;
    }
    emitStaffAdjustSource() {
        this.staff_adjust_emit.emit(this.staffAdjustSource);
    }
    // <-----
    // -->快捷调整
    setQuickChange(data) {
        this.quickChnageSource = this.httpService.myPost(this.salaryApiService.getAttendanceChange(), data);
    }
    getQuickChange() {
        return this.quickChnageSource;
    }
    // <-----
}
