import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalService} from '../../../../shared/service/modal/modal.service';
import {SettingsService} from '../../../../shared/service/settings/settings.service';
import {AssistModalService} from "../../../../shared/service/assist-modal-service/assist-modal.service";

@Component({
    selector: 'app-position-setting',
    templateUrl: './position-setting.component.html',
    styleUrls: ['./position-setting.component.css']
})
export class PositionSettingComponent implements OnInit {
    @Input() modal_name;
    @Input() modal_info;
    @Input() modal_callback;

    public before_submit = true;

    public company_position: FormGroup;


    constructor(fb: FormBuilder,
                public modalService: ModalService,
                public settingsService: SettingsService,
                public assistModalService: AssistModalService) {
        this.company_position = fb.group({
            name: ['', Validators.required],
            no: [''],
            desc: [''],
        });
    }

    ngOnInit() {
        console.log(this.modal_info);
        if (this.modal_info.type === 'edit') {
            for (const obj in this.company_position.controls) {
                this.company_position.controls[obj].setValue(this.modal_info['data'][obj]);
            }
        }
    }

    cancelModal() {
        this.company_position.reset('');
        this.modalService.setModalName('');
        this.modalService.emitModalName();
    }

    saveMsg() {
        this.before_submit = false;
        if (this.company_position.valid) {
            const submit_data = {};
            for (const obj in this.company_position.value) {
                submit_data[obj] = this.company_position.value[obj];
            }
            if (this.modal_info.type === 'add') {
                this.settingsService.addPosition(submit_data).subscribe((res) => {
                    this.assistModalService.openAssistModal('toast', '添加成功', () => {
                        this.runCallback(res.data.data);
                    });
                });
            } else {
                this.settingsService.updatePosition(this.modal_info.data.id, submit_data).subscribe((res) => {
                    this.assistModalService.openAssistModal('toast', '保存成功', () => {
                        this.runCallback();
                    });
                });
            }
        }
    }

    deleteRecord() {
        this.assistModalService.openAssistModal('confirm', '确定删除？', () => {
            this.settingsService.deletePosition(this.modal_info.data.id).subscribe((res) => {
                this.assistModalService.openAssistModal('toast', '删除成功', () => {
                    this.runCallback();
                });
            });
        });
    }

    runCallback(res?) {
        console.log(res);
        this.modal_callback(res);
        this.cancelModal();
    }
}
