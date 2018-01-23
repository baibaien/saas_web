import {Component, OnDestroy, OnInit} from '@angular/core';
import {BillManageApiService} from "../../../shared/service/api-service/bill-manage-api/bill-manage-api.service";
import {GlobalFuncService} from "../../../shared/service/global-func/global-func.service";
import {HttpService} from "../../../shared/service/http-service/http.service";
import {MyDate} from "../../../class/MyDate";
import {AccountSettingsService} from "../../../shared/service/api-service/account-settings/account-settings.service";
import {ModalService} from "../../../shared/service/modal/modal.service";
import {Router} from "@angular/router";
import {BillManageService} from "../../../shared/service/bill-manage/bill-manage.service";
import {AssistModalService} from "../../../shared/service/assist-modal-service/assist-modal.service";

@Component({
    selector: 'app-bill-manage',
    templateUrl: './bill-manage.component.html',
    styleUrls: ['./bill-manage.component.css']
})
export class BillManageComponent implements OnInit, OnDestroy {
    // -->选中账单
    public choose_bill_num = 0;
    public all_selected = false;
    public bill_info;
    public bill_list;
    public use_balance = true;


    // -->
    public modal_name;
    public modal_info;
    public fapiao_info;
    public modal_callback;
    // <-----
    // <-----
    // -->顶部数据计算
    public all_money;
    public b_money;
    public b_money_show;
    public payable_money;
    // <-----
    // -->
    // -->底部计数器
    public total;
    // <-----
    public table_header = [
        {column_key: 'type_name', column_name: '账单', column: 'bill_name', filter: 0, selected: false},
        {column_key: 'city_name', column_name: '城市', column: 'city_name', filter: 0, selected: false},
        {column_key: 'create_time', column_name: '账单生成时间', column: 'create_time', filter: 0, selected: false},
        {column_key: 'num', column_name: '人数', column: 'num', filter: 0, selected: false},
        {column_key: 'money ', column_name: '金额', column: 'money', filter: 0, selected: false}
    ];
    // <-----
    // -->流订阅/取消订阅
    public list_info_emitter;
    public modal_name_emitter;
    // <-----
    // -->
    public bill_url;
    // <-----

    // -->辅助modal
    // <-----
    constructor(public billManageApiService: BillManageApiService,
                public billManageService: BillManageService,
                public globalFuncService: GlobalFuncService,
                public httpService: HttpService,
                public router: Router,
                public accountSettingService: AccountSettingsService,
                public modalService: ModalService,
                public assistModalService: AssistModalService) {
        document.title = '帐单列表';
        // -->url 获取
        this.bill_url = this.billManageApiService.getBillListUrl();
        // <-----
        this.list_info_emitter = this.globalFuncService.getInfoListEmit().subscribe(data => {
            data.subscribe(data1 => {
                console.log('帐单列表:', data1);
                this.bill_info = JSON.parse(JSON.stringify(data1.data.meta));
                this.bill_list = this.compileData(JSON.parse(JSON.stringify(data1.data.data.list)));
                console.log(this.bill_list);
                this.b_money = Number(this.bill_info.b_money);
                if (this.b_money < 0) {
                    this.use_balance = true;
                }
                this.computeMoney();
                this.all_selected = false;
                this.chooseBill('all');
                this.total = data1.data.meta.total;
            });
        });

        this.modal_name_emitter = this.modalService.getModalNameEmit().subscribe(data => {
            this.modal_name = data;
        });
    }

    ngOnInit() {
        this.globalFuncService.resetSubmitData();
        this.globalFuncService.setInfoListSource('get', this.bill_url, {});
        this.globalFuncService.emitInfoListSource();
    }

    ngOnDestroy() {
        this.list_info_emitter.unsubscribe();
        this.modal_name_emitter.unsubscribe();
    }

    // <-----
    // -->数据编译
    compileData(list) {
        for (let i in list) {
            console.log(list);
            list[i]['bill_name'] = '';
            // 订单名字符串编译
            let date_tmp;
            date_tmp = new MyDate(Number(list[i].op_month * 1000));
            if (list[i]['type'] != 42) {
                list[i]['bill_name'] = `${list[i]['type_name']}`;
                if (list[i]['type'] === 2) {
                    list[i]['bill_name'] += '(补缴)';
                }
            } else {
                list[i]['bill_name'] = list[i]['type_name'];
            }
            // 账单生成时间编译
            date_tmp = new MyDate(Number(list[i].create_time * 1000));
            // list[i]['op_month'] = `${date_tmp.getDate({type: 'cn'})}`;
            list[i]['create_time'] = `${date_tmp.getDate({type: 'cn'})}`;
            // 其他
            for (let j in list[i]['child']) {
                list[i]['child'][j]['type_name'] = '另付' + list[i]['child'][j]['type_name'];
                if (Number(list[i]['child'][j]['money']) > 0) {
                    list[i]['child'][j]['money'] = '+' + list[i]['child'][j]['money'];
                }
            }
        }
        return list;

    }

    // -->应付合计
    computeMoney() {
        this.all_money = 0;
        for (let i in this.bill_list) {
            if (this.bill_list[i]['selected'] == 1) {
                this.all_money += Number(this.bill_list[i].money);
                for (let j in this.bill_list[i].child) {
                    this.all_money += Number(this.bill_list[i].child[j].money);
                }
            }
        }
        this.b_money_show = Math.abs(this.b_money);
        if (this.b_money > this.all_money) {
            this.b_money_show = this.all_money;
        }
        if (!this.use_balance) {
            this.payable_money = this.all_money;
        } else {
            this.payable_money = this.all_money - Number(this.b_money);
            if (this.payable_money < 0) {
                this.payable_money = 0;
            }
        }
    }

    // <-----

    // <-----
    clickChooseBill(event, type) {
        event.stopPropagation();
        this.chooseBill(type);
    }

    // -->选账单
    chooseBill(type) {
        if (this.bill_list && this.bill_list.length > 0) {
            if (type === 'all') {
                if (this.all_selected) {
                    this.bill_list.filter(_ => {
                        // if (_.bill_status != 2) {
                        if (_.selected) {
                            _.selected = 0;
                            this.choose_bill_num--;
                        }
                        // }
                    });
                    if (this.choose_bill_num != this.bill_list.length) {
                        this.all_selected = false;
                    }
                } else {
                    this.all_selected = true;
                    this.choose_bill_num = 0;
                    this.bill_list.filter(_ => {
                        _['selected'] = 1;
                        this.choose_bill_num++;
                    });
                }
            } else if (typeof type === 'number') {
                // if (this.bill_list[type]['bill_status'] != 2) {
                if (this.bill_list[type]['selected']) {
                    this.bill_list[type]['selected'] = 0;
                    this.choose_bill_num--;
                    this.all_selected = false;
                } else {
                    this.bill_list[type]['selected'] = 1;
                    this.choose_bill_num++;
                    for (let i in this.bill_list) {
                        if (!!this.bill_list[i].selected == false) {
                            this.all_selected = false;
                            this.computeMoney();
                            return false;
                        }
                    }
                    this.all_selected = true;
                }
                // }
            }
            this.computeMoney();
        }
    }

    // <-----
    // -->是否使用余额
    useBalance(event) {
        if (this.b_money > 0) {
            if (this.use_balance) {
                this.computeMoney();
            } else {
                this.payable_money = this.all_money;
            }
            // this.use_balance = !this.use_balance;
        }
    }

    checkBalance(event) {
        if (this.b_money <= 0) {
            event.stopPropagation();
            event.preventDefault();
        }
    }

    // <-----
    checkReceipt() {
        this.httpService.myGet(this.accountSettingService.getUserInfo())
            .subscribe(data1 => {
                console.log(data1);
                this.fapiao_info = data1.data.fapiao_info;
                this.modal_name = 'invoice_setting_m';
                this.modal_info = this.fapiao_info;
                console.log(this.modal_info);
            });
    }


    // -->帐单详情
    openBillDetail(bill) {
        if (bill.is_mingxi == 1) {
            this.modal_name = 'bill_detail_m';
            this.modal_info = bill.id;
        }
    }

    // <-----

    // -->生成账单
    createBill(event) {
        event.stopPropagation();
        if (this.choose_bill_num > 0) {
            let id_submit = '';
            for (let i of this.bill_list) {
                if (i.selected) {
                    id_submit += `${i.id},`;
                }
            }
            id_submit = id_submit.substr(0, id_submit.length - 1);
            this.httpService.myPost(this.billManageApiService.getBillCreateUrl(), {
                bill_id: id_submit,
                use: Number(this.use_balance),
            }).subscribe(data => {
                if (data.data.length > 1) {
                    this.assistModalService.openAssistModal('toast', '下单成功', () => {
                        this.router.navigate(['/user/bill-manage/unpaid-list']);
                    });
                } else {
                    this.billManageService.setOrderId(data.data[0]);
                    if (this.payable_money > 0) {
                        this.assistModalService.openAssistModal('toast', '下单成功', () => {
                            this.router.navigate(['./user/bill-manage/pay']);
                        });
                    } else if (this.payable_money == 0) {
                        this.assistModalService.openAssistModal('toast', '支付成功', () => {
                            this.router.navigate(['./user/bill-manage/paid-list']);
                        });
                    }
                }
            });
        }
    }

    deleteBill(event, bill) {
        event.stopPropagation();
        this.assistModalService.openAssistModal('confirm', '确认删除？', () => {
            const tmp_url = this.billManageApiService.getDeleteBillUrl(bill.id);
            this.httpService.myDelete(tmp_url)
                .subscribe(data => {
                    console.log(this.assistModalService);
                    this.assistModalService.openAssistModal('toast', '删除成功');
                    // this.assist_name = 'toast';
                    // this.assist_info = '删除成功';
                    this.globalFuncService.resetSubmitData();
                    this.globalFuncService.emitInfoListSource();
                    // this.globalMaskControlService.emitBindStatus(false);
                });
        });

    }

    // <-----

    // -->导出excel账单
    getBillExcel() {
        let bill_string = '';
        const use = Number(this.use_balance);
        for (let bill of this.bill_list) {
            if (bill.selected == 1) {
                bill_string += `${bill.id},`;
            }
        }
        if (bill_string === '') {
            return false;
        }
        bill_string = bill_string.substr(0, bill_string.length - 1);
        const token = window.localStorage.getItem('mayihr_token');
        const tmp_submit = {
            bill_id: bill_string,
            use: use,
            token: token
        };
        window.open(`${this.billManageApiService.getBillExcelUrl()}?bill_id=${bill_string}&use=${use}&token=${window.localStorage.getItem('mayihr_token')}`);
    }

    // <-----
}
