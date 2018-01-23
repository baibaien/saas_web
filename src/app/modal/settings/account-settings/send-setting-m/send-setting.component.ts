import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalService} from '../../../../shared/service/modal/modal.service';
import {phoneValid, requireNum} from '../../../../shared/validators/staff-upload-validator';
import {SettingsService} from '../../../../shared/service/settings/settings.service';
import {AccountSettingsService} from "../../../../shared/service/api-service/account-settings/account-settings.service";
import {HttpService} from "../../../../shared/service/http-service/http.service";
import {AssistModalService} from "../../../../shared/service/assist-modal-service/assist-modal.service";
import {isUndefined} from "util";
import {CommonService} from "../../../../shared/service/api-service/common/common.service";

@Component({
    selector: 'app-send-setting',
    templateUrl: './send-setting.component.html',
    styleUrls: ['./send-setting.component.css']
})
export class SendSettingComponent implements OnInit {

    @Input() modal_name;
    @Input() modal_info;
    @Input() modal_callback = null;
    public before_submit = true;


    public account_send: FormGroup;


    public addr = {
        province: [],
        city: [],
        district: []
    };

    // 表单元素监控

    constructor(fb: FormBuilder, public modalService: ModalService,
                public settingsService: SettingsService,
                public commonService: CommonService,
                public accountSettingService: AccountSettingsService,
                public assistModalService: AssistModalService,
                public httpService: HttpService) {
        this.account_send = fb.group({
            contact: ['', Validators.required],
            mobile: ['', [Validators.required, phoneValid]],
            district: ['', Validators.required],
            post_code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), requireNum]],
            city: [''],
            province: [''],
            address: ['', Validators.required],
            is_default: [''],
            fp_default: [''],
            is_used: ['']
        });
    }

    ngOnInit() {
        // 初始化时已有省市区值的自动填充
        console.log(this.modal_info);
        this.httpService.myGet(this.commonService.getProvince()).subscribe((res) => {
            this.addr.province = res.data.data;
        });
        if (!isUndefined(this.modal_info)) {
            for (const obj in this.account_send.controls) {
                if (obj !== 'province' && obj !== 'city' && obj !== 'district') {
                    this.account_send.controls[obj].setValue(this.modal_info[obj]);
                } else {
                    this.account_send.controls[obj].setValue([{
                        id: this.modal_info[obj],
                        name: this.modal_info[`${obj}_name`]
                    }]);
                }
            }
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
            this.account_send.get('district').setValue('');
            this.account_send.get('city').setValue('');
            this.settingsService.getCity(event.id).subscribe((res) => {
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
            this.account_send.get('district').setValue('');
            this.settingsService.getDistrict(event.id).subscribe((res) => {
                this.addr['district'] = res.data.data;
            });
        }
    }


    deleteSend() {
        this.assistModalService.openAssistModal('confirm', '确认删除？', () => {
            this.httpService.myDelete(this.accountSettingService.getSendAddr(this.modal_info.id))
                .subscribe(() => {
                    this.assistModalService.openAssistModal('toast', '删除成功', () => {
                        this.modal_callback();
                        this.cancelModal();
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
        if (this.account_send.valid) {
            const submit_data = {};
            const shown_data = {};
            for (const obj in this.account_send.value) {
                if (obj !== 'city' && obj !== 'province' && obj !== 'district') {
                    submit_data[obj] = this.account_send.value[obj];
                } else {
                    submit_data[obj] = this.account_send.value[obj][0].id;
                }
            }
            if (isUndefined(this.modal_info)) {
                this.settingsService.addSend(submit_data).subscribe((res) => {
                    this.updateInfo('add');
                });
            } else {
                this.settingsService.updateSend(this.modal_info.id, submit_data).subscribe((res) => {
                    this.updateInfo('edit');
                });
            }
        }
    }

    updateInfo(type: string = '') {
        this.before_submit = true;
        this.assistModalService.openAssistModal('toast', type === 'add' ? '添加成功' : '修改成功', () => {
            this.modal_callback();
            this.cancelModal();
        });
    }

}
