import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ModalService} from '../../../../shared/service/modal/modal.service';
import {SettingsService} from '../../../../shared/service/settings/settings.service';
import {AssistModalService} from "../../../../shared/service/assist-modal-service/assist-modal.service";

@Component({
    selector: 'app-ygself-setting',
    templateUrl: './ygself-setting.component.html',
    styleUrls: ['./ygself-setting.component.css']
})
export class YgselfSettingComponent implements OnInit {
    @Input() modal_name;
    @Input() modal_info;
    @Input() modal_callback;


    public contact_list: FormControl;
    public contact_list_name = [];
    public contact_list_id = [];
    public position_list: Array<any>;
    public company_ygself: FormGroup;
    public before_submit = true;


    constructor(fb: FormBuilder,
                public modalService: ModalService,
                public settingService: SettingsService,
                public assistModalService: AssistModalService) {
        this.company_ygself = fb.group({
            is_yg_set_password: ['1'],
            is_yg_view_contact_book: ['1'],
            limit_no_view_zhiwei: fb.array([])
        });
    }

    ngOnInit() {
        this.settingService.getPositionList().subscribe((res) => {
            this.position_list = res.data.data;
        });
        for (let obj in this.company_ygself.controls) {
            let zhiwei_list = this.company_ygself.get('limit_no_view_zhiwei') as FormArray;
            if (obj == 'limit_no_view_zhiwei') {
                for (let i = 0; i < this.modal_info['data']['limit_no_view_zhiwei'].length; i++) {
                    let zhiwei = new FormControl();
                    zhiwei.setValue(this.modal_info['data']['limit_no_view_zhiwei'][i]['id']);
                    zhiwei_list.push(zhiwei);
                    this.contact_list_name.push(this.modal_info['data']['limit_no_view_zhiwei'][i]['name']);
                    this.contact_list_id.push(this.modal_info['data']['limit_no_view_zhiwei'][i]['id']);
                }
            } else {
                this.company_ygself.controls[obj].setValue(`${this.modal_info['data'][obj]}`);
            }
        }
    }

    addHiddenPosition(event) {
        this.contact_list_name.push(event.name);
        this.contact_list_id.push(event.id);
        let zhiwei_list = this.company_ygself.get('limit_no_view_zhiwei') as FormArray;
        let zhiwei = new FormControl();
        let tmp_obj = {};
        this.position_list.map(val => {
            if (val.id == event.id) {
                tmp_obj = val;
                val['_status_'] = 0;
            }
        });
        zhiwei.setValue(event.id);
        zhiwei_list.push(zhiwei);
    }

    removeItem(index) {
        console.log(index);
        console.log(this.contact_list_id);
        this.position_list.map(val => {
            if (val.id == this.contact_list_id[index]) {
                val['_status_'] = 1;
            }
        });
        this.contact_list_id.splice(index, 1);
        this.contact_list_name.splice(index, 1);
        let zhiwei_list = this.company_ygself.get('limit_no_view_zhiwei') as FormArray;
        zhiwei_list.removeAt(index);

    }

    cancelModal() {
        this.company_ygself.reset('');
        this.modalService.setModalName('');
        this.modalService.emitModalName();
    }

    saveMsg() {
        this.before_submit = false;
        if (this.company_ygself.valid) {
            let submit_data = {};
            let shown_data = {};
            shown_data['limit_no_view_zhiwei'] = [];
            for (let obj in this.company_ygself.value) {
                if (obj == 'limit_no_view_zhiwei') {
                    for (let i = 0; i < this.company_ygself.value['limit_no_view_zhiwei'].length; i++) {
                        shown_data['limit_no_view_zhiwei'].push({
                            id: this.contact_list_id[i],
                            name: this.contact_list_name[i]
                        });
                    }
                } else {
                    shown_data[obj] = this.company_ygself.value[obj];
                }
                submit_data[obj] = this.company_ygself.value[obj];
            }
            this.settingService.updateYgSelf(JSON.stringify(submit_data)).subscribe((res) => {
                this.before_submit = true;
                this.assistModalService.openAssistModal('toast', '保存成功', () => {
                    this.modalService.setModalName('modal_info');
                    this.modalService.emitModalName();
                    this.modal_callback();
                })

            });
        }
    }
}
