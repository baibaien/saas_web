import {Injectable} from '@angular/core';
import {RootApiService} from '../../root-api/root-api.service';

@Injectable()
export class SocialBaseService {
    public header;

    constructor(public rootApi: RootApiService) {
        this.header = this.rootApi.getRootUrl();
    }

    // 社保公其金基本配置 GET
    getSocialBase(city_id, yg_id = '') {
        return `${this.header}/staff/hr-basic-map/get-social-fund-setting?city_id=${city_id}&yg_id=${yg_id}`;
    }

    // 社保公积金规则列表 GET
    getSocialRule(city_id, hk_type) {
        return `${this.header}/staff/hr-basic-map/get-rules-by-city-id-and-hk-type?city_id=${city_id}&hk_type=${hk_type}`;
    }

    // 社保公积金起缴范围 GET
    getSocialRange(city_id, yg_id = '') {
        return `${this.header}/staff/hr-basic-map/get-social-fund-start?city_id=${city_id}&yg_id=${yg_id}`;
    }

    // 开通城市列表
    getSocialCity() {
        return `${this.header}/staff/hr-areas/`;
    }

    // 城市社保基数限制
    getCitySocial(city_id, social_rule) {
        return `${this.header}/staff/hr-basic-map/get-social-base?city_id=${city_id}&social_rule=${social_rule}`;
    }

// 城市公积金基数限制
    getCityFund(city_id, fund_rule) {
        return `${this.header}/staff/hr-basic-map/get-fund-base?city_id=${city_id}&fund_rule=${fund_rule}`;
    }

// -->


// <-----
}

