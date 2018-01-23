import {Component, OnDestroy, OnInit} from '@angular/core';
import {AttendanceService} from '../../../shared/service/api-service/staff-attendance/attendance/attendance.service';
import {DateService} from "../../../shared/service/date/date.service";
import {ModalService} from "../../../shared/service/modal/modal.service";
import {GlobalFuncService} from "../../../shared/service/global-func/global-func.service";
import {MayihrFilterService} from "../../../shared/service/mayihr-filter/mayihr-filter.service";
import {FormControl} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
    selector: 'app-attendance-list',
    templateUrl: './attendance-list.component.html',
    styleUrls: ['./attendance-list.component.css']
})
export class AttendanceListComponent implements OnInit, OnDestroy {
    public table_header = [
        {
            column: 'type_name',
            column_key: 'type',
            column_name: '类型',
            filter: 1,
            selected: false,
            adjust: -1
        },
        {
            column: 'yg_name',
            column_key: 'yg_name',
            column_name: '姓名',
            filter: 2,
            selected: false,
            adjust: -1
        },
        {
            column: 'department_name',
            column_key: 'yg_org_id',
            column_name: '部门',
            filter: 1,
            selected: false,
            adjust: -1
        },
        {
            column: 'duration',
            column_key: 'duration',
            column_name: '时长',
            filter: 2,
            selected: false,
            adjust: -1
        },
        {
            column: 'start_time',
            column_key: 'start_time',
            column_name: '发生时间',
            filter: 2,
            selected: false,
            adjust: -1
        },
        {
            column: 'process_way',
            column_key: 'process_way',
            column_name: '处理方式',
            filter: 1,
            selected: false,
            adjust: -1
        }
    ];
    public filter_range = ['type', 'yg_org_id', 'process_way'];
    public filter_term;

    public attendance_show = -1;
    public previous_show = -1;

    // -->modal控制
    public modal_name;
    public modal_info;
    public modal_callback;
    public page_info;
    // <-----
    // -->流订阅
    public list_info_emit;
    public list_info_url;
    public modal_name_emit;
    // <-----
    // -->流信息
    public attendance_list = [];
    // <-----


    public work_day_type;

    // -->提交data
    public submit_data = {month: {}};
    // <-----
    public month_selected: FormControl;


    // -->inc_id---是否可以进入出勤调整
    public inc_id;
    public is_archive;
    // <-----
    constructor(public attendanceService: AttendanceService,
                public router: Router,
                public dateService: DateService,
                public modalService: ModalService,
                public globalFuncService: GlobalFuncService,
                public mayihrFilterService: MayihrFilterService) {
        document.title = '出勤管理';

        this.month_selected = new FormControl(this.dateService.getDateNow('month'));
        // -->请求列表地址
        this.list_info_url = this.attendanceService.getAttendance();
        // <-----
        this.modal_name_emit = this.modalService.getModalNameEmit().subscribe(data => {
            this.modal_name = data;
        });
        this.list_info_emit = this.globalFuncService.getInfoListEmit().subscribe(data => {
            data.subscribe(data1 => {

                this.attendance_show = -1;
                this.previous_show = -1;

                console.log(this.table_header);
                console.log('出勤管理列表:', data1);
                this.is_archive = data1.data.meta.is_archive;
                const local_data = JSON.parse(JSON.stringify(data1));
                this.attendance_list = local_data.data.data;
                this.work_day_type = data1.data.meta.work_day;
                this.page_info = data1.data.meta.pagination;
                // }
                this.inc_id = data1.data.meta.inc_id;
                console.log(this.inc_id);
                console.log(this.attendance_list);
            });
        });


    }

    ngOnInit() {
        this.mayihrFilterService.getFilterSource().subscribe(data2 => {
            this.filter_term = this.mayihrFilterService.initFilter(data2.data, this.filter_range);
            this.globalFuncService.resetSubmitData();
            this.globalFuncService.setInfoListSource('get', this.list_info_url, this.submit_data);
            this.globalFuncService.emitInfoListSource();
        });
    }

    ngOnDestroy() {
        this.modal_name_emit.unsubscribe();
        this.list_info_emit.unsubscribe();
    }

    // 单行像下展开
    attendanceDetailShow(i) {
        if (i === this.previous_show) {
            this.attendance_show = -1;
            this.previous_show = -1;
        } else {
            this.attendance_show = i;
            this.previous_show = i;
        }
    }

    // 选择月份
    chooseMonthRequest(event) {
        console.log(event);
        this.submit_data['month']['month'] = event;
        this.globalFuncService.setInfoListSource('get', this.list_info_url, this.submit_data);
        this.globalFuncService.emitInfoListSource();
    }

    // 筛选框开关
    filterChooseToggle(index) {
        if (this.table_header[index].selected == false) {
            for (let i in this.table_header) {
                this.table_header[i].selected = false;
            }
            this.table_header[index].selected = true;
        } else {
            this.table_header[index].selected = false;
        }
    }


    // 记录请假缺勤
    absenceModal() {
        this.modal_name = 'absence';
        this.modal_info = undefined;
        this.modal_callback = () => {
            this.globalFuncService.emitInfoListSource();
        };
    }

    // 记录加班
    overtimeModal() {
        this.modal_name = 'overtime';
        this.modal_info = undefined;
        this.modal_callback = () => {
            this.globalFuncService.emitInfoListSource();
        };
    }

    // 编辑记录
    editModal(event, data, isEdit) {
        console.log(data);
        const tmp = JSON.parse(JSON.stringify(data));
        event.stopPropagation();
        if (isEdit >= 0) {
            console.log(data.type);
            if (data.type == 2) {
                this.modal_name = 'absence';
            } else {
                this.modal_name = 'overtime';
            }
            this.modal_info = tmp;
            this.modal_callback = () => {
                this.globalFuncService.emitInfoListSource();
            };
        } else {
            this.modal_name = 'unable_edit';
        }
    }

    openCalendar() {
        this.modal_name = 'calendar';
    }

    closeFilter(event) {
        for (let i in this.table_header) {
            this.table_header[i].selected = false;
        }
    }

    // -->进入出勤调整页面
    toAttendanceAdjust() {
        this.router.navigate([`/user/attendance/attendance-adjust/${this.month_selected.value}/${this.inc_id}`]);
    }
}
