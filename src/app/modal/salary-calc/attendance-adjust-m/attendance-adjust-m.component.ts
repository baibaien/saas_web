import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from "../../../shared/service/modal/modal.service";
import {SalaryApiService} from "../../../shared/service/api-service/salary-api/salary-api.service";
import {HttpService} from "../../../shared/service/http-service/http.service";
import {FormArray, FormBuilder, FormControl, Validators} from "@angular/forms";
import {isUndefined} from "util";
import {NumValidators} from "../../../shared/validators/num-validator";

@Component({
    selector: 'app-attendance-adjust-m',
    templateUrl: './attendance-adjust-m.component.html',
    styleUrls: ['./attendance-adjust-m.component.css'],

})
export class AttendanceAdjustMComponent implements OnInit {
    @Input()
    modal_name;
    @Input()
    modal_info;
    @Input()
    modal_callback;

// -->adjust表单
    public adjust_data;
    public system_data;
    public time_info;
    public attendance_adjust;
// <-----


    // -->下拉框数据
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
    public rate_overtime = [
        {id: 1, name: '照常发放*1'},
        {id: 1.5, name: '照常发放*1.5'},
        {id: 2, name: '照常发放*2'},
        {id: 3, name: '照常发放*3'},
    ];

    public show_unit = [
        {id: 1, name: '小时'},
        {id: 2, name: '天'}
    ];
    // <-----


    // -->input监视
    public input_watcher;
    // <-----
    constructor(public modalService: ModalService,
                public fb: FormBuilder,
                public salaryApiService: SalaryApiService,
                public httpService: HttpService) {
    }

    ngOnInit() {
        console.log(this.modal_info.staff);
        this.httpService.myGet(`${this.salaryApiService.getStaffAttendanceAdjust()}/${this.modal_info.inc_id}/${this.modal_info.staff.yg_id}`)
            .subscribe(data => {
                console.log(data);
                this.system_data = this.existedTimeCompile(JSON.parse(JSON.stringify(data.data.system)));
                this.adjust_data = JSON.parse(JSON.stringify(data.data.adjust));
                this.time_info = this.objToArr(JSON.parse(JSON.stringify(this.adjust_data)));
                this.deleteZero();
                this.adjust_data = this.objToArr(this.adjust_data);
                this.adjustFormInit();
                console.log(this.system_data);
            });
    }

    /**
     * existedTimeCompile
     * 函数描述
     * 出勤管理中已存在编译
     * @params:
     * @return:
     */
    existedTimeCompile(data) {
        const output = {};
        for (const i in data) {
            let tmp_arr = [];
            if (data[i].length > 0) {
                if (i == '1') {
                    tmp_arr.push(`${data[i][0].duration}${data[i][0].show_unit == 1 ? '小时' : '天'}`);
                } else {
                    tmp_arr = data[i].map((val) => {
                        return `${val.duration}${val.show_unit == 1 ? '小时' : '天'}@${val.rate}倍`;
                    });
                }
            } else {
                tmp_arr.push('0');
            }
            output[i] = tmp_arr.join(',');
        }
        console.log(output);
        return output;
    }


    /**
     * adjustFormInit()
     * 函数描述
     * 数据生成表单
     * @params:
     * @return:
     */
    adjustFormInit() {
        this.attendance_adjust = this.fb.group({
            all_item: this.fb.array([])
        });
        console.log(this.adjust_data);
        for (let i in this.adjust_data) {
            let root = this.attendance_adjust.get('all_item') as FormArray;
            root.push(this.fb.array([]));
            let tmp = this.attendance_adjust.get('all_item').controls[i] as FormArray;
            if (isUndefined(this.adjust_data[i]['data']['1'][0])) {
                tmp.push(this.fb.group({
                        duration: ['0', [NumValidators.halfMin(0, 1), NumValidators.isNum, NumValidators.decimalDigitsValid]],
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
                        duration: [this.adjust_data[i]['data']['1'][0]['duration'], [NumValidators.halfMin(0, 1), NumValidators.isNum, NumValidators.decimalDigitsValid]],
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
                tmp1.push(
                    this.fb.group({
                        duration: [this.adjust_data[i]['data']['2'][j].duration, [NumValidators.halfMin(0, 1), NumValidators.isNum, NumValidators.decimalDigitsValid]],
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
                        duration: [this.adjust_data[i]['data']['3'][j].duration, [NumValidators.halfMin(0, 1), NumValidators.isNum, NumValidators.decimalDigitsValid]],
                        show_unit: [[show_tmp]],
                        rate: [[rate_tmp]]
                    })
                );
            }
            tmp.push(this.fb.group({
                rate_input: this.fb.array([
                    this.fb.group({
                        duration: ['0', [NumValidators.halfMin(0, 1), NumValidators.isNum, NumValidators.decimalDigitsValid]],
                        show_unit: [[{id: 1, name: '小时'}]],
                        rate: [[{id: 1, name: '100%'}]]
                    })
                ]),
                overtime_input: this.fb.array([
                    this.fb.group({
                        duration: ['0', [NumValidators.halfMin(0, 1), NumValidators.isNum, NumValidators.decimalDigitsValid]],
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
                duration: ['0', [NumValidators.halfMin(0, 1), NumValidators.isNum, NumValidators.decimalDigitsValid]],
                show_unit: [[{id: 1, name: '小时'}]],
                rate: [[{id: 0.1, name: '10%'}]]
            }));
        } else if (type == 2) {
            data.push(this.fb.group({
                duration: ['0', [NumValidators.halfMin(0, 1), NumValidators.isNum, NumValidators.decimalDigitsValid]],
                show_unit: [[{id: 1, name: '小时'}]],
                rate: [[{id: 1, name: '1倍'}]]
            }));
        }
    }

    cancelModal() {
        this.modalService.setModalName('');
        this.modalService.emitModalName();
    }

    submitModal() {
        let form_submit = [];
        let obj_submit = {};
        let result_submit = {};
        if (this.attendance_adjust.valid) {
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
            result_submit['inc_id'] = this.modal_info.inc_id;
            result_submit['yg_id'] = this.modal_info.staff.yg_id;
            result_submit['adjust_data'] = form_submit;
            console.log(result_submit);
            this.httpService.myPost(this.salaryApiService.getStaffAttendanceAdjust(), result_submit)
                .subscribe(data => {
                    console.log(data);
                    Object.assign(this.modal_info.staff, data.data.salary);
                    Object.assign(this.modal_info.calc, data.data.head);
                    this.modalService.setModalName('');
                    this.modalService.emitModalName();
                });
        }

    }

    objToArr(data) {
        let tmp = [];
        for (let i in data) {
            tmp.push(data[i]);
        }
        return tmp;
    }

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


    /**
     * focusInput
     * 函数描述
     * 动态添加watcher
     * @params:
     * @return:
     */
    focusInput(fc: FormControl) {
        // console.log(1123123);
        console.log(fc);
        this.input_watcher = fc.valueChanges.subscribe(data => {

        });

    }

    blurInput(fc: FormControl) {
        console.log(fc);
        this.input_watcher.unsubscribe();
    }
}
