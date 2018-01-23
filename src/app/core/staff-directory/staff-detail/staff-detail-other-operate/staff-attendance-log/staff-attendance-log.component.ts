import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RequestOptionsArgs, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {DateService} from '../../../../../shared/service/date/date.service';
import {AttendanceService} from '../../../../../shared/service/api-service/staff-attendance/attendance/attendance.service';
import {IdNameService} from '../../../../../shared/service/id-name/id-name.service';
import {ModalService} from '../../../../../shared/service/modal/modal.service';
import {HttpService} from '../../../../../shared/service/http-service/http.service';
import {StaffsService} from "../../../../../shared/service/api-service/staff-directory/staffs/staffs.service";

@Component({
    selector: 'app-staff-attendance-log',
    templateUrl: './staff-attendance-log.component.html',
    styleUrls: ['./staff-attendance-log.component.css']
})
export class StaffAttendanceLogComponent implements OnInit, OnDestroy {
    user_id: number;

    // 防止在同一个月份上持续点击

    public yg_name;
    public attendanceLogSource: Observable<any>;
    public attendance_params = new URLSearchParams;
    public attendance_log_options: RequestOptionsArgs = {};
    public submit_data = {};
    public log_items = [];
    public log_items_origin;

    // -->modal
    public modal_name: string;
    public modal_info: any;
    public modal_name_emitter: EventEmitter<any>;
    public modal_callback;
    // <-----


    public search_month;


    public attendance_show = -1;
    public previous_show = -1;


    constructor(public route: ActivatedRoute,
                public httpService: HttpService,
                public dateService: DateService,
                public attendanceService: AttendanceService,
                public modalService: ModalService,
                public staffsService: StaffsService) {
        document.title = '缺勤请假和加班记录';
        this.user_id = this.route.snapshot.params['user_id'];
        this.search_month = this.dateService.getDateNow('month');
        this.submit_data['month'] = this.search_month;
        this.setAttendanceParams(this.submit_data);
        this.httpService.myGet(this.staffsService.getStaffOutline())
            .subscribe(data => {
                console.log(data);
                for (const staff of data.data) {
                    if (staff.id == this.user_id) {
                        this.yg_name = staff.name;
                    }
                }
                this.attendanceLogSource = this.httpService.myGet(`${this.attendanceService.getAttendance()}/${this.user_id}`, this.attendance_log_options);
            });
        this.modal_name_emitter = this.modalService.getModalNameEmit().subscribe(data1 => {
            this.modal_name = data1;
        });
    }

    ngOnInit() {
        this.requestLog();
    }

    ngOnDestroy() {
        this.modal_name_emitter.unsubscribe();
    }

    // --> 选择月份
    chooseMonthRequest(event) {
        console.log(event);
        this.submit_data['month'] = event;
        this.setAttendanceParams(this.submit_data);
        this.requestLog();
    }

    // <-----
// -->初始化数据请求
    requestLog() {
        this.attendanceLogSource.subscribe((data) => {
            this.log_items = JSON.parse(JSON.stringify(data.data.data));
            this.log_items_origin = JSON.parse(JSON.stringify(data.data.data));
            for (const i in this.log_items) {
                this.log_items[i].duration = this.dateService.timetoggle(this.log_items[i].duration);
            }
        });
    }

// <-----
// -->设置请求参数
    setAttendanceParams(data) {
        for (let i in data) {
            this.attendance_params.set(i, data[i]);
        }
        this.attendance_log_options['search'] = this.attendance_params;
        this.attendanceLogSource = this.httpService.myGet(`${this.attendanceService.getAttendance()}/${this.user_id}`, this.attendance_log_options);
    }

// <-----


    // -->展开详情
    attendanceDetailShow(i) {
        if (i === this.previous_show) {
            this.attendance_show = -1;
            this.previous_show = -1;
        } else {
            this.attendance_show = i;
            this.previous_show = i;
        }
    }

    // <-----
// -->模态框弹出判断
    editModal(e, index) {
        e.stopPropagation();
        if (this.log_items_origin[index].type == 2) {
            this.modal_name = 'absence';
        } else {
            this.modal_name = 'overtime';
        }
        this.modal_info = this.log_items_origin[index];
        console.log(this.modal_info);
        this.modal_callback = () => {
            this.ngOnInit();
        };
    }
}
// <-----
