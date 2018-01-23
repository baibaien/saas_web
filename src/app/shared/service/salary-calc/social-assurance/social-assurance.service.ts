import {EventEmitter, Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {SocialAssuranceApiService} from "../../api-service/salary-api/social-assurance-api/social-assurance-api.service";
import {Observable} from "rxjs/Observable";
import {HttpService} from "../../http-service/http.service";

@Injectable()
export class SocialAssuranceService {
    public socialDetailSource: Observable<any>;
    public socialDetailEmit = new EventEmitter();

    constructor(public http: Http,
                public httpService: HttpService,
                public socialAssuranceApiService: SocialAssuranceApiService) {
    }
    // -->计算五险一金
    // <-----
    // -->获取历史纪录
    // <-----
    // -->展开详情
    setSocialAssuranceDetailSource(id) {
        this.socialDetailSource = this.httpService.myGet(`${this.socialAssuranceApiService.getSocialDetail()}`, {search: id});
    }
    getSocialAssuranceDetailSource() {
        return this.socialDetailSource;
    }
    getSocialAssuranceDetailEmit() {
        return this.socialDetailEmit;
    }
    emitSocialAssuranceDetail() {
        this.socialDetailEmit.emit(this.socialDetailSource);
    }
    // <-----
    // -->进入历史纪录
    // <-----
}
