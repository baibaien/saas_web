import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {GlobalFuncService} from "../../shared/service/global-func/global-func.service";
import {isUndefined} from "util";

@Component({
    selector: 'mayihr-paging',
    templateUrl: './mayihr-paging.component.html',
    styleUrls: ['./mayihr-paging.component.css']
})
export class MayihrPagingComponent implements OnInit, OnChanges {
    @Input()
    page_info;
    @Input()
    request_url;
    @Input()
    request_type;
    // -->提交数据
    public current_page;
    public is_all_display;
    public submit_data = {paging: {}};
    // <-----
    constructor(public route: Router,
                public globalFuncService: GlobalFuncService) {
    }

    ngOnInit() {
    }
    ngOnChanges() {
        if (!isUndefined(this.page_info) && this.page_info.per_page != 1000) {
            this.current_page = this.page_info.current_page;
            this.is_all_display = this.page_info.count === this.page_info.total && this.page_info.count > 10;
        }
    }
    // -->显示/收起全部
    showAll() {
        this.is_all_display = 1;
        this.submit_data['paging']['is_all_display'] = 1;
        this.submit_data['paging']['page'] = 1;
        this.emitSubmitData();
    }

    hideAll() {
        this.is_all_display = 0;
        this.submit_data['paging']['is_all_display'] = 0;
        this.submit_data['paging']['page'] = 1;
        this.emitSubmitData();
    }

    // <-----
    // -->跳转页数
    toPage(page) {
        if (page > this.page_info.total_pages) {
            page = this.page_info.total_pages;
        } else if (page <= 0 ) {
            page = 1;
        }
        this.submit_data['paging']['page'] = page;
        this.emitSubmitData();
    }
    // <-----
    emitSubmitData() {
        this.globalFuncService.setInfoListSource(this.request_type, this.request_url, this.submit_data);
        this.globalFuncService.emitInfoListSource();
    }
}
