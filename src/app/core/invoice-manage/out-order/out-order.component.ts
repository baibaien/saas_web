import {Component, OnDestroy, OnInit} from '@angular/core';
import {InvoiceApiService} from '../../../shared/service/api-service/invoice-api/invoice-api.service';
import {GlobalFuncService} from '../../../shared/service/global-func/global-func.service';
import {MyDate} from "../../../class/MyDate";
import {ModalService} from "../../../shared/service/modal/modal.service";
import {HttpService} from "../../../shared/service/http-service/http.service";
import {BillManageApiService} from "../../../shared/service/api-service/bill-manage-api/bill-manage-api.service";

@Component({
    selector: 'app-out-order',
    templateUrl: './out-order.component.html',
    styleUrls: ['./out-order.component.css']
})
export class OutOrderComponent implements OnInit, OnDestroy {
    public table_header = [
        {column_key: 'order_id', column_name: '订单编号', column: 'order_id', filter: 0, selected: false, adjust: -1},
        {column_key: 'pay_time', column_name: '支付日期', column: 'pay_time', filter: 0, selected: false, adjust: -1},
        {column_key: 'all_money', column_name: '支付金额', column: 'all_money', filter: 0, selected: false, adjust: 1},
        {
            column_key: 'invoice_money',
            column_name: '实开金额',
            column: 'invoice_money',
            filter: 0,
            selected: false,
            adjust: 1
        },
        {
            column_key: 'invoice_info',
            column_name: '开票信息',
            column: 'invoice_info',
            filter: 0,
            selected: false,
            adjust: 0
        },
        {column_key: 'download', column_name: '下载发票', column: 'download', filter: 0, selected: false, adjust: 0}
    ];
    public pagination;

    public list_emitter;

    public order_list;
    public order_list_detail;

    public modal_name;
    public modal_info;
    public modal_emitter;

    public url_local;

    constructor(public invoiceApiService: InvoiceApiService,
                public modalService: ModalService,
                public httpService: HttpService,
                public billManageApiService: BillManageApiService,
                public globalFuncService: GlobalFuncService) {
        document.title = '已开票订单';
        this.url_local = this.invoiceApiService.getInvoiced();
        this.list_emitter = this.globalFuncService.getInfoListEmit()
            .subscribe(data => {
                data.subscribe(data1 => {
                    console.log(data1);
                    this.order_list = data1.data.data.list;
                    this.pagination = data1.data.meta.pagination;
                });
            });
        this.modal_emitter = this.modalService.getModalNameEmit()
            .subscribe(data => {
                this.modal_name = data;
            });
    }

    ngOnInit() {
        this.globalFuncService.resetSubmitData();
        this.globalFuncService.setInfoListSource('get', this.invoiceApiService.getInvoiced(), {});
        this.globalFuncService.emitInfoListSource();
    }

    ngOnDestroy() {
        this.list_emitter.unsubscribe();
        this.modal_emitter.unsubscribe();
    }

    // -->展开详情
    openOrderDetail(detail) {
        console.log(detail);
        if (detail.detail_selected) {
            detail.detail_selected = false;
        } else {
            for (const i in this.order_list) {
                this.order_list[i]['detail_selected'] = false;
            }
            this.httpService.myGet(this.billManageApiService.getOrderDetail(detail.order_id))
                .subscribe(data => {
                    console.log(data);
                    this.order_list_detail = this.compileData(JSON.parse(JSON.stringify(data.data.bill)));
                    detail.detail_selected = true;
                });
            // this.order_list_detail = this.compileData(JSON.parse(JSON.stringify(detail.bill)));
            // detail.detail_selected = true;
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


    /**
     * openInvoiceDetail(invoice)
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

    downloadInvoice(event, invoice) {
        event.stopPropagation();
        invoice.down_url.map((val) => {
            window.open(val);
        });
    }

    openBillDetail(event, bill) {
        event.stopPropagation();
        if (bill.is_mingxi == 1) {
            this.modal_name = 'bill_detail_m';
            this.modal_info = bill.id;
        }
    }
}
