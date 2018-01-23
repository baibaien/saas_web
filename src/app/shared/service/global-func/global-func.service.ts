import {EventEmitter, Injectable} from '@angular/core';
import {URLSearchParams} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {isUndefined} from "util";
import {HttpService} from "../http-service/http.service";

@Injectable()
export class GlobalFuncService {
    // -->获取列表式数据
    public submit_data = {};
    public list_info_emitter = new EventEmitter();
    public listInfoSource: Observable<any>;
    public list_info_params = new URLSearchParams();
    public callback;
    // <-----

    public type;
    public url;
    // -->定时器变量
    public timeout;
    // <-----


    constructor(public httpService: HttpService) {
    }

    // -->初始化参数
    initInfoListParams() {
        this.submit_data = {};
    }

    // <-----
    // -->获取列表数据通用方法
    getInfoListEmit() {
        return this.list_info_emitter;
    }

    getInfoListSource() {
        return this.listInfoSource;
    }
    resetSubmitData() {
        this.submit_data = {};
    }
    setInfoListSource(type: string,
                      url: string,
                      submit_data: any) {
        console.log(JSON.parse(JSON.stringify(submit_data)));
        if (!submit_data.hasOwnProperty('paging')) {
            this.submit_data['paging'] = {is_all_display: 0, page: 1};
        }
        let result = {};
        this.submit_data = Object.assign(this.submit_data, submit_data);
        console.log(JSON.parse(JSON.stringify(this.submit_data)));
        for (let i in this.submit_data) {
            for (let j in this.submit_data[i]) {
                if (this.submit_data[i][j] !== '') {
                    result[j] = this.submit_data[i][j];
                } else {
                    if (!isUndefined(result[j])) {
                        delete result[j];
                    }
                }
            }
        }
        console.log(JSON.parse(JSON.stringify(result)));
        if (type === 'post') {
            this.listInfoSource = this.httpService.myPost(url, result);
        } else {
            this.list_info_params = new URLSearchParams();
            for (const i in result) {
                this.list_info_params.set(i, result[i]);
            }
            this.listInfoSource = this.httpService.myGet(url, {search: this.list_info_params});
        }
    }

    emitInfoListSource() {
        this.list_info_emitter.emit(this.listInfoSource);
    }

    // <-----


    // -->定时器函数
    debounceTime(fn, delay) {
        if (isUndefined(this.timeout)) {
            this.timeout = setTimeout(() => {
                fn();
            }, delay);
        } else {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                fn();
            }, delay);
        }
    }
    // <-----

    // -->
    // <-----

}
