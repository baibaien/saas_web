import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from '../../../shared/service/modal/modal.service';
import {FormBuilder, Validators} from '@angular/forms';
import {SalaryApiService} from '../../../shared/service/api-service/salary-api/salary-api.service';
import {GlobalFuncService} from '../../../shared/service/global-func/global-func.service';
import {HttpService} from '../../../shared/service/http-service/http.service';
import {AssistModalService} from "../../../shared/service/assist-modal-service/assist-modal.service";

@Component({
    selector: 'app-salary-bonus-m',
    templateUrl: './salary-bonus-m.component.html',
    styleUrls: ['./salary-bonus-m.component.css']
})
export class SalaryBonusMComponent implements OnInit {
    @Input()
    modal_name;
    @Input()
    modal_info;

    @Input()
    modal_callback;
    // -->modal状态判断
    public modal_status;
    public modal_view;
    // <-----
    // -->form declare
    public bonus;
    // <-----
    // -->提交数据
    public submit_data = {};
    public before_submit = false;
    // <-----

    // -->error_list
    public error_list = {
        name: {
            existed: false
        }
    };
    // <-----
    constructor(public modalService: ModalService,
                public fb: FormBuilder,
                public salaryApiService: SalaryApiService,
                public httpService: HttpService,
                public globalFuncService: GlobalFuncService,
                public assistModalService: AssistModalService) {
    }

    ngOnInit() {

        if (this.modal_info.hasOwnProperty('id')) {
            this.modal_status = 2;
            this.modal_view = '编辑';
            this.bonus = this.fb.group({
                is_annual: [this.modal_info.is_annual.toString(), Validators.required],
                name: [this.modal_info.name, [Validators.required, Validators.maxLength(20)]],
                status: [Boolean(Number(this.modal_info.bonus_id))]
            });
        } else {
            this.modal_status = 1;
            this.modal_view = '增加';
            this.bonus = this.fb.group({
                is_annual: ['0', Validators.required],
                name: ['', [Validators.required, Validators.maxLength(20)]],
                status: ['']
            });
        }
    }

    deleteRecord() {
        this.submit_data['id'] = this.modal_info.id;
        this.submit_data['inc_id'] = this.modal_info.inc_id;
        this.submit_data['status'] = this.modal_info.status;
        this.assistModalService.openAssistModal('confirm', '确认删除？', () => {
            this.httpService.myPost(this.salaryApiService.getAttendanceDelete(), JSON.stringify(this.submit_data))
                .subscribe((data) => {
                    this.assistModalService.openAssistModal('toast', '确认删除？', () => {
                        this.modalService.setModalName('');
                        this.modalService.emitModalName();
                        this.modal_callback();
                    });
                });
        });

    }

    cancelModal() {
        this.modalService.setModalName('');
        this.modalService.emitModalName();
    }

    submitModal() {
        this.before_submit = true;
        let url;
        if (this.bonus.valid) {
            this.before_submit = false;
            this.submit_data = this.bonus.value;
            if (this.modal_status == 1) {
                url = this.salaryApiService.getAttendanceAdding();
            } else {

                url = this.salaryApiService.getAttendanceEdit();
                this.submit_data['id'] = this.modal_info.id;
            }
            this.submit_data['type'] = 1;
            this.submit_data['inc_id'] = this.modal_info.inc_id;
            this.submit_data['status'] = Number(this.submit_data['status']);
            this.httpService.myPost(url, JSON.stringify(this.submit_data))
                .subscribe((data) => {
                    this.assistModalService.openAssistModal('toast', '操作成功', () => {
                        this.modalService.setModalName('');
                        this.modalService.emitModalName();
                        this.modal_callback();
                    });
                }, error => {
                    const err = error.json();
                    if (err.status_code === 422) {
                        this.error_list.name.existed = true;
                    }
                });
        }
    }
}
