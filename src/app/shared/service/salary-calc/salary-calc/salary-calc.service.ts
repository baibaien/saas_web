import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Http, URLSearchParams} from "@angular/http";
import {SalaryApiService} from "../../api-service/salary-api/salary-api.service";
import {HttpService} from "../../http-service/http.service";

@Injectable()
export class SalaryCalcService {
    // 获取计算工资首页的信息变量
    public salary_calc_emit = new EventEmitter();
    public salaryCalcSource: Observable<any>;
    public salary_calc_url;

    // --> 获取员工薪资列表
    public staffSalarySource: Observable<any>;
    public staff_salary_emit = new EventEmitter();
    public staff_salary_params = new URLSearchParams();
    public staff_salary_url;
    // <--

    // -->获取员工工资详情
    public detailSalarySource: Observable<any>;
    public detail_salary_emit = new EventEmitter();
    public detail_salary_params = new URLSearchParams();
    // <-----


    constructor(public http: Http,
                public httpService: HttpService,
                public salaryApiService: SalaryApiService) {
        // this.salaryCalcSource = this.httpService.myPost(this.salaryApiService.getCalcSalary(), '');
        // this.staffSalarySource = this.httpService.myGet(this.salaryApiService.getStaffSalary());
    }

    // --->获取工资讯息方法
    setSalaryCalcSource(data?) {
        this.salaryCalcSource = this.httpService.myPost(this.salaryApiService.getCalcSalary(), data);
    }
    getSalaryCalcSource() {
        return this.salaryCalcSource;
    }


    // <---


    // -->
    // <-----

    // --> 获取员工工资详情
    setDetailSalarySource(data) {
        for (let i in data) {
            this.detail_salary_params.set(i, data[i]);
        }
        this.detailSalarySource = this.httpService.myGet(this.salaryApiService.getStaffDetail(), {search: this.detail_salary_params});
    }

    getDetailSalaryEmit() {
        return this.detail_salary_emit;
    }

    getDetailSalarySource() {
        return this.detailSalarySource;
    }

    emitDetailSalary() {
        this.detail_salary_emit.emit(this.detailSalarySource);
    }

    // <-----
}
