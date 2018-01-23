import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {isUndefined} from "util";

@Component({
    selector: 'mayihr-paging-v2',
    templateUrl: './mayihr-paging-v2.component.html',
    styleUrls: ['./mayihr-paging-v2.component.css'],
})
export class MayihrPagingV2Component implements OnInit, OnChanges {
    public paging_config_default = {
        small_paging: false
    };
    @Input()
    page_info;
    @Input()
    paging_config = this.paging_config_default;
    @Output()
    RefreshPagingData = new EventEmitter();

    // -->提交数据
    public current_page;
    public is_all_display;
    public submit_data = {};
    // <-----


    constructor() {
    }

    ngOnInit() {
        console.log(JSON.parse(JSON.stringify(this.paging_config)));
        this.paging_config = Object.assign(this.paging_config_default, JSON.parse(JSON.stringify(this.paging_config)));
        console.log(this.paging_config);
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
        this.submit_data['is_all_display'] = 1;
        this.submit_data['page'] = 1;
        this.RefreshPagingData.emit(this.submit_data);

    }

    hideAll() {
        this.is_all_display = 0;
        this.submit_data['is_all_display'] = 0;
        this.submit_data['page'] = 1;
        this.RefreshPagingData.emit(this.submit_data);

    }

    // <-----
    // -->跳转页数
    toPage(page) {
        if (page > this.page_info.total_pages) {
            page = this.page_info.total_pages;
        } else if (page <= 0) {
            page = 1;
        }
        this.submit_data['is_all_display'] = 0;
        this.submit_data['page'] = page;
        this.RefreshPagingData.emit(this.submit_data);
    }
}
