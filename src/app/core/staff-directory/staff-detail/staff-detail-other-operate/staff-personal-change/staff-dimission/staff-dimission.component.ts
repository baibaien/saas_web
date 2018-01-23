import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {StaffGeneralChangeService} from '../../../../../../shared/service/staff-directory/staff-general-change/staff-general-change.service';
import {mailValid} from "../../../../../../shared/validators/staff-upload-validator";
import {ModalService} from "../../../../../../shared/service/modal/modal.service";
import {DateService} from "../../../../../../shared/service/date/date.service";
import {HttpService} from "../../../../../../shared/service/http-service/http.service";
import {StaffsService} from "../../../../../../shared/service/api-service/staff-directory/staffs/staffs.service";
import {AssistModalService} from "../../../../../../shared/service/assist-modal-service/assist-modal.service";
import {isUndefined} from "util";
import {StringValidators} from "../../../../../../shared/validators/string-validator";

@Component({
    selector: 'app-staff-dimission',
    templateUrl: './staff-dimission.component.html',
    styleUrls: ['./staff-dimission.component.css']
})
export class StaffDimissionComponent implements OnInit, OnDestroy {
    @Input()
    yg_id;
    public dimissionForm: FormGroup;
    public general_settings;
    public modal_info;
    public modal_obj: Object;
    public modal_callback;
    public modal_name: string;
    public modalname_emit;
    public modaldata_emit;
    public has_firedate = true;
    public salary_data;


    public salary_result;

    public dimission_time;


    public hide_detail = false;

    constructor(fb: FormBuilder,
                public router: Router,
                public hrChange: StaffGeneralChangeService,
                public dateService: DateService,
                public httpService: HttpService,
                public staffsService: StaffsService,
                public assistModalService: AssistModalService,
                public modalService: ModalService) {
        this.dimissionForm = fb.group({
            reason: [''],
            reason_type: ['', Validators.required],
            remark: [''],
            reportChange: [''],
            leader_id: [''],
            is_leader_id: [false],
            yg_fire_email: ['', mailValid],
            effective_at: [this.dateService.getDateNow(), Validators.required],
            yg_fire_social: [false],
            yg_fire_fund: [false],
            severance_pay: ['']
        });

        this.modalname_emit = this.modalService.getModalNameEmit().subscribe((res) => {
            this.modal_name = res;
        });
        this.modaldata_emit = this.modalService.getModalDataEmit().subscribe((res) => {
            this.modal_obj = res;
        });
        this.modalService.getModalHandlerEmit().subscribe((res) => {
            this[res.func_name](res.data, res.salary);
        });
    }

    ngOnInit() {
        if (this.yg_id.length == 1) {
            this.hrChange.getYgDimssionSettings(this.yg_id).subscribe((res) => {
                this.httpService.myGet(this.staffsService.getStaffOutline()).subscribe(data => {
                    this.general_settings = res.data;
                    this.dimission_time = {start_time: JSON.parse(JSON.stringify(res.data.yg_hire_date))};
                    console.log(data);
                    this.general_settings.leader_id = [];
                    for (const i of data.data) {
                        if (i.status != 2) {
                            this.general_settings.leader_id.push(i);
                        }
                    }
                    if (this.general_settings.staff.yg_is_social != 1) {
                        this.dimissionForm.get('yg_fire_social').disable();
                    }
                    if (this.general_settings.staff.yg_is_fund != 1) {
                        this.dimissionForm.get('yg_fire_fund').disable();
                    }
                });
            });
        }


    }

    ngOnDestroy() {
        this.modalname_emit.unsubscribe();
        this.modaldata_emit.unsubscribe();
    }

    chooseDimissionMonth() {
        this.has_firedate = true;
    }

    showModal(modal_name, modal_info) {
        this.modal_name = modal_name;
        this.modal_info = modal_info;
    }

    refreshValue(event) {
        if (event.id == 100) {
            this.hide_detail = true;
            this.dimissionForm.get('reason').clearValidators();
            this.dimissionForm.get('reason').updateValueAndValidity();
        } else if (event.id == 99) {
            this.dimissionForm.get('reason').setValidators([StringValidators.isEmpty]);
        } else {
            this.hide_detail = false;
            this.dimissionForm.get('reason').clearValidators();
            this.dimissionForm.get('reason').updateValueAndValidity();
        }
    }

    showSalaryModal() {
        if (this.dimissionForm.get('effective_at').value == '') {
            this.has_firedate = false;
            return;
        }
        // 请求弹窗显示时的数据
        this.hrChange.getChangeSalary(this.yg_id[0], this.dimissionForm.get('effective_at').value)
            .subscribe((res) => {
                const source_data = JSON.parse(JSON.stringify(res.data));
                source_data['yg_id'] = this.yg_id[0];
                source_data['effective_at'] = this.dimissionForm.get('effective_at').value;
                source_data['severance_pay'] = this.dimissionForm.get('severance_pay').value;
                source_data['yg_fire_social'] = this.dimissionForm.get('yg_fire_social').value === true ? 1 : 0;
                source_data['yg_fire_fund'] = this.dimissionForm.get('yg_fire_fund').value === true ? 1 : 0;
                this.showModal('salary_calc', source_data);
            });
    }

    deleteSalaryResult() {
        this.salary_result = undefined;
        this.salary_data = {};
    }

    saveSalaryData(data, salary) {
        this.salary_data = data;
        this.salary_result = salary;
        console.log(this.salary_result);
        console.log(this.salary_data);
    }

    toggleLeaderId(event) {
        if (event.id != 0) {
            this.dimissionForm.get('is_leader_id').setValue(0);
        } else {
            this.dimissionForm.get('is_leader_id').setValue(1);
        }
    }

    onSubmit() {
        const submit_value = {};
        console.log(isUndefined(this.salary_result));
        isUndefined(this.salary_result) ? submit_value['is_balance_salary'] = 0 : submit_value['is_balance_salary'] = 1;
        console.log(submit_value);
        submit_value['yg_id'] = this.yg_id[0];
        Object.assign(submit_value, this.dimissionForm.value, this.salary_data);
        console.log(submit_value);
        submit_value['is_leader_id'] = submit_value['is_leader_id'] === false ? 0 : 1;
        submit_value['yg_fire_social'] = submit_value['yg_fire_social'] === false ? 0 : 1;
        submit_value['yg_fire_fund'] = submit_value['yg_fire_fund'] === false ? 0 : 1;
        submit_value['reason_type'] = submit_value['reason_type'][0].id;
        submit_value['leader_id'] = submit_value['leader_id'][0] ? submit_value['leader_id'][0].id : '';
        if (this.dimissionForm.get('reason_type').value[0].id != 100) {
            this.submitRequest(submit_value);
        } else {
            this.assistModalService.openAssistModal('confirm', '该员工将直接从您的员工列表移除，该操作完成后不可撤销', () => {
                submit_value['is_confirm'] = 1;
                this.hrChange.fireYg(submit_value).subscribe((res) => {
                    this.assistModalService.openAssistModal('toast', '离职成功', () => {
                        this.router.navigate([`/user/staff`]);
                    });
                });
            });
        }
    }

    submitRequest(submit_value) {
        this.hrChange.fireYg(submit_value).subscribe((res) => {
            this.assistModalService.openAssistModal('toast', '离职成功', () => {
                this.router.navigate([`/user/staff/staff-detail/${this.yg_id[0]}`]);
            });
        }, error => {
            let err = error.json();
            if (err.code == 210007) {
                this.assistModalService.openAssistModal('confirm', '系统检测到该员工有离职之后的薪酬/人事变动记录，继续操作系统将自动撤销这部分变动', () => {
                    submit_value['is_confirm'] = 1;
                    this.submitRequest(submit_value);
                });
            }
        });
    }

    backToDetail() {
        this.router.navigate([`/user/staff/staff-detail/${this.yg_id}`]);
    }
}
