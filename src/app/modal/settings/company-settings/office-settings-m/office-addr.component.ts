import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalService} from '../../../../shared/service/modal/modal.service';
import {SettingsService} from '../../../../shared/service/settings/settings.service';
import {requireNum} from "../../../../shared/validators/staff-upload-validator";
import {AssistModalService} from "../../../../shared/service/assist-modal-service/assist-modal.service";
import {CompanySettingsService} from "../../../../shared/service/api-service/company-settings/company-settings.service";
import {HttpService} from "../../../../shared/service/http-service/http.service";

@Component({
    selector: 'app-office-addr',
    templateUrl: './office-addr.component.html',
    styleUrls: ['./office-addr.component.css']
})
export class OfficeAddrComponent implements OnInit {
    @Input() modal_name;
    @Input() modal_info;
    @Input() modal_callback;
    public before_submit = true;


    public company_office: FormGroup;


    public office_id = -1;


    public addr = {
        province: [],
        city: [],
        district: []
    };

    constructor(fb: FormBuilder,
                public modalService: ModalService,
                public settingsService: SettingsService,
                public assistModalService: AssistModalService,
                public httpService: HttpService,
                public companySettingsService: CompanySettingsService) {
        this.company_office = fb.group({
            name: ['', Validators.required],
            district: ['', Validators.required],
            city: [''],
            province: [''],
            is_default: [0],
            addr: ['', Validators.required],
            postcode: ['', [requireNum, Validators.minLength(6), Validators.maxLength(6)]],
            tel: [''],
            fax: ['']
        });
    }

    ngOnInit() {
        console.log(this.modal_info);
        this.settingsService.getProvince().subscribe((res) => {
            this.addr.province = res.data.data;
            if (this.modal_info.type === 'edit') {
                console.log(this.company_office.controls);
                for (const obj in this.company_office.controls) {
                    if (obj !== 'province' && obj !== 'city' && obj !== 'district') {
                        this.company_office.controls[obj].setValue(this.modal_info['data'][obj]);
                    } else {
                        this.company_office.controls[obj].setValue([{
                            id: this.modal_info['data'][obj],
                            name: this.modal_info['data'][`${obj}_name`]
                        }]);
                    }
                }
            }
        });
    }

    /**
     * selectProvince
     * 函数描述
     * 选择省份
     * @params: : ,
     * @return:
     */
    selectProvince(event) {
        this.company_office.get('district').setValue('');
        this.company_office.get('city').setValue('');
        this.settingsService.getCity(event.id).subscribe((res) => {
            this.addr['city'] = res.data.data;
        });
    }

    /**
     * selectCity
     * 函数描述
     * 选择城市
     * @params: : ,
     * @return:
     */
    selectCity(event) {
        this.company_office.get('district').setValue('');
        this.settingsService.getDistrict(event.id).subscribe((res) => {
            this.addr['district'] = res.data.data;
        });
    }

    deleteOffice () {
        this.assistModalService.openAssistModal('confirm', '确认删除？', () => {
            this.httpService.myDelete(this.companySettingsService.getOfficeAddress(this.modal_info.data.id))
                .subscribe(() => {
                    this.assistModalService.openAssistModal('toast', '删除成功', () => {
                        this.runCallback();
                    });
                });
        });
    }
    cancelModal() {
        this.modalService.setModalName('');
        this.modalService.emitModalName();
    }

    saveMsg() {
        this.before_submit = false;
        if (this.company_office.valid) {
            const submit_data = {};
            for (const obj in this.company_office.value) {
                if (obj !== 'province' && obj !== 'city' && obj !== 'district') {
                    submit_data[obj] = this.company_office.value[obj];
                } else {
                    submit_data[obj] = this.company_office.value[obj][0]['id'];
                }
            }
            if (submit_data['is_default']) {
                submit_data['is_default'] = 1;
            } else {
                submit_data['is_default'] = 0;
            }
            if (this.modal_info.type === 'add') {
                this.settingsService.addOfficeAddr(submit_data).subscribe((res) => {
                    this.assistModalService.openAssistModal('toast', '添加成功', () => {
                        this.runCallback(res.data.data);
                    });
                });
            } else {
                this.settingsService.updateOfficeAddr(this.modal_info['data'].id, submit_data).subscribe((res) => {
                    this.assistModalService.openAssistModal('toast', '编辑成功', () => {
                        this.runCallback();
                    });
                });
            }

        }
    }

    runCallback(data?) {
        this.modal_callback(data);
        this.cancelModal();
    }
}
