import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from "../../../../shared/service/modal/modal.service";
import {FormBuilder} from "@angular/forms";
import {HttpService} from "../../../../shared/service/http-service/http.service";
import {AssistModalService} from "../../../../shared/service/assist-modal-service/assist-modal.service";
import {StaffsService} from "../../../../shared/service/api-service/staff-directory/staffs/staffs.service";
import {HrChangeService} from "../../../../shared/service/api-service/staff-directory/hr-change/hr-change.service";
import {isNullOrUndefined} from "util";

@Component({
    selector: 'app-staff-general-formal-date-change-m',
    templateUrl: './staff-general-formal-date-change-m.component.html',
    styleUrls: ['./staff-general-formal-date-change-m.component.css']
})
export class StaffGeneralFormalDateChangeMComponent implements OnInit {
    @Input()
    modal_name;

    @Input()
    modal_info;
    @Input()
    modal_callback;

    public start_time_options = {};
    public end_time_options = {};


    public changeDate;

    constructor(public modalService: ModalService,
                public httpService: HttpService,
                public assistModalService: AssistModalService,
                public hrChangeService: HrChangeService,
                public fb: FormBuilder) {
    }

    ngOnInit() {
        console.log(this.modal_info);
        this.changeDate = this.fb.group({
            yg_hire_date: [this.modal_info.hire_date],
            yg_formal_date: [this.modal_info.formal_date]
        });
    }

    cancelModal() {
        this.modalService.setModalName('');
        this.modalService.emitModalName();
    }

    submitModal() {
        this.changeDate.value['yg_id'] = this.modal_info.yg_id;
        this.httpService.myPost(this.hrChangeService.getHireFormalDateUpload(), this.changeDate.value)
            .subscribe(data => {
                console.log(data);
                this.assistModalService.openAssistModal('toast', '操作成功', () => {
                    this.modalService.setModalName('');
                    this.modalService.emitModalName();
                    if (!isNullOrUndefined(this.modal_callback)) {
                        this.modal_callback();
                    }
                });
            });

    }

    changeStartTime(event) {
        this.end_time_options = {start_time: event, start_time_type: 1};
    }
}
