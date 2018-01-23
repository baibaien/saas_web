import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {PayScheduleApiService} from "../../../shared/service/api-service/pay-schedule-api/pay-schedule-api.service";
import {HttpService} from "../../../shared/service/http-service/http.service";
import {GlobalFuncService} from "../../../shared/service/global-func/global-func.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-pay-schedule',
    templateUrl: './pay-schedule.component.html',
    styleUrls: ['./pay-schedule.component.css']
})
export class PayScheduleComponent implements OnInit, OnDestroy {


    public table_header = [
        {
            column_key: 'yg_name',
            column_name: '员工姓名',
            column: 'yg_name',
            filter: 0,
            selected: false,
            adjust: 0
        },
        {
            column_key: 'yg_phone',
            column_name: '手机号',
            column: 'yg_phone',
            filter: 0,
            selected: false,
            adjust: 0
        }, {
            column_key: 'yg_identity',
            column_name: '证件号',
            column: 'yg_identity',
            filter: 0,
            selected: false,
            adjust: 0
        }, {
            column_key: 'yg_city',
            column_name: '城市',
            column: 'yg_city',
            filter: 0,
            selected: false,
            adjust: 0
        }, {
            column_key: 'yg_hk_type',
            column_name: '户口类型',
            column: 'yg_hk_type',
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
            column_key: 'social_time',
            column_name: '办理时间(社保)',
            column: 'social_time',
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
        }, {
            column_key: 'fund_time',
            column_name: '办理时间(公积金)',
            column: 'fund_time',
            filter: 0,
            selected: false,
            adjust: 0
        }
    ];
    public tag_choosed = 1;


    public staff_list;
    public pagination;
    public global_url;


    public data_emitter;
    constructor(public payScheduleApiService: PayScheduleApiService,
                public globalFuncService: GlobalFuncService,
                public router: Router,
                public httpService: HttpService) {
        document.title = '缴纳进度';
        this.global_url = this.payScheduleApiService.getPayProgress();
        this.data_emitter = this.globalFuncService.getInfoListEmit()
            .subscribe((data) => {
                data.subscribe((data1) => {
                    console.log(data1);
                    this.staff_list = data1.data.data.list;
                    this.pagination = data1.data.meta.pagination;
                });
            });
    }

    ngOnInit() {
        this.globalFuncService.resetSubmitData();
        this.globalFuncService.setInfoListSource('get', this.payScheduleApiService.getPayProgress(), {search: {status: 1}});
        this.globalFuncService.emitInfoListSource();
    }

    ngOnDestroy() {
        // console.log(123123);
        this.data_emitter.unsubscribe();
    }
    chooseTag(tag) {
        this.tag_choosed = tag;
        this.globalFuncService.resetSubmitData();
        this.globalFuncService.setInfoListSource('get', this.payScheduleApiService.getPayProgress(), {search: {status: tag}});
        this.globalFuncService.emitInfoListSource();
    }
    test(staff) {
        console.log(staff);
        this.router.navigate([`/user/pay-schedule/${staff.yg_id}`]);
    }
}
