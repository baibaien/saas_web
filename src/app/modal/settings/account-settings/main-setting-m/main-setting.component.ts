import {Component, Input, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SettingsService} from "../../../../shared/service/settings/settings.service";
import {MainNumber, PwValid, requireNum} from "../../../../shared/validators/staff-upload-validator";
import {ModalService} from "../../../../shared/service/modal/modal.service";
import {AssistModalService} from "../../../../shared/service/assist-modal-service/assist-modal.service";
import {isUndefined} from "util";
@Component({
    selector: 'app-main-setting',
    templateUrl: './main-setting.component.html',
    styleUrls: ['./main-setting.component.css']
})
export class MainSettingComponent implements OnInit {
    @Input() modal_name;
    @Input() modal_info;
    @Input() modal_callback;


    public beforesubmit = true;
    public account_base: FormGroup;
    public addr = {
        province: [],
        city: [],
        district: []
    };

    constructor(fb: FormBuilder,
                public modalService: ModalService,
                public assistModalService: AssistModalService,
                public settingService: SettingsService) {
        this.account_base = fb.group({
            company: ['', Validators.required],
            com_sn: ['', [Validators.required, MainNumber]],
            hr_office_addr: fb.group({
                province: ['0', Validators.required],
                city: ['0', Validators.required],
                district: ['0', Validators.required],
                addr: ['', Validators.required],
                postcode: ['', [requireNum, Validators.maxLength(6), Validators.minLength(6)]]
            })
        });
        this.settingService.getProvince().subscribe((res) => {
            this.addr.province = res.data.data;
        });
    }

    ngOnInit() {
        console.log(this.modal_info);
        this.addr = {
            province: this.modal_info.province,
            city: this.modal_info.city,
            district: this.modal_info.district,
        };

        // -->初始化
        for (const obj in this.account_base.controls) {
            if (obj === 'company' || obj === 'com_sn') {
                this.account_base.controls[obj].setValue(this.modal_info[obj]);
            } else {
                const hr_office_addr = this.account_base.get('hr_office_addr') as FormGroup;
                for (const sub_obj in hr_office_addr.controls) {
                    if (sub_obj !== 'province' && sub_obj !== 'city' && sub_obj !== 'district') {
                        hr_office_addr.controls[sub_obj].setValue(this.modal_info['hr_office_addr'][sub_obj]);
                    } else {
                        hr_office_addr.controls[sub_obj].setValue([{
                            id: this.modal_info['hr_office_addr'][sub_obj],
                            name: this.modal_info['hr_office_addr'][`${sub_obj}_name`]
                        }]);
                    }
                }
            }
        }
        this.account_base.updateValueAndValidity();
        // <-----

        // 判断是否是已签约公司
        if (window.localStorage.getItem('is_outsource_use') === '1' || window.localStorage.getItem('is_saas_use') === '1') {
            this.account_base.get('company').disable();
        }
    }

    /**
     * selectProvince
     * 函数描述
     * 选择省份
     * @params: : ,
     * @return:
     */
    selectProvince(event) {
        if (event !== '') {
            this.account_base.get('hr_office_addr').get('district').setValue('');
            this.account_base.get('hr_office_addr').get('city').setValue('');
            this.settingService.getCity(event.id).subscribe((res) => {
                this.addr['city'] = res.data.data;
            });
        }
    }

    /**
     * selectCity
     * 函数描述
     * 选择城市
     * @params: : ,
     * @return:
     */
    selectCity(event) {
        if (event !== '') {
            this.settingService.getDistrict(event.id).subscribe((res) => {
                this.addr['district'] = res.data.data;
                this.account_base.get('hr_office_addr').get('district').setValue('');
            });
        }
    }

    cancelModal() {
        this.modalService.setModalName('');
        this.modalService.emitModalName();
    }


    saveMsg() {
        this.account_base.get('company').updateValueAndValidity();
        this.beforesubmit = false;
        if (this.account_base.valid) {
            const submit_data = {};
            submit_data['hr_office_addr'] = {};
            for (const obj in this.account_base.getRawValue()) {
                if (obj === 'company' || obj === 'com_sn') {
                    submit_data[obj] = this.account_base.getRawValue()[obj];
                } else {
                    for (const sub_obj in this.account_base.getRawValue()['hr_office_addr']) {
                        if (sub_obj === 'province' || sub_obj === 'city' || sub_obj === 'district') {
                            submit_data['hr_office_addr'][sub_obj] = this.account_base.getRawValue()['hr_office_addr'][sub_obj][0].id;
                        } else {
                            submit_data['hr_office_addr'][sub_obj] = this.account_base.getRawValue()['hr_office_addr'][sub_obj];
                        }
                    }
                }
            }
            this.settingService.updateSignInfo(submit_data).subscribe((res) => {
                this.beforesubmit = true;
                this.assistModalService.openAssistModal('toast', '变更成功', () => {
                    this.modalService.setModalName('');
                    this.modalService.emitModalName();
                    if (!isUndefined(this.modal_callback)) {
                        this.modal_callback();
                    }
                });
            });
        }
    }
}
