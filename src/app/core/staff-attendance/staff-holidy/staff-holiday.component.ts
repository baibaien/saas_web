import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalService} from "../../../shared/service/modal/modal.service";
import {GlobalFuncService} from "app/shared/service/global-func/global-func.service";
import {AttendanceService} from "../../../shared/service/api-service/staff-attendance/attendance/attendance.service";
import {MayihrFilterService} from "../../../shared/service/mayihr-filter/mayihr-filter.service";
// import {GlobalMaskControlService} from "../../../shared/service/global-mask-control/global-mask-control.service";
import {HttpService} from "../../../shared/service/http-service/http.service";
import {AssistModalService} from "../../../shared/service/assist-modal-service/assist-modal.service";

@Component({
    selector: 'app-staff-holiday',
    templateUrl: './staff-holiday.component.html',
    styleUrls: ['./staff-holiday.component.css']
})
export class StaffHolidayComponent implements OnInit, OnDestroy {
    public staffs_holiday = [];
    public staffs_id = [];
    // table
    // 表头内容
    public table_header = [
        {column_key: 'yg_name', column_name: '姓名', column: 'yg_name', filter: 0, selected: false,
            adjust: -1},
        {column_key: 'yg_org_id', column_name: '部门', column: 'department_name', filter: 1, selected: false,
            adjust: -1},
        {column_key: 'yg_zhiwei', column_name: '岗位', column: 'yg_zhiwei', filter: 1, selected: false,
            adjust: -1},
        {column_key: 'work_age', column_name: '本单位工作年限', column: 'work_age', filter: 2, selected: false,
            adjust: -1},
        {column_key: 'annual_holiday', column_name: '年假', column: 'annual_holiday', filter: 0, selected: false,
            adjust: -1},
        {column_key: 'general_holiday', column_name: '调休', column: 'general_holiday', filter: 0, selected: false,
            adjust: 0}];
    public filter_range = ['yg_org_id', 'yg_zhiwei'];
    // <-----
    public holiday_show = -1;
    public previous_show;
    // 列表获取参数
    public submit_data = {};
    // 筛选条件获取
    public filter_term;
    // 选中条目
    public choose_staff_num = 0;
    // 快捷选择是否显示
    public choose_button = true;
    // modal控制
    public modal_name = '';
    public modal_info = {};
    // -->流控制
    public modal_name_emit;
    public list_info_emit;
    // <-----
    // -->list获取的数据
    public page_info;
    // <-----
    // -->链接url
    public list_info_url;
    // <-----
    constructor(public globalFuncService: GlobalFuncService,
                public mayihrFilterService: MayihrFilterService,
                public attendanceService: AttendanceService,
                public assistModalService: AssistModalService,
                public httpService: HttpService,
                public modalService: ModalService) {
        document.title = '员工假期余额';
        // -->列表地址获取
        this.list_info_url = this.attendanceService.getHolidays();
        // <-----
        // -->modal控制
        this.modal_name_emit = this.modalService.getModalNameEmit().subscribe(data => {
            this.modal_name = data;
        });
        // <-----
        // -->列表请求
        this.list_info_emit = this.globalFuncService.getInfoListEmit().subscribe(data => {
            data.subscribe(data1 => {
                this.modal_name = '';
                this.choose_staff_num = 0;
                this.staffs_holiday = data1.data.data;
                this.changeData();
                console.log(this.staffs_holiday.toString());
                this.page_info = data1.data.meta.pagination;
                // -->表头筛选

                // <-----
            });
        });
        // <-----

    }

    ngOnInit() {
        this.mayihrFilterService.getFilterSource().subscribe(data2 => {
            this.filter_term = this.mayihrFilterService.initFilter(data2.data, this.filter_range);
            this.globalFuncService.resetSubmitData();
            this.globalFuncService.setInfoListSource('post', this.list_info_url, this.submit_data);
            this.globalFuncService.emitInfoListSource();
        });
        // 筛选条件获取
    }

    ngOnDestroy() {
        this.modal_name_emit.unsubscribe();
        this.list_info_emit.unsubscribe();
    }

// 单行像下展开
    holidayDetailShow(i) {
        if (i === this.previous_show) {
            this.holiday_show = -1;
            this.previous_show = -1;
        } else {
            this.holiday_show = i;
            this.previous_show = i;
        }
    }

// 数据格式转换为可以ngFor的格式
    changeData() {
        for (const i in this.staffs_holiday) {
            const staff_now = this.staffs_holiday[i];
            // 添加selected属性
            staff_now['selected'] = 0;
            // work age转换
            const work_age_tmp = staff_now.work_age;
            if (work_age_tmp > 360) {
                if ((Math.floor(work_age_tmp / 30) % 12) === 0) {
                    staff_now.work_age = `${Math.floor(Math.floor(work_age_tmp / 30) / 12)}年`;
                } else {
                    staff_now.work_age = `${Math.floor(Math.floor(work_age_tmp / 30) / 12)}年 ${Math.floor(work_age_tmp / 30) % 12}月`;
                }
            } else if (work_age_tmp >= 0) {
                if (work_age_tmp < 30) {
                    staff_now.work_age = '未满1月';
                } else {
                    staff_now.work_age = `${Math.floor(work_age_tmp / 30) % 12}月`;
                }
            }            // 年假转换
            // staff_now.annual_holiday = this.hourToDay(staff_now.annual_holiday);
            // 调休转换
            // staff_now.general_holiday += '小时';
            // detail 转换
            for (const j in this.staffs_holiday[i].detail) {
                if (this.staffs_holiday[i].detail.length > 0) {
                    const detail_now = this.staffs_holiday[i].detail[j];
                    if (detail_now.type_id == 12) {
                        detail_now['cost'] = detail_now.duration - detail_now.overage;
                    } else {
                        detail_now['cost'] = detail_now.duration - detail_now.overage;
                    }
                    detail_now.expire_time = this.dateToShowDate(detail_now.expire_time);
                }
            }
        }
    }

    //
    // hourToDay(data) {
    //     if (data < 8) {
    //         return `${data}小时`;
    //     } else {
    //         return `${Math.floor(data / 8)}天 ${data % 8}小时`;
    //     }
    // }

    dateToShowDate(data) {
        data = data.split(' ')[0];
        data = data.split('');
        data.splice(4, 1, '年');
        data.splice(7, 1, '月');
        data.push('日');
        return data.join('');
    }

// 选择员工
    chooseStaff(type, event) {
        if (type === 'all') {
            this.choose_staff_num = 0;
            this.staffs_holiday.filter(_ => {
                this.choose_staff_num++;
                _.selected = 1;
                return false;
            });
        } else if (type === 'none') {
            this.choose_staff_num = 0;
            this.staffs_holiday.filter(_ => {
                _.selected = 0;
                return false;
            });
        } else if (typeof type === 'number') {
            if (this.staffs_holiday[type].selected) {
                this.staffs_holiday[type].selected = 0;
                this.choose_staff_num--;
            } else {
                this.staffs_holiday[type].selected = 1;
                this.choose_staff_num++;
            }
            event.stopPropagation();
        }
    }

// 筛选框开关
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

    daysExtend(event, id) {
        event.stopPropagation();
        this.staffs_id = [];
        if (typeof  id === 'number') {
            this.staffs_id.push(id);
        } else {
            for (let i in this.staffs_holiday) {
                if (this.staffs_holiday[i].selected) {
                    this.staffs_id.push(this.staffs_holiday[i].yg_id);
                }
            }
        }
        this.modal_info = {
            staffs_id: this.staffs_id,
            url_info: this.list_info_url
        };
        this.modal_name = 'holiday_extend_m';
    }

    // -->筛选相关
    closeFilter(event) {
        for (let i in this.table_header) {
            this.table_header[i].selected = false;
        }
    }

    // <-----

    // -->删除假期
    deleteHoliday(holiday) {
        console.log(holiday);
        this.assistModalService.openAssistModal('confirm', '确认删除？', () => {
            this.httpService.myDelete(`${this.attendanceService.getStaffHoliday()}/${holiday.id}`)
                .subscribe(data => {
                    console.log(data);
                    this.globalFuncService.emitInfoListSource();
                });
        });
    }


    // <-----

}
