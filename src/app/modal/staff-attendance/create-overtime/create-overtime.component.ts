import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StaffOutlineService} from '../../../shared/service/staff-attendance/staff-outline/staff-outline.service';
import {isUndefined} from 'util';
import {Observable} from 'rxjs/Observable';
import {AttendanceService} from '../../../shared/service/api-service/staff-attendance/attendance/attendance.service';
import {DateService} from '../../../shared/service/date/date.service';
import {GlobalFuncService} from "../../../shared/service/global-func/global-func.service";
import {ModalService} from "app/shared/service/modal/modal.service";
import {HttpService} from "../../../shared/service/http-service/http.service";
import {AssistModalService} from "../../../shared/service/assist-modal-service/assist-modal.service";

@Component({
    selector: 'app-create-overtime',
    templateUrl: './create-overtime.component.html',
    styleUrls: ['./create-overtime.component.css']
})
export class CreateOvertimeComponent implements OnInit, OnDestroy {
    @Input()
    modal_name;
    @Input()
    modal_info;
    @Input()
    modal_callback;

    public before_submit;
    public view_date_after;
    // 表单
    public overtime_create: FormGroup;
    // 下拉框数据
    public staff_outline;
    // 下拉框选中的值
    public value;
    // 时长
    // public duration = new Array(15);
    public rates = [
        {id: 1, name: '1倍'},
        {id: 1.5, name: '1.5倍'},
        {id: 2, name: '2倍'},
        {id: 3, name: '3倍'},
    ];
    public date_now;
    public date_after;

    public baseSalarySource: Observable<any>;
    public base_salary_url: string;
    public base_salary = 0;
    // -->日历插件输入
    public start_time_options = {};
    public end_time_options = {};
    // <-----

    // -->值变更
    public match_emitter;
    // <-----
    constructor(public fb: FormBuilder,
                public globalFuncService: GlobalFuncService,
                public modalService: ModalService,
                public staffOutlineService: StaffOutlineService,
                public attendanceService: AttendanceService,
                public assistModalService: AssistModalService,
                public dateService: DateService,
                public httpService: HttpService) {
        // this.baseSalarySource = this.httpService.myPost(this.attendanceService.getHolidaysAndSalary(), '');
        this.date_now = this.dateService.getDateNow('day');
        this.date_after = this.dateService.getDateNow('day', -1);
    }

    ngOnInit() {
        // // 请求员工下拉框
        console.log(this.modal_info);
        // }
        // 编辑数据获取
        if (!isUndefined(this.modal_info) && !this.modal_info.hasOwnProperty('duration')) {
            this.baseSalarySource = this.httpService.myPost(`${this.attendanceService.getHolidaysAndSalary()}/${this.modal_info.id}`,
                {month: this.dateService.getDateNow()});
            this.baseSalarySource.subscribe((data) => {
                this.overtime_create = this.fb.group({
                    yg_id: ['', Validators.required],
                    start_time: [this.date_now, Validators.required],
                    duration: ['', Validators.required],
                    time_type: ['0'],
                    type_id: ['1'],
                    rate: [[this.rates[0]]],
                    expire_time: [this.date_after],
                    remark: [''],
                    days: ['']
                });
                this.matchDuration();
                this.end_time_options = {start_time: this.date_now};
                this.base_salary = data.data.hour_salary;
                this.overtime_create.get('yg_id').setValue([this.modal_info]);
                console.log(this.overtime_create.get('yg_id').valid);
                this.overtime_create.get('yg_id').disable();
                console.log(this.overtime_create.get('yg_id').valid);
            });
        } else if (!isUndefined(this.modal_info) && this.modal_info.hasOwnProperty('duration')) {
            let _time_type;
            this.baseSalarySource = this.httpService.myPost(`${this.attendanceService.getHolidaysAndSalary()}/${this.modal_info.yg_id}`,
                {month: this.dateService.getDateNow()});
            this.baseSalarySource.subscribe((data) => {
                this.base_salary = data.data.hour_salary;

                console.log(this.modal_info);
                // -->rate初始化
                let tmp_rate;
                for (let i in this.rates) {
                    if (this.rates[i].id == this.modal_info.payroll_rate) {
                        tmp_rate = this.rates[i];
                    }
                }
                console.log(tmp_rate);
                // <-----
                this.overtime_create = this.fb.group({
                    yg_id: [{
                        value: [{id: this.modal_info.yg_id, name: this.modal_info.yg_name}],
                        disabled: this.modal_info !== ''
                    }],
                    start_time: [this.modal_info.start_time],
                    duration: [this.modal_info.duration, Validators.required],
                    type_id: [this.modal_info.type_id.toString()],
                    rate: [[tmp_rate]],
                    remark: [this.modal_info.remark],
                    expire_time: [this.modal_info.expire_time.substr(0, 10)]
                });
                this.matchDuration();
                this.end_time_options = {start_time: this.date_now};

                if (!this.modal_info.is_edit) {
                    let tmp = ['start_time', 'duration', 'type_id', 'rate', 'expire_time'];
                    for (let i in tmp) {
                        this.overtime_create.get(tmp[i]).disable();
                    }
                }
            });
        } else {
            console.log(this.date_after);
            this.overtime_create = this.fb.group({
                yg_id: ['', Validators.required],
                start_time: [this.date_now, Validators.required],
                duration: ['', Validators.required],
                time_type: ['0'],
                type_id: ['1'],
                rate: [[this.rates[0]]],
                expire_time: [this.date_after],
                remark: [''],
                days: ['']
            });
            console.log(this.overtime_create.value);
            this.matchDuration();
            this.end_time_options = {start_time: this.date_now};
            this.staffOutlineService.getStaffOutlineRequest()
                .subscribe((data) => {
                    this.staff_outline = this.staffOutlineService.compileData(data.data);
                });
        }
    }

    ngOnDestroy() {
        this.match_emitter.unsubscribe();
    }

    changeStartTime(event) {
        this.end_time_options = {start_time: event};
    }

    refreshValue(value: any): void {
        if (value.id) {
            let tmp = this.attendanceService.getHolidaysAndSalary();
            if (value.length) {
                this.value = value[0];
            } else {
                this.value = value;
            }
            tmp += `/${this.value.id}`;
            this.baseSalarySource = this.httpService.myPost(tmp, {month: this.dateService.getDateNow()});
            this.baseSalarySource.subscribe((data) => {
                this.base_salary = data.data.hour_salary;
            });
        }
    }

    durationToggle(data?) {
        if (data) {
            this.overtime_create.get('duration').enable();
            this.overtime_create.get('duration').setValue('0.5');
        } else {
            this.overtime_create.get('duration').setValue('8');
            this.overtime_create.get('duration').disable();
        }
    }

    deleteRecord() {
        this.assistModalService.openAssistModal('confirm', '确认删除？', () => {
            this.httpService.myDelete(`${this.attendanceService.getAttendance()}/${this.modal_info.id}`)
                .subscribe((data) => {
                    this.assistModalService.openAssistModal('toast', '删除成功', () => {
                        if (!isUndefined(this.modal_callback)) {
                            this.modal_callback();
                        }
                        this.cancelOvertime();
                    });
                });
        });

    }

    cancelOvertime() {
        this.modalService.setModalName('');
        this.modalService.emitModalName();
    }

    createOvertime() {
        this.before_submit = true;
        console.log(this.overtime_create.value);
        this.overtime_create.updateValueAndValidity();
        console.log(this.overtime_create.getRawValue());
        console.log(this.overtime_create);
        if (this.overtime_create.valid) {
            this.before_submit = false;
            const tmp = JSON.parse(JSON.stringify(this.overtime_create.getRawValue()));
            let submit_data;
            this.overtime_create.value['type'] = 1;
            submit_data = this.compileSubmitDate(tmp);
            this.httpService.myPost(`${this.attendanceService.getAttendance()}`, JSON.stringify(submit_data))
                .subscribe((data) => {
                    this.assistModalService.openAssistModal('toast', '操作成功', () => {
                        if (!isUndefined(this.modal_callback)) {
                            this.modal_callback();
                        }
                        this.cancelOvertime();
                    });
                });
        }
    }

    editOvertime() {
        this.before_submit = true;

        if (this.overtime_create.valid) {
            this.before_submit = false;
            const tmp = JSON.parse(JSON.stringify(this.overtime_create.getRawValue()));
            let submit_data;
            submit_data = this.compileSubmitDate(tmp);
            this.httpService.myPost(`${this.attendanceService.getAttendance()}/${this.modal_info.id}`, JSON.stringify(submit_data))
                .subscribe((data) => {
                    this.assistModalService.openAssistModal('toast', '编辑成功', () => {
                        if (!isUndefined(this.modal_callback)) {
                            this.modal_callback();
                        }
                        this.cancelOvertime();
                    });
                });
        }
    }

    // 格式转换
    compileSubmitDate(data) {
        // yg_id格式转换
        // yg_id格式转换
        data.yg_id = data.yg_id[0].id;
        if (data.rate instanceof Array) {
            data.rate = data.rate[0].id;
        }
        if (data.days !== true) {
            delete data.end_time;
        }
        if (this.modal_name === 'absence') {
            data['type'] = 2;
        } else {
            data['type'] = 1;
        }
        return data;
    }

    // -->自动匹配
    matchDuration() {
        this.match_emitter = this.overtime_create.get('duration').valueChanges
            .subscribe(test => {
                if (!isNaN(Number(test))) {
                    if (test < 0 && test != '') {
                        this.overtime_create.get('duration').setValue('0');
                    } else if (Number(test) > 24) {
                        this.overtime_create.get('duration').setValue('24');
                    } else {
                        if (test < 0.5 && test != 0) {
                            this.overtime_create.get('duration').setValue('0.5');
                        } else {
                            if (test * 2 % 1 != 0) {
                                const tmp = Math.floor(test * 2) / 2;
                                this.overtime_create.get('duration').setValue(tmp);
                            }
                        }
                    }
                } else {
                    this.overtime_create.get('duration').setValue('0.5');
                }
            });
    }

    // <-----
    formatDuration() {
        let tmp = this.overtime_create.get('duration');
        if (tmp.value.toString().charAt(tmp.value.length - 1) === '.') {
            console.log(this.overtime_create.get('duration').value);
            this.overtime_create.get('duration').setValue(tmp.value.substr(0, tmp.value.length - 1));
            console.log(this.overtime_create.get('duration').value);

        }
    }

    shadowCancel() {
        this.cancelOvertime();
    }
}
