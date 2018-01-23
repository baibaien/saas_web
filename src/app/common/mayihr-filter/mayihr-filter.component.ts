import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {MayihrFilterService} from "../../shared/service/mayihr-filter/mayihr-filter.service";
import {GlobalFuncService} from "../../shared/service/global-func/global-func.service";

@Component({
    selector: 'mayihr-filter',
    templateUrl: './mayihr-filter.component.html',
    styleUrls: ['./mayihr-filter.component.css']
})
export class MayihrFilterComponent implements OnInit, OnChanges, OnDestroy {
    @Input()
    has_border = false;
    @Input()
    request_url;
    @Input()
    request_type;
    // -->视图类型,quick_filter或table_filter
    @Input()
    view_type;
    // <-----
    // -->单选or多选
    @Input()
    choose_type;
    // <-----
    // -->筛选内容数据
    @Input()
    operate_data;
    // <-----
    // -->筛选条件
    @Input()
    filter_term;
    // <-----
    // -->关闭筛选栏
    @Output()
    close_filter = new EventEmitter();
    // <-----
    @Input()
    init_choose
    public filter_term_emitter;
    public table_header_emitter = new EventEmitter();
    public submit_data = {};
    // <-----
    constructor(public mayihrFilterService: MayihrFilterService,
                public globalFuncService: GlobalFuncService) {
        this.filter_term_emitter = this.mayihrFilterService.getLocalFilterEmit().subscribe(data => {
            this.filter_term = data;
        });
    }

    ngOnInit() {
    }
    ngOnChanges() {
    }
    ngOnDestroy() {
        this.filter_term_emitter.unsubscribe();
    }

    chooseFilter(_parent, _child) {
        console.log(123123);
        if (!this.submit_data.hasOwnProperty('filter')) {
            this.submit_data['filter'] = {};
        }
        let child = this.filter_term[_parent].child[_child];
        // 快捷筛选
        if (this.view_type === 'quick_filter') {
            // 单选
            if (this.choose_type === 'single') {
                if (!child.status) {
                    for (const i in this.filter_term) {
                        for (const j in this.filter_term[i].child) {
                            this.filter_term[i].child[j].status = false;
                        }
                    }
                    child.status = true;
                } else {
                    child.status = false;
                }
                this.mayihrFilterService.setLocalFilter(this.filter_term);
                this.mayihrFilterService.emitLocalFilter();
                this.submit_data = Object.assign(this.submit_data, this.mayihrFilterService.compileFilterEmit());
                this.globalFuncService.setInfoListSource(this.request_type, this.request_url, this.submit_data);
                this.globalFuncService.emitInfoListSource();
            } else {
                // 多选
                if (child.status) {
                    child.status = false;
                } else {
                    child.status = true;
                }
                this.mayihrFilterService.setLocalFilter(this.filter_term);
                this.mayihrFilterService.emitLocalFilter();
                this.submit_data = Object.assign(this.submit_data, this.mayihrFilterService.compileFilterEmit());
                this.globalFuncService.setInfoListSource(this.request_type, this.request_url, this.submit_data);
                this.globalFuncService.emitInfoListSource();
            }
        } else if (this.view_type === 'table_filter') {
            // 头部筛选
            if (this.choose_type === 'single') {
                if (child.status) {
                    child.status = false;
                } else {
                    for (let i in this.filter_term[_parent].child) {
                        this.filter_term[_parent].child[i].status = false;
                    }
                    child.status = true;
                }
            } else {
                if (child.status) {
                    child.status = false;
                } else {
                    child.status = true;
                }
            }
            this.mayihrFilterService.setLocalFilter(this.filter_term);
            this.mayihrFilterService.emitLocalFilter();
            this.submit_data = Object.assign(this.mayihrFilterService.compileFilterEmit());
            this.globalFuncService.setInfoListSource(this.request_type, this.request_url, this.submit_data);
            this.globalFuncService.emitInfoListSource();
            this.closeFilter();
        }
    }

    dataSort(way, id) {
        if (!this.submit_data.hasOwnProperty('sort')) {
            this.submit_data['sort'] = {};
        }
        this.submit_data['sort']['sort_id'] = id;
        if (way == 1) {
            this.submit_data['sort']['sort'] = '1';
        } else {
            this.submit_data['sort']['sort'] = '0';
        }
        this.globalFuncService.setInfoListSource(this.request_type, this.request_url, this.submit_data);
        this.globalFuncService.emitInfoListSource();
        this.closeFilter();
    }

    closeFilter() {
        this.close_filter.emit(false);
    }
}
