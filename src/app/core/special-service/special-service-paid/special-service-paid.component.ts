import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from "../../../shared/service/http-service/http.service";
import {GlobalFuncService} from "../../../shared/service/global-func/global-func.service";
import {SpecialServiceApiService} from "../../../shared/service/api-service/special-service-api/special-service-api.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-special-service-paid',
    templateUrl: './special-service-paid.component.html',
    styleUrls: ['./special-service-paid.component.css']
})
export class SpecialServicePaidComponent implements OnInit, OnDestroy {
    // -->
    public table_header = [
        {
            column_key: 'image',
            column_name: '',
            column: 'icon',
            filter: 0,
            selected: false,
            adjust: -1
        },
        {
            column_key: 'special_service_name',
            column_name: '服务名称',
            column: 'special_service_name',
            filter: 0,
            selected: false,
            adjust: -1
        },
        {
            column_key: 'service_city',
            column_name: '办理城市',
            column: 'service_city',
            filter: 0,
            selected: false,
            adjust: -1
        },
        {
            column_key: 'service_staff', column_name: '办理对象', column: 'service_staff', filter: 0, selected: false,
            adjust: -1
        },
        {
            column_key: 'service_charge', column_name: '服务费', column: 'service_charge', filter: 0, selected: false,
            adjust: 1
        },
        {
            column_key: 'service_create_time',
            column_name: '账单生成日期',
            column: 'service_create_time',
            filter: 0,
            selected: false,
            adjust: -1
        },
        {
            column_key: 'service_status', column_name: '状态', column: 'service_status', filter: 0, selected: false,
            adjust: 1
        }
    ];
    // <-----


    // -->流订阅/取消订阅
    public list_info_emitter;
    public current_url;
    public pre_url;
    // <-----

    // -->列表数据
    public service_list;
    // <-----
    public status_hook = {
        '0': '待支付',
        '1': '待审核',
        '2': '办理中',
        '3': '已办理',
    };

    public pagination;

    constructor(public httpService: HttpService,
                public globalFuncService: GlobalFuncService,
                public specialServiceApi: SpecialServiceApiService,
                public router: Router) {
        document.title = '已购买的专项服务';
        this.current_url = this.specialServiceApi.getMySpecial();
        this.list_info_emitter = this.globalFuncService.getInfoListEmit().subscribe(data => {
            data.subscribe(data1 => {
                console.log(data1);
                this.service_list = data1.data.data.list;
                this.pagination = data1.data.meta.pagination;
                this.service_list.map(value => {
                    value.op_status = this.status_hook[value.op_status];
                    const tmp_date = new Date(value.create_time * 1000);
                    value.create_time = `${tmp_date.getFullYear()}-${tmp_date.getMonth() + 1}-${tmp_date.getDate()}`;
                });
            }, () => {
            }, () => {
            });
        });
    }

    ngOnInit() {
        this.globalFuncService.resetSubmitData();
        this.globalFuncService.setInfoListSource('get', this.current_url, {});
        this.globalFuncService.emitInfoListSource();
    }

    ngOnDestroy() {
        this.list_info_emitter.unsubscribe();
    }

    toServiceDetail(service) {
        this.router.navigate([`/user/special-service/${service.id}/detail`]);
    }
}
