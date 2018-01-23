import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GlobalFuncService} from "../../shared/service/global-func/global-func.service";
import {SalaryOutsourcingApiService} from "../../shared/service/api-service/salary-outsourcing-api/salary-outsourcing-api.service";
import {MayihrFilterService} from "../../shared/service/mayihr-filter/mayihr-filter.service";
import {ModalService} from "../../shared/service/modal/modal.service";
import {URLSearchParams} from "@angular/http";
import {HttpService} from "../../shared/service/http-service/http.service";
import {isNullOrUndefined, isUndefined} from "util";
import {Router} from "@angular/router";
import {AssistModalService} from "../../shared/service/assist-modal-service/assist-modal.service";

@Component({
    selector: 'app-salary-outsourcing',
    templateUrl: './salary-outsourcing.component.html',
    styleUrls: ['./salary-outsourcing.component.css']
})
export class SalaryOutsourcingComponent implements OnInit, OnDestroy {


    @ViewChild('operations')
    operations;
    // --> 设置本地list,结果变量
    public table_header = [
        {
            column_name: '姓名',
            column: 'yg_name',
            column_key: 'yg_name',
            filter: 0,
            selected: false,
            operate_selected: false,
            adjust: -1
        },
        {
            column_name: '工资',
            column: 'yg_is_salary',
            column_key: 'yg_is_salary',
            filter: 1,
            selected: false,
            operate_selected: false,
            adjust: 0
        },
        {
            column_name: '社保',
            column: 'is_pay_social',
            column_key: 'is_pay_social',
            filter: 1,
            selected: false,
            operate_selected: false,
            adjust: 0
        },
        {
            column_name: '社保补缴',
            column: 'social_back',
            column_key: 'social_back',
            filter: 1,
            selected: false,
            operate_selected: false,
            adjust: 0
        },
        {
            column_name: '公积金',
            column: 'is_pay_fund',
            column_key: 'is_pay_fund',
            filter: 1,
            selected: false,
            operate_selected: false,
            adjust: 0
        },
        {
            column_name: '公积金补缴',
            column: 'fund_back',
            column_key: 'fund_back',
            filter: 1,
            selected: false,
            operate_selected: false,
            adjust: 0
        },

        {
            column_name: '商保',
            column: 'yg_is_commercial',
            column_key: 'yg_is_commercial',
            filter: 1,
            selected: false,
            operate_selected: false,
            adjust: 0
        },
        {
            column_name: '操作',
            column: 'operate',
            column_key: 'operate',
            filter: 0,
            selected: false,
            operate_selected: false,
            adjust: 0
        }
    ];
    public page_info;
    public month;
    public city_list: any[];
    public staff_list;
    public total;
    public filter_term;
    // <-----
    // -->modal控制
    public modal_name;
    public modal_info;
    public modal_name_emit;
    // -->
    public modal_callback;
    // <-----

    // <-----
    public op_month;
    // -->提交数据
    public submit_data = {};
    // <-----
    public filter_range = [
        'yg_is_salary', 'is_pay_fund', 'fund_back', 'is_pay_social', 'social_back', 'yg_is_commercial'
    ];
    // -->员工选中情况
    public choose_staff_num;
    // <-----
    // -->流变量声明
    public list_info_emit;
    public list_info_url;
    public info;
    // <-----


    // -->
    public batch_change = [
        {type: 1, text: '批量开启代发工资', status: 1, property: 'yg_is_salary', show: false},
        {type: 2, text: '批量开启社保代缴', status: 1, property: 'is_pay_social', show: false},
        {type: 3, text: '批量开启公积金代缴', status: 1, property: 'is_pay_fund', show: false}
    ];
    // <-----
    // -->可跳转月份
    public month_tags = [];
    // -->
    public back_month_type;
    public back_month_up;
    public back_month_end = true;
    public fund_back_year_list;
    public social_back_year_list;
    public fund_back_year_list_copy;
    public social_back_year_list_copy;
    // <-----
    // -->帐单操作栏
    public bill_operate = false;
    // <-----

    // -->
    public no_list;
    public no_list_msg;
    // <-----

    public current_month;
    public current_city;

    public search_refresh = true;

    public commercial_status;
    public social_status;
    public fund_status;
    public salary_status;

    // -->签约状态
    public user_status;
    // <-----

    // -->全部城市标签下月份与城市关系显示
    public city_month_obj;
    // <-----

    // -->辅助modal
    // public assist_name;
    // public assist_info;
    // public assist_handler;
    // public assist_emitter;
    // <-----

    constructor(public globalFuncService: GlobalFuncService,
                public mayihrFilterService: MayihrFilterService,
                public modalService: ModalService,
                public httpService: HttpService,
                public router: Router,
                public assistModalService: AssistModalService,
                public salaryOutsourcingApiService: SalaryOutsourcingApiService) {
        document.title = '薪酬外包';
        this.list_info_url = this.salaryOutsourcingApiService.getOutsourcingIndex();

        this.list_info_emit = this.globalFuncService.getInfoListEmit().subscribe(data => {
            data.subscribe(data1 => {
                    console.log(JSON.parse(JSON.stringify(data1.data)));
                    if (JSON.stringify(data1.data) !== '[]') {
                        if (data1.data.meta.user_alert.salary_supported == 1 || data1.data.meta.user_alert.social_supported == 1) {
                            this.modal_name = 'salary_support';
                            this.modal_info = {
                                salary_supported: data1.data.meta.user_alert.salary_supported,
                                social_supported: data1.data.meta.user_alert.social_supported
                            };
                        }
                        this.choose_staff_num = 0;
                        this.no_list = 0;
                        console.log('外包信息：', data1);
                        this.info = data1.data.meta;
                        // -->签约信息
                        this.user_status = this.info.user_type;
                        // <-----
                        this.month_tags = this.info.month_tag;
                        this.month_tags = this.month_tags.map(value => {
                            return {
                                month: new Date(value * 1000).getMonth() + 1,
                                current: value == data1.data.meta.current_month,
                                value: value
                            };
                        });
                        // 员工列表
                        this.staff_list = data1.data.data;
                        // 日历数据
                        for (let i in this.staff_list) {
                            this.staff_list[i]['operate_selected'] = false;
                            this.staff_list[i]['is_pay_social'] = Number(this.staff_list[i]['is_pay_social']);
                            this.initYearList(this.staff_list[i], 'fund');
                            this.initYearList(this.staff_list[i], 'social');
                        }
                        // 其他信息
                        this.city_list = this.info.city;
                        this.page_info = this.info.pagination;
                        this.op_month = this.info.op_month;
                        this.month = new Date(this.info.current_month * 1000).getMonth() + 1;
                        //
                        this.total = this.info.total;
                        // -->获取城市相关
                        this.current_city = 0;
                        this.city_list.map((val) => {
                            if (val.selected === 1) {
                                this.current_city = val.id;
                            }
                        });

                        // if (this.current_city === 0) {
                        this.info['month_str'] = {};
                        this.info.month_str['fund'] = this.getCityString(this.info.pay_month['fund']);
                        this.info.month_str['social'] = this.getCityString(this.info.pay_month['social']);
                        this.info.month_str['salary'] = `${new Date(Number(this.info.pay_month['salary']) * 1000).getMonth() + 1}月`;
                        this.city_month_obj = this.info.month_str;
                        // }
                        // <-----
                        this.month_tags.map((val) => {
                            if (val.current) {
                                this.current_month = val.value;
                            }
                        });
                    } else {
                        this.no_list = 1;
                    }
                }
            );
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

    // -->显示城市字段的生成
    getCityString(type) {
        const city_arr = [];
        for (const month in type) {
            console.log(month);
            const tmp_obj = {};
            tmp_obj['month'] = `${new Date(Number(month) * 1000).getMonth() + 1}月`;
            tmp_obj['month_str'] = this.formatCityName(type[month]);
            city_arr.push(tmp_obj);
        }
        return city_arr;
    }

    formatCityName(str) {
        str = String(str);
        const city_id_arr = str.split(',');
        city_id_arr.map((value, index) => {
            for (const city of this.city_list) {
                if (city.id != 0) {
                    if (value == city.id) {
                        city_id_arr[index] = city.name;
                    }
                }
            }
        });
        return city_id_arr.join(',');
    }

    // <-----
    // -->
    refreshList() {
        this.search_refresh = false;
        setTimeout(() => {
            this.search_refresh = true;
        });
        this.submit_data = {
            info: {
                month: this.current_month
            }
        };
        if (this.current_city != 0) {
            this.submit_data['info']['city'] = this.current_city;
        }
        this.globalFuncService.resetSubmitData();
        this.globalFuncService.setInfoListSource('get', this.list_info_url, this.submit_data);
        this.globalFuncService.emitInfoListSource();
    }

    // <-----
    // -->选择需要计算的月份
    selectMonth(month) {
        for (let i of this.month_tags) {
            i.current = false;
            if (month.value == i.value) {
                month.current = true;
            }
        }
        this.search_refresh = false;
        setTimeout(() => {
            this.search_refresh = true;
        });
        this.submit_data = {month: {month: month.value}};
        this.globalFuncService.resetSubmitData();
        this.globalFuncService.setInfoListSource('get', this.list_info_url, this.submit_data);
        this.globalFuncService.emitInfoListSource();
    }

    // <-----
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
    // -->选择城市
    chooseCity(city) {
        this.search_refresh = false;
        setTimeout(() => {
            this.search_refresh = true;
        });
        this.globalFuncService.resetSubmitData();
        if (isUndefined(city) || city.id == 0) {
            this.globalFuncService.setInfoListSource('get', this.list_info_url, {
                city: {
                    city: '',
                    month: this.current_month
                }
            });
        } else {
            this.globalFuncService.setInfoListSource('get', this.list_info_url, {
                city: {
                    city: city.id,
                    month: this.current_month
                }
            });
        }
        this.globalFuncService.emitInfoListSource();
    }

    // <-----
// -->补交月控制
    openBackMonth(staff, type, event) {
        this.back_month_up = false;
        if (document.documentElement.clientHeight - event.clientY < 300) {
            this.back_month_up = true;
        }
        this.back_month_type = type;
        if (staff[`${type}_back_month_selected`]) {
            staff[`${type}_back_month_selected`] = false;
        } else {
            for (const i in this.staff_list) {
                this.staff_list[i][`${type}_back_month_selected`] = false;
            }
            staff[`${type}_back_month_selected`] = true;
        }
        event.stopPropagation();
    }

    closeBackMonth(staff) {
        this.back_month_end = true;
        staff.social_back_month_selected = false;
        staff.fund_back_month_selected = false;
    }

    // 选月份功能数据初始化
    initYearList(staff, type) {
        let tmp_tlist_copy = [];
        if (!(`${type}_back_year_list` in staff)) {
            tmp_tlist_copy = JSON.parse(JSON.stringify(staff[`${type}_tlist`]));
            for (let i in staff[`${type}_tlist`]) {
                let tmp = JSON.parse(JSON.stringify(staff[`${type}_tlist`][i]));
                tmp_tlist_copy[i] = {
                    month: tmp,
                    is_back: false,
                    selected: false
                };
            }
            if (!isNullOrUndefined(staff[`${type}_back`]) && staff[`${type}_back`].length > 0) {
                console.log(tmp_tlist_copy);
                for (let i in tmp_tlist_copy) {
                    let tmp = JSON.parse(JSON.stringify(tmp_tlist_copy[i].month));
                    for (let j in staff[`${type}_back`]) {
                        if (staff[`${type}_back`][j] === tmp) {
                            tmp_tlist_copy[i] = {
                                month: tmp,
                                is_back: true,
                                selected: true
                            };
                            break;
                        }
                    }
                }
                console.log(tmp_tlist_copy);
            }
            if (tmp_tlist_copy.length > 0) {
                let tmp_tlist = JSON.parse(JSON.stringify(tmp_tlist_copy));
                let output_tlist = [];
                let counter = 0;
                let tmp_is_end = false;
                output_tlist.push({
                    year: tmp_tlist[0].month.substr(0, 4),
                    month: []
                });
                for (const i in tmp_tlist) {
                    let index = Number(i);
                    output_tlist[counter].month.push({
                        month: Number(tmp_tlist[i].month.substr(5, 2)),
                        is_back: tmp_tlist[i].is_back,
                        selected: tmp_tlist[i].selected,
                    });
                    if (!tmp_is_end && tmp_tlist[i].selected) {
                        output_tlist[counter].month[output_tlist[counter].month.length - 1]['start_selected'] = true;
                        tmp_is_end = true;
                    }
                    if ((tmp_is_end && !isUndefined(tmp_tlist[index + 1]) && !tmp_tlist[index + 1].selected) || (tmp_is_end && isUndefined(tmp_tlist[index + 1]))) {
                        output_tlist[counter].month[output_tlist[counter].month.length - 1]['end_selected'] = true;
                        tmp_is_end = false;
                    }
                    if (!isUndefined(tmp_tlist[index + 1])) {
                        if (tmp_tlist[i].month.substr(0, 4) !== tmp_tlist[index + 1].month.substr(0, 4)) {
                            output_tlist.push({
                                year: tmp_tlist[index + 1].month.substr(0, 4),
                                month: []
                            });
                            counter++;
                        }
                    }
                }
                staff[`${type}_back_year_list`] = output_tlist;
                staff[`${type}_back_year_list_copy`] = JSON.parse(JSON.stringify(staff[`${type}_back_year_list`]));
            } else {
                staff[`${type}_back_year_list`] = [];
            }
        }

        let start_text;
        let end_text;
        let month_counter = 0;
        for (let _year of staff[`${type}_back_year_list`]) {
            for (let _month of _year.month) {
                if ('start_selected' in _month) {
                    start_text = _month.month;
                }
                if ('end_selected' in _month) {
                    end_text = _month.month;
                }
                if ('selected' in _month && _month.selected) {
                    month_counter++;
                }
            }
        }
        if (month_counter === 1) {
            staff[`${type}_back_text`] = `${start_text}月`;
        } else if (month_counter > 1) {
            staff[`${type}_back_text`] = `${start_text}月~${end_text}月(共${month_counter}月)`;
        } else if (month_counter === 0) {
            staff[`${type}_back_text`] = '';
        }
        staff[`${type}_back_year_list_copy`] = JSON.parse(JSON.stringify(staff[`${type}_back_year_list`]));

    }

    // <-----
    // -->补交月选择
    // <-----
    chooseBackMonth(staff, year, month, type) {
        if (this.back_month_end) {
            for (const _year of staff[`${type}_back_year_list_copy`]) {
                for (const _month of _year['month']) {
                    _month['selected'] = false;
                    if (_month.hasOwnProperty('start_selected')) {
                        delete _month['start_selected'];
                    }
                    if (_month.hasOwnProperty('end_selected')) {
                        delete _month['end_selected'];
                    }
                }
            }
            staff[`${type}_back_year_list_copy`][year].month[month]['selected'] = true;
            staff[`${type}_back_year_list_copy`][year].month[month]['start_selected'] = true;
            staff[`${type}_back_year_list_copy`][year].month[month]['end_selected'] = true;
            this.back_month_end = !this.back_month_end;
        } else {
            if (staff[`${type}_back_year_list_copy`][year].month[month]['start_selected'] !== true) {
                staff[`${type}_back_year_list_copy`][year].month[month]['selected'] = true;
                staff[`${type}_back_year_list_copy`][year].month[month]['end_selected'] = true;
                staff[`${type}_back_year_list_copy`][year].month[month]['start_selected'] = true;
                let tmp = staff[`${type}_back_year_list_copy`];
                let if_change = false;
                let if_start = true;
                for (const i in tmp) {
                    for (const j in tmp[i]['month']) {
                        if (if_change) {
                            tmp[i]['month'][j].selected = true;
                        }
                        if (tmp[i]['month'][j].hasOwnProperty('start_selected') || tmp[i]['month'][j].hasOwnProperty('end_selected')) {
                            if_change = !if_change;
                            if (if_start) {
                                delete tmp[i]['month'][j].end_selected;
                                if_start = !if_start;
                            } else {
                                delete tmp[i]['month'][j].start_selected;
                            }
                        }
                    }
                }
                this.back_month_end = !this.back_month_end;
            }
        }
    }

    // <-----
    // -->月份选择开关
    cancelChooseMonth(staff) {
        console.log(123123);
        this.initYearList(staff, 'social');
        this.initYearList(staff, 'fund');
        this.closeBackMonth(staff);
    }

    submitChooseMonth(staff, type) {
        let back_submit_data = {
            op_month: this.op_month.operation,
            yg_id: staff.yg_id,
        };
        if (type === 'fund') {
            back_submit_data['type'] = 2;
        } else {
            back_submit_data['type'] = 1;
        }
        for (let _year of staff[`${type}_back_year_list_copy`]) {
            for (let _month of _year.month) {
                if (_month.hasOwnProperty('start_selected') && _month['start_selected']) {
                    if (_month.month < 10) {
                        back_submit_data['start'] = `${_year.year}-0${_month.month}`;
                    } else {
                        back_submit_data['start'] = `${_year.year}-${_month.month}`;

                    }
                }
                if (_month.hasOwnProperty('end_selected') && _month['end_selected']) {
                    if (_month.month < 10) {
                        back_submit_data['end'] = `${_year.year}-0${_month.month}`;
                    } else {
                        back_submit_data['end'] = `${_year.year}-${_month.month}`;

                    }
                }
            }
        }
        this.httpService.myPost(this.salaryOutsourcingApiService.getOutsourcingBack(), back_submit_data)
            .subscribe(data => {
                this.refreshList();
            });
    }

    // -->删除补缴
    deleteBackMonth(staff, type) {
        staff[`${type}_back`] = [];
        delete staff[`${type}_back_year_list_copy`];
        delete staff[`${type}_back_year_list`];
        this.initYearList(staff, type);
        const search = new URLSearchParams();
        search.append('yg_id', staff.yg_id);
        if (type === 'social') {
            search.append('type', '1');
        } else {
            search.append('type', '2');
        }
        search.append('op_month', this.op_month.operation);
        this.httpService.myGet(this.salaryOutsourcingApiService.getOutsourcingDelete(), {search: search})
            .subscribe(data => {
                this.globalFuncService.emitInfoListSource();
            });
    }

    // <-----
    // <-----
// -->员工操作栏开关
    openOperate(event, staff, index) {
        const tmp_arr = document.getElementsByClassName('icon_detail');
        if (tmp_arr.length > 3 && index >= tmp_arr.length - 2) {
            staff['direction_reverse'] = true;
        }
        if (staff.operate_selected) {
            staff.operate_selected = false;
        } else {
            for (const i in this.staff_list) {
                this.staff_list[i]['operate_selected'] = false;
            }
            staff.operate_selected = true;
        }
        event.stopPropagation();
    }

    clickCloseOperate(event, staff) {
        event.stopPropagation();

        this.closeOperate(staff);
    }

    // -->关闭操作栏
    closeOperate(staff) {
        staff.operate_selected = false;
    }

    // -->单个服务操作更改
    chooseOperate(event, staff, type) {
        let tmp = {
            yg_is_salary: 1,
            social: 2,
            fund: 3
        };
        if (type === 'fund' || type === 'social') {
            if (staff[`is_pay_${type}_status`] == 0) {
                if (staff[`is_pay_${type}_stop`] != 1) {
                    if (staff[`is_pay_${type}_edit`] === 1 && staff[`is_pay_${type}_data`] === 1) {
                        if (staff[`is_${type}_touched`]) {
                            this.closeOperate(staff);
                            this.modal_info = {
                                staff: staff,
                                type: type === 'social' ? 2 : 3,
                                tmp: JSON.parse(JSON.stringify(tmp)),
                                op_month: this.op_month.operation
                            };
                            const status = window.localStorage.getItem(`${type}_pre_fire`);
                            if (Number(status) == 1 && staff[`is_pay_${type}`]) {
                                this.modal_name = 'social_assurance_reduce';
                                this.modal_info['name'] = `${type}_pre_fire`;
                                this.modal_callback = () => {
                                    this.globalFuncService.emitInfoListSource();
                                };
                                console.log(this.modal_callback);
                            } else {
                                this.httpService.myPost(this.salaryOutsourcingApiService.getOutsourcingEdit(), {
                                    yg_id: `${this.modal_info.staff['yg_id']}`,
                                    is_cover: Number(!this.modal_info.staff[`is_pay_${this.modal_info.type}`]),
                                    type: this.modal_info.type,
                                    op_month: this.modal_info.op_month
                                }).subscribe(data => {
                                    this.globalFuncService.emitInfoListSource();
                                });
                            }
                        } else {
                            if (type === 'social' && staff.yg_is_commercial == 1 && staff.is_pay_social == 1) {
                                this.closeOperate(staff);
                                this.assistModalService.openAssistModal('confirm',
                                    '员工当前通过蚂蚁HR购买商保，如果投保月份社保没有正常缴纳商保将无法使用，点击继续代表您理解此风险。',
                                    () => {
                                        this.httpService.myPost(this.salaryOutsourcingApiService.getOutsourcingEdit(), {
                                            yg_id: `${staff.yg_id}`,
                                            is_cover: Number(!staff[`is_pay_${type}`]),
                                            type: tmp[type],
                                            op_month: this.op_month.operation
                                        }).subscribe(data => {
                                            staff[`is_pay_${type}`] = Number(!staff[`is_pay_${type}`]);
                                            this.assistModalService.openAssistModal('toast', '操作成功', () => {
                                                this.globalFuncService.emitInfoListSource();
                                            });
                                        });
                                    });
                            } else {
                                this.httpService.myPost(this.salaryOutsourcingApiService.getOutsourcingEdit(), {
                                    yg_id: `${staff.yg_id}`,
                                    is_cover: Number(!staff[`is_pay_${type}`]),
                                    type: tmp[type],
                                    op_month: this.op_month.operation
                                }).subscribe(data => {
                                    this.closeOperate(staff);
                                    staff[`is_pay_${type}`] = Number(!staff[`is_pay_${type}`]);
                                    this.assistModalService.openAssistModal('toast', '操作成功', () => {
                                        this.globalFuncService.emitInfoListSource();
                                    });
                                });
                            }
                        }
                    }
                }
            }
        } else if (type === 'commercial') {
            if (staff[`yg_is_${type}_status`] == 0) {
                if (staff[`yg_is_${type}_stop`] != 1) {
                    if (staff[`yg_is_${type}_edit`] === 1) {
                        console.log(staff);
                        this.closeOperate(staff);
                        this.modal_name = 'commercial_insurance_edit';
                        this.modal_info = {
                            sup_type: staff.sup_type,
                            team_num: staff.team_num,
                            operate_type: 1,
                            yg_id: `${staff.yg_id}`
                        };
                    }
                }
            }
            // this.modal_callback = this.globalFuncService.emitInfoListSource();
        } else {
            if (this.op_month.yg_is_salary == this.op_month.operation) {
                if (staff[`${type}_stop`] != 1) {
                    if (staff[`${type}_edit`] === 1 && staff[`${type}_data`] === 1) {
                        // if (type ===)
                        this.closeOperate(staff);
                        this.httpService.myPost(this.salaryOutsourcingApiService.getOutsourcingEdit(), {
                            yg_id: `${staff.yg_id}`,
                            is_cover: Number(!staff[type]),
                            type: 1,
                            op_month: this.op_month.operation
                        }).subscribe(data => {
                            this.closeOperate(staff);
                            this.assistModalService.openAssistModal('toast', '操作成功', () => {
                                this.globalFuncService.emitInfoListSource();
                            });
                        });
                    }
                }
            }
        }
        event.stopPropagation();
    }

    // <-----
    // <-----
    clickChooseStaff(event, type?) {
        event.stopPropagation();
        this.chooseStaff(type);
    }

    // 选择员工---批量操作员工
    chooseStaff(type?) {
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
        }
        let tmp_salary = false;
        let tmp_social = false;
        let tmp_fund = false;
        let tmp_salary_show = true;
        let tmp_fund_show = true;
        let tmp_social_show = true;
        for (const staff of this.staff_list) {
            if (staff.choosed === 1) {
                if (staff.yg_is_salary_stop == 1) {
                    tmp_salary_show = false;
                } else {
                    if (staff.yg_is_salary_status == 0) {
                        if (staff.yg_is_salary_edit) {
                            if (staff.yg_is_salary === 0) {
                                tmp_salary = true;
                            }
                        } else {
                            tmp_salary_show = false;
                        }
                    }
                }

                if (staff.is_pay_fund_stop == 1) {
                    tmp_fund_show = false;
                } else {
                    if (staff.is_pay_fund_status == 0) {
                        if (staff.is_pay_fund_edit) {
                            if (staff.is_pay_fund == 0) {
                                tmp_fund = true;
                            }
                        } else {
                            tmp_fund_show = false;
                        }
                    }
                }

                if (staff.is_pay_social_stop == 1) {
                    tmp_social_show = false;
                } else {
                    if (staff.is_pay_social_status == 0) {
                        if (staff.is_pay_social_edit) {
                            if (staff.is_pay_social == 0) {
                                tmp_social = true;
                            }
                        } else {
                            tmp_social_show = false;
                        }
                    }
                }
            }
        }
        if (tmp_salary_show) {
            this.batch_change[0].show = true;
            if (tmp_salary) {
                this.batch_change[0].status = 1;
                this.batch_change[0].text = '批量开启代发工资';
            } else {
                this.batch_change[0].status = 0;
                this.batch_change[0].text = '批量关闭代发工资';
            }
        } else {
            this.batch_change[0].show = false;

        }
        if (tmp_social_show) {
            this.batch_change[1].show = true;

            if (tmp_social) {
                this.batch_change[1].status = 1;
                this.batch_change[1].text = '批量开启社保代缴';
            } else {
                this.batch_change[1].status = 0;
                this.batch_change[1].text = '批量关闭社保代缴';
            }
        } else {
            this.batch_change[1].show = false;

        }
        if (tmp_fund_show) {
            this.batch_change[2].show = true;
            if (tmp_fund) {
                this.batch_change[2].status = 1;
                this.batch_change[2].text = '批量开启公积金代缴';
            } else {
                this.batch_change[2].status = 0;
                this.batch_change[2].text = '批量关闭公积金代缴';
            }
        } else {
            this.batch_change[2].show = false;
        }
    }

    // -->批量操作控制
    chooseBatchOperate(operate) {
        let is_touched = false;
        const batch_submit_data = {
            yg_id: '',
            type: operate.type,
            is_cover: operate.status,
            op_month: this.op_month.operation
        };
        const failed_arr = [];
        for (const staff of  this.staff_list) {
            if (staff.choosed === 1) {
                if (staff[`${operate.property}_edit`] === 1) {
                    batch_submit_data.yg_id += `${staff.yg_id},`;
                } else {
                    failed_arr.push(staff);
                }
            }
            if (staff[`${operate.type}_touched`]) {
                is_touched = true;
            }
        }
        batch_submit_data.yg_id = batch_submit_data.yg_id.substr(0, batch_submit_data.yg_id.length - 1);
        if (is_touched) {
            this.modal_name = 'social_assurance_reduce';
            this.modal_info = {
                submit_data: JSON.parse(JSON.stringify(batch_submit_data)),
                staff_list: this.staff_list,
                callback: () => {
                    if (batch_submit_data.yg_id.length !== 0) {
                        this.httpService.myPost(this.salaryOutsourcingApiService.getOutsourcingEdit(), batch_submit_data)
                            .subscribe(data => {
                                this.refreshList();
                            });
                    } else {
                        this.modal_name = 'batch_operate_result';
                        this.modal_info = failed_arr;
                    }
                }
            };
        }
        if (batch_submit_data.yg_id.length !== 0) {
            this.httpService.myPost(this.salaryOutsourcingApiService.getOutsourcingEdit(), batch_submit_data)
                .subscribe(data => {
                    // this.globalMaskControlService.emitBindStatus(false);
                    for (const staff of this.staff_list) {
                        if (staff.choosed === 1 && staff[`${operate.property}_edit`] === 1) {
                            staff[`${operate.property}`] = batch_submit_data.is_cover;
                        }
                    }
                    this.chooseStaff('none');
                    if (failed_arr.length > 0) {
                        this.modal_name = 'batch_operate_result';
                        this.modal_info = failed_arr;
                        this.refreshList();

                    } else {
                        this.assistModalService.openAssistModal('toast', '批量操作成功', () => {
                            this.refreshList();
                        });
                    }
                });
        } else {
            this.modal_name = 'batch_operate_result';
            this.modal_info = failed_arr;
        }
    }

    // <-----
    // -->
    // -->待支付订单操作
    payBill(event, type?, prevent?) {
        console.log(event, type, prevent);
        event.stopPropagation();
        if (this.choose_staff_num <= 0) {
            if (prevent != 0) {
                if (isUndefined(type)) {
                    if (this.info.user_alert.is_filed) {
                        this.closeBillOperate();
                        const status = window.localStorage.getItem('archive_status');
                        console.log(status);
                        this.modal_info = {
                            city: this.current_city,
                            month: this.current_month
                        };
                        if (Number(status) == 1) {
                            this.modal_name = 'bill_filed';
                        } else {
                            if (this.modal_info.city == 0) {
                                delete this.modal_info.city;
                            }
                            this.httpService.myGet(this.salaryOutsourcingApiService.getOutsourcingCreateBill(), {search: this.modal_info})
                                .subscribe(data => {
                                    this.assistModalService.openAssistModal('toast', '账单生成成功', () => {
                                        this.router.navigate(['/user/bill-manage']);
                                    });
                                });
                        }
                    } else {
                        let tmp_submit = {month: this.current_month};
                        if (this.current_city != 0) {
                            tmp_submit['city'] = this.current_city;
                        }
                        this.httpService.myGet(this.salaryOutsourcingApiService.getOutsourcingCreateBill(), {search: tmp_submit})
                            .subscribe(data => {
                                this.router.navigate(['/user/bill-manage']);
                                this.closeBillOperate();
                            });
                    }
                } else {
                    if (this.info.user_alert.is_filed && type == 1) {
                        this.closeBillOperate();
                        const status = window.localStorage.getItem('archive_status');
                        this.modal_info = {
                            city: this.current_city,
                            month: this.current_month,
                            type: type
                        };
                        if (Number(status) == 1) {
                            this.modal_name = 'bill_filed';

                        } else {
                            if (this.modal_info.city == 0) {
                                delete this.modal_info.city;
                            }
                            this.httpService.myGet(this.salaryOutsourcingApiService.getOutsourcingCreateBill(), {search: this.modal_info})
                                .subscribe(data => {
                                    this.assistModalService.openAssistModal('toast', '账单生成成功', () => {
                                        this.router.navigate(['/user/bill-manage']);
                                    });
                                });
                        }
                    } else {
                        const tmp_submit = {
                            type: type,
                            month: this.current_month
                        };
                        tmp_submit['type'] = type;
                        if (this.current_city != 0) {
                            tmp_submit['city'] = this.current_city;
                        }
                        this.httpService.myGet(this.salaryOutsourcingApiService.getOutsourcingCreateBill(), {search: tmp_submit})
                            .subscribe(data => {
                                this.router.navigate(['/user/bill-manage']);
                                this.closeBillOperate();

                            });
                    }
                }
            }
        }
    }

    operateBill(event) {
        if (this.choose_staff_num <= 0) {
            this.bill_operate = true;
            console.log(this.total);
            event.stopPropagation();
        }
    }

    clickCloseBillOperate(event) {
        this.closeBillOperate();
        event.stopPropagation();
    }

    // -->关闭操作栏
    closeBillOperate() {
        this.bill_operate = false;
    }
}