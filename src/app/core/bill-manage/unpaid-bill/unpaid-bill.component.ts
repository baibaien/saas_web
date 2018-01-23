import {Component, OnDestroy, OnInit} from '@angular/core';
import {BillManageApiService} from "../../../shared/service/api-service/bill-manage-api/bill-manage-api.service";
import {BillManageService} from "../../../shared/service/bill-manage/bill-manage.service";
import {GlobalFuncService} from "../../../shared/service/global-func/global-func.service";
import {HttpService} from "../../../shared/service/http-service/http.service";
import {Router} from "@angular/router";
import {ModalService} from "../../../shared/service/modal/modal.service";
import {MyDate} from "../../../class/MyDate";
import {AssistModalService} from "../../../shared/service/assist-modal-service/assist-modal.service";
import {AccountSettingsService} from "../../../shared/service/api-service/account-settings/account-settings.service";

@Component({
    selector: 'app-unpaid-bill',
    templateUrl: './unpaid-bill.component.html',
    styleUrls: ['./unpaid-bill.component.css']
})
export class UnpaidBillComponent implements OnInit, OnDestroy {

    public table_header = [
        {column_key: 'order_id', column_name: '订单编号', column: 'order_id', filter: 0, selected: false, adjust: -1},
        {column_key: 'add_time', column_name: '下单时间', column: 'add_time', filter: 0, selected: false, adjust: -1},
        {column_key: 'payable', column_name: '订单合计', column: 'payable', filter: 0, selected: false, adjust: 1},
        {
            column_key: 'offset_money',
            column_name: '余额抵扣',
            column: 'offset_money',
            filter: 0,
            selected: false,
            adjust: 1
        },
        {column_key: 'all_money', column_name: '应付合计', column: 'all_money', filter: 0, selected: false, adjust: 1},
        {
            column_key: 'is_invoice_text',
            column_name: '发票',
            column: 'is_invoice_text',
            filter: 0,
            selected: false,
            adjust: 0
        },
        {column_key: 'operate', column_name: '操作', column: 'operate', filter: 0, selected: false, adjust: 0}
    ];




    public list_info_emitter;
    public modal_name_emitter;
    // -->modal控制
    public modal_name;
    public modal_info;
    public modal_callback;
    // <-----

    public unpaid_url;
    public unpaid_list;
    public unpaid_list_detail;

    // -->页数统计
    public total;
    // <-----
    // -->
    // public assist_name;
    // public assist_info;
    // public assist_name_emitter;
    // <-----
    constructor(public billManageApiService: BillManageApiService,
                public billManageService: BillManageService,
                public globalFuncService: GlobalFuncService,
                public assistModalService: AssistModalService,
                public httpService: HttpService,
                public router: Router,
                public modalService: ModalService,
                public accountSettingService: AccountSettingsService) {
        document.title = '待支付订单';
        this.unpaid_url = this.billManageApiService.getUnpaidListUrl();

        this.list_info_emitter = this.globalFuncService.getInfoListEmit().subscribe(data => {
            data.subscribe(data1 => {
                this.billManageService.getCountEmitter().emit();
                console.log('未支付列表', data1);
                this.unpaid_list = JSON.parse(JSON.stringify(data1.data.data.list));
                for (const bill of this.unpaid_list) {
                    const date_tmp = new MyDate(Number(bill.add_time) * 1000);
                    bill.add_time = `${date_tmp.getDate({type: 'cn'})}`;
                    bill.is_invoice == 1 ? bill['is_invoice_text'] = '普通电子发票' : bill['is_invoice_text'] = '不开票';
                }
                this.total = data1.data.meta.total;
            });
        });

        this.modal_name_emitter = this.modalService.getModalNameEmit().subscribe(data => {
            this.modal_name = data;
        });
    }

    ngOnInit() {
        this.globalFuncService.resetSubmitData();
        this.globalFuncService.setInfoListSource('get', this.unpaid_url, {});
        this.globalFuncService.emitInfoListSource();
    }

    ngOnDestroy() {
        this.list_info_emitter.unsubscribe();
        this.modal_name_emitter.unsubscribe();
    }

    payBill(event, bill) {
        event.stopPropagation();
        this.billManageService.setOrderId(bill.order_id);
        this.router.navigate(['/user/bill-manage/pay']);
    }

    operateBill(event, bill) {
        if (bill.selected) {
            bill.selected = false;
        } else {
            for (const i in this.unpaid_list) {
                this.unpaid_list[i]['selected'] = false;
            }
            bill.selected = true;
        }
        event.stopPropagation();
    }

    // -->关闭操作栏
    closeOperate(event, bill) {
        bill.selected = false;
        event.stopPropagation();
    }

    // <-----

    downloadDetail(event, bill) {
        event.stopPropagation();
        window.open(`${this.billManageApiService.getBillDetailFile()}?order_id=${bill.order_id}&token=${window.localStorage.getItem('mayihr_token')}`);
    }

    openBillDetailStatus(event, bill) {
        event.stopPropagation();
        this.httpService.myGet(this.accountSettingService.getUserInfo())
            .subscribe(data1 => {
                console.log(data1);
                const tmp_invoice = Object.assign(bill.invoice_info, {
                    fp_type: bill.is_invoice,
                    fp_type_name: bill.is_invoice_text
                });
                const tmp_obj = {
                    order_id: bill.order_id,
                    data: JSON.parse(JSON.stringify(tmp_invoice)),
                    fapiao_type: JSON.parse(JSON.stringify(data1.data.fapiao_info.fapiao_type)),
                    fp_type: JSON.parse(JSON.stringify(data1.data.fapiao_info.fp_type)),
                    submit_type: 1
                };
                this.modal_name = 'invoice_setting_m';
                this.modal_info = tmp_obj;
                this.modal_callback = () => {
                    this.globalFuncService.resetSubmitData();
                    this.globalFuncService.setInfoListSource('get', this.unpaid_url, {});
                    this.globalFuncService.emitInfoListSource();
                };
                console.log(tmp_obj);
            });
        // this.httpService.
    }

    // -->发送账单明细
    sendDetail(event, bill) {
        this.closeOperate(event, bill);
        this.modal_name = 'order_send_m';
        this.modal_info = {
            order_id: bill.order_id,
            op_month: bill.op_month,
        };
        event.stopPropagation();
    }

    // <-----

    deleteOrder(event, bill) {
        event.stopPropagation();
        const use_url = `${this.billManageApiService.getDeleteOrderUrl()}/${bill.order_id}`;
        this.assistModalService.openAssistModal('confirm', '确认删除？', () => {
            this.httpService.myDelete(use_url)
                .subscribe(data => {
                    this.assistModalService.openAssistModal('toast', '删除成功');
                }, () => {

                }, () => {
                    this.closeOperate(event, bill);
                    this.globalFuncService.emitInfoListSource();
                });
        });
    }

    // <-----
    // -->展开订单详情
    openUnpaidBill(detail) {
        if (detail.detail_selected) {
            detail.detail_selected = false;
        } else {
            for (const i in this.unpaid_list) {
                this.unpaid_list[i]['detail_selected'] = false;
            }
            this.httpService.myGet(this.billManageApiService.getOrderDetail(detail.order_id))
                .subscribe(data => {
                    console.log(data);
                    this.unpaid_list_detail = this.compileData(JSON.parse(JSON.stringify(data.data.bill)));
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

    // // -->打开帐单详情
    // openBillDetail(event, bill) {
    //     event.stopPropagation();
    //     if (bill.is_mingxi == 1) {
    //         this.modal_name = 'bill_detail_m';
    //         this.modal_info = bill.id;
    //     }
    // }
    //
    // // <-----
}
