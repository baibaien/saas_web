import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalService} from '../../../../shared/service/modal/modal.service';
import {SettingsService} from '../../../../shared/service/settings/settings.service';
import {requireDeci, requireNum} from '../../../../shared/validators/staff-upload-validator';
import {AssistModalService} from "../../../../shared/service/assist-modal-service/assist-modal.service";

@Component({
    selector: 'app-benefit-setting',
    templateUrl: './benefit-setting.component.html',
    styleUrls: ['./benefit-setting.component.css']
})
export class BenefitSettingComponent implements OnInit {

    @Input() modal_name;
    @Input() modal_info;
    @Input() modal_callback;


    public before_submit = true;
    public company_benefit: FormGroup;
    public benefit_id: number = -1;


    public select_list = {
        fax_item: [],
        unix_item: [],
        condition_item: []
    };

    constructor(fb: FormBuilder,
                public modalService: ModalService,
                public settingsService: SettingsService,
                public assistModalService: AssistModalService) {
        this.company_benefit = fb.group({
            be_money: ['', [Validators.required, requireDeci]],
            be_name: ['', [Validators.required, Validators.maxLength(15)]],
            unit: ['', Validators.required],
            is_auto: [''],
            is_cover: [''],
            condition: ['', Validators.required]
        });
    }

    ngOnInit() {
        console.log(this.modal_info);
        this.select_list = JSON.parse(JSON.stringify(this.modal_info['data'].meta));
        if (this.modal_info.type === 'edit') {
            this.benefit_id = this.modal_info['data']['data']['id'];
            for (const obj in this.company_benefit.controls) {
                if (obj !== 'condition' && obj !== 'unit') {
                    this.company_benefit.controls[obj].setValue(this.modal_info['data']['data'][obj]);
                } else {
                    this.company_benefit.controls[obj].setValue([{
                        id: this.modal_info.data.data[obj],
                        name: this.modal_info.data.data[`${obj}_name`]
                    }]);
                }
            }
        } else {
            this.company_benefit.get('unit').setValue([this.modal_info.data.meta.unix_item[0]]);
        }
    }


    changeUnit(event) {
        console.log(event);
        if (event.id == 2) {
            this.select_list.condition_item.map(val => {
                console.log(val);
                if (val.id != 0) {
                    val._status_ = 0;
                }
            });
        } else {
            this.select_list.condition_item.map(val => {
                val._status_ = 1;
            });
        }
        this.company_benefit.get('condition').setValue('');
    }


    cancelModal() {
        this.modalService.setModalName('');
        this.modalService.emitModalName();
    }

    saveMsg() {
        this.before_submit = false;
        if (this.company_benefit.valid) {
            this.company_benefit.value.is_auto = Number(this.company_benefit.value.is_auto);
            const submit_data = {};
            for (const obj in this.company_benefit.value) {
                if (obj !== 'condition' && obj !== 'unit') {
                    submit_data[obj] = this.company_benefit.value[obj];

                } else {
                    submit_data[obj] = this.company_benefit.value[obj][0].id;
                }
            }
            if (this.modal_info.type === 'add') {
                this.settingsService.addBenifit(submit_data).subscribe((res) => {
                    this.runCallback();
                });
            } else {
                submit_data['id'] = this.benefit_id;
                this.settingsService.updateBenifit(submit_data).subscribe((res) => {
                    this.runCallback();
                });
            }

        }
    }

    deleteRecord() {
        this.assistModalService.openAssistModal('confirm', '确定删除该项福利？', () => {
            this.settingsService.deleteBenifit(this.modal_info.data.data.id).subscribe((res) => {
                this.assistModalService.openAssistModal('toast', '删除成功', () => {
                    this.runCallback();
                });
            });
        });
    }

    runCallback() {
        this.modal_callback();
        this.cancelModal();
    }
}
