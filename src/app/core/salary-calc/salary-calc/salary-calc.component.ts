import {Component, OnDestroy, OnInit} from '@angular/core';
import {SalaryApiService} from '../../../shared/service/api-service/salary-api/salary-api.service';
import {SalaryCalcService} from '../../../shared/service/salary-calc/salary-calc/salary-calc.service';
import {ModalService} from '../../../shared/service/modal/modal.service';
import {Router} from '@angular/router';
import {GlobalFuncService} from '../../../shared/service/global-func/global-func.service';
import {HttpService} from '../../../shared/service/http-service/http.service';
import {UserStatusService} from "../../../shared/service/user-status-service/user-status.service";

@Component({
    selector: 'app-salary-calc',
    templateUrl: './salary-calc.component.html',
    styleUrls: ['./salary-calc.component.css']
})
export class SalaryCalcComponent implements OnInit, OnDestroy {
    // -->本地变量
    public excel_list = [
        {
            id: 'tax',
            text: '个税申报表'
        },
        {
            id: 'bank',
            text: '银行批量付款文件'
        }
    ];

    public operate_list = [
        {
            id: '0',
            text: '查看/添加备注'
        },
        {
            id: '1',
            text: '修改出勤'
        },
        {
            id: '2',
            text: '修改浮动工资'
        },
        {
            id: '3',
            text: '修改通用扣减'
        }
    ];
    public table_header = [
        {column: 'yg_name', column_key: 'yg_name', column_name: '姓名', filter: 1, adjust: -1},
        {column: 'yg_salary', column_key: 'yg_salary', column_name: '工资合计', filter: 0, adjust: 1},
        {column: 'deduct', column_key: 'deduct', column_name: '工资扣款', filter: 0, adjust: 1},
        {column: 'should_salary', column_key: 'should_salary', column_name: '应发工资', filter: 0, adjust: 1},
        {column: 'withheld', column_key: 'withheld', column_name: '代扣代缴', filter: 0, adjust: 1},
        {column: 'pay_salary', column_key: 'pay_salary', column_name: '实发', filter: 0, adjust: 1}
    ];
    public excel_choose = false;
    // <-----
    public modal_name_arr = [
        'salary_remark_m', 'attendance_adjust_m', 'bonus_adjust_m', 'reduce_adjust_m'
    ];
    // -->
    public
    // <-----
    // --> 设置本地list,结果变量
    public salary_calc_result;
    public staff_salary_list;
    public page_info;
    public detail_show = -1;
    public previous_show = -1;
    public inc_id;
    // <-----
    // 工资详情
    public detail_info;
    // <--

    // -->提交数据
    public submit_data = {};
    // <-----
    // -->modal显示控制
    public modal_name = '';
    public modal_info;
    public modal_callback;
    // <-----

    // -->红色提示
    public show_red;
    // <-----

    // -->paging用url
    public list_info_url;
    // <-----

    // -->流变量
    public list_info_emit;
    public detail_info_emit;
    public modal_name_emit;
    // <-----

    public no_list;
    public no_list_msg;

    // -->归档状态
    public is_archive;
    public recalculate;
    // <-----

    // -->用户状态
    public is_outsourcing_use;
    // <-----
    // -->月份状态
    public is_current;
    // <-----
    constructor(public salaryApiService: SalaryApiService,
                public salaryCalcService: SalaryCalcService,
                public modalService: ModalService,
                public globalFuncService: GlobalFuncService,
                public userStatusService: UserStatusService,
                public route: Router,
                public httpService: HttpService) {
        document.title = '计算薪资';
        // -->
        this.list_info_url = salaryApiService.getStaffSalary();
        // <-----
        // -->监控员工工资列表变化
        this.list_info_emit = this.globalFuncService.getInfoListEmit().subscribe((data) => {
            data.subscribe((data1) => {
                this.page_info = data1.data.meta.pagination;
                this.staff_salary_list = data1.data.data;
                this.detail_show = -1;
                this.previous_show = -1;
                // if (this.staff_salary_list.length == 0) {
                //     this.no_list = true;
                // }
            });
        });
        // <-----
        // --> 监控个人信息变化
        this.detail_info_emit = this.salaryCalcService.getDetailSalaryEmit().subscribe((data) => {
            data.subscribe((data1) => {
                this.detail_info = data1.data.data;
            });
        });
        // <-----
        // -->modal显示控制
        this.modal_name_emit = this.modalService.getModalNameEmit().subscribe((data) => {
            this.modal_name = data;
        });
        // <-----
        // -->列表请求参数初始化
        this.submit_data = {};
        // <-----
    }

    ngOnInit() {
        this.is_outsourcing_use = window.localStorage.getItem('iou');
        this.is_outsourcing_use = this.userStatusService.checkOutsourceUse();
        // --> 获取salary结果

        this.salaryCalcService.setSalaryCalcSource();
        this.salaryCalcService.getSalaryCalcSource().subscribe((data) => {
            console.log(data);
            if (data.data.id != 0) {
                this.no_list = 0;
                this.is_archive = data.data.is_archive;
                this.recalculate = data.data.recalculate;
                this.inc_id = data.data.id;
                this.salary_calc_result = data.data;
                // data.data.op_month == data.data.current_month ? this.is_current = 1 : this.is_current = 0;
                // -->获取页面列表信息
                this.globalFuncService.resetSubmitData();
                this.globalFuncService.setInfoListSource('get', this.list_info_url, {});
                this.globalFuncService.emitInfoListSource();
                // <-----
            } else {
                this.no_list = 1;
            }
        });
        // <-----
    }

    ngOnDestroy() {
        this.list_info_emit.unsubscribe();
        this.detail_info_emit.unsubscribe();
        this.modal_name_emit.unsubscribe();
    }

    // -->list功能模块
    // 展开详情
    showDetailSalary(i, staff) {
        this.detail_info = '';
        if (i === this.previous_show) {
            this.detail_show = -1;
            this.previous_show = -1;
        } else {
            this.detail_show = i;
            this.previous_show = i;
            // this.submit_data['id'] = staff.id;
            const tmp = JSON.parse(JSON.stringify(this.submit_data));
            tmp['id'] = staff.id;
            this.salaryCalcService.setDetailSalarySource(tmp);
            this.salaryCalcService.emitDetailSalary();
        }
        staff.show_point != 0 ? this.show_red = true : this.show_red = false;
    }

    // <-----
    // -->
    // 下拉检索框选中后
    refreshValue(value: any): void {
        console.log(value);
        this.closeExcelList();
        window.open(`${this.salaryApiService.getExcelUrl(value, this.inc_id)}?token=${window.localStorage.getItem('mayihr_token')}`);
    }

    closeExcelList() {
        this.excel_choose = false;
    }

    downSalary() {
        window.open(`${this.salaryApiService.getExcelUrl('salary', this.inc_id)}?token=${window.localStorage.getItem('mayihr_token')}`);
    }

    openExcel() {
        this.excel_choose = !this.excel_choose;
    }

    // --> 编辑备注
    openSalaryOperate(event, data, staff) {
        event.stopPropagation();
        if (data.open_operate) {
            data.open_operate = !data.open_operate;
        } else {
            data.open_operate = !data.open_operate;
        }
        console.log(data.open_operate);

        // this.modal_name = 'salary_edit_remark';
        // this.salary_edit_remark = data;
    }

    closeSalaryOperate(event, data) {
        event.stopPropagation();
        event.preventDefault();
        data.open_operate = false;
    }

    archiveSalary() {
        this.httpService.myPost(this.salaryApiService.getSalaryArchive(), {id: this.inc_id})
            .subscribe(data => {
                this.ngOnInit();
            });
    }

    releaseSalary() {
        this.httpService.myPost(this.salaryApiService.getSalaryRelease(), {id: this.inc_id})
            .subscribe(data => {
                console.log(data);
                this.ngOnInit();
            });
    }

    // <-----

    /**
     * clickSalaryOperate
     * 函数描述
     * 点击具体操作
     * @params:
     * @return:
     */
    clickSalaryOperate(event, opr, staff, index) {
        console.log(index);
        console.log(staff);
        // event.stopPropagation();
        // event.preventDefault();
        if (index != 0 && this.is_archive != 1) {
            if (staff.is_archive != 1) {
                this.modal_name = this.modal_name_arr[opr.id];
                if (staff.is_archive != 1) {
                    if (opr.id == 1) {
                        this.modal_info = {
                            inc_id: this.inc_id,
                            staff: staff,
                            calc: this.salary_calc_result
                        };
                    } else if (opr.id == 2) {
                        this.modal_info = {
                            staff: staff,
                            calc: this.salary_calc_result,
                            type: 1,
                            inc_id: this.inc_id
                        };
                    } else if (opr.id == 3) {
                        this.modal_info = {
                            staff: staff,
                            calc: this.salary_calc_result,
                            type: 2,
                            inc_id: this.inc_id
                        };
                    }
                }
            }
        } else {
            this.modal_name = this.modal_name_arr[opr.id];
            this.modal_info = staff;
        }
        this.detail_show = -1;
        this.previous_show = -1;
    }

    // -->进入工资项变动页面
    toSalaryItem(type, inc) {
        this.route.navigate([`/user/salary-calc/type/${type}/${inc}`]);
    }

    // <-----


    // <-----

    // -->去外包
    toSalaryOutSourcing() {
        this.route.navigate(['/user/salary-outsourcing']);
    }

    // <-----
}
