import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../shared/service/http-service/http.service";
import {ActivatedRoute} from "@angular/router";
import {BillManageApiService} from "../../shared/service/api-service/bill-manage-api/bill-manage-api.service";

@Component({
    selector: 'app-bill-deal-status',
    templateUrl: './bill-deal-status.component.html',
    styleUrls: ['./bill-deal-status.component.css']
})
export class BillDealStatusComponent implements OnInit {

    // -->订单id
    public order_id;
    public staff_list;
    // <-----
    // -->
    public city_list;
    // <-----
    public table_header = [
        {column_key: 'yg_name', column_name: '员工姓名', column: 'yg_name', filter: 0, selected: false, adjust: -1},
        {column_key: 'yg_phone', column_name: '手机号', column: 'yg_phone', filter: 0, selected: false, adjust: -1},
        {column_key: 'yg_hk_type', column_name: '户口类型', column: 'yg_hk_type', filter: 0, selected: false, adjust: -1},
        {column_key: 'guize_name', column_name: '业务类型', column: 'guize_name', filter: 0, selected: false, adjust: -1},
        {column_key: 'role_name', column_name: '社保类型', column: 'role_name', filter: 0, selected: false, adjust: -1},
        {column_key: 'pay_month', column_name: '缴纳月份', column: 'pay_month', filter: 0, selected: false, adjust: -1},
        {column_key: 'op_name', column_name: '办理状态', column: 'op_name', filter: 0, selected: false, adjust: -1},
        {column_key: 'updated_at', column_name: '更新时间', column: 'updated_at', filter: 0, selected: false, adjust: -1}
    ];

    constructor(public httpService: HttpService,
                public billManageApiService: BillManageApiService,
                public activatedRoute: ActivatedRoute) {
        this.order_id = this.activatedRoute.snapshot.params['id'];
        document.title = '办理状态';
    }

    ngOnInit() {
        this.httpService.myGet(this.billManageApiService.getBillDealStatus(), {search: {order_id: this.order_id}})
            .subscribe(data => {
                console.log(data);
                this.city_list = data.data.meta.city_list;
                this.staff_list = data.data.data.list;
            });
    }

    chooseCity(value) {
        console.log(value);
        this.httpService.myGet(this.billManageApiService.getBillDealStatus(), {
            search: {
                order_id: this.order_id,
                city_id: value.id
            }
        }).subscribe(data => {
            console.log(data);
            this.city_list = data.data.meta.city_list;
            this.staff_list = data.data.data.list;
            this.city_list = this.city_list.map(val => {
                if (val.id === value.id) {
                    val.selected = 1;
                } else {
                    val.selected = 0;
                }
                return val;
            });
        });
    }
}
