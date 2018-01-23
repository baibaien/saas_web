import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalService} from '../../../../shared/service/modal/modal.service';
import {SettingsService} from '../../../../shared/service/settings/settings.service';
import {AssistModalService} from "../../../../shared/service/assist-modal-service/assist-modal.service";
import {HttpService} from "../../../../shared/service/http-service/http.service";
import {CompanySettingsService} from "../../../../shared/service/api-service/company-settings/company-settings.service";
import {CommonService} from "../../../../shared/service/api-service/common/common.service";

@Component({
    selector: 'app-contract-setting',
    templateUrl: './contract-setting.component.html',
    styleUrls: ['./contract-setting.component.css']
})
export class ContractSettingComponent implements OnInit {
    @Input() modal_name;
    @Input() modal_info;
    @Input() modal_callback = null;


    public before_submit = true;
    public company_contract: FormGroup;
    public contract_id = -1;
    public addr = {
        province: [],
        city: [],
        district: []
    };

    constructor(fb: FormBuilder,
                public modalService: ModalService,
                public settingsService: SettingsService,
                public commonService: CommonService,
                public assistModalService: AssistModalService,
                public companySettingsService: CompanySettingsService,
                public httpService: HttpService) {
        this.company_contract = fb.group({
            name: ['', Validators.required],
            district: ['', Validators.required],
            city: [''],
            province: [''],
            address: ['', Validators.required],
            is_default: [''],
            is_used: [''],
            postcode: ['', [Validators.minLength(6), Validators.maxLength(6)]]
        });
    }

    ngOnInit() {
        console.log(this.modal_info);
        this.httpService.myGet(this.commonService.getProvince()).subscribe((res) => {
            console.log(res);
            this.addr.province = res.data.data;
            if (this.modal_info.type === 'edit') {
                console.log(this.company_contract.controls);
                for (const obj in this.company_contract.controls) {
                    if (obj !== 'province' && obj !== 'city' && obj !== 'district') {
                        this.company_contract.controls[obj].setValue(this.modal_info['data'][obj]);
                    } else {
                        this.company_contract.controls[obj].setValue([{
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
        this.company_contract.get('district').setValue('');
        this.company_contract.get('city').setValue('');
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
        this.company_contract.get('district').setValue('');
        this.settingsService.getDistrict(event.id).subscribe((res) => {
            this.addr['district'] = res.data.data;
        });
    }

    deleteContractTarget() {
        this.assistModalService.openAssistModal('confirm', '确认删除？', () => {
            this.httpService.myDelete(this.companySettingsService.getContractCompnies(this.modal_info.data.id))
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
        if (this.company_contract.valid) {
            this.company_contract.value.is_default = Number(this.company_contract.value.is_default);
            const submit_data = {};
            for (const obj in this.company_contract.value) {
                if (obj !== 'province' && obj !== 'city' && obj !== 'district') {
                    submit_data[obj] = this.company_contract.value[obj];
                } else {
                    submit_data[obj] = this.company_contract.value[obj][0]['id'];
                }
            }
            if (this.modal_info.type === 'add') {
                this.settingsService.addContractCompany(submit_data).subscribe((res) => {
                    this.assistModalService.openAssistModal('toast', '添加成功', () => {
                        this.runCallback(res.data.data);
                    });
                });
            } else {
                this.settingsService.updateContractCompany(this.modal_info['data'].id, submit_data).subscribe((res) => {
                    this.assistModalService.openAssistModal('toast', '保存成功', () => {
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
