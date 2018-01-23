import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalService} from '../../../../shared/service/modal/modal.service';
import {SettingsService} from '../../../../shared/service/settings/settings.service';
import {mailValid, nameValid, phoneValid, staticPhoneValid} from '../../../../shared/validators/staff-upload-validator';
import {StaffGeneralChangeService} from '../../../../shared/service/staff-directory/staff-general-change/staff-general-change.service';
import {isUndefined} from "util";
import {NumValidators} from "../../../../shared/validators/num-validator";

@Component({
    selector: 'app-demission-modal',
    templateUrl: './demission-modal.component.html',
    styleUrls: ['./demission-modal.component.css']
})
export class DemissionModalComponent implements OnInit {

    @Input() modal_name;
    @Input() modal_info;
    @Input() modal_callback;

    public setting_tab = [
        {
            value: 1,
            text: '出勤调整'
        },
        {
            value: 2,
            text: '通用扣减'
        },
        {
            value: 3,
            text: '浮动工资'
        },
    ];

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
        {id: 1, name: '照常发放*1'},
        {id: 1.5, name: '照常发放*1.5'},
        {id: 2, name: '照常发放*2'},
        {id: 3, name: '照常发放*3'},
    ];

    public show_unit = [
        {id: 1, name: '小时'},
        {id: 2, name: '天'}
    ];

    public calc_salary: FormGroup;
    public setting = 1;


    // -->表格数据
    public system_data;
    public adjust_data;
    public time_info;
    // <-----
    constructor(public fb: FormBuilder,
                public modalService: ModalService,
                public staffGeneralChangeService: StaffGeneralChangeService) {
    }

    ngOnInit() {
        console.log(this.modal_info);
        this.system_data = this.existedTimeCompile(JSON.parse(JSON.stringify(this.modal_info.adjust_data.system)));
        this.adjust_data = JSON.parse(JSON.stringify(this.modal_info.adjust_data.adjust));
        this.time_info = this.objToArr(JSON.parse(JSON.stringify(this.adjust_data)));
        this.deleteZero();
        {
            let tmp = [];
            for (let i in this.adjust_data) {
                this.adjust_data[i]['salary_effective_date'] = i;
                tmp.push(this.adjust_data[i]);
            }
            this.adjust_data = tmp;
        }
        console.log(this.adjust_data);
        this.adjustFormInit();
        for (let obj in this.modal_info['bonus_data']) {
            let form_array = this.calc_salary.get('bonus_data').get(obj) as FormArray;
            for (let i = 0; i < this.modal_info['bonus_data'][obj].length; i++) {
                let item = this.modal_info['bonus_data'][obj][i];
                let form = this.fb.group({
                    id: [item.id],
                    bonus_id: [item.bonus_id],
                    bonus_money: [item.bonus_money, [NumValidators.halfMin(0, 1), NumValidators.isNum]],
                    name: [item.name],
                    is_annual: [item.is_annual],
                    type: [item.type]
                });
                form_array.push(form);
            }
        }
        for (let i in this.modal_info.salary_data) {
            this.modal_info.salary_data[i] = {
                id: this.modal_info.salary_data[i],
                name: this.modal_info.salary_data[i]
            };
        }
        console.log(this.calc_salary);
    }

    setSetting(event) {
        this.setting = event.target.value;
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
        this.calc_salary = this.fb.group({
            adjust_data: this.fb.array([]),
            bonus_data: this.fb.group({
                '1': this.fb.array([]),
                '2': this.fb.array([]),
            })
        });
        console.log(this.adjust_data);
        for (let i in this.adjust_data) {
            const root = this.calc_salary.get('adjust_data') as FormArray;
            root.push(this.fb.array([]));
            const tmp = this.calc_salary.get('adjust_data')['controls'][i] as FormArray;
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
            const tmp1 = tmp.controls[1] as FormArray;
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
            const tmp2 = tmp.controls[2] as FormArray;
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
    }

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


    cancelModal() {
        this.modalService.setModalName('');
        this.modalService.emitModalName();
    }

    //
    // addRecord(type: number) {
    //     const form_array = this.calc_salary.get('adjust_data').get(`${type}`) as FormArray;
    //     const form = this.fb.group({
    //         duration: [''],
    //         show_unit: [[{id: 1, name: '小时'}]],
    //         rate: [type == 2 ? [{id: 1, name: '100%'}] : [{id: 1, name: '照常发放*1'}]],
    //         salary_effective_date: [''],
    //         type: [type]
    //     });
    //     form_array.push(form);
    // }

    saveMsg() {
        let submit_data;
        // this.before_submit = false;
        console.log(this.calc_salary.value);
        if (this.calc_salary.valid) {
            console.log(this.adjust_data);
            let form_submit = [];
            let obj_submit = {};
            let result_submit = {};
            for (let i = 0; i < this.adjust_data.length; i++) {
                obj_submit = {
                    type: 1,
                    duration: this.calc_salary.value.adjust_data[i]['0'].duration || 0,
                    show_unit: this.calc_salary.value.adjust_data[i]['0'].show_unit[0].id,
                    rate: 0,
                    salary_effective_date: this.adjust_data[i].salary_effective_date
                };
                form_submit.push(JSON.parse(JSON.stringify(obj_submit)));
                obj_submit = {};
                // <-----
                // -->病假数据
                for (let j = 0; j < this.calc_salary.value.adjust_data[i]['1'].length; j++) {
                    obj_submit = {
                        type: 2,
                        duration: this.calc_salary.value.adjust_data[i]['1'][j].duration || 0,
                        show_unit: this.calc_salary.value.adjust_data[i]['1'][j].show_unit[0].id,
                        rate: this.calc_salary.value.adjust_data[i]['1'][j].rate[0].id,
                        salary_effective_date: this.adjust_data[i].salary_effective_date
                    };
                    form_submit.push(JSON.parse(JSON.stringify(obj_submit)));
                    obj_submit = {};
                }
                // <-----
                // -->加班数据
                for (let j = 0; j < this.calc_salary.value.adjust_data[i]['2'].length; j++) {
                    obj_submit = {
                        type: 3,
                        duration: this.calc_salary.value.adjust_data[i]['2'][j].duration || 0,
                        show_unit: this.calc_salary.value.adjust_data[i]['2'][j].show_unit[0].id,
                        rate: this.calc_salary.value.adjust_data[i]['2'][j].rate[0].id,
                        salary_effective_date: this.adjust_data[i].salary_effective_date
                    };
                    form_submit.push(JSON.parse(JSON.stringify(obj_submit)));
                    obj_submit = {};
                }
                // <-----
                // -->快捷调整数据
                // 病假
                for (let j = 0; j < this.calc_salary.value.adjust_data[i]['3'].rate_input.length; j++) {
                    obj_submit = {
                        type: 2,
                        duration: this.calc_salary.value.adjust_data[i]['3'].rate_input[j].duration || 0,
                        show_unit: this.calc_salary.value.adjust_data[i]['3'].rate_input[j].show_unit[0].id,
                        rate: this.calc_salary.value.adjust_data[i]['3'].rate_input[j].rate[0].id,
                        salary_effective_date: this.adjust_data[i].salary_effective_date
                    };
                    form_submit.push(JSON.parse(JSON.stringify(obj_submit)));
                    obj_submit = {};
                }
                // 加班
                for (let j = 0; j < this.calc_salary.value.adjust_data[i]['3'].overtime_input.length; j++) {
                    obj_submit = {
                        type: 3,
                        duration: this.calc_salary.value.adjust_data[i]['3'].overtime_input[j].duration || 0,
                        show_unit: this.calc_salary.value.adjust_data[i]['3'].overtime_input[j].show_unit[0].id,
                        rate: this.calc_salary.value.adjust_data[i]['3'].overtime_input[j].rate[0].id,
                        salary_effective_date: this.adjust_data[i].salary_effective_date
                    };
                    form_submit.push(JSON.parse(JSON.stringify(obj_submit)));
                    obj_submit = {};
                }
                console.log(form_submit);
                // <-----
            }
            submit_data = JSON.parse(JSON.stringify(this.calc_salary.value));
            submit_data['adjust_data'] = form_submit;
            submit_data['yg_id'] = this.modal_info.yg_id;
            submit_data['effective_at'] = this.modal_info.effective_at;
            submit_data['severance_pay'] = this.modal_info.severance_pay;
            submit_data['yg_fire_social'] = this.modal_info.yg_fire_social;
            submit_data['yg_fire_fund'] = this.modal_info.yg_fire_fund;
            this.staffGeneralChangeService.calcChangeSalary(submit_data).subscribe((res) => {
                // this.before_submit = true;
                this.modalService.setModalName('');
                this.modalService.emitModalName();
                const tmp_obj = JSON.parse(JSON.stringify(submit_data));
                delete tmp_obj['yg_fire_social'];
                delete tmp_obj['yg_fire_fund'];
                console.log(tmp_obj);
                let tmp_salary;
                let tmp_count = 0;
                for (let i in res.data) {
                    tmp_count++;
                    if (tmp_count == 1) {
                        tmp_salary = res.data[i].saas_salary.allmoney;
                    }
                }
                this.modalService.emitModalHandler({
                    func_name: 'saveSalaryData',
                    data: JSON.parse(JSON.stringify(tmp_obj)),
                    salary: tmp_salary
                });
            });
        }
    }

}
