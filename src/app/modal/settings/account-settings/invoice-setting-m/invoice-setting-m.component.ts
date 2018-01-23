import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalService} from '../../../../shared/service/modal/modal.service';
import {SettingsService} from '../../../../shared/service/settings/settings.service';
import {mailValid, phoneValid, taxValid} from '../../../../shared/validators/staff-upload-validator';
import {AssistModalService} from '../../../../shared/service/assist-modal-service/assist-modal.service';
import {isUndefined} from 'util';
import {BillManageApiService} from "../../../../shared/service/api-service/bill-manage-api/bill-manage-api.service";
import {HttpService} from "../../../../shared/service/http-service/http.service";
import {GlobalFuncService} from "../../../../shared/service/global-func/global-func.service";

@Component({
    selector: 'app-invoice-setting-m',
    templateUrl: './invoice-setting-m.component.html',
    styleUrls: ['./invoice-setting-m.component.css']
})
export class InvoiceSettingMComponent implements OnInit {
    @Input() modal_name;
    @Input() main_setting;
    @Input() modal_callback;
    public before_submit = true;

    // -->特殊需求显示隐藏设置
    public hide_spectials = true;
    public hide_spectials_text: String;
    // <-----

    public account_fapiao: FormGroup;

    // -->下拉框变量
    // <-----
    public select_lists = {
        fapiao_type: [],
        fp_type: []
    };
    // public select_name = {
    //     fapiao_type_name: '',
    //     fp_type_name: ''
    // };

    constructor(fb: FormBuilder,
                public modalService: ModalService,
                public httpService: HttpService,
                public settingsService: SettingsService,
                public billManageApiService: BillManageApiService,
                public globalFuncService: GlobalFuncService,
                public assistModalService: AssistModalService) {
        this.account_fapiao = fb.group({
            title: ['', Validators.required],
            mobile: ['', [phoneValid]],
            email: ['', [Validators.required, mailValid]],
            fapiao_type: [''],
            fp_type: ['', Validators.required],
            tax_number: ['', [Validators.required, taxValid]],
            address_mobile: [''],
            bank_account: ['']
        });
    }

    ngOnInit() {
        this.select_lists = {
            fp_type: this.main_setting.fp_type,
            fapiao_type: this.main_setting.fapiao_type
        };
        for (const obj in this.account_fapiao.controls) {
            if (obj === 'fp_type') {
                this.account_fapiao.controls[obj].setValue([{
                    id: this.main_setting.data.fp_type,
                    name: this.main_setting.data.fp_type_name
                }]);
            } else if (obj === 'fapiao_type') {
                this.account_fapiao.controls[obj].setValue([{
                    id: this.main_setting.data.fapiao_type,
                    name: this.main_setting.data.fapiao_type_name
                }]);
            } else {
                this.account_fapiao.controls[obj].setValue(this.main_setting['data'][obj]);
            }
        }
        if (!this.account_fapiao.get('mobile').value && !this.account_fapiao.get('address_mobile').value
            && !this.account_fapiao.get('bank_account').value && this.account_fapiao.get('fapiao_type').value[0].id == 0) {
            this.hide_spectials = true;

        } else {
            this.hide_spectials = false;
        }
        this.hide_spectials_text = this.hide_spectials ? '+ 填写特殊需求' : '- 清空并收起下列选填信息';


    }

    // selectFa(event) {
    //     console.log(event);
    //     if (event && event.id == 0) {
    //         this.select_name.fp_type_name = event.name;
    //     }
    // }
    //
    // selectFapiao(event = {target: {selectedOptions: [{innerHTML: ''}]}}) {
    //     if (event.target.selectedOptions[0].innerHTML) {
    //         this.select_name.fapiao_type_name = event.target.selectedOptions[0].innerHTML;
    //     }
    // }

    hideOptions() {
        this.hide_spectials = !this.hide_spectials;
        this.hide_spectials_text = this.hide_spectials ? '+ 填写特殊需求' : '- 清空并收起下列选填信息';
        // 清空下列信息
        if (this.hide_spectials) {
            this.account_fapiao.get('mobile').setValue('');
            this.account_fapiao.get('address_mobile').setValue('');
            this.account_fapiao.get('bank_account').setValue('');
            this.account_fapiao.get('fapiao_type').setValue([{id: '0', name: '正常开票'}]);
        }
    }

    cancelModal() {
        this.account_fapiao.reset('');
        this.modalService.setModalName('');
        this.modalService.emitModalName();
    }

    saveMsg() {
        this.before_submit = false;
        console.log(this.main_setting);
        console.log(this.account_fapiao.get('fp_type').value);
        if (this.account_fapiao.get('fp_type').value[0].id == 0) {
            if (this.main_setting.submit_type != 1) {
                this.settingsService.updateFapiao({fp_type: this.account_fapiao.get('fp_type').value[0].id}).subscribe((res) => {
                    this.before_submit = true;
                    this.assistModalService.openAssistModal('toast', '保存成功', () => {
                        this.modalService.setModalName('');
                        this.modalService.emitModalName();
                        if (!isUndefined(this.modal_callback)) {
                            this.modal_callback();
                        }
                    });
                });
            } else {
                this.httpService.myPatch(this.billManageApiService.getPatchFapiao(this.main_setting.order_id),
                    {is_invoice: 0})
                    .subscribe(data => {
                        console.log(data);
                        this.modalService.setModalName('');
                        this.modalService.emitModalName();
                        if (!isUndefined(this.modal_callback)) {
                            this.modal_callback();
                        }
                    });
            }
        } else if (this.account_fapiao.valid) {
            this.account_fapiao.value.fapiao_type_name = this.account_fapiao.value.fapiao_type[0].name;
            this.account_fapiao.value.fapiao_type = this.account_fapiao.value.fapiao_type[0].id;
            this.account_fapiao.value.fp_type_name = this.account_fapiao.value.fp_type[0].name;
            this.account_fapiao.value.fp_type = this.account_fapiao.value.fp_type[0].id;
            console.log(this.account_fapiao.value);
            if (this.main_setting.submit_type != 1) {
                this.settingsService.updateFapiao(this.account_fapiao.value).subscribe((res) => {
                    this.before_submit = true;
                    this.assistModalService.openAssistModal('toast', '保存成功', () => {
                        this.modalService.setModalName('');
                        this.modalService.emitModalName();
                        if (!isUndefined(this.modal_callback)) {
                            this.modal_callback();
                        }
                    });
                });
            } else {
                this.httpService.myPatch(this.billManageApiService.getPatchFapiao(this.main_setting.order_id),
                    Object.assign(this.account_fapiao.value, {is_invoice: 1}))
                    .subscribe(data => {
                        console.log(data);
                        this.before_submit = true;
                        this.assistModalService.openAssistModal('toast', '保存成功', () => {
                            this.modalService.setModalName('');
                            this.modalService.emitModalName();
                            if (!isUndefined(this.modal_callback)) {
                                this.modal_callback();
                            }
                            //
                            // this.globalFuncService.emitInfoListSource();
                            // this.modalService.setModalName('modal_info');
                            // this.modalService.emitModalName();
                        });
                    });
            }
        }
    }
}
