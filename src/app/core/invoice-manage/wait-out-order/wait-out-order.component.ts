import {Component, OnDestroy, OnInit} from '@angular/core';
import {InvoiceApiService} from "../../../shared/service/api-service/invoice-api/invoice-api.service";
import {HttpService} from "../../../shared/service/http-service/http.service";
import {GlobalFuncService} from "../../../shared/service/global-func/global-func.service";
import {BillManageApiService} from "../../../shared/service/api-service/bill-manage-api/bill-manage-api.service";
import {MyDate} from "../../../class/MyDate";
import {ModalService} from "../../../shared/service/modal/modal.service";

@Component({
    selector: 'app-wait-out-order',
    templateUrl: './wait-out-order.component.html',
    styleUrls: ['./wait-out-order.component.css']
})
export class WaitOutOrderComponent implements OnInit, OnDestroy {
    public table_header = [
        {column_key: 'order_id', column_name: '订单编号', column: 'order_id', filter: 0, selected: false, adjust: -1},
        {column_key: 'audit_time', column_name: '支付日期', column: 'audit_time', filter: 0, selected: false, adjust: -1},
        {column_key: 'all_money', column_name: '订单金额', column: 'all_money', filter: 0, selected: false, adjust: 1},
        {
            column_key: 'invoice_money',
            column_name: '开票金额',
            column: 'invoice_money',
            filter: 0,
            selected: false,
            adjust: 1
        },
    ];

    public wait_list;
    public wait_list_detail;

    public list_emitter;
    // -->订单数
    public total;
    // <-----

    public modal_name;
    public modal_info;
    public modal_name_emitter;

    constructor(public invoiceApiService: InvoiceApiService,
                public modalService: ModalService,
                public httpService: HttpService,
                public globalFuncService: GlobalFuncService,
                public billManageApiService: BillManageApiService) {
        document.title = '待出票中订单';
        this.list_emitter = this.globalFuncService.getInfoListEmit()
            .subscribe(data => {
                data.subscribe(data1 => {
                    console.log('出票中订单：', data1);
                    this.wait_list = JSON.parse(JSON.stringify(data1.data.data.list));
                    this.total = data1.data.meta.total;
                });
            });

        this.modal_name_emitter = this.modalService.getModalNameEmit()
            .subscribe(data => {
                this.modal_name = data;
            });
    }

    ngOnInit() {
        this.globalFuncService.resetSubmitData();
        this.globalFuncService.setInfoListSource('get', this.invoiceApiService.getWaitInvoiced(), {});
        this.globalFuncService.emitInfoListSource();
    }

    ngOnDestroy() {
        this.list_emitter.unsubscribe();
    }

    openOrderDetail(detail) {
        console.log(detail);
        if (detail.detail_selected) {
            detail.detail_selected = false;
        } else {
            for (const i in this.wait_list) {
                this.wait_list[i]['detail_selected'] = false;
            }
            this.httpService.myGet(this.billManageApiService.getOrderDetail(detail.order_id))
                .subscribe(data => {
                    console.log(data);
                    this.wait_list_detail = this.compileData(JSON.parse(JSON.stringify(data.data.bill)));
                    detail.detail_selected = true;
                });
        }
    }


    /**
     * invoice_detail(invoice)
     * 函数描述
     * 打开订单详情
     * @params:
     * @return:
     */
    openInvoiceDetail(event, invoice) {
        console.log(invoice);
        this.modal_name = 'invoice_show_m';
        this.modal_info = invoice;
        event.stopPropagation();
    }

    compileData(list) {
        for (const i in list) {
            list[i]['bill_name'] = '';
            // 订单名字符串编译
            let date_tmp;
            date_tmp = new MyDate(Number(list[i].pay_month * 1000));
            // list[i]['bill_name'] = `${date_tmp.getDate({range: 'month', type: 'cn'})}${list[i]['type_name']}`;
            // if (list[i]['type'] === 2) {
            //     list[i]['bill_name'] += '(补缴)';
            // }
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

    // -->打开帐单详情
    openInvoiceBillDetail(event, bill) {
        event.stopPropagation();
        if (bill.is_mingxi == 1) {
            this.modal_name = 'bill_detail_m';
            this.modal_info = bill.id;
        }
    }

}
