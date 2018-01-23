import {EventEmitter, Injectable} from '@angular/core';
import {StaffsService} from '../api-service/staff-directory/staffs/staffs.service';
import {Observable} from 'rxjs/Observable';
import {NameHookService} from '../staff-directory/name-hook/name-hook.service';
import {isUndefined} from 'util';
import {HttpService} from '../http-service/http.service';

@Injectable()
export class MayihrFilterService {
    // -->筛选内容获取，整理
    // <-----

    // -->筛选url流
    public filterSource: Observable<any>;
    public origin_filter_data;
    public filter_url;
    public filter_data;
    // <-----

    // -->表头数据
    public table_header;
    // <-----
    public local_filter;
    public local_filter_emit = new EventEmitter();

    // -->静态数据
    public type_filter = [
        {id: 1, name: '加班'}, {id: 2, name: '缺勤'}
    ];
    // public process_way_filter = [
    //     {id: 1, name: '申请调休'}, {id: 2, name: '申请加班费'},
    //     {id: 12, name: '年假'}, {id: 13, name: '调休'}, {id: 14, name: '事假'}, {id: 15, name: '病假'}, {id: 16, name: '婚嫁'}];
    public process_way_filter = [
        {id: 1, name: '申请调休'}, {id: 2, name: '申请加班工资'},
        {id: 13, name: '调休/年假'}, {id: 14, name: '无薪假'}, {id: 15, name: '病假'}, {id: 16, name: '婚假'},
        {id: 18, name: '产假'},
        {id: 19, name: '丧假'}];

    public be_id_filter = [
        {id: 0, name: '否'}, {id: 1, name: '是'}
    ];
    public adjust_type_filter = [
        {id: 'add', name: '发放加班工资人数'}, {id: 'increase', name: '本月薪酬调整人数'},
        {id: 'leave', name: '缺勤/病假扣款人数'}, {id: 'adjust', name: '快捷调整'}
    ];
    public show_cover_only_filter = [{id: '1', name: '覆盖人数'}];
    public is_pay_salary = [{id: '0', name: '未选择'}, {id: '1', name: '已选择'}];
    public is_pay_fund = [{id: '0', name: '未选择'}, {id: '1', name: '已选择'}];
    public fund_back = [{id: '0', name: '未选择'}, {id: '1', name: '已选择'}];
    public yg_is_social = [{id: '0', name: '未选择'}, {id: '1', name: '已选择'}];
    public social_back = [{id: '0', name: '未选择'}, {id: '1', name: '已选择'}];
    public yg_is_commercial = [{id: '0', name: '未选择'}, {id: '1', name: '已选择'}];
    public has_benifit = [{id: '0', name: '不享受'}, {id: '1', name: '享受'}];
    public yg_login = [{id: '2', name: '未开通'}, {id: '1', name: '已开通'}];
    // <-----


    constructor(public staffsService: StaffsService,
                public httpService: HttpService,
                public nameHookService: NameHookService) {
    }

    // -->筛选条件初始化
    initFilter(data, filter_terms: string[], total?: object) {
        if (data !== '') {
            this.setOriginFilterData(data);
        }
        return this.local_filter = this.getFilterData(filter_terms);
    }

    // <-----
    resetFilterItem() {
        this.local_filter = undefined;
    }

    getFilterSource() {
        this.filter_url = this.staffsService.getStaffsIndexSetting();
        this.filterSource = this.httpService.myGet(this.filter_url);
        return this.filterSource;
    }

    getFilterData(filter_terms: string[]) {
        const filter_choosed = [];
        for (const i in filter_terms) {
            if (!isUndefined(filter_terms[i])) {
                filter_choosed.push(this.filter_data.find((val, index) => {
                    return val.commit_id == filter_terms[i];
                }));
            }
        }
        return filter_choosed;
    }

    getOriginFilterData() {
        return this.origin_filter_data;
    }

    // -->删除表头信息，添加静态筛选条件
    setOriginFilterData(data) {
        this.table_header = JSON.parse(JSON.stringify(data['index_columns']));
        delete data['index_columns'];
        this.origin_filter_data = data;
        console.log(JSON.parse(JSON.stringify(this.origin_filter_data)));
        this.addNewFilter('type', this.type_filter);
        this.addNewFilter('process_way', this.process_way_filter);
        this.addNewFilter('be_id', this.be_id_filter);
        this.addNewFilter('adjust_type', this.adjust_type_filter);
        this.addNewFilter('show_cover_only', this.show_cover_only_filter);
        this.addNewFilter('yg_is_salary', this.is_pay_salary);
        this.addNewFilter('is_pay_fund', this.is_pay_fund);
        this.addNewFilter('fund_back', this.fund_back);
        this.addNewFilter('is_pay_social', this.yg_is_social);
        this.addNewFilter('social_back', this.social_back);
        this.addNewFilter('yg_is_commercial', this.yg_is_commercial);
        this.addNewFilter('has_benifit', this.has_benifit);
        this.addNewFilter('yg_login', this.yg_login);

        this.filter_data = this.compileFilterData(this.origin_filter_data);
        console.log(this.filter_data);
        this.emitLocalFilter();
    }

    // <-----
    // -->添加筛选条件
    addNewFilter(parent_id, child_arr) {
        this.origin_filter_data[parent_id] = child_arr;
    }

    // <-----
    // -->添加快捷筛选显示项
    setTotal(filter_terms, total) {
        for (const i in total) {
            for (const j in total[i]) {
                for (const k in filter_terms) {
                    if (filter_terms[k]['commit_id'] === i) {
                        for (const l in filter_terms[k].child) {
                            if (filter_terms[k].child[l].id == total[i][j].id) {
                                filter_terms[k].child[l]['total'] = total[i][j]['total'];
                                filter_terms[k].child[l]['header'] = true;
                            }
                        }
                    }
                }
            }
        }
        return filter_terms;
    }

    // <-----
    // -->筛选数据compile
    compileFilterData(getTerm) {
        const termArr: Array<FilterTerm> = [];
        const name_hook = this.nameHookService.getHook();
        console.log(getTerm);
        for (const i in getTerm) {
            for (const j in getTerm[i]) {
                getTerm[i][j]['status'] = false;
                getTerm[i][j]['header'] = false;
                if (i === 'status' || i === 'others') {
                    getTerm[i][j]['status_show'] = false;
                } else {
                    getTerm[i][j]['status_show'] = true;
                }
            }
            let show_name;
            if (i in name_hook) {
                show_name = name_hook[i];
            }
            termArr.push(new FilterTerm(show_name, getTerm[i], i));
        }
        return termArr;
    }

    // <-----

    // -->本地存储 组建件沟通
    setLocalFilter(data) {
        console.log(data);
        this.local_filter = data;
    }

    getLocalFilter() {
        return this.local_filter;
    }

    getLocalFilterEmit() {
        return this.local_filter_emit;
    }

    emitLocalFilter() {
        console.log(this.local_filter);
        if (this.local_filter) {
            this.local_filter_emit.emit(this.local_filter);
        }
    }

    // <-----

    compileFilterEmit() {
        let compile_result = {};
        for (const i in this.local_filter) {
            for (const j in this.local_filter[i].child) {
                if (this.local_filter[i].child[j].status) {
                    if (compile_result.hasOwnProperty(`${this.local_filter[i]['commit_id']}`)) {
                        compile_result[this.local_filter[i]['commit_id']].push(this.local_filter[i].child[j]['id']);
                    } else {
                        compile_result[this.local_filter[i]['commit_id']] = [];
                        compile_result[this.local_filter[i]['commit_id']].push(this.local_filter[i].child[j]['id']);
                    }
                }
            }
        }
        console.log(compile_result);
        return {filter: compile_result};
    }

    // -->获取表头
    getTableHeader() {
        const tmp_arr = [];
        for (let i in this.table_header) {
            this.table_header[i]['selected'] = false;
            if (this.table_header[i].column_key === 'status') {
                this.table_header[i].filter = 0;
            }
            tmp_arr[this.table_header[i]['sort'] - 1] = this.table_header[i];
        }
        this.table_header = tmp_arr;
        return this.table_header;
    }

    // <-----
}
export class FilterTerm {
    constructor(public name: string,
                public child: ChildFilter[],
                public commit_id: string) {
    }
}
export class ChildFilter {
    constructor(public id: number,
                public name: string,
                public status: boolean) {
    }
}
