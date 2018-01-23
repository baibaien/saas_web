import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../../shared/service/http-service/http.service";
import {PayScheduleApiService} from "../../../shared/service/api-service/pay-schedule-api/pay-schedule-api.service";
import {ActivatedRoute, RouterLinkActive} from "@angular/router";

@Component({
    selector: 'app-personnal-pay-schedule',
    templateUrl: './personnal-pay-schedule.component.html',
    styleUrls: ['./personnal-pay-schedule.component.css']
})
export class PersonnalPayScheduleComponent implements OnInit {
    public table_header = [
        {
            column_key: 'pay_month',
            column_name: '缴纳月份',
            column: 'pay_month',
            filter: 0,
            selected: false,
            adjust: 0
        }, {
            column_key: 'social_base_money',
            column_name: '社保缴纳基数',
            column: 'social_base_money',
            filter: 0,
            selected: false,
            adjust: 0
        }, {
            column_key: 'social_money',
            column_name: '社保缴纳金额',
            column: 'social_money',
            filter: 0,
            selected: false,
            adjust: 0
        }, {
            column_key: 'social_op',
            column_name: '办理状态(社保)',
            column: 'social_op',
            filter: 0,
            selected: false,
            adjust: 0
        }, {
            column_key: 'fund_base_money',
            column_name: '公积金缴纳基数',
            column: 'fund_base_money',
            filter: 0,
            selected: false,
            adjust: 0
        }, {
            column_key: 'fund_money',
            column_name: '公积金缴纳金额',
            column: 'fund_money',
            filter: 0,
            selected: false,
            adjust: 0
        }, {
            column_key: 'fund_op',
            column_name: '办理状态(公积金)',
            column: 'fund_op',
            filter: 0,
            selected: false,
            adjust: 0
        },
    ];


    public item_list;
    public yg_name;


    constructor(public httpService: HttpService,
                public payScheduleApiService: PayScheduleApiService,
                public activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        const yg_id = this.activatedRoute.snapshot.params['id'];
        console.log(yg_id);
        this.httpService.myGet(this.payScheduleApiService.getPayProgressDetail(), {search: {yg_id: yg_id}})
            .subscribe(data => {
                console.log(data);
                this.yg_name = data.data.data.yg_info.yg_name;
                document.title = `<${this.yg_name}>缴纳进度`;
                this.item_list = data.data.data.list;
            });
    }

}
