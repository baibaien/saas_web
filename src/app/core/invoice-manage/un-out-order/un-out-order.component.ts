import {Component, OnDestroy, OnInit} from '@angular/core';
import {InvoiceApiService} from "../../../shared/service/api-service/invoice-api/invoice-api.service";
import {HttpService} from "../../../shared/service/http-service/http.service";
import {ModalService} from "../../../shared/service/modal/modal.service";
import {AccountSettingsService} from "../../../shared/service/api-service/account-settings/account-settings.service";
import {MyDate} from "../../../class/MyDate";
import {BillManageApiService} from "../../../shared/service/api-service/bill-manage-api/bill-manage-api.service";
import {AssistModalService} from "../../../shared/service/assist-modal-service/assist-modal.service";
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";

@Component({
    selector: 'app-un-out-order',
    templateUrl: './un-out-order.component.html',
    styleUrls: ['./un-out-order.component.css']
})
export class UnOutOrderComponent implements OnInit, OnDestroy {
    public all_selected;
    public choose_bill_num = 0;
    public all_money;


    public bill_list;
    public bill_list_detail;
    public invoice_info;


    public modal_name;
    public modal_name_emitter;
    public modal_info;
    public modal_callback;


    public is_invoice;


    public is_hide = new FormControl('1');
    public is_hide_watcher;


    public table_header = [
        {column_key: 'order_id', column_name: '订单编号', column: 'order_id', filter: 0, selected: false, adjust: -1},
        {column_key: 'audit_time', column_name: '支付日期', column: 'audit_time', filter: 0, selected: false, adjust: -1},
        {column_key: 'all_money', column_name: '订单金额', column: 'all_money', filter: 0, selected: false, adjust: 1},
        {
            column_key: 'invoice_money',
            column_name: '实开金额',
            column: 'invoice_money',
            filter: 0,
            selected: false,
            adjust: 1
        }
    ];
    // -->开票类型'
    // <-----
    // -->
    public page_footer;
    // <-----
    constructor(public invoiceApiService: InvoiceApiService,
                public assistModalService: AssistModalService,
                public modalService: ModalService,
                public router: Router,
                public accountSettingService: AccountSettingsService,
                public billManageApiService: BillManageApiService,
                public httpService: HttpService) {
        document.title = '未开票订单';
        this.modal_name_emitter = this.modalService.getModalNameEmit()
            .subscribe(data => {
                this.modal_name = data;
            });
        this.is_hide_watcher = this.is_hide.valueChanges.subscribe(data => {
            console.log(data);
            this.requestList(Number(data));
        });
    }

    ngOnInit() {
        this.all_selected = false;
        this.requestList(1);

    }

    ngOnDestroy() {
        this.modal_name_emitter.unsubscribe();
    }

    requestList(is_hide) {
        this.httpService.myGet(this.invoiceApiService.getUninvoiced(), {search: {is_hide: is_hide}})
            .subscribe(data => {
                this.bill_list = data.data.data.list;
                console.log(this.bill_list);
                this.chooseBill('all');
                this.page_footer = data.data.meta.total;
                this.invoice_info = data.data.data.invoice;
                this.is_invoice = data.data.meta.is_invoice;
            });
    }

    clickChooseBill(event, type) {
        event.stopPropagation();
        this.chooseBill(type);
    }

    chooseBill(type) {
        if (this.bill_list && this.bill_list.length > 0) {
            if (type === 'all') {
                if (this.all_selected) {
                    this.bill_list.filter(_ => {
                        if (_.bill_status != 2) {
                            if (_.selected) {
                                _.selected = 0;
                                this.choose_bill_num--;
                            }
                        }
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
                if (this.bill_list[type]['bill_status'] != 2) {
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
                }
            }
            this.computeMoney();
        }
    }

    // -->应付合计
    computeMoney() {
        this.all_money = 0;
        for (let i in this.bill_list) {
            if (this.bill_list[i]['selected'] == 1) {
                this.all_money += Number(this.bill_list[i].invoice_money);
            }
        }
    }

    // -->申请开票
    applyInvoice() {
        if (this.choose_bill_num > 1) {
            let tmp_str = '';
            for (let i of this.bill_list) {
                if (i.selected) {
                    tmp_str += `${i.order_id},`;
                }
            }
            tmp_str = tmp_str.slice(0, tmp_str.length - 1);
            this.modal_name = 'invoice_merge_m';
            this.modal_info = tmp_str;
        } else {
            let tmp_str = '';
            for (let i of this.bill_list) {
                if (i.selected) {
                    tmp_str = i.order_id;
                }
            }
            this.httpService.myPost(this.invoiceApiService.getApplyInvoice(), {order_id: tmp_str})
                .subscribe(data => {
                    this.assistModalService.openAssistModal('toast', '申请开票成功', () => {
                        this.router.navigate(['/user/invoice-manage/wait-out']);
                    });
                });
        }


    }

    openInvoiceModal() {
        this.httpService.myGet(this.accountSettingService.getUserInfo())
            .subscribe(data1 => {
                this.modal_name = 'invoice_setting_m';
                this.modal_info = data1.data.fapiao_info;
                this.modal_callback = () => {
                    this.ngOnInit();
                };
            });

    }

    openOrderDetail(detail) {
        console.log(detail);
        if (detail.detail_selected) {
            detail.detail_selected = false;
        } else {
            for (const i in this.bill_list) {
                this.bill_list[i]['detail_selected'] = false;
            }
            this.httpService.myGet(this.billManageApiService.getOrderDetail(detail.order_id))
                .subscribe(data => {
                    console.log(data);
                    this.bill_list_detail = this.compileData(JSON.parse(JSON.stringify(data.data.bill)));
                    detail.detail_selected = true;
                });
        }
    }

    compileData(list) {
        for (const i in list) {
            list[i]['bill_name'] = '';
            // 订单名字符串编译
            let date_tmp;
            date_tmp = new MyDate(Number(list[i].pay_month * 1000));
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

    openInvoiceBillDetail(event, bill) {
        event.stopPropagation();
        if (bill.is_mingxi == 1) {
            this.modal_name = 'bill_detail_m';
            this.modal_info = bill.id;
        }
    }

    // <-----
}
