import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StaffOutlineService} from '../../../shared/service/staff-attendance/staff-outline/staff-outline.service';
import {isNull, isNullOrUndefined, isUndefined} from 'util';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {AttendanceService} from '../../../shared/service/api-service/staff-attendance/attendance/attendance.service';
import {DateService} from '../../../shared/service/date/date.service';
import {ModalService} from "../../../shared/service/modal/modal.service";
import {GlobalFuncService} from "../../../shared/service/global-func/global-func.service";
import {HttpService} from "../../../shared/service/http-service/http.service";
import {AssistModalService} from "../../../shared/service/assist-modal-service/assist-modal.service";

@Component({
    selector: 'app-create-absence',
    templateUrl: './create-absence.component.html',
    styleUrls: ['./create-absence.component.css']
})
export class CreateAbsenceComponent implements OnInit {
    @Input()
    modal_name;
    @Input()
    modal_info;
    @Output()
    lock_emit = new EventEmitter();
    @Input()
    modal_callback;


    // -->校验
    public before_submit = false;
    public balance_insufficient = false;
    // <-----
    // 表单
    public absence: FormGroup;
    // 检索下拉的值
    public value: any = {};
    // 检索下拉中员工列表
    public staff_outline;
    // 当前时间
    public date_now;
    public date_after;
    public view_date_now;
    public view_date_after;
    // 时长option
    public duration = new Array(15);
    // 工资倍率
    public rate = [
        {id: 0.1, name: '扣除比例10%'},
        {id: 0.2, name: '扣除比例20%'},
        {id: 0.3, name: '扣除比例30%'},
        {id: 0.4, name: '扣除比例40%'},
        {id: 0.5, name: '扣除比例50%'},
        {id: 0.6, name: '扣除比例60%'},
        {id: 0.7, name: '扣除比例70%'},
        {id: 0.8, name: '扣除比例80%'},
        {id: 0.9, name: '扣除比例90%'},
        {id: 1, name: '扣除比例100%'},
    ];
    // 获取假期变量
    public staffHolidaySource: Observable<any>;
    public staff_holiday_url;
    // 获取假期类型
    public holiday_type;
    public holidayTypeSource: Observable<any>;
    public holiday_type_url;
    public holiday_time;

    // -->日历插件输入
    public start_time_options = {};
    public end_time_options = {};
    // <-----


    // -->实际工作日
    public total_work;
    // <-----

    // -->select config
    public staff_select_config = {
        placeholder: '请选择员工',

    };
    // <-----
    constructor(public modalService: ModalService,
                public httpService: HttpService,
                public globalFuncService: GlobalFuncService,
                public staffOutlineService: StaffOutlineService,
                public attendanceService: AttendanceService,
                public dateService: DateService,
                public assistModalService: AssistModalService,
                public fb: FormBuilder) {
        this.staff_holiday_url = this.attendanceService.getHolidaysAndSalary();
        this.date_now = this.dateService.getDateNow('day');
        this.date_after = this.dateService.getDateNow('day');
        this.view_date_after = this.date_after;
        // 假期类型获取
        this.holidayTypeSource = this.httpService.myGet(`${this.attendanceService.getHolidayType()}/1`);


        // --> 时长处理
        this.duration.fill('');
        this.duration = this.duration.map((val, index) => {
            return {
                id: (Number(index) + 1) / 2,
                name: (Number(index) + 1) / 2
            };
        });
        // <-----

    }

    ngOnInit() {
        console.log(this.modal_info);
        this.holidayTypeSource.subscribe((holiday) => {
            this.holiday_type = holiday.data.data.map(val => {
                return {
                    id: val.id,
                    name: val.holiday_name
                };
            });
            if (!isUndefined(this.modal_info) && !this.modal_info.hasOwnProperty('start_time')) {
                this.absence = this.fb.group({
                    yg_id: ['', Validators.required],
                    start_time: [this.date_now],
                    end_time: [this.date_after],
                    duration: [[{id: 0.5, name: 0.5}], Validators.required],
                    time_type: ['0'],
                    payroll_quote: ['2'],
                    type_id: [[this.holiday_type[0]], Validators.required],
                    rate: [[{id: 1, name: '扣除比例100%'}]],
                    remark: [''],
                    days: ['']
                });
                this.end_time_options = {start_time: this.date_now, start_time_type: 1};
                this.absence.get('yg_id').setValue([this.modal_info]);
                this.value = this.modal_info.id;
                this.getHolidayTime(this.value, this.date_now);
                this.absence.get('yg_id').disable();
                this.calcAbsenceDay();
            } else if (!isUndefined(this.modal_info) && this.modal_info.hasOwnProperty('start_time')) {
                let _time_type;
                const url = this.staff_holiday_url;

                let tmp_duration;
                for (const i in this.duration) {
                    if (this.modal_info.duration == 8) {
                        tmp_duration = {id: 8, name: 8};
                    } else if (this.modal_info.duration == this.duration[i].id) {
                        tmp_duration = this.duration[i];
                    }
                }
                if (isUndefined(tmp_duration)) {
                    tmp_duration = this.duration[0];
                }
                if (this.modal_info.duration == 8) {
                    _time_type = '1';
                } else {
                    _time_type = '0';
                }


                // -->假期类型
                let tmp_type_id;
                for (const i in this.holiday_type) {
                    if (this.modal_info.type_id == this.holiday_type[i].id) {
                        tmp_type_id = this.holiday_type[i];
                    }
                }
                if (isUndefined(tmp_type_id)) {
                    tmp_type_id = this.holiday_type[0];
                }
                // <-----

                // -->扣除比例
                let tmp_rate;
                for (const i in this.rate) {
                    if (this.modal_info.payroll_rate == this.rate[i].id) {
                        tmp_rate = this.rate[i];
                    }
                }
                if (isUndefined(tmp_rate)) {
                    tmp_rate = this.rate[0];
                }
                // <-----
                // <-----
                // 是否多日
                let _days;
                if (this.modal_info.end_time === '') {
                    _days = '';
                    const year = this.modal_info.start_time.substr(0, 4);
                    const month = this.modal_info.start_time.substr(5, 2);
                    let day = this.modal_info.start_time.substr(8, 2);
                    const tmp = new Date(Number(year), Number(month) - 1, Number(day) + 1);
                    tmp.getDate() < 10 ? day = `0${tmp.getDate()}` : day = tmp.getDate();
                    this.modal_info.end_time = `${tmp.getFullYear()}-${tmp.getMonth() + 1}-${day}`;
                } else {
                    _days = '1';
                    this.view_date_after = this.modal_info.end_time;
                }
                if (this.modal_info.payroll_quote == 10 || this.modal_info.payroll_quote == 3) {
                    this.modal_info.payroll_quote = 2;
                }
                this.staffHolidaySource = this.httpService.myPost(`${url}/${this.modal_info.yg_id}`,
                    {month: this.modal_info.start_time});
                this.staffHolidaySource.subscribe((data) => {
                    this.holiday_time = 0;
                    for (let i in data.data.holiday) {
                        this.holiday_time += data.data.holiday[i].holiday_total;
                    }
                    this.end_time_options = {start_time: this.modal_info.start_time, start_time_type: 1};

                    this.absence = this.fb.group({
                        yg_id: [{
                            value: [{id: this.modal_info.yg_id, name: this.modal_info.yg_name}],
                            disabled: !isUndefined(this.modal_info)
                        }, Validators.required],
                        start_time: [this.modal_info.start_time],
                        end_time: [this.modal_info.end_time],
                        duration: [{value: [tmp_duration], disabled: Number(_time_type)}, Validators.required],
                        time_type: [_time_type],
                        payroll_quote: [this.modal_info.payroll_quote.toString()],
                        type_id: [[tmp_type_id], Validators.required],
                        rate: [[tmp_rate]],
                        remark: [this.modal_info.remark],
                        days: [_days]
                    });
                    this.value = this.modal_info.yg_id;
                    if (!this.modal_info.is_edit) {
                        let tmp = ['yg_id', 'start_time', 'end_time', 'duration', 'time_type', 'payroll_quote', 'type_id', 'rate', 'days'];
                        for (let i in tmp) {
                            this.absence.get(tmp[i]).disable();
                        }
                    }
                    this.absence.updateValueAndValidity();
                    this.calcAbsenceDay();
                });
            } else {
                this.absence = this.fb.group({
                    yg_id: ['', Validators.required],
                    start_time: [this.date_now],
                    end_time: [this.date_after],
                    duration: [[{id: 0.5, name: 0.5}], Validators.required],
                    time_type: ['0'],
                    payroll_quote: ['2'],
                    type_id: [[this.holiday_type[0]], Validators.required],
                    rate: [[{id: 1, name: '扣除比例100%'}]],
                    remark: [''],
                    days: ['']
                });
                this.end_time_options = {start_time: this.date_now, start_time_type: 1};

                this.staffOutlineService.getStaffOutlineRequest()
                    .subscribe((data) => {
                        this.staff_outline = this.staffOutlineService.compileData(data.data);
                    });
                this.calcAbsenceDay();
            }

        });
    }

    //
    // 时长单位切换
    durationToggle(data?) {
        if (data) {
            this.absence.get('duration').enable();
            this.absence.get('duration').setValue([{id: 0.5, name: 0.5}]);
        } else {
            this.absence.get('duration').setValue([{id: 8, name: 8}]);
            this.absence.get('duration').disable();
        }
    }

    // 下拉检索框选中后
    refreshValue(value: any, time): void {
        if (!isUndefined(value.id)) {
            this.value = value;
            this.getHolidayTime(value.id, time);
        }
    }

    changeStartTime(event) {
        this.end_time_options = {start_time: event, start_time_type: 1};
        if (this.absence.get('days').value) {
            window.setTimeout(
                () => {
                    this.calcAbsenceDay();
                }, 1);
        }
        if (!isNullOrUndefined(this.value.id)) {
            this.getHolidayTime(this.value.id, event);
        }

    }

    changeEndTime(event) {
        window.setTimeout(
            () => {
                this.calcAbsenceDay();
            }, 1);
    }

    deleteRecord() {
        this.assistModalService.openAssistModal('confirm', '确认删除？', () => {
            this.httpService.myDelete(`${this.attendanceService.getAttendance()}/${this.modal_info.id}`)
                .subscribe((data) => {
                    this.assistModalService.openAssistModal('toast', '删除成功', () => {
                        if (!isUndefined(this.modal_callback)) {
                            this.modal_callback();
                        }
                        this.cancelAbsence();

                    });
                    // this.globalFuncService.emitInfoListSource();
                });
        });

    }

    // 关闭模态框
    cancelAbsence() {
        this.modalService.setModalName('');
        this.modalService.emitModalName();
    }

    //
    // 提交记录
    createAbsence() {
        this.before_submit = true;
        if (this.absence.valid) {
            this.before_submit = false;
            let tmp = JSON.parse(JSON.stringify(this.absence.getRawValue()));
            let submit_data;
            submit_data = this.compileSubmitDate(tmp);
            if (tmp.payroll_quote == 1) {
                submit_data.type_id = 14;
            }
            this.httpService.myPost(this.attendanceService.getAttendance(), JSON.stringify(submit_data))
                .subscribe((data) => {
                    this.assistModalService.openAssistModal('toast', '操作成功', () => {
                        if (!isUndefined(this.modal_callback)) {
                            this.modal_callback();
                        }
                        this.cancelAbsence();
                    });
                });
        }
    }

    editAbsence() {
        this.before_submit = true;
        if (this.absence.valid) {
            this.before_submit = false;
            let tmp = JSON.parse(JSON.stringify(this.absence.getRawValue()));
            let submit_data;
            submit_data = this.compileSubmitDate(tmp);
            if (tmp.payroll_quote == 1) {
                submit_data.type_id = 14;
            }
            this.httpService.myPost(`${this.attendanceService.getAttendance()}/${this.modal_info.id}`, JSON.stringify(submit_data))
                .subscribe((data) => {
                    this.assistModalService.openAssistModal('toast', '编辑成功', () => {
                        if (!isUndefined(this.modal_callback)) {
                            this.modal_callback();
                        }
                        this.cancelAbsence();
                    });
                });
        }
    }

    compileSubmitDate(data) {
        if (data.days != true && data.days != 1) {
            delete data.end_time;
        }
        // yg_id格式转换
        data.yg_id = data.yg_id[0].id;
        data.duration = data.duration[0].id;
        data.type_id = isNullOrUndefined(data.type_id[0]) ? '' : data.type_id[0].id;
        if (data.rate instanceof Object) {
            data.rate = data.rate[0].id;
        }

        if (this.modal_name === 'absence') {
            data['type'] = 2;
        } else {
            data['type'] = 1;
        }
        return data;
    }

    // -->
    getHolidayTime(value, time) {
        const tmp = this.staff_holiday_url;
        this.staffHolidaySource = this.httpService.myPost(`${tmp}/${value}`, {month: time});
        this.staffHolidaySource.subscribe((data) => {
            this.holiday_time = 0;
            for (let i in data.data.holiday) {
                this.holiday_time += data.data.holiday[i].holiday_total;
            }
        });
    }

    // -->测算实际请加日
    calcAbsenceDay() {
        if (this.absence.get('days').value) {
            if (this.absence.get('start_time').value && this.absence.get('end_time').value) {
                if (this.absence.get('start_time').value !== this.absence.get('end_time').value) {
                    this.httpService.myGet(`${this.attendanceService.getAbsenceDuration()}/${this.absence.get('start_time').value}/${this.absence.get('end_time').value}`)
                        .subscribe(data => {
                            this.total_work = data.data.duration / 8;
                        });
                } else {
                    this.total_work = 1;
                }
            } else {
                //     this.httpService.myGet(`${this.attendanceService.getAbsenceDuration()}/${this.absence.get('start_time').value}/${this.absence.get('start_time').value}`)
                //         .subscribe(data => {
                //             this.total_work = data.data.duration / 8;
                //         });
                this.total_work = 1;
            }
        }
    }

    shadowCancel() {
        this.cancelAbsence();
    }

    // test1(event) {
    //     event.stopPropagation();
    // }
}
