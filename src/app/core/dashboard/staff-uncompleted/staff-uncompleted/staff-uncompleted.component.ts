import {Component, OnDestroy, OnInit} from '@angular/core';
import {GlobalFuncService} from "../../../../shared/service/global-func/global-func.service";
import {DashboardApiService} from "../../../../shared/service/api-service/dashboard-api/dashboard-api.service";
import {MayihrFilterService} from "../../../../shared/service/mayihr-filter/mayihr-filter.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-staff-uncompleted',
    templateUrl: './staff-uncompleted.component.html',
    styleUrls: ['./staff-uncompleted.component.css']
})
export class StaffUncompletedComponent implements OnInit, OnDestroy {

    // -->列表变量
    public list_data_emitter;
    public list_info;
    public list_url;
    // <-----

    // -->分页器
    public pagination;
    // <-----

    // -->筛选条件
    public filter_term;
    // <-----

    // -->表头
    public table_header = [
        {column_key: 'yg_name', column_name: '员工姓名', column: 'yg_name', filter: 0, selected: false, adjust: -1},
        {column_key: 'yg_login', column_name: '自助服务', column: 'yg_login', filter: 1, selected: false, adjust: -1},
        {column_key: 'miss_info', column_name: '待补全', column: 'miss_info', filter: 0, selected: false, adjust: -1},
    ];
    public filter_range = ['yg_login'];
    // <-----
    constructor(public globalFuncService: GlobalFuncService,
                public dashboardApiService: DashboardApiService,
                public router: Router,
                public mayihrFilterService: MayihrFilterService) {
        document.title = '补全信息';
        this.list_url = this.dashboardApiService.getStaffUncompletedList();
        this.list_data_emitter = this.globalFuncService.getInfoListEmit()
            .subscribe(data => {
                data.subscribe(data1 => {
                    console.log(data1);
                    const tmp = data1.data;
                    this.pagination = tmp.meta.pagination;
                    this.list_info = tmp.data;
                });
            });
    }

    ngOnInit() {
        this.mayihrFilterService.getFilterSource().subscribe(data2 => {
            this.filter_term = this.mayihrFilterService.initFilter(data2.data, this.filter_range);
            this.globalFuncService.resetSubmitData();
            this.globalFuncService.setInfoListSource('get', this.list_url, {});
            this.globalFuncService.emitInfoListSource();
        });
        this.globalFuncService.resetSubmitData();
        this.globalFuncService.setInfoListSource('get', this.list_url, {});
        this.globalFuncService.emitInfoListSource();
    }

    ngOnDestroy() {
        this.list_data_emitter.unsubscribe();
    }

    /**
     * 筛选下拉框展开收起
     * 函数描述
     * filterChooseToggle()
     * @params: index--表头
     * @return:
     */
    filterChooseToggle(index) {
        if (this.table_header[index].selected === false) {
            for (let i in this.table_header) {
                this.table_header[i].selected = false;
            }
            this.table_header[index].selected = true;
        } else {
            this.table_header[index].selected = false;
        }
    }

    //

    /**
     *closeFilter
     * 函数描述
     *关闭下拉框
     * @params:
     * @return:
     */
    closeFilter(event) {
        for (let i in this.table_header) {
            this.table_header[i].selected = false;
        }
    }

    /**
     * toAddInfo
     * 函数描述
     * 去补充信息详情
     * @params:
     * @return:
     */
    toAddInfo(staff) {
        console.log(staff);
        const tmp = staff.is_show_status == 1 ? 'outsource' : 'un-outsource';

        this.router.navigate([`/user/dashboard/staff-uncompleted/add-info/${staff.yg_id}/${tmp}`]);
        // this.router.navigate([`/user/dashboard`]);
    }
}
