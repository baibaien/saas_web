import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from "../../../shared/service/modal/modal.service";
import {SettingsService} from "../../../shared/service/settings/settings.service";
import {AssistModalService} from "../../../shared/service/assist-modal-service/assist-modal.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-staff-upload-position-update-m',
    templateUrl: './staff-upload-position-update-m.component.html',
    styleUrls: ['./staff-upload-position-update-m.component.css']
})
export class StaffUploadPositionUpdateMComponent implements OnInit {
    @Input() modal_name;
    @Input() modal_info;
    @Input() modal_callback;
    public before_submit = true;
    public company_position: FormGroup;
    // public position_id = -1;
    // public is_delete = true;


    constructor(fb: FormBuilder,
                public modalService: ModalService,
                public settingsService: SettingsService,
                public assistModalService: AssistModalService) {
        this.company_position = fb.group({
            name: ['', Validators.required],
            desc: [''],
        });
    }

    ngOnInit() {
    }
    cancelModal() {
        this.company_position.reset('');
        this.modalService.setModalName('');
        this.modalService.emitModalName();
    }

    saveMsg() {
        console.log(this.modal_callback);
        this.before_submit = false;
        if (this.company_position.valid) {
            const submit_data = {};
            // const shown_data = {};
            for (let obj in this.company_position.value) {
                submit_data[obj] = this.company_position.value[obj];
                // shown_data[obj] = this.company_position.value[obj];
            }
            this.settingsService.addPosition(submit_data).subscribe((res) => {
                console.log(res);
                this.modal_callback(res.data.data);
                this.assistModalService.openAssistModal('toast', '添加成功', () => {
                    this.modalService.setModalName('');
                    this.modalService.emitModalName();
                });
            });
        }
    }

    //
    // deleteRecord() {
    //     this.assistModalService.openAssistModal('confirm', '确定删除该岗位?', () => {
    //         this.settingsService.deletePosition(this.main_setting.data.id).subscribe((res) => {
    //             this.assistModalService.openAssistModal('toast', '删除成功', () => {
    //                 this.modalService.setModalName('');
    //                 this.modalService.emitModalName();
    //                 this.modalService.emitModalHandler({func_name: `getPosition`, data: {}});
    //             });
    //         });
    //     });
    // }
}
