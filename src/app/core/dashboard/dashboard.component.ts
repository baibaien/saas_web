import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from "../../shared/service/http-service/http.service";
import {DashboardApiService} from "../../shared/service/api-service/dashboard-api/dashboard-api.service";
import {isNullOrUndefined, isUndefined} from "util";
import {Router} from "@angular/router";
import {
    EmployeeAgeDistEchartsClass,
    OutsourceCostEchartsClass, StaffAvgCostEchartsClass, StaffCalcEchartsClass
} from "./DashoboardClass";
import {ModalService} from "../../shared/service/modal/modal.service";
import {UserStatusService} from "../../shared/service/user-status-service/user-status.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit, OnDestroy {

    // -->所有帐单数据
    public all_bill_list;


    public is_outsource_use;
    public outsource_status;
    public is_active;


    public bill_show;
    public bill_show_title;
    public order_show;
    public dashboard_data;
    public notice_data;
    public lately_birth_list;
    // <-----

    // -->
    public outsource_cost;
    public outsource_cost_echarts;
    // <-----


    // -->
    public staff_calc;
    public staff_calc_echarts;
    public staff_calc_show = false;
    // <-----

    // -->
    public staff_avg_cost;
    public staff_avg_cost_echarts;
    // <-----

    // -->
    public employee_age_dist;
    public employee_age_dist_echarts;
    // <-----

    public show_undo = true;
    public undo_count = -1;
    public social_charts_data;


    // -->
    public modal_name;
    public modal_info;
    public modal_callback;
    public modal_name_watcher;
    // <-----


    // -->
    public is_third_pay;
    // <-----

    constructor(public httpService: HttpService,
                public modalService: ModalService,
                public router: Router,
                public userStatusService: UserStatusService,
                public dashboardApiService: DashboardApiService) {
        document.title = '首页';
        this.modal_name_watcher = this.modalService.getModalNameEmit()
            .subscribe(data => {
                this.modal_name = data;
            });
    }

    ngOnInit() {

        this.httpService.myGet(this.dashboardApiService.getUnreadNoticeAmount())
            .subscribe(data1 => {
                this.httpService.myGet(this.dashboardApiService.getDashboard())
                    .subscribe(data => {
                        const pro = new Promise(
                            (resolve, reject) => {
                                if (data.data.version_tips) {
                                    this.modal_name = 'version_tips';
                                    this.modal_callback = resolve;
                                } else {
                                    resolve();
                                }
                            }
                        );
                        pro.then(() => {
                            this.httpService.myGet(this.dashboardApiService.getNoticeModal())
                                .subscribe(data2 => {
                                    if (!(data2.data instanceof Array)) {
                                        this.modal_name = 'notice_m';
                                        this.modal_info = data2.data.data;
                                    }
                                });
                        });
                        console.log(data);
                        this.is_third_pay = data.data.is_third_pay;
                        this.notice_data = data1.data;
                        const data_local = data.data;
                        this.dashboard_data = data.data;
                        // -->
                        // <-----

                        this.all_bill_list = this.factoryArray(data_local.gen_bills, data_local.gen_commercial, data_local.gen_salary);
                        if (this.all_bill_list.length > 0) {
                            this.bill_show = `${this.all_bill_list[0].name}${this.all_bill_list.length > 1 ? `等${this.all_bill_list.length}个账单` : ''}，以免服务中断`;
                            this.all_bill_list.reduce(() => {
                            });
                        }

                        // -->
                        // <-----

                        this.lately_birth_list = Object.keys(data_local.lately_birth_staffs).map((val) => {
                            return data_local.lately_birth_staffs[val];
                        });
                        {
                            this.outsource_cost = {
                                total_cost: this.valueToArr('total_cost', data_local.stat_user_cost_month),
                                social_fund_cost: this.valueToArr('social_fund_cost', data_local.stat_user_cost_month),
                                service_cost: this.valueToArr('service_cost', data_local.stat_user_cost_month),
                                base_salary_cost: this.valueToArr('base_salary_cost', data_local.stat_user_cost_month),
                                other_cost: this.valueToArr('other_cost', data_local.stat_user_cost_month),
                                month: this.monthToValue(this.valueToArr('month', data_local.stat_user_cost_month))
                            };
                            let tmp = false;
                            for (let i in this.outsource_cost) {
                                if (this.outsource_cost[i].length != 0) {
                                    tmp = true;
                                }
                            }
                            this.social_charts_data = tmp;
                            this.outsource_cost_echarts = new OutsourceCostEchartsClass(this.outsource_cost);
                        }

                        // -->员工入离职统计部分
                        {
                            let tmp = data_local.stat_user_staff_month;
                            this.staff_calc = {
                                month: this.monthToValue(this.valueToArr('month', tmp)),
                                quit_elt_60: this.valueToArr('quit_elt_60', tmp),
                                quit_gt_60: this.valueToArr('quit_gt_60', tmp),
                                hires: this.valueToArr('hires', tmp)
                            };

                            for (let i in this.staff_calc) {
                                if (i !== 'month') {
                                    for (let j in this.staff_calc[i]) {
                                        if (this.staff_calc[i][j]) {
                                            this.staff_calc_show = true;
                                        }
                                    }
                                }

                            }
                            if (this.staff_calc_show) {
                                this.staff_calc['quit_rate'] = this.toSmaller(this.valueToArr('quit_rate', tmp));
                                this.staff_calc['end_jobs'] = this.toSmaller(this.valueToArr('end_jobs', tmp));
                                this.staff_calc['start_jobs'] = this.toSmaller(this.valueToArr('start_jobs', tmp));
                            }
                            this.staff_calc_echarts = new StaffCalcEchartsClass(this.staff_calc);
                        }

                        // -->人均成本计算
                        {
                            let tmp = data_local.stat_user_avg_cost_month;
                            this.staff_avg_cost = {
                                month: this.monthToValue(this.valueToArr('month', tmp)),
                                avg_total_cost: this.valueToArr('avg_total_cost', tmp),
                                avg_base_salary_cost: this.valueToArr('avg_base_salary_cost', tmp),
                            };
                            this.staff_avg_cost_echarts = new StaffAvgCostEchartsClass(this.staff_avg_cost);
                        }
                        // <-----


                        // -->司龄扇形图
                        {
                            let tmp = data_local.employee_age_dist;
                            this.employee_age_dist_echarts = new EmployeeAgeDistEchartsClass(tmp).series;

                        }
                        // <-----
                        // <-----
                        this.undo_count++;
                        if (this.dashboard_data.unpay_order_count > 0) {
                            this.undo_count++;
                        }
                        if (this.all_bill_list.length > 0) {
                            this.undo_count++;
                        }
                        if (this.dashboard_data.incomplete_staff_total > 0) {
                            this.undo_count++;
                        }
                        if (this.notice_data.unread_amount > 0) {
                            this.undo_count++;
                        }
                        this.judgeStatus();
                    });
            });
    }


    ngOnDestroy() {
        this.modal_name_watcher.unsubscribe();
    }

    judgeStatus() {
        if (isNullOrUndefined(window.localStorage.getItem('outsource_sign_status')) || isNullOrUndefined(window.localStorage.getItem('is_self_active_status'))) {
            this.router.navigate(['/entry/login']);
        } else {
            this.is_outsource_use = window.localStorage.getItem('outsource_sign_status');
            this.is_active = window.localStorage.getItem('is_self_active_status');

            if (this.is_outsource_use == 1) {
                this.outsource_status = 1;
            } else if (this.is_outsource_use == 0) {
                this.outsource_status = 0;
            } else if (this.is_outsource_use == -1) {
                if (this.is_active == 2) {
                    this.outsource_status = 1;
                } else {
                    this.outsource_status = 0;
                }
            }
        }
    }

    factoryArray(...args) {
        const result = [];
        for (let i of args) {
            if (i instanceof Array) {
                for (let j of i) {
                    result.push(j);
                }
            } else if (i instanceof Object && !isUndefined(i)) {
                result.push(i);
            }
        }
        return result;
    }

    /**
     * valueToArr
     * 函数描述
     * 将二维数组中的某一个值抽出来组成新数组
     * @params: item-字段 source type-求负
     * @return: result
     */
    valueToArr(item, source, type = 1) {
        const result = [];
        for (let i of source) {
            if (!isUndefined(i[item])) {
                if (!Number(i[item])) {
                    result.push(i[item]);
                } else {
                    result.push(type * i[item]);
                }
            } else {
                result.push(0);
            }
        }
        return result;
    }


    toggleUndo() {
        this.show_undo = !this.show_undo;
    }

    monthToValue(source) {
        const result = [];
        for (let i in source) {
            result.push(`${String(source[i]).substr(5, 2)}月`);
        }
        return result;
    }

    toSmaller(source) {
        const result = [];
        for (let i in source) {
            result.push(Number(source[i]) / 100000000);
        }
        return result;
    }

    toUnpayList() {
        this.router.navigate(['/user/bill-manage/unpaid-list']);
    }

    toSalaryOutsourcing() {
        this.router.navigate(['/user/salary-outsourcing']);
    }

    toStaffUncompleted() {
        this.router.navigate(['/user/dashboard/staff-uncompleted']);
    }

    toNotification() {
        this.router.navigate(['/user/notification']);
    }

    toBillList() {
        this.router.navigate(['/user/bill-manage']);
    }

    toWithdraw() {
        this.router.navigate(['/user/dashboard/withdraw']);
    }
}
