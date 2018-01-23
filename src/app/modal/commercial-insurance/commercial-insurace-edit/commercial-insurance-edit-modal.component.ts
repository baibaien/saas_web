import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ModalService} from "../../../shared/service/modal/modal.service";
import {FormBuilder, Validators} from "@angular/forms";
import {SalaryOutsourcingApiService} from "../../../shared/service/api-service/salary-outsourcing-api/salary-outsourcing-api.service";
import {HttpService} from "app/shared/service/http-service/http.service";
import {GlobalFuncService} from "../../../shared/service/global-func/global-func.service";

@Component({
    selector: 'app-commercial-insurance-edit-modal',
    templateUrl: './commercial-insurance-edit-modal.component.html',
    styleUrls: ['./commercial-insurance-edit-modal.component.css']
})
export class CommercialInsuranceEditModalComponent implements OnInit, OnDestroy {
    @Input()
    modal_name;
    @Input()
    modal_info;
@Input()
modal_callback;

    public choosed_num;

    public co_edit;
    public before_submit = false;

    public team_num_watcher;

    constructor(public modalService: ModalService,
                public globalFuncService: GlobalFuncService,
                public fb: FormBuilder,
                public salaryOutsourcingApiService: SalaryOutsourcingApiService,
                public httpService: HttpService) {
        this.co_edit = fb.group({
            team_num_selected: ['', Validators.required],
            team_num: ['', Validators.required],
            sup_type: ['', Validators.required]
        });

    }

    ngOnInit() {
        console.log(this.modal_info);
        if (this.modal_info.operate_type === 3) {
            this.choosed_num = this.modal_info['yg_id'].split(',').length;
        }
        let team_num;
        let sup_type;
        let team_num_selected;
        if (this.modal_info.operate_type == 1) {
            team_num = this.modal_info.team_num;
            sup_type = this.modal_info.sup_type;
        } else {
            team_num = this.modal_info.hr_security.team_num;
            sup_type = this.modal_info.hr_security.sup_type;
        }
        if (team_num == 0) {
            team_num_selected = '0';
        } else {
            team_num_selected = '1';
        }
        console.log(team_num);
        console.log(sup_type);
        this.co_edit = this.fb.group({
            team_num_selected: [team_num_selected, Validators.required],
            team_num: [team_num, Validators.required],
            sup_type: [sup_type.toString(), Validators.required]
        });
        if (this.co_edit.get('team_num_selected').value != 1) {
            this.co_edit.get('team_num').setValue('0');
            this.co_edit.get('team_num').disable();
            this.co_edit.get('sup_type').setValue('0');
            this.co_edit.get('sup_type').disable();
        } else {
            this.co_edit.get('team_num').enable();
            this.co_edit.get('team_num').setValue(team_num);
            this.co_edit.get('sup_type').enable();
            this.co_edit.get('team_num_selected').setValue('1');
        }

        this.team_num_watcher = this.co_edit.get('team_num_selected').valueChanges.subscribe(data => {
             if (this.co_edit.get('team_num_selected').value != 1) {
                 this.co_edit.get('team_num').setValue('0');
                 this.co_edit.get('team_num').disable();
                 this.co_edit.get('sup_type').setValue('0');
                 this.co_edit.get('sup_type').disable();
             } else {
                 this.co_edit.get('team_num').enable();
                 this.co_edit.get('team_num').setValue('1');
                 this.co_edit.get('sup_type').enable();
                 // this.co_edit.get('team_num_selected').setValue('1');
             }

        });
    }
    ngOnDestroy() {
        this.team_num_watcher.unsubscribe();
    }
    // -->
    // <-----
    deleteRecord() {
        this.modalService.setModalName('');
        this.modalService.emitModalName();
    }

    cancelModal() {
        this.modalService.setModalName('');
        this.modalService.emitModalName();
    }

    submitModal() {
        let submit_data = {};
        this.before_submit = true;

        if (this.co_edit.valid && (this.co_edit.get('team_num').value != 0 || this.co_edit.get('team_num_selected').value == 0)) {
            this.before_submit = false;
            if (this.co_edit.value.team_num_selected == 0) {
                submit_data['team_num'] = 0;
            } else {
                submit_data['team_num'] = this.co_edit.getRawValue().team_num;
            }
            submit_data['sup_type'] = this.co_edit.getRawValue().sup_type;
            if (this.modal_info.operate_type == 2) {
                submit_data['is_company'] = 1;
            } else {
                submit_data['is_company'] = 0;
            }
            submit_data['yg_id'] = this.modal_info['yg_id'];

            this.httpService.myPost(this.salaryOutsourcingApiService.getCommercialEdit(), submit_data)
                .subscribe(data => {
                    this.modalService.setModalName('');
                    this.modalService.emitModalName();
                    this.globalFuncService.emitInfoListSource();
                });
        }
    }
}