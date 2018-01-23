import {Component, OnDestroy, OnInit, Pipe, PipeTransform} from '@angular/core';
import {GlobalFuncService} from "../../../shared/service/global-func/global-func.service";
import {MayihrFilterService} from "../../../shared/service/mayihr-filter/mayihr-filter.service";
import {ModalService} from "../../../shared/service/modal/modal.service";
import {SalaryOutsourcingApiService} from "../../../shared/service/api-service/salary-outsourcing-api/salary-outsourcing-api.service";
import {FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpService} from "../../../shared/service/http-service/http.service";

@Component({
    selector: 'app-commercial-insurance',
    templateUrl: './commercial-insurance.component.html',
    styleUrls: ['./commercial-insurance.component.css']
})
export class CommercialInsuranceComponent implements OnInit, OnDestroy {

    // --> 设置本地list,结果变量
    public table_header = [
        {
            column_name: '姓名',
            column: 'yg_name',
            column_key: 'yg_name',
            filter: 0,
            selected: false,
            adjust: -1
        },
        {
            column_name: '岗位',
            column: 'yg_zhiwei',
            column_key: 'yg_zhiwei',
            filter: 1,
            selected: false,
            adjust: -1
        },
        {
            column_name: '部门',
            column: 'department_name',
            column_key: 'yg_org_id',
            filter: 1,
            selected: false,
            adjust: -1
        },
        {
            column_name: '团体意外伤害险/份',
            column: 'team_num',
            column_key: 'team_num',
            filter: 0,
            selected: false,
            adjust: 0
        },
        {
            column_name: '补充医疗保险/元',
            column: 'sup_type',
            column_key: 'sup_type',
            filter: 0,
            selected: false,
            adjust: 0
        },
        {
            column_name: '操作',
            column: 'operate',
            column_key: 'operate',
            filter: 0,
            selected: false,
            adjust: 0
        }
    ];
    public page_info;
    public staff_list;
    public filter_term;
    public page_header = {
        hr_security: {}
    };
    // <-----
    // -->modal控制
    public modal_name;
    public modal_info;
    public modal_name_emit;
    // <-----

    // -->提交数据
    public submit_data = {};
    // <-----
    public filter_range =
        ['yg_zhiwei', 'yg_org_id'];
    // -->员工选中情况
    public choose_staff_num;
    // <-----
    // -->流变量声明
    public list_info_emit;
    public list_info_url;

    // <-----
    // -->商保开关状态
    public is_buy = new FormControl();
    public is_bill;
    // <-----

    // -->商保时间
    public commercial_time = new Date().getMonth() + 1;
    // <-----
    constructor(public globalFuncService: GlobalFuncService,
                public mayihrFilterService: MayihrFilterService,
                public modalService: ModalService,
                public httpService: HttpService,
                public router: Router,
                public salaryOutsourcingApiService: SalaryOutsourcingApiService) {
        document.title = '商保方案';
        this.list_info_url = this.salaryOutsourcingApiService.getCommercialInsurance();
        this.list_info_emit = this.globalFuncService.getInfoListEmit().subscribe(data => {
            data.subscribe(data1 => {
                console.log('商保', data1);
                if (data1.data.meta.tableHeader.hr_security.type != 0) {
                    this.is_bill = data1.data.meta.is_bill;
                    this.is_buy.setValue('1');
                    this.choose_staff_num = 0;
                    let tmp = JSON.parse(JSON.stringify(data1.data));
                    this.page_header = tmp.meta.tableHeader;
                    this.page_info = tmp.meta.pagination;
                    this.staff_list = tmp.data;
                } else {
                    this.is_buy.setValue('0');
                    this.router.navigate(['/user/commercial-insurance/detail']);
                }
            });
        });
        this.modal_name_emit = this.modalService.getModalNameEmit().subscribe(data => {
            this.modal_name = data;
        });
    }

    ngOnInit() {
        this.mayihrFilterService.getFilterSource().subscribe(data2 => {
            this.filter_term = this.mayihrFilterService.initFilter(data2.data, this.filter_range);
            this.globalFuncService.resetSubmitData();
            this.globalFuncService.setInfoListSource('get', this.list_info_url, this.submit_data);
            this.globalFuncService.emitInfoListSource();
        });
    }

    ngOnDestroy() {
        this.list_info_emit.unsubscribe();
        this.modal_name_emit.unsubscribe();
    }

// -->筛选栏开关控制
    closeFilter(event) {
        for (let i in this.table_header) {
            this.table_header[i].selected = false;
        }
    }

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

    // <-----
    // 选择员工---批量操作员工
    chooseStaff(event, type?) {
        if (type === 'all') {
            this.choose_staff_num = 0;
            this.staff_list.filter(_ => {
                this.choose_staff_num++;
                _.choosed = 1;
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
            console.log(this.choose_staff_num);
        }
        event.stopPropagation();
    }

    // -->操作
    openEditModal(data, type) {
        console.log(data);
        this.modal_info = data;
        this.modal_info['operate_type'] = type;
        if (type == 3) {
            let tmp = '';
            for (let i in this.staff_list) {
                if (this.staff_list[i].choosed) {
                    tmp += `,${this.staff_list[i].yg_id}`;
                }
            }
            this.modal_info['yg_id'] = tmp.substr(1, tmp.length - 1);
        }
        this.modal_name = 'commercial_insurance_edit';
    }

    // <-----

    // -->去商保介绍
    toCommercialDetail() {
        this.router.navigate(['/user/commercial-insurance/detail']);
    }

    // <-----

    // -->商保开关
    toggleCommercial() {
        if (this.is_buy.value == 1) {
            this.httpService.myPost(this.salaryOutsourcingApiService.getCloseCommercial(), {})
                .subscribe(data => {
                    console.log(data);
                    this.router.navigate(['/user/commercial-insurance/detail']);
                }, error => {
                });
        }
        // } else {
        //     this.httpService.myPost(this.salaryOutsourcingApiService.getOpenCommercial(), {})
        //         .subscribe(data => {
        //             console.log(data);
        //         });
        // }
    }

    // <-----
    // -->生成上报账单
    createBill() {
        if (this.is_buy.value == 1 && this.is_bill == 1) {
            const tmp = new Date();
            const tmp_submit = {
                type: 4,
                month: Math.floor(new Date(tmp.getFullYear(), tmp.getMonth(), 1).getTime() / 1000)
            };
            this.httpService.myGet(this.salaryOutsourcingApiService.getOutsourcingCreateBill(), {search: tmp_submit})
                .subscribe(data => {
                    this.router.navigate(['/user/bill-manage']);
                });
        }
    }

    // <-----
}

@Pipe({name: 'SupTypeToNum'})
export class SupTypeToNumPipe implements PipeTransform {
    transform(value): number {
        if (Number(value) == 1) {
            return 80;
        } else if (Number(value) == 2) {
            return 120;
        } else if (Number(value) == 0) {
            return 0;
        }
    }
}