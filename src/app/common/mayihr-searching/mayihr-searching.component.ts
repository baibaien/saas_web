import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {isUndefined} from "util";
import {GlobalFuncService} from "../../shared/service/global-func/global-func.service";

@Component({
    selector: 'mayihr-searching',
    templateUrl: './mayihr-searching.component.html',
    styleUrls: ['./mayihr-searching.component.css']
})
export class MayihrSearchingComponent implements OnInit, OnChanges {
    @Input()
    request_url;
    @Input()
    request_type;
    @Input()
    placeholder;
    @Input()
    other_operate;
    @Input()
    content;
    @Input()
    search_content;

    // -->placeholder显示模式
    // public placeholder_text = {
    //     yg_name: '输入员工姓名进行搜索',
    //     all: '输入员工姓名，手机号，工号，岗位',
    //     yg_position: '输入岗位名称进行搜索'
    // };
    // <-----

    public submit_data = {search: {}};
    // <-----
    // --> input功能变量
    public inputFocus = false;
    // <--
    constructor(public globalFuncService: GlobalFuncService) {

    }

    ngOnInit() {
    }
    ngOnChanges() {
        console.log(this.search_content);
    }

    // input功能开始
    // input聚焦
    focusNow(event) {
        this.inputFocus = true;
        event.target.onblur = (() => {
            this.inputFocus = false;
        });
    }

    // 提交搜索
    // -->
    staffSearch(event) {
        this.globalFuncService.debounceTime((this.emitSubmitDate)(event), 500);
    }

    // <-----
    // -->清空搜索框
    clearSearch() {
        this.search_content = '';
        this.globalFuncService.setInfoListSource(this.request_type, this.request_url, {search: {}});
        this.globalFuncService.emitInfoListSource();
    }

    // <-----
    emitSubmitDate(event) {
        const that = this;
        return (function () {
            that.submit_data['search']['search'] = event.value;
            that.globalFuncService.setInfoListSource(that.request_type, that.request_url, that.submit_data);
            that.globalFuncService.emitInfoListSource();
        });
    }

    // input搜索功能结束
}
