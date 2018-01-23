import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {SocialAssuranceApiService} from "../../../shared/service/api-service/salary-api/social-assurance-api/social-assurance-api.service";
import {HttpService} from "../../../shared/service/http-service/http.service";

@Component({
    selector: 'app-social-assurance-history',
    templateUrl: './social-assurance-history.component.html',
    styleUrls: ['./social-assurance-history.component.css']
})
export class SocialAssuranceHistoryComponent implements OnInit {
    // -->数据请求流
    public historySource: Observable<any>;
    // <-----
    // -->本地数据变量
    public current;
    public tag;
    public history_list;
    // <-----

    // -->
    public no_list;
    // <-----
    constructor(public socialAssuranceApiService: SocialAssuranceApiService,
                public httpService: HttpService,
                public route: Router) {
        document.title = '五险一金历史明细表';
        this.historySource = this.httpService.myGet(this.socialAssuranceApiService.getSocialHistory());
    }

    ngOnInit() {
        this.historySource.subscribe((data) => {
            console.log(data);
            if (data.data.list.length > 0) {
                console.log(123123);
                this.no_list = 0;
                this.current = data.data.current;
                this.tag = data.data.tag;
                this.history_list = data.data.list;
                console.log(this.history_list);
            } else {
                this.no_list = 1;
            }
        });
    }

    chooseYear(i) {
        this.historySource = this.httpService.myGet(`${this.socialAssuranceApiService.getSocialHistory()}/${i.id}`);
        this.historySource.subscribe((data) => {
            this.current = data.data.current;
            this.tag = data.data.tag;
            this.history_list = data.data.list;
        });
    }

    // -->去工资表详情
    toSocialHistory(i) {
        console.log(i);
        const tmp = i['url'].split('/');
        console.log(tmp);
        this.route.navigate([`/user/social-assurance/history/${tmp[tmp.length - 2]}`]);
    }
    // <-----
}
