import {Component, OnDestroy, OnInit} from '@angular/core';
import {SalaryCalcService} from "../../../shared/service/salary-calc/salary-calc/salary-calc.service";
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalFuncService} from "../../../shared/service/global-func/global-func.service";
import {SocialAssuranceApiService} from "../../../shared/service/api-service/salary-api/social-assurance-api/social-assurance-api.service";
import {UsersService} from "../../../shared/service/api-service/users/users.service";
import {SocialAssuranceService} from "../../../shared/service/salary-calc/social-assurance/social-assurance.service";

@Component({
    selector: 'app-social-assurance-history-detail',
    templateUrl: './social-assurance-history-detail.component.html',
    styleUrls: ['./social-assurance-history-detail.component.css']
})
export class SocialAssuranceHistoryDetailComponent implements OnInit, OnDestroy {

    // --> 设置本地list,结果变量
    public assurance_calc_result;
    public staff_assurance_list;
    public table_header = [
        {
            column_name: '姓名',
            column: 'yg_name',
            column_key: 'yg_name'
        },
        {
            column_name: '社保基数',
            column: 'social_base',
            column_key: 'social_base'
        },
        {
            column_name: '社保个人',
            column: 'social_yg',
            column_key: 'social_yg'
        },
        {
            column_name: '社保公司',
            column: 'social_gs',
            column_key: 'social_gs'
        },
        {
            column_name: '公积金基数',
            column: 'fund_base',
            column_key: 'fund_base'
        },
        {
            column_name: '公积金个人',
            column: 'fund_yg',
            column_key: 'fund_yg'
        },
        {
            column_name: '公积金公司',
            column: 'fund_gs',
            column_key: 'fund_gs'
        },
    ];
    public page_info;
    public detail_show = -1;
    public previous_show;
    public month;
    public year;
    // <-----

    // -->提交数据
    public submit_data = {};
    // <-----
    // -->路由snapshot
    public url_month;
    // <-----

    // -->流变量
    public social_history_emit;
    public list_info_url;
    public list_info_emit;
    // <-----
    public city_list = [];
    public current_city;
    public current_date;

    // -->详情
    public detail_info;
    // <-----
    constructor(public socialAssuranceService: SocialAssuranceService,
                public activatedRoute: ActivatedRoute,
                public globalFuncService: GlobalFuncService,
                public socialAssuranceApiService: SocialAssuranceApiService,
                public usersService: UsersService) {
        this.url_month = this.activatedRoute.snapshot.params['month'];
        this.list_info_url = `${this.socialAssuranceApiService.getSocialHistoryDetail()}/${this.url_month}`;
        this.list_info_emit = this.globalFuncService.getInfoListEmit().subscribe(data => {
            data.subscribe(data1 => {
                console.log(data1);
                // -->关闭展开内容
                this.previous_show = null;
                this.detail_show = -1;
                // <-----
                this.staff_assurance_list = data1.data.data;
                this.page_info = data1.data.meta.pagination;
                this.assurance_calc_result = data1.data.meta;
                this.city_list = data1.data.meta.city;
                if (this.city_list.length > 0) {
                    for (const city of this.city_list) {
                        city['selected'] = 0;
                        if (city['id'] == data1.data.meta.current) {
                            city['selected'] = 1;
                        }
                    }
                }
                // 月份
                this.current_date = new Date();
                this.current_date.setTime(this.assurance_calc_result.current_month * 1000);
                this.year = this.current_date.getFullYear();
                this.month = this.current_date.getMonth() + 1;
                // if (Number(month) < 10) {
                //     this.current_date = `${year}-0${month}`;
                // } else {
                //     this.current_date = `${year}-${month}`;
                // }
                // 城市
                this.current_city = data1.data.meta.current;
                document.title = `${this.year}年${this.month}月五险一金缴费明细`;
            });
        });
        this.social_history_emit = this.socialAssuranceService.getSocialAssuranceDetailEmit()
            .subscribe((data) => {
                console.log(data);
                data.subscribe((data1) => {
                    console.log(data1);
                    this.detail_info = this.changeSocialDetail(JSON.parse(JSON.stringify(data1)));
                    this.detail_info['is_show_per'] = data1.data.is_show_per;

                });
            });
    }

    ngOnInit() {
        this.globalFuncService.resetSubmitData();
        this.globalFuncService.setInfoListSource('post', this.list_info_url, this.submit_data);
        this.globalFuncService.emitInfoListSource();
    }

    ngOnDestroy() {
        this.list_info_emit.unsubscribe();
    }

    // -->list功能模块
    // 展开详情
    showDetailSalary(i, staff) {
        console.log(i, staff);
        if (i === this.previous_show) {
            this.detail_show = -1;
            this.previous_show = -1;
        } else {
            this.detail_show = i;
            this.previous_show = i;
            this.socialAssuranceService.setSocialAssuranceDetailSource({
                social_id: staff.social_id,
                fund_id: staff.fund_id
            });
            this.socialAssuranceService.emitSocialAssuranceDetail();
        }
    }

    changeSocialDetail(data) {
        const arr_obj = {};
        for (const i in data.data) {
            const tmp_detail = [];
            for (const j in data.data[i]) {
                if (i !== 'fund') {
                    const tmp = data.data[i][j];
                    if (tmp.per == '-' && ((!!tmp.other && (tmp.other != 0 && tmp.other != '-')) || (!!tmp.fixed && (tmp.fixed != 0 && tmp.fixed != '-')))) {
                        tmp.per = '';
                    }
                    tmp_detail.push(tmp);
                } else {
                    if (j === 'gs') {
                        data.data[i][j]['title'] = '公积金公司';
                    } else {
                        data.data[i][j]['title'] = '公积金个人';
                    }
                    tmp_detail.push(data.data[i][j]);
                }
            }
            arr_obj[i] = tmp_detail;
        }
        return arr_obj;
    }

// <-----

    // <----
    // -->
    chooseCity(city) {
        console.log(this.list_info_url);
        this.globalFuncService.resetSubmitData();
        this.globalFuncService.setInfoListSource('post', this.list_info_url, {city: {city: city.id}});
        this.globalFuncService.emitInfoListSource();
    }

    // <-----
    socialExcel() {
        let social_format;
        if (Number(this.month) < 10) {
            social_format = `${this.year}-0${this.month}`;
        } else {
            social_format = `${this.year}-${this.month}`;
        }
        window.open(`${this.socialAssuranceApiService.getSocialExcel()}?month=${social_format}&city=${this.current_city}&token=${window.localStorage.getItem('mayihr_token')}`);
    }
}
