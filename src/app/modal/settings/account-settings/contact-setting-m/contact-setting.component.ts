import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalService} from '../../../../shared/service/modal/modal.service';
import {
    mailValid, nameValid, phoneValid,
    staticPhoneValid
} from '../../../../shared/validators/staff-upload-validator';
import {SettingsService} from '../../../../shared/service/settings/settings.service';
import {AssistModalService} from "../../../../shared/service/assist-modal-service/assist-modal.service";
import {isUndefined} from "util";

@Component({
    selector: 'app-contact-setting',
    templateUrl: './contact-setting.component.html',
    styleUrls: ['./contact-setting.component.css']
})
export class ContactSettingComponent implements OnInit {
    @Input() modal_name;
    @Input() modal_info;
    @Input() modal_callback;


    public id: number;
    public account_contact: FormGroup;

    public gender_list = [
        {id: 1, name: '先生'},
        {id: 2, name: '女士'}
    ];
    public before_submit = true;


    public position_list;

    constructor(fb: FormBuilder,
                public modalService: ModalService,
                public assistModalService: AssistModalService,
                public settings: SettingsService) {
        this.account_contact = fb.group({
            contact: ['', [Validators.required, nameValid]],
            mobile: ['', [Validators.required, phoneValid]],
            phone: ['', [staticPhoneValid]],
            email: ['', [mailValid]],
            address: [''],
            position: [''],
            gender: ['']
        });
    }

    ngOnInit() {
        console.log(this.modal_info);
        this.settings.getPositionList().subscribe((res) => {
            console.log(res);
            this.position_list = JSON.parse(JSON.stringify(res.data.data));
            for (const obj in this.account_contact.controls) {
                if (obj !== 'gender') {
                    this.account_contact.controls[obj].setValue(this.modal_info[obj]);
                    this.account_contact.controls[obj].updateValueAndValidity();
                } else {
                    for (let i in this.gender_list) {
                        if (this.gender_list[i].id == this.modal_info.gender) {
                            console.log(this.gender_list[i]);
                            this.account_contact.controls[obj].setValue([this.gender_list[i]]);
                            break;
                        } else {
                            this.account_contact.controls[obj].setValue('');
                        }
                    }
                }
            }
            console.log(this.account_contact);
            this.id = this.modal_info.id;
        });

    }


    cancelModal() {
        this.modalService.setModalName('');
        this.modalService.emitModalName();
    }

    saveMsg() {
        console.log(this.account_contact.value);
        console.log(this.account_contact.valid);
        this.before_submit = false;
        if (this.account_contact.valid) {
            const submit_data = {};
            // const shown_data = {};
            for (const obj in this.account_contact.value) {
                if (obj === 'gender') {
                    submit_data[obj] = this.account_contact.value[obj] instanceof Array ? this.account_contact.value[obj][0].id : this.account_contact.value[obj];
                } else {
                    submit_data[obj] = this.account_contact.value[obj];
                }
            }
            this.settings.updateContact(submit_data).subscribe((res) => {
                this.before_submit = true;
                this.assistModalService.openAssistModal('toast', '保存成功', () => {
                    if (!isUndefined(this.modal_callback)) {
                        this.modal_callback();
                    }
                    this.cancelModal();
                });
            });
        }
    }
}
