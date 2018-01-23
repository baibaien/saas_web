import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {HttpService} from '../../../shared/service/http-service/http.service';
import {AssistModalService} from '../../../shared/service/assist-modal-service/assist-modal.service';
import {Router} from '@angular/router';
import {StaffsService} from "../../../shared/service/api-service/staff-directory/staffs/staffs.service";
import {requireNum} from "../../../shared/validators/staff-upload-validator";
import {WithdrawApiService} from "../../../shared/service/api-service/withdraw-api/withdraw-api.service";
import {NumValidators} from "../../../shared/validators/num-validator";
import {WithdrawService} from "../../../shared/service/withdraw/withdraw.service";

@Component({
    selector: 'app-withdraw',
    templateUrl: './withdraw.component.html',
    styleUrls: ['./withdraw.component.css'],

})
export class WithdrawComponent implements OnInit, OnDestroy {

    // -->支付方式
    public pay_type = new FormControl('');
    public pay_type_watcher;
    // <-----

    // -->提现金额
    public withdraw_money;
    public withdraw_money_watcher;

    // <-----


    // -->公司名称
    public company_name = '';
    // <-----

    // -->
    public pay_list;
    // <-----

    // -->是否可用微信支付
    public wechat_usable = true;
    public wechat_limit;
    // <-----


    // -->输入数据表单区域
    public withdraw_form;
    // <-----


    // -->银行相关
    public bank_parent_config = {
        placeholder: '请选择开户行',
        allow_clear: false,
        async: false
    };
    public bank_child_config = {
        placeholder: '请选择支行',
        allow_clear: true,
        async: true
    };
    public bank_list;
    public sub_bank_list;
    public banks_page = 1;
    public sub_banks_async = [];
    // <-----


    // -->头部数据
    public header_data;
    // <-----

    public is_third_pay = 1;
    constructor(public httpService: HttpService,
                public staffsService: StaffsService,
                public fb: FormBuilder,
                public withdrawApiService: WithdrawApiService,
                public assistModalService: AssistModalService,
                public withdrawService: WithdrawService,
                public router: Router) {
        document.title = '余额提现';


        this.httpService.myPost(this.staffsService.getYgBank(), {})
            .subscribe(
                data => {
                    this.bank_list = data.data.data.map((val) => {
                        val['name'] = val['bank_name'];
                        val['id'] = val['bank_id'];
                        return val;
                    });
                    console.log(this.bank_list);
                });


        // -->支付监控
        this.pay_type_watcher = this.pay_type.valueChanges.subscribe(data => {
            switch (data) {
                case '1':
                    this.company_name = this.pay_list.ali.name;
                    this.withdraw_form.disable();
                    this.withdraw_form.get('ali_acc').enable();
                    break;
                case '2':
                    this.company_name = this.pay_list.bank.name;
                    this.withdraw_form.disable();
                    ['bank_code', 'bank_sub_code', 'bank_acc_name', 'bank_acc'].map(val => {
                        this.withdraw_form.get(val).enable();
                    });
                    break;
                case '3':
                    this.withdraw_form.disable();
                    this.withdraw_form.get('__base__').enable();
                    this.company_name = this.pay_list.wechat.name;
                    break;
                default:
                    break;
            }
        });
        // <-----

        // -->金额监控

        // <-----


        this.withdraw_form = this.fb.group({
            ali_acc: ['', Validators.required],
            bank_code: ['', Validators.required],
            bank_sub_code: ['', Validators.required],
            bank_acc_name: ['', Validators.required],
            bank_acc: ['', Validators.required],
            __base__: ['']
        });

    }

    ngOnInit() {

        this.httpService.myGet(this.withdrawApiService.getWithdrawData(), {})
            .subscribe(data => {
                this.is_third_pay = data.data.is_third_pay;
                if (this.is_third_pay == 1) {
                    this.router.navigate(['/error/permission-denied']);
                    return;
                }
                this.pay_list = data.data.BANK_LIST;
                this.pay_list['wechat'] = data.data.BANK_LIST.bank;
                this.wechat_limit = data.data.weChatLimit;
                this.pay_type.setValue('1');
                this.header_data = {
                    balance_money: Number(data.data.balance_money),
                    max_money: Number(data.data.max_money),
                    social_money: Number(data.data.social_money)
                };
                this.withdraw_money = new FormControl('', [
                    Validators.required, requireNum, NumValidators.halfMin(0), Validators.max(this.header_data.max_money)
                ]);
                this.withdraw_money_watcher = this.withdraw_money.valueChanges.subscribe(data1 => {
                    if (!isNaN(data1)) {
                        if (Number(data1) > this.wechat_limit) {
                            this.wechat_usable = false;
                        } else {
                            this.wechat_usable = true;
                        }
                        this.checkWechatUsable();
                    }
                });
            });
    }

    ngOnDestroy() {
        this.pay_type_watcher.unsubscribe();
    }


    choosePayType(event, t) {
        this.checkWechatUsable(t.value);
        event.stopPropagation();
        event.preventDefault();
    }

    checkWechatUsable(value = this.pay_type.value) {
        if (!this.wechat_usable && value == 3) {
            this.pay_type.setValue('1');
        } else {
            this.pay_type.setValue(value);
        }
    }

    toWithdrawAssure() {
        if (this.withdraw_form.valid && this.withdraw_money.valid) {
            let submit_data;
            switch (this.pay_type.value) {
                case '3':
                    submit_data = {
                        type: 3,
                        money: this.withdraw_money.value
                    };
                    break;
                case '2':
                    submit_data = {
                        type: 2,
                        money: this.withdraw_money.value,
                        bank_code: this.withdraw_form.value.bank_code[0].id.toString(),
                        bank_sub_code: this.withdraw_form.value.bank_sub_code[0].id.toString(),
                        bank_acc_name: this.withdraw_form.value.bank_acc_name.toString(),
                        bank_acc: this.withdraw_form.value.bank_acc.toString()
                    };
                    break;
                case '1':
                    submit_data = {
                        type: 1,
                        money: this.withdraw_money.value,
                        ali_acc: this.withdraw_form.value.ali_acc
                    };
                    break;
                default:
                    break;
            }
            this.httpService.myPost(this.withdrawApiService.getWithdrawSubmit(), submit_data)
                .subscribe(data => {
                    console.log(data);
                    this.withdrawService.setStatus(data.data);
                    this.router.navigate(['/user/dashboard/withdraw/assure']);
                });
        }
    }

    /**
     * refreshParentBank
     * 函数描述
     *
     * @params:
     * @return:
     */
    refreshParentBank(value) {
        console.log(value);
        this.banks_page = 1;
        this.httpService.myPost(this.staffsService.getYgOpenBank(), {
            name: '',
            bank_id: value.id,
            page: this.banks_page
        }).subscribe((res) => {
            this.withdraw_form.get('bank_sub_code').setValue('');
            this.sub_bank_list = [];
            this.sub_bank_list = res.data.data.map((item) => {
                return {
                    id: item.bank_code,
                    name: item.bank_name
                };
            });
        });
    }

    refreshAsyncParent(value) {
        console.log(this.withdraw_form.get('bank_code').value[0].id);
        if (value.waterfall) {
            this.banks_page++;
            this.httpService.myPost(this.staffsService.getYgOpenBank(), {
                name: value.search,
                bank_id: this.withdraw_form.get('bank_code').value[0].id,
                page: this.banks_page
            }).subscribe((res) => {
                const tmp_arr = [];
                res.data.data.map((item) => {
                    tmp_arr.push({
                        id: item.bank_code,
                        name: item.bank_name
                    });
                });
                this.sub_banks_async = tmp_arr;
            });
        } else {
            this.banks_page = 1;
            this.httpService.myPost(this.staffsService.getYgOpenBank(), {
                name: value.search,
                bank_id: this.withdraw_form.get('bank_code').value[0].id,
                page: this.banks_page
            }).subscribe((res) => {
                const tmp_arr = [];
                res.data.data.map((item) => {
                    tmp_arr.push({
                        id: item.bank_code,
                        name: item.bank_name
                    });
                });
                this.sub_bank_list = tmp_arr;
            });
        }
    }
}
