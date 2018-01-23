import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from "../../../shared/service/modal/modal.service";
import {HttpService} from "../../../shared/service/http-service/http.service";
import {BillManageApiService} from "../../../shared/service/api-service/bill-manage-api/bill-manage-api.service";
import {DateService} from "../../../shared/service/date/date.service";

@Component({
    selector: 'app-bill-detail-m',
    templateUrl: './bill-detail-m.component.html',
    styleUrls: ['./bill-detail-m.component.css']
})
export class BillDetailMComponent implements OnInit {
    @Input()
    modal_name;
    @Input()
    modal_info;


    public bill_detail = {
        all_money: '',
        bill_list: [],
        title: '',
        bill: {}
    };


    public static_table_header = {
        1: [
            {column_key: 'yg_name', column_name: '姓名', column: 'yg_name', filter: 0, selected: false, adjust: false},
            {
                column_key: 'social_month',
                column_name: '社保月份',
                column: 'social_month',
                filter: 0,
                selected: false,
                adjust: false
            },
            {
                column_key: 'social_money',
                column_name: '社保金额',
                column: 'social_money',
                filter: 0,
                selected: false,
                adjust: true
            },
            {
                column_key: 'fund_month',
                column_name: '公积金月份',
                column: 'fund_month',
                filter: 0,
                selected: false,
                adjust: false
            },
            {
                column_key: 'fund_money ',
                column_name: '公积金金额',
                column: 'fund_money',
                filter: 0,
                selected: false,
                adjust: true
            }
        ],
        2: [
            {column_key: 'yg_name', column_name: '姓名', column: 'yg_name', filter: 0, selected: false, adjust: false},
            {
                column_key: 'pay_month',
                column_name: '社保月份',
                column: 'pay_month',
                filter: 0,
                selected: false,
                adjust: false
            },
            {
                column_key: 'social_money',
                column_name: '社保金额',
                column: 'social_money',
                filter: 0,
                selected: false,
                adjust: true
            },
            {
                column_key: 'pay_month',
                column_name: '公积金月份',
                column: 'pay_month',
                filter: 0,
                selected: false,
                adjust: false
            },
            {
                column_key: 'fund_money ',
                column_name: '公积金金额',
                column: 'fund_money',
                filter: 0,
                selected: false,
                adjust: true
            }
        ],
        3: [
            {
                column_key: 'yg_name',
                column_name: '姓名',
                column: 'yg_name',
                filter: 0,
                selected: false,
                adjust: false
            },
            {
                column_key: 'pay_month',
                column_name: '发放月份',
                column: 'pay_month',
                filter: 0,
                selected: false,
                adjust: false
            },
            {
                column_key: 'salary',
                column_name: '金额',
                column: 'salary',
                filter: 0,
                selected: false,
                adjust: true
            }
        ],
        42: [
            {
                column_key: 'service_name',
                column_name: '服务名称',
                column: 'service_name',
                filter: 0,
                selected: false,
                adjust: false
            },
            {column_key: 'yg_name', column_name: '姓名', column: 'yg_name', filter: 0, selected: false, adjust: false},
            {
                column_key: 'money',
                column_name: '金额',
                column: 'money',
                filter: 0,
                selected: false,
                adjust: true
            }
        ],
        4: [
            {column_key: 'yg_name', column_name: '姓名', column: 'yg_name', filter: 0, selected: false, adjust: false},
            {
                column_key: 'pay_month',
                column_name: '参保月份',
                column: 'pay_month',
                filter: 0,
                selected: false,
                adjust: false
            },
            {
                column_key: 'team_money',
                column_name: '团队意外伤害保险',
                column: 'team_money',
                filter: 0,
                selected: false,
                adjust: true
            },
            {
                column_key: 'sup_money',
                column_name: '补充医疗保险',
                column: 'sup_money',
                filter: 0,
                selected: false,
                adjust: true
            },
            {column_key: 'money', column_name: '金额', column: 'money', filter: 0, selected: false, adjust: true}
        ]
    };

    constructor(public modalService: ModalService,
                public dateService: DateService,
                public httpService: HttpService,
                public billManageApiService: BillManageApiService) {
    }


    ngOnInit() {
        console.log(this.modal_info);
        this.httpService.myGet(this.billManageApiService.getBillDetail(this.modal_info))
            .subscribe(data => {
                console.log(data);
                this.bill_detail = JSON.parse(JSON.stringify(data.data));

                // -->工资 || 社保公积金
                if (this.bill_detail.bill['type'] == 1) {
                    for (const staff of this.bill_detail.bill_list) {
                        console.log(this.dateService.formatTimeStamp(staff['pay_month'], 'month', 'cn'));
                        staff['social_month'] = ['0', '-'].indexOf(staff['social_month'].toString()) != -1 ? '-' :
                            this.dateService.formatTimeStamp(staff['social_month'], 'month', 'cn');
                        staff['fund_month'] = ['0', '-'].indexOf(staff['fund_month'].toString()) != -1 ? '-' :
                            this.dateService.formatTimeStamp(staff['fund_month'], 'month', 'cn');
                    }
                    console.log(this.bill_detail);
                }
                if (this.bill_detail.bill['type'] == 2) {
                    for (const staff of this.bill_detail.bill_list) {
                        console.log(this.dateService.formatTimeStamp(staff['pay_month'], 'month', 'cn'));
                        staff['pay_month'] = this.dateService.formatTimeStamp(staff['pay_month'], 'month', 'cn');
                    }
                    console.log(this.bill_detail);
                }
                if (this.bill_detail.bill['type'] == 3) {
                    for (const staff of this.bill_detail.bill_list) {
                        console.log(this.dateService.formatTimeStamp(staff['pay_month'], 'month', 'cn'));
                        staff['pay_month'] = this.dateService.formatTimeStamp(staff['pay_month'], 'month', 'cn');
                    }
                    console.log(this.bill_detail);
                }
                // -->商保数据处理
                if (this.bill_detail.bill['type'] == 4) {
                    for (const staff of this.bill_detail.bill_list) {
                        staff['pay_month'] = this.dateService.formatTimeStamp(staff['pay_month'], 'month', 'cn');
                    }
                }
                // -->专项服务
                if (this.bill_detail.bill['type'] == 42) {
                    for (const staff of this.bill_detail.bill_list) {
                        if (staff.yg_name === '') {
                            staff.yg_name = '公司';
                        }
                    }
                }
            });
    }

    deleteRecord() {
        this.modalService.setModalName('');
        this.modalService.emitModalName();
    }

    cancelModal() {
        console.log(123123123123);
        this.modalService.setModalName('');
        this.modalService.emitModalName();
    }

    submitModal() {
        this.modalService.setModalName('');
        this.modalService.emitModalName();
    }
}
