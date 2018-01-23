import {Injectable} from '@angular/core';
import {HttpService} from "../../http-service/http.service";


@Injectable()
export class RootApiService {
    public root_dir;
    public root_obs;
    public tmp;

    public is_ie9;


    constructor(public httpService: HttpService) {
        const url_config = {
            'dev.saas.hr.com': 'http://api.saas.hr.com',
            'www.mayitest.cn': 'https://saas-api.mayitest.cn',
            'localhost:4200': 'https://saas-api.mayitest.cn',
            'www.mayicrm.com': 'http://saas-api.mayicrm.com',
            'www.mayihr.com': 'https://saas-api.mayihr.com'
        };


        // if (navigator.appName == 'Microsoft Internet Explorer' && Number(navigator.appVersion.split(';')[1].replace(/[ ]/g, '').replace('MSIE', '')) < 10) {
        //     console.log('this is ie9');
        //     this.is_ie9 = true;
        // } else {
        //     console.log('this is not ie9');
        //     this.is_ie9 = false;
        // }
        // if (!this.is_ie9) {
        this.tmp = window.location.host;
        this.root_dir = url_config[this.tmp];

        // } else {
        //     this.tmp = `${window.location.protocol}//${window.location.hostname}`;
        //     this.root_dir = `${this.tmp}/api-js`;
        // }
    }

    // getTestUrl() {
    //     return this.root_dir;
    // }
    //
    // getDevUrl() {
    //     return `http://api.saas.hr.com`;
    // }

    getRootUrl() {
        return this.root_dir;
    }
}
