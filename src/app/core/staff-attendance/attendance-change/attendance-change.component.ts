import {Component, OnDestroy, OnInit} from '@angular/core';
import {isUndefined} from 'util';
import {ActivatedRoute} from '@angular/router';
import {AttendanceAdjustService} from '../../../shared/service/salary-calc/attendance-adjust/attendance-adjust.service';
import {FormArray, FormBuilder} from '@angular/forms';
import {SalaryApiService} from '../../../shared/service/api-service/salary-api/salary-api.service';
import {GlobalFuncService} from '../../../shared/service/global-func/global-func.service';
import {MayihrFilterService} from '../../../shared/service/mayihr-filter/mayihr-filter.service';
import {AssistModalService} from "../../../shared/service/assist-modal-service/assist-modal.service";
@Component({
    selector: 'app-attendance-change',
    templateUrl: './attendance-change.component.html',
    styleUrls: ['./attendance-change.component.css']
})
export class AttendanceChangeComponent implements OnInit, OnDestroy {
    // -->表头设定
    public table_header = [
        {
            column: 'yg_name',
            column_key: 'yg_name',
            column_name: '姓名'
        },
        {
            column: '1',
            column_key: '1',
            column_name: '无薪假'
        },
        {
            column: '2',
            column_key: '2',
            column_name: '病假'
        },
        {
            column: '3',
            column_key: '3',
            column_name: '加班(补偿工资)'
        }
    ];
    // <-----
    public page_info;
    public detail_show = -1;
    public previous_show;
    public inc_id;
    public staff_info_list;
    public operate_data;
    public time_info;
    // 员工详情
    public system_data = {};
    public adjust_data = [];
    public yg_id;
    // <-----
    // -->请求列表url
    public list_info_url;
    // <-----
    // -->提交数据
    public submit_data = {};

    // -->select中的rate选择
    // public rate_absence = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    public rate_absence = [
        {id: 0.1, name: '10%'},
        {id: 0.2, name: '20%'},
        {id: 0.3, name: '30%'},
        {id: 0.4, name: '40%'},
        {id: 0.5, name: '50%'},
        {id: 0.6, name: '60%'},
        {id: 0.7, name: '70%'},
        {id: 0.8, name: '80%'},
        {id: 0.9, name: '90%'},
        {id: 1, name: '100%'},
    ];
    // public rate_overtime = [
    //     1, 1.5, 2, 3
    // ];
    public rate_overtime = [
        {id: 1, name: '1倍'},
        {id: 1.5, name: '1.5倍'},
        {id: 2, name: '2倍'},
        {id: 3, name: '3倍'},
    ];

    public show_unit = [
        {id: 1, name: '小时'},
        {id: 2, name: '天'}
    ];
    public time_rate = new Array(16);
    // <-----

    // -->动态表单
    public attendance_adjust;
    // <-----
    //
    // -->流变量
    // 列表数据
    public list_info_emit;
    // 详情更改
    public staff_change_emit;
    // <-----
    public is_all_archive;

    // -->
    public show_month;
    // <-----

    constructor(public activatedRoute: ActivatedRoute,
                public assistModalService: AssistModalService,
                public attendanceAdjustService: AttendanceAdjustService,
                public salaryApiService: SalaryApiService,
                public fb: FormBuilder,
                public globalFuncService: GlobalFuncService,
                public mayihrFilterService: MayihrFilterService) {
        document.title = '出勤调整表';

        // -->select init
        // <-----
        this.inc_id = this.activatedRoute.snapshot.params['inc_id'];
        this.show_month = Number(this.activatedRoute.snapshot.params['month'].substr(-2));
        console.log(this.show_month);
        this.list_info_url = `${this.salaryApiService.getAttendanceChange()}/${this.inc_id}`;
        this.list_info_emit = this.globalFuncService.getInfoListEmit().subscribe((data) => {
            data.subscribe((data1) => {
                console.log(data1);
                this.page_info = data1.data.meta.pagination;
                this.is_all_archive = data1.data.meta.is_archive;
                this.staff_info_list = data1.data.data;
                this.detail_show = -1;
                this.previous_show = -1;
                this.operate_data = this.mayihrFilterService.setTotal(this.operate_data, data1.data.meta.total);
            });
        });
        this.staff_change_emit = this.attendanceAdjustService.getStaffAdjustEmit().subscribe((data) => {
            data.subscribe((data1) => {
                console.log(JSON.parse(JSON.stringify(data1)));
                this.system_data = JSON.parse(JSON.stringify(data1.data.system));
                this.adjust_data = JSON.parse(JSON.stringify(data1.data.adjust));
                this.time_info = this.objToArr(JSON.parse(JSON.stringify(this.adjust_data)));
                this.deleteZero();
                this.adjust_data = this.objToArr(this.adjust_data);
                this.adjustFormInit();
            });
        });
    }

    ngOnInit() {
        this.attendance_adjust = this.fb.group({
            all_item: this.fb.array([])
        });
        this.mayihrFilterService.getFilterSource().subscribe(data2 => {
            this.operate_data = this.mayihrFilterService.initFilter(data2.data, ['adjust_type']);
            this.globalFuncService.resetSubmitData();
            this.globalFuncService.setInfoListSource('get', this.list_info_url, {});
            this.globalFuncService.emitInfoListSource();
        });
    }

    ngOnDestroy() {
        this.list_info_emit.unsubscribe();
        this.staff_change_emit.unsubscribe();
    }

    // -->打开编辑栏
    showDetail(i, staff) {
        if (this.is_all_archive != 1 && staff.is_archive != 1) {
            console.log(i, staff);
            this.yg_id = staff.yg_id;
            this.detail_show = i;
            this.previous_show = i;
            this.attendanceAdjustService.setStaffAdjust(this.inc_id, staff.yg_id);
            this.attendanceAdjustService.emitStaffAdjustSource();
        } else {
            this.assistModalService.openAssistModal('toast', '该员工本月数据已归档不支持快捷调整。', () => {
            });
        }
    }

    // -->对象转数组
    objToArr(data) {
        let tmp = [];
        for (let i in data) {
            tmp.push(data[i]);
        }
        return tmp;
    }

    // <-----
    // -->表格动态生成
    // 原理为显示的要求与结构，生成结构上与之对应的form
    adjustFormInit() {
        this.attendance_adjust = this.fb.group({
            all_item: this.fb.array([])
        });
        for (let i in this.adjust_data) {
            let root = this.attendance_adjust.get('all_item') as FormArray;
            root.push(this.fb.array([]));
            let tmp = this.attendance_adjust.get('all_item').controls[i] as FormArray;
            if (isUndefined(this.adjust_data[i]['data']['1'][0])) {
                tmp.push(this.fb.group({
                        duration: ['0'],
                        show_unit: [[{id: 1, name: '小时'}]]
                    })
                );
            } else {
                let show_tmp;
                this.show_unit.map(val => {
                    if (this.adjust_data[i]['data']['1'][0]['show_unit'] == val.id) {
                        show_tmp = val;
                    }
                });
                tmp.push(this.fb.group({
                        duration: [this.adjust_data[i]['data']['1'][0]['duration']],
                        show_unit: [[show_tmp]]
                    })
                );
            }
            tmp.push(this.fb.array([]));
            let tmp1 = tmp.controls[1] as FormArray;
            for (let j in this.adjust_data[i]['data']['2']) {
                let show_tmp;
                this.show_unit.map(val => {
                    if (this.adjust_data[i]['data']['2'][j].show_unit == val.id) {
                        show_tmp = val;
                    }
                });
                let rate_tmp;
                this.rate_absence.map(val => {
                    if (this.adjust_data[i]['data']['2'][j].rate == val.id) {
                        rate_tmp = val;
                    }
                });
                console.log(rate_tmp);
                tmp1.push(
                    this.fb.group({
                        duration: [this.adjust_data[i]['data']['2'][j].duration],
                        show_unit: [[show_tmp]],
                        rate: [[rate_tmp]]
                    })
                );
            }
            tmp.push(this.fb.array([]));
            let tmp2 = tmp.controls[2] as FormArray;
            for (let j in this.adjust_data[i]['data']['3']) {
                let show_tmp;
                this.show_unit.map(val => {
                    if (this.adjust_data[i]['data']['3'][j].show_unit == val.id) {
                        show_tmp = val;
                    }
                });
                let rate_tmp;
                this.rate_overtime.map(val => {
                    if (this.adjust_data[i]['data']['3'][j].rate == val.id) {
                        rate_tmp = val;
                    }
                });
                tmp2.push(
                    this.fb.group({
                        duration: [this.adjust_data[i]['data']['3'][j].duration],
                        show_unit: [[show_tmp]],
                        rate: [[rate_tmp]]
                    })
                );
            }
            tmp.push(this.fb.group({
                rate_input: this.fb.array([
                    this.fb.group({
                        duration: ['0'],
                        show_unit: [[{id: 1, name: '小时'}]],
                        rate: [[{id: 1, name: '100%'},]]
                    })
                ]),
                overtime_input: this.fb.array([
                    this.fb.group({
                        duration: ['0'],
                        show_unit: [[{id: 1, name: '小时'}]],
                        rate: [[{id: 1, name: '1倍'}]]
                    })
                ])
            }));
        }
        console.log(this.attendance_adjust);
    }

    // <-----
    // -->增加记录
    createRecord(data, type) {
        if (type == 1) {
            data.push(this.fb.group({
                duration: ['0'],
                show_unit: [[{id: 1, name: '小时'}]],
                rate: [[{id: 0.1, name: '10%'}]]
            }));
        } else if (type == 2) {
            data.push(this.fb.group({
                duration: ['0'],
                show_unit: [[{id: 1, name: '小时'}]],
                rate: [[{id: 1, name: '1倍'}]]
            }));
        }
    }

    // <-----


    // --> 取消/提交编辑栏
    cancelChange() {
        this.detail_show = -1;
        this.previous_show = -1;
    }

    // -->删除冗余数据
    deleteZero() {
        for (let i in this.adjust_data) {
            for (let j in this.adjust_data[i]) {
                if (!isNaN(Number(j))) {
                    let tmp = [];
                    for (let k in this.adjust_data[i][j]) {
                        if (this.adjust_data[i][j][k].duration != 0) {
                            tmp.push(JSON.parse(JSON.stringify(this.adjust_data[i][j][k])));
                        }
                    }
                    this.adjust_data[i][j] = tmp;
                }
            }
        }
    }

    // <-----
    // -->数据提交
    submitChange() {
        let form_submit = [];
        let obj_submit = {};
        let result_submit = {};
        for (let i = 0; i < this.adjust_data.length; i++) {
            obj_submit = {
                type: 1,
                duration: this.attendance_adjust.value.all_item[i]['0'].duration || 0,
                show_unit: this.attendance_adjust.value.all_item[i]['0'].show_unit[0].id,
                rate: 0,
                staff_salary_id: this.adjust_data[i].staff_salary_id,
                salary_id: this.adjust_data[i].salary_id
            };
            form_submit.push(JSON.parse(JSON.stringify(obj_submit)));
            obj_submit = {};
            // <-----
            // -->病假数据
            for (let j = 0; j < this.attendance_adjust.value.all_item[i]['1'].length; j++) {
                obj_submit = {
                    type: 2,
                    duration: this.attendance_adjust.value.all_item[i]['1'][j].duration || 0,
                    show_unit: this.attendance_adjust.value.all_item[i]['1'][j].show_unit[0].id,
                    rate: this.attendance_adjust.value.all_item[i]['1'][j].rate[0].id,
                    staff_salary_id: this.adjust_data[i].staff_salary_id,
                    salary_id: this.adjust_data[i].salary_id
                };
                form_submit.push(JSON.parse(JSON.stringify(obj_submit)));
                obj_submit = {};
            }
            // <-----
            // -->加班数据
            for (let j = 0; j < this.attendance_adjust.value.all_item[i]['2'].length; j++) {
                obj_submit = {
                    type: 3,
                    duration: this.attendance_adjust.value.all_item[i]['2'][j].duration || 0,
                    show_unit: this.attendance_adjust.value.all_item[i]['2'][j].show_unit[0].id,
                    rate: this.attendance_adjust.value.all_item[i]['2'][j].rate[0].id,
                    staff_salary_id: this.adjust_data[i].staff_salary_id,
                    salary_id: this.adjust_data[i].salary_id
                };
                form_submit.push(JSON.parse(JSON.stringify(obj_submit)));
                obj_submit = {};
            }
            // <-----
            // -->快捷调整数据
            // 病假
            for (let j = 0; j < this.attendance_adjust.value.all_item[i]['3'].rate_input.length; j++) {
                obj_submit = {
                    type: 2,
                    duration: this.attendance_adjust.value.all_item[i]['3'].rate_input[j].duration || 0,
                    show_unit: this.attendance_adjust.value.all_item[i]['3'].rate_input[j].show_unit[0].id,
                    rate: this.attendance_adjust.value.all_item[i]['3'].rate_input[j].rate[0].id,
                    staff_salary_id: this.adjust_data[i].staff_salary_id,
                    salary_id: this.adjust_data[i].salary_id
                };
                form_submit.push(JSON.parse(JSON.stringify(obj_submit)));
                obj_submit = {};
            }
            // 加班
            for (let j = 0; j < this.attendance_adjust.value.all_item[i]['3'].overtime_input.length; j++) {
                obj_submit = {
                    type: 3,
                    duration: this.attendance_adjust.value.all_item[i]['3'].overtime_input[j].duration || 0,
                    show_unit: this.attendance_adjust.value.all_item[i]['3'].overtime_input[j].show_unit[0].id,
                    rate: this.attendance_adjust.value.all_item[i]['3'].overtime_input[j].rate[0].id,
                    staff_salary_id: this.adjust_data[i].staff_salary_id,
                    salary_id: this.adjust_data[i].salary_id
                };
                form_submit.push(JSON.parse(JSON.stringify(obj_submit)));
                obj_submit = {};
            }
            console.log(form_submit);
            // <-----
        }
        result_submit['inc_id'] = this.inc_id;
        result_submit['yg_id'] = this.yg_id;
        result_submit['adjust_data'] = form_submit;
        console.log(result_submit);
        this.attendanceAdjustService.setQuickChange(JSON.stringify(result_submit));
        this.attendanceAdjustService.getQuickChange()
            .subscribe((data) => {
                this.globalFuncService.emitInfoListSource();
            });
    }

    // <-----
}
