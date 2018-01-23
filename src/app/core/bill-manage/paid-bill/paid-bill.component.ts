import {Component, OnDestroy, OnInit} from '@angular/core';
import {BillManageApiService} from "../../../shared/service/api-service/bill-manage-api/bill-manage-api.service";
import {GlobalFuncService} from "../../../shared/service/global-func/global-func.service";
import {HttpService} from "../../../shared/service/http-service/http.service";
import {ModalService} from "../../../shared/service/modal/modal.service";
import {MyDate} from "../../../class/MyDate";
import {Router} from "@angular/router";
import {downloadFuncApi} from "../../../shared/function/downloadFunc";

@Component({
    selector: 'app-paid-bill',
    templateUrl: './paid-bill.component.html',
    styleUrls: ['./paid-bill.component.css']
})
export class PaidBillComponent implements OnInit, OnDestroy {

    public table_header = [
        {column_key: 'order_id', column_name: '订单编号', column: 'order_id', filter: 0, selected: false, adjust: -1},
        {column_key: 'pay_time', column_name: '订单支付日期', column: 'pay_time', filter: 0, selected: false, adjust: -1},
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
        {column_key: 'status_name', column_name: '状态', column: 'status_name', filter: 0, selected: false, adjust: 0},
        {column_key: 'operate', column_name: '操作', column: 'operate', filter: 0, selected: false, adjust: 0},
    ];

// -->流订阅/取消订阅
    public list_info_emitter;
    public modal_name_emitter;
    // <-----
    // -->
    // <-----
    // -->
    public paid_url;
    // <-----
    // -->
    public paid_list;
    // <-----
    // -->
    public page_info;
    // <-----

    // -->modal控制
    public modal_name;
    public modal_info;
    // <-----

    // -->详情
    public paid_list_detail;
    // <-----
    constructor(public billManageApiService: BillManageApiService,
                public globalFuncService: GlobalFuncService,
                public httpService: HttpService,
                public router: Router,
                public modalService: ModalService) {
        document.title = '已支付订单';
        this.paid_url = this.billManageApiService.getPaidListUrl();
        this.list_info_emitter = this.globalFuncService.getInfoListEmit().subscribe(data => {
            data.subscribe(data1 => {
                console.log('已支付列表', data1);
                this.paid_list = JSON.parse(JSON.stringify(data1.data.data.list));
                for (const bill of this.paid_list) {
                    if (bill.pay_time != 0) {
                        const date_tmp = new MyDate(Number(bill.pay_time) * 1000);
                        bill.pay_time = `${date_tmp.getDate({type: 'cn'})}`;
                    } else {
                        bill.pay_time = '-';
                    }
                }
                this.page_info = data1.data.meta.pagination;
            });
        });
        this.modal_name_emitter = this.modalService.getModalNameEmit().subscribe(data => {
            this.modal_name = data;
        });
    }

    ngOnInit() {
        this.globalFuncService.resetSubmitData();
        this.globalFuncService.setInfoListSource('get', this.paid_url, {});
        this.globalFuncService.emitInfoListSource();
    }

    ngOnDestroy() {
        this.list_info_emitter.unsubscribe();
        this.modal_name_emitter.unsubscribe();
    }

    operateBill(e, bill) {
        if (bill.selected) {
            bill.selected = false;
        } else {
            for (const i in this.paid_list) {
                this.paid_list[i]['selected'] = false;
            }
            bill.selected = true;
        }
        e.stopPropagation();
    }

    clickCloseOperate(e, bill) {
        this.closeOperate(bill);
        e.stopPropagation();
    }

    // -->关闭操作栏
    closeOperate(bill) {
        bill.selected = false;
    }

    // <-----

    // -->展开详情
    openOrderDetail(detail) {
        console.log(detail);
        if (detail.detail_selected) {
            detail.detail_selected = false;
        } else {
            for (const i in this.paid_list) {
                this.paid_list[i]['detail_selected'] = false;
            }
            this.httpService.myGet(this.billManageApiService.getOrderDetail(detail.order_id))
                .subscribe(data => {
                    console.log(data);
                    this.paid_list_detail = this.compileData(JSON.parse(JSON.stringify(data.data.bill)));
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
            // list[i]['bill_name'] = `${date_tmp.getDate({range: 'month', type: 'cn'})}${list[i]['type_name']}`;
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

    // <-----

    downloadBillDetail(e, bill) {
        e.stopPropagation();
        window.open(`${this.billManageApiService.getBillDetailFile()}?order_id=${bill.order_id}&token=${window.localStorage.getItem('mayihr_token')}`);
    }


    sendBillDetail(event, bill) {
        console.log(bill);
        this.closeOperate(bill);
        this.modal_name = 'order_send_m';
        this.modal_info = {
            order_id: bill.order_id,
            op_month: bill.op_month,
        };
        event.stopPropagation();
    }


    // -->打开办理状态详情
    openOrderDetailStatus(event, bill) {
        event.stopPropagation();
        if (bill.is_href == 1) {
            this.router.navigate([`/user/bill-manage/paid-list/${bill.order_id}/deal-status`]);
        }
    }

    // <-----

    // -->
    checkPayLog(bill) {
        // this.httpService.myGet(`${this.billManageApiService.getReceiptVoucher()}/${bill.order_id}`, {})
        //     .subscribe(data => {
        //         console.log(data);
        //         // for (let i in data.data) {
        //         //     window.open(data[i].real_path);
        //         //
        //         // }
        //     });
        // downloadFuncApi(`${this.billManageApiService.getReceiptVoucher()}/${bill.order_id}/?token=${window.localStorage.getItem('mayihr_token')}`)
        window.open(`${this.billManageApiService.getReceiptVoucher()}/${bill.order_id}/?token=${window.localStorage.getItem('mayihr_token')}`);
    }

    // <-----
    // -->
    checkReceiveLog(bill) {
        if (bill.is_balance == 0) {
            this.httpService.myGet(`${this.billManageApiService.getPaymentVoucher()}/${bill.order_id}`, {})
                .subscribe(data => {
                    console.log(data);
                    for (let i of data.data) {
                        window.open(i.real_path);
                    }
                });
        }
    }

    // <-----
}
