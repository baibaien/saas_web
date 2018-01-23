import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers} from "@angular/http";
import {Observable} from "rxjs";
import {HrChangeService} from "../../api-service/staff-directory/hr-change/hr-change.service";
import {ModalService} from "../../modal/modal.service";
import {HttpService} from "../../http-service/http.service";

@Injectable()
export class StaffGeneralChangeService {
    public store_url: string;
    public create_source: Observable<any>;
    public store_source: Observable<any>;
    // public store_requestOption: RequestOptions = new RequestOptions();
    public store_staff_url: string;
    public store_staff_source: Observable<any>;
    // public store_staff_requestion: RequestOptions = new RequestOptions();
    public get_change_salary_url: string;
    public get_change_salary_source: Observable<any>;
    public calc_change_salary_url: string;
    public calc_change_salary_source: Observable<any>;
    // public dimission_url: string;
    // public dimission_source: Observable<any>;
    public dimission_setting_source: Observable<any>;

    constructor(public getMsg: HrChangeService,
                public modalService: ModalService,
                public httpService: HttpService) {
        this.store_url = this.getMsg.getHrChangeStore();
        this.store_staff_url = this.getMsg.getHrChangeStatus();
    }

    // 请求人事变动相关参数
    getYgSettings(yg_id): Observable<any> {
        // console.log('request', yg_id);
        yg_id = yg_id.split(',');
        // console.log('request', yg_id);
        this.create_source = this.httpService.myGet(this.getMsg.getCreateWork(yg_id));
        return this.create_source;
    }

    // 请求员工离职相关参数
    getYgDimssionSettings(yg_id): Observable<any> {
        this.dimission_setting_source = this.httpService.myGet(this.getMsg.getDimissionSettings(yg_id));
        return this.dimission_setting_source;
    }

    // 更新人事变动
    postYgChange(dataSource): Observable<any> {
        this.store_source = this.httpService.myPost(this.store_url, dataSource);
        return this.store_source;
    }

    // 离职
    fireYg(dataSource): Observable<any> {
        this.store_staff_source = this.httpService.myPost(this.store_staff_url, dataSource);
        console.log(this.store_staff_source);
        return this.store_staff_source;
    }

// 离职员工薪酬get
    getChangeSalary(yg_id, fire_date): Observable<any> {
        this.get_change_salary_url = this.getMsg.getChangeSalary(yg_id, fire_date);
        this.get_change_salary_source = this.httpService.myGet(this.get_change_salary_url);
        return this.get_change_salary_source;
    }

// 离职员工薪酬计算
    calcChangeSalary(data_source): Observable<any> {
        this.calc_change_salary_url = this.getMsg.calcChangeSalary();
        this.calc_change_salary_source = this.httpService.myPost(this.calc_change_salary_url, data_source);
        return this.calc_change_salary_source;
    }


    // 整理接受参数格式
    // currentStatusConfig(data) {
    //     let current_status = JSON.parse(JSON.stringify(data.staff));
    //     console.log('current', current_status);
    //     for (let i in data.staff) {
    //         current_status[i] = Number(current_status[i]);
    //         data.staff[i] = Number(data.staff[i]);
    //         if (data[i].length) {
    //             for (let j in data[i]) {
    //                 if (data[i][j].id == data.staff[i]) {
    //                     current_status[`${i}_name`] = data[i][j].name;
    //                 } else {
    //                     current_status[`${i}_name`] = '-';
    //                 }
    //             }
    //         } else {
    //             current_status[`${i}_name`] = '-';
    //         }
    //     }
    //     console.log(current_status);
    //     return current_status;
    // }
}
