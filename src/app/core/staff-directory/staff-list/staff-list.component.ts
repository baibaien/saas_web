import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FilterTermService} from "../../../shared/service/staff-directory/filter-term/filter-term.service";
import {MayihrFilterService} from "../../../shared/service/mayihr-filter/mayihr-filter.service";
import {GlobalFuncService} from "../../../shared/service/global-func/global-func.service";
import {StaffsService} from "../../../shared/service/api-service/staff-directory/staffs/staffs.service";
@Component({
    selector: 'app-staff-list',
    templateUrl: './staff-list.component.html',
    styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent implements OnInit, OnDestroy {
    // 筛选条件
    public filter_term;
    // -->表格滚动条
    public is_scroll = false;
    // <-----
    // -->提交条件
    public submit_data = {};
    // <-----
    // -->列表流
    public list_info_emit;
    public list_info_url;
    public staff_list;
    // <-----
    // -->页脚插件
    public page_info;
    // <-----
    // -->search栏
    public other_operate_info = {
        text: '高级筛选',
        icon: 'icon_filter'
    };
    // <-----

    // -->
    public choose_staff_num = 0;

    // <-----
    // -->筛选范围
    public filter_range = [
        'leader_id', 'others', 'status', 'yg_con_com_id', 'yg_gender',
        'yg_hire_type', 'yg_office', 'yg_org_id', 'yg_xueli', 'yg_zhiwei', 'yg_city'
    ];
    // <-----
    // -->表头
    public table_header;
    public table_header_copy;
    public table_custom = false;
    // <-----
    // -->
    public staff_list_copy;
    // <-----
    // -->自定义表头状态
    public table_header_status = 0;
    // <-----

    // -->高级筛选
    public filter_backups;

    // -->
    public filter_emit;
    public filter_num: number;
    public isAdvancedFilter = false;
    // <-----
    // <-----
    constructor(public router: Router,
                public filterTermService: FilterTermService,
                public mayihrFilterService: MayihrFilterService,
                public staffsService: StaffsService,
                public globalFuncService: GlobalFuncService) {
        document.title = '员工名录';
        this.list_info_url = this.staffsService.getStaffs();
        this.globalFuncService.resetSubmitData();
        this.list_info_emit = this.globalFuncService.getInfoListEmit().subscribe(data => {
            data.subscribe(data1 => {
                console.log(`员工列表`, data1);
                // -->折叠部分初始化
                this.table_custom = false;

                // <-----
                this.page_info = data1.data.meta.pagination;
                this.staff_list = data1.data.data;
                console.log(this.staff_list);
                this.filter_term = this.mayihrFilterService.setTotal(this.filter_term, data1.data.meta.total);
                console.log(this.filter_term);
                this.chooseStaff('none');
            });
        });
        this.other_operate_info['func'] = this.toAdvanceFilter();
        // -->筛选
        this.filter_emit = this.mayihrFilterService.getLocalFilterEmit().subscribe(data => {
            console.log(data);
            this.filter_term = JSON.parse(JSON.stringify(data));
            this.filter_backups = JSON.parse(JSON.stringify(data));
            this.calcFilter();
            // console.log(123123);
            // this.submit_data = Object.assign(this.mayihrFilterService.compileFilterEmit());
            // this.globalFuncService.setInfoListSource('post', this.list_info_url, this.submit_data);
            // this.globalFuncService.emitInfoListSource();
        });
        // <-----

    }

    ngOnInit() {
        this.mayihrFilterService.getFilterSource().subscribe(data2 => {
            this.filter_term = this.mayihrFilterService.initFilter(data2.data, this.filter_range);
            this.filter_term[2].child[0].status = true;
            this.table_header = this.mayihrFilterService.getTableHeader();
            this.table_header_copy = JSON.parse(JSON.stringify(this.table_header));
            this.submit_data = this.mayihrFilterService.compileFilterEmit();
            this.globalFuncService.setInfoListSource('post', this.list_info_url, {filter: {status: [1]}});
            this.globalFuncService.emitInfoListSource();
            console.log(this.filter_term);
        });
        // }
    }

    ngOnDestroy() {
        this.list_info_emit.unsubscribe();
        this.filter_emit.unsubscribe();
    }

    // 表头筛选模块
    // 表头滚动判断
    tableScroll(event) {
        if (event.scrollLeft === 0) {
            this.is_scroll = false;
        } else {
            this.is_scroll = true;
        }
    }

    // 表头下拉toggle
    filterChooseToggle(index) {
        if (this.table_header[index].selected == false) {
            for (let i in this.table_header) {
                this.table_header[i].selected = false;
            }
            this.table_header[index].selected = true;
        } else {
            this.table_header[index].selected = false;
        }
    }

    // 表头自定义功能
    // 选中或取消显示条目
    toggleHeader(index) {
        this.table_header_copy[index].display === 1 ? this.table_header_copy[index].display = 0 : this.table_header_copy[index].display = 1;
    }

    // 打开或关闭自定义面板
    toggleTableCustom() {
        if (this.table_custom === true) {
            this.customHeaderCancel();
        } else {
            this.table_custom = !this.table_custom;
        }
    }

    // 提交自定义表头
    customHeaderCommit() {
        this.table_header = JSON.parse(JSON.stringify(this.table_header_copy));

        for (let i in this.table_header) {
            this.table_header[i].sort = Number(i) + 1;
            if (this.table_header[i].display == 1) {
                this.table_header_status++;
            }
        }
        this.filterTermService.setTableHeader(this.table_header);
        this.filterTermService.headerCommitCompile().subscribe((data) => {
            this.globalFuncService.emitInfoListSource();
        });
    }

    // 取消自定义更改
    customHeaderCancel() {
        this.table_header_copy = JSON.parse(JSON.stringify(this.table_header));
        this.table_custom = false;
    }

    closeFilter(event) {
        for (let i in this.table_header) {
            this.table_header[i].selected = false;
        }
    }

    // <-----
    clickChooseStaff(e, type?, status?) {
        this.chooseStaff(type, status);
        e.stopPropagation();
    }

    chooseStaff(type?, status?) {
        if (status != 2) {
            if (type === 'all') {
                this.choose_staff_num = 0;
                this.staff_list.filter(_ => {
                    if (_.status != 2) {
                        this.choose_staff_num++;
                        _.choosed = 1;
                    }
                });
            } else if (type === 'none') {
                this.choose_staff_num = 0;
                this.staff_list.filter(_ => {
                    _.choosed = 0;
                });
            } else if (typeof type === 'number') {
                if (this.staff_list[type].choosed) {
                    this.staff_list[type].choosed = 0;
                    this.choose_staff_num--;
                } else {
                    this.staff_list[type].choosed = 1;
                    this.choose_staff_num++;
                }
            } else {
                this.choose_staff_num = 0;
                for (const staff of this.staff_list) {
                    if (staff.choosed === 1) {
                        this.choose_staff_num++;
                    }
                }
            }
        }
    }

    changePersonalBatch() {
        console.log(123123);
        let yg_ids = [];
        let yg_names = [];
        for (let staff of this.staff_list) {
            if (staff.choosed === 1) {
                yg_ids.push(staff.id);
                yg_names.push(staff.yg_name);
            }
        }
        let yg_name = yg_names.length === 1 ? yg_names[0] : '多个值';
        this.router.navigate([`/user/staff/staff-detail/${yg_ids}/operate/staff-change/${yg_name}`]);
    }

    choosedStaffCopy(origins, copys) {
        for (let copy of copys) {
            if (copy.choosed === 1) {
                for (let origin of origins) {
                    if (origin.id === copy.id) {
                        origin.choosed = copy.choosed;
                    }
                }
            }
        }
    }

    toAdvanceFilter() {
        let that = this;
        return (function () {
            that.isAdvancedFilter = true;
            that.mayihrFilterService.emitLocalFilter();
        });
    };

    toStaffDetail(id) {
        this.router.navigate(['/user/staff/staff-detail', id]);
    }

    toStaffOrg() {
        this.router.navigate(['/user/staff/staff-org']);
    }

    // -->高级筛选内容
    // 获取点击数据，传给filter service服务
    chooseFilter(parent_i, current_i) {
        console.log(this.filter_term[parent_i].child[current_i]);
        if (this.filter_num < 10 || (this.filter_num === 10 && this.filter_term[parent_i].child[current_i].status)) {
            this.filter_term[parent_i].child[current_i].status = !this.filter_term[parent_i].child[current_i].status;
            this.calcFilter();
        }
    }

    // 筛选条件提交
    filterSubmit() {
        this.mayihrFilterService.setLocalFilter(this.filter_term);
        this.mayihrFilterService.emitLocalFilter();
        this.submit_data = Object.assign(this.submit_data, this.mayihrFilterService.compileFilterEmit());
        this.globalFuncService.setInfoListSource('post', this.list_info_url, this.submit_data);
        this.globalFuncService.emitInfoListSource();
        this.toStaff();
    }

    // 筛选条件取消
    filterCancel() {
        this.filter_term = JSON.parse(JSON.stringify(this.filter_backups));
        this.toStaff();
    }

    // 筛选条件清空
    filterClear() {
        for (const i in this.filter_term) {
            for (const j in this.filter_term[i].child) {
                this.filter_term[i].child[j].status = false;
            }
        }
        this.calcFilter();
    }

    calcFilter() {
        this.filter_num = 0;
        for (const i of this.filter_term) {
            for (const j of i.child) {
                console.log(j);
                if (['在职', '离职', '试用期'].indexOf(j.name) == -1) {
                    if (j.status) {
                        this.filter_num++;
                    }
                }
            }
        }
    }

    toStaff() {
        this.isAdvancedFilter = false;
    }

    // <-----
}
