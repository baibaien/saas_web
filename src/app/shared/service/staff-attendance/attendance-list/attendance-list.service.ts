import {EventEmitter, Injectable} from '@angular/core';
import {Headers, Http, RequestOptionsArgs, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {AttendanceTokenService} from "../../api-service/staff-attendance/attendance-token/attendance-token.service";
import {AttendanceService} from "../../api-service/staff-attendance/attendance/attendance.service";
import {RequestOptions} from "http";
import {DateService} from "../../date/date.service";
import {HttpService} from "../../http-service/http.service";


@Injectable()
export class AttendanceListService {
    // 获取索引列表请求
    public attendance_list_url: string;
    public list_params = new URLSearchParams();
    public attendance_list_options: RequestOptionsArgs = {};
    public attendanceListSource: Observable<any>;

    // attendanceList暂存
    public attendance_list;
    public attendance_list_emit = new EventEmitter();


    constructor(public attendanceService: AttendanceService,
                public dateService: DateService,
                public http: Http,
                public httpService: HttpService) {
        this.attendance_list_url = this.attendanceService.getAttendance();
        this.list_params.set('size', '10');
        this.attendance_list_options['search'] = this.list_params;
        this.attendanceListSource = this.httpService.myGet(this.attendance_list_url, this.attendance_list_options);
    }

    getAttendanceListSource() {
        return this.attendanceListSource;
    }

    getAttendanceListEmitter() {
        return this.attendance_list_emit;
    }

    emitAttendanceListSource() {
        this.attendance_list_emit.emit(this.attendanceListSource);
    }

    setAttendanceListSource(data) {
        for ( const i in data.data.data) {
            data.data.data[i].duration = this.dateService.timetoggle(data.data.data[i].duration);
        }
        this.attendance_list = data.data.data;
    }
}
