import {Component, OnDestroy, OnInit} from '@angular/core';
import {SocialAssuranceService} from '../../../shared/service/salary-calc/social-assurance/social-assurance.service';
import {GlobalFuncService} from "../../../shared/service/global-func/global-func.service";
import {SocialAssuranceApiService} from "../../../shared/service/api-service/salary-api/social-assurance-api/social-assurance-api.service";
import {UsersService} from "../../../shared/service/api-service/users/users.service";
import {isUndefined} from "util";
import {Router} from "@angular/router";
import {UserStatusService} from "../../../shared/service/user-status-service/user-status.service";

@Component({
    selector: 'app-social-assurance',
    templateUrl: './social-assurance.component.html',
    styleUrls: ['./social-assurance.component.css']
})
export class SocialAssuranceComponent implements OnInit, OnDestroy {

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
    public city_list: [object];
    public city_current;
    // -->
    public detail_show = -1;
    public all_city = true;
    // <-----
    public detail_info: object;
    public previous_show;
    public inc_id;
    public month;
    public social_date;
    // <-----

    // -->提交数据
    public submit_data = {};
    // <-----

    // -->流变量声明
    public social_detail_emit;
    public list_info_emit;
    public list_info_url;
    // <-----

    // -->
    public no_list;
    // public no_list_msg;
    // <-----
    // -->月份切换
    public month_tags_copy;
    public month_tags = [];
    public month_url;
    // <-----

    // -->
    public is_outsourcing_use;
    // <-----


    // -->
    public test = true;
    // <-----
    // public is_outsource_use;
    public outsource_status;
    public active_status;
    public show_status;
    // public is_active;


    constructor(public socialAssuranceService: SocialAssuranceService,
                public globalFuncService: GlobalFuncService,
                public socialAssuranceApiService: SocialAssuranceApiService,
                public usersService: UsersService,
                public userStatusService: UserStatusService,
                public router: Router) {
        document.title = '五险一金';
        this.outsource_status = this.userStatusService.checkOutsourceUse();
        if (this.outsource_status == 1) {
            this.show_status = 1;
        } else if (this.outsource_status == 0) {
            this.show_status = 0;
        } else if (this.outsource_status == -1) {
            if (this.active_status == 2 || this.active_status == 0) {
                this.show_status = 1;
            } else {
                this.show_status = 0;
            }
        }
        this.list_info_url = this.socialAssuranceApiService.getSocialHistoryDetail();
        this.list_info_emit = this.globalFuncService.getInfoListEmit().subscribe(data => {
                data.subscribe(data1 => {
                    this.no_list = 0;
                    console.log(data1);

                    // -->关闭展开内容
                    this.previous_show = null;
                    this.detail_show = -1;
                    // <-----
                    if (JSON.stringify(data1.data) !== '[]') {
                        const result_data = JSON.parse(JSON.stringify(data1));
                        console.log(data1);
                        // 默认月份链接
                        const tmp = new Date(result_data.data.meta.current_month * 1000);
                        const tmp_year = tmp.getFullYear();
                        const tmp_month = tmp.getMonth() + 1 > 9 ? `${tmp.getMonth() + 1}` : `0${tmp.getMonth() + 1}`;
                        this.month_url = `${this.list_info_url}/${tmp_year}-${tmp_month}`;
                        // 月份标签
                        if (isUndefined(this.month_tags_copy)) {
                            this.month_tags_copy = JSON.parse(JSON.stringify(result_data.data.meta.month_tag));
                        }
                        this.month_tags = this.month_tags_copy.map(value => {
                            return {
                                month: new Date(value * 1000).getMonth() + 1,
                                current: value === data1.data.meta.current_month,
                                value: value
                            };
                        });
                        console.log(this.month_tags);
                        this.staff_assurance_list = result_data.data.data;
                        this.page_info = result_data.data.meta.pagination;
                        this.assurance_calc_result = result_data.data.meta;
                        // -->金额数据处理
                        // <-----
                        this.social_date = new Date();
                        this.social_date.setTime(this.assurance_calc_result.current_month * 1000);
                        this.month = this.social_date.getMonth() + 1;
                        this.city_list = data1.data.meta.city;
                        if (this.city_list.length > 0) {
                            for (const city of this.city_list) {
                                city['selected'] = 0;
                                if (city['id'] == data1.data.meta.current) {
                                    city['selected'] = 1;
                                }
                            }
                        }
                        this.city_current = result_data.data.meta.current;
                    } else {
                        this.no_list = 1;
                    }
                });
            }
        );
        this.social_detail_emit = this.socialAssuranceService.getSocialAssuranceDetailEmit()
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
        this.is_outsourcing_use = window.localStorage.getItem('iou');
        console.log(this.is_outsourcing_use);
        this.globalFuncService.resetSubmitData();
        this.globalFuncService.setInfoListSource('post', this.socialAssuranceApiService.getSocial(), this.submit_data);
        this.globalFuncService.emitInfoListSource();
    }

    ngOnDestroy() {
        this.list_info_emit.unsubscribe();
        this.social_detail_emit.unsubscribe();
    }

// -->list功能模块
// 展开详情
    showDetailSalary(i, staff) {
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

    socialExcel() {
        const year = this.social_date.getFullYear();
        const month = this.social_date.getMonth() + 1;
        let social_format;
        if (Number(month) < 10) {
            social_format = `${year}-0${month}`;
        } else {
            social_format = `${year}-${month}`;
        }
        console.log(social_format);
        window.open(`${this.socialAssuranceApiService.getSocialExcel()}?month=${social_format}&city=${this.city_current}&token=${window.localStorage.getItem('mayihr_token')}`);
    }

// -->详情数据格式转变
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
        console.log(arr_obj);
        return arr_obj;
    }

// <-----
// -->选择城市
    chooseCity(city) {

        this.globalFuncService.resetSubmitData();
        this.globalFuncService.setInfoListSource('post', this.month_url, {city: {city: city.id}});
        this.globalFuncService.emitInfoListSource();
        this.test = false;
        window.setTimeout(() => {
            this.test = true;
        }, 1);
    }

// <-----

// --
    selectMonth(month) {
        const tmp = new Date(month.value * 1000);
        const tmp_year = tmp.getFullYear();
        const tmp_month = tmp.getMonth() + 1 > 9 ? `${tmp.getMonth() + 1}` : `0${tmp.getMonth() + 1}`;
        this.month_url = `${this.list_info_url}/${tmp_year}-${tmp_month}`;
        this.globalFuncService.resetSubmitData();
        this.globalFuncService.setInfoListSource('post', this.month_url, {});
        this.globalFuncService.emitInfoListSource();
        this.test = false;
        window.setTimeout(() => {
            this.test = true;
        }, 1);
    }

// <-----
    toSalaryOutsourcing() {
        if (this.outsource_status == 1) {
            this.router.navigate(['/user/salary-outsourcing']);
        } else {
            this.router.navigate(['/user/outsourcing-guide']);
        }
    }
}
