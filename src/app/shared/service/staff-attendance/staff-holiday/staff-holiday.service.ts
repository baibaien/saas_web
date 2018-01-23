import {EventEmitter, Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {AttendanceService} from "../../api-service/staff-attendance/attendance/attendance.service";
import {HttpService} from "../../http-service/http.service";

@Injectable()
export class StaffHolidayService {
    // 获取假期列表的流
    public holidaySource: Observable<any>;
    // 保存流返回的数据
    // 数据暂存
    public holiday_list_emit = new EventEmitter();
    constructor(public http: Http,
                public httpService: HttpService,
                public attendanceService: AttendanceService) {
    }
    // 流set&get
    setHolidaysSource(body) {
        this.holidaySource = this.httpService.myPost(this.attendanceService.getHolidays(), JSON.stringify(body));
    }

    getHolidaySource() {
        return this.holidaySource;
    }
    getHolidayListEmit() {
        return this.holiday_list_emit;
    }
    emitHolidaySource() {
        this.holiday_list_emit.emit(this.holidaySource);
    }
}
