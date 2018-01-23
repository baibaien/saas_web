import {Component, OnInit} from '@angular/core';
import {SalaryHistoryApiService} from "../../../shared/service/api-service/salary-api/salary-histroy/salary-history-api.service";
import {Router} from "@angular/router";
import {HttpService} from "../../../shared/service/http-service/http.service";

@Component({
    selector: 'app-salary-history',
    templateUrl: './salary-history.component.html',
    styleUrls: ['./salary-history.component.css']
})
export class SalaryHistoryComponent implements OnInit {
    // -->数据请求流
    // public historySource: Observable<any>;
    // <-----
    // -->本地数据变量
    public current;
    public tag;
    public history_list;
    // <-----

    // -->
    public no_list;
    // <-----
    constructor(public salaryHistoryApiService: SalaryHistoryApiService,
                public httpService: HttpService,
                public route: Router) {
        document.title = '历史工资表';
    }

    ngOnInit() {
        this.httpService.myGet(this.salaryHistoryApiService.getSalaryHistory()).subscribe((data) => {
            console.log(data);
            if (data.data.toString() != '' && !(data.data.tag.length == 1 && data.data.list.length == 0)) {
                this.current = data.data.current;
                this.tag = data.data.tag;
                this.history_list = data.data.list;
                console.log(this.history_list);
                this.no_list = 0;
            } else {
                this.no_list = 1;
            }

        });
    }

    chooseYear(i) {
        this.httpService.myGet(this.salaryHistoryApiService.getSalaryHistory(), {search: {current: i.id}})
            .subscribe((data) => {
                this.current = data.data.current;
                this.tag = data.data.tag;
                this.history_list = data.data.list;
            });
    }

    // -->去工资表详情
    toSalaryCalc(item) {
        // console.log(test);
        // console.log(id);
        // console.log(date);
        if (item.id == 0) {
            this.route.navigate([`/user/salary-calc-history/${item.id}/${item.date}`]);
        } else {
            this.route.navigate([`/user/salary-calc-history/${item.id}`]);
        }
    }

    // <-----
}
