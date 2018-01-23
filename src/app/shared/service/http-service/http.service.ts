import {Injectable} from '@angular/core';
import {Http, Jsonp, RequestOptionsArgs, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Params, Router} from '@angular/router';
import {AssistModalService} from "../assist-modal-service/assist-modal.service";
import {isNullOrUndefined} from "util";

@Injectable()
export class HttpService {
    public assist_name;
    public assist_info;
    public assist_handler;

    public count = 0;

    constructor(public http: Http,
                public router: Router,
                public jsonp: Jsonp,
                public requestOptions: RequestOptions,
                public assistModalService: AssistModalService) {
    }

    // -->封装http请求，统一回调的设置
    myGet(url, options?) {
        this.checkLocalToken(url);
        return this.http.get(url, options)
            .map(res => res.json())
            .catch(err => {
                console.log(err);
                const error = err.json();
                this.check(error);
                return Observable.throw(err);
            });
    }

    myPost(url, body, options?: RequestOptionsArgs) {
        this.checkLocalToken();

        return this.http.post(url, body, options)
            .map(res => res.json())
            .catch(err => {
                console.log(err);
                const error = err.json();
                console.log(error);
                this.check(error);
                return Observable.throw(err);
            });
    }

    myDelete(url, options?, callback?) {
        this.checkLocalToken();

        return this.http.delete(url, options)
            .map(res => res.json())
            .catch(err => {
                const error = err.json();
                console.log(error);
                this.check(error);
                return Observable.throw(err);
            });
    }

    myPatch(url, body, options?) {
        this.checkLocalToken();

        return this.http.patch(url, body, options)
            .catch(err => {
                const error = err.json();
                this.check(error);
                return Observable.throw(err);
            });
    }

    myJsonp(url, options = {}) {
        options['params']['callback'] = `__ng_jsonp__.__req${this.count}.finished`;
        console.log(options);
        this.count++;
        return this.jsonp.get(url, options)
            .map(res => res.json())
            .catch(err => {
                return Observable.throw(err);
            });
    }

    // <-----
    logIn() {
        console.log('bug-test');
        this.router.navigate(['/entry/login']);
        // this.router.navigate(['entry']);
    }

    checkLocalToken(url = '') {
        if (!isNullOrUndefined(window.localStorage.getItem('mayihr_token'))) {
            if (`bearer ${window.localStorage.getItem('mayihr_token')}` !== this.requestOptions.headers.get('Authorization')) {
                this.requestOptions.headers.set('Authorization', `bearer ${window.localStorage.getItem('mayihr_token')}`);
                this.router.navigate(['/user']);
            }
        // } else {
        //     console.log(url);
        //     if (url.indexOf('third-platform') == -1) {
        //         console.log(123123123123123);
        //         this.requestOptions.headers.delete('Authorization');
        //         this.router.navigate(['/entry']);
        //     }

        }
    }

    check(code) {
        this.assist_name = '';
        this.assist_info = '';
        this.assist_handler = null;
        if (code.status_code === 401) {
            if (!isNullOrUndefined(window.localStorage.getItem('mayihr_token'))) {
                window.localStorage.removeItem('mayihr_token');
            }
            this.logIn();
        } else if (code.status_code === 417) {

            if (code.message === '用户密码错误') {
                return;
            }
            if (code.code === 250001) {
                this.router.navigate(['/entry/phonecheck']);
                return;
            }
            [this.assist_name, this.assist_info] = ['alert', code.message];
            console.log(code.code);
            switch (code.code) {
                case 210005:
                    this.assist_name = '';
                    break;
                case 210007:
                    return;
                case 210008:
                    return;
                case 250002:
                    this.assist_handler = () => {
                        this.router.navigate(['/entry/login']);
                    };
                    break;
                case 250003:
                    this.assist_handler = () => {
                        this.router.navigate(['/user']);
                    };
                    break;
                case 250006:
                case 250008:
                case 250009:
                case 250010:
                    this.router.navigate(['/error/permission-denied']);
                    return;
                case 250011:
                    window.localStorage.removeItem('mayihr_token');
                    this.requestOptions.headers.delete('Authorization');
                    this.router.navigate(['/entry/person']);
                    return;
                case 250018:
                case 250019:
                    return;
            }
            // if (code.code === 250002) {
            //     this.assist_handler = () => {
            //         this.router.navigate(['/entry/login']);
            //     };
            // } else if (code.code === 250003) {
            //     this.assist_handler = () => {
            //         this.router.navigate(['/user']);
            //     };
            // } else if (code.code === 210005) {
            //     this.assist_name = '';
            // } else if (code.code === 210007) {
            //     return;
            // } else if (code.code === 210008) {
            //     return;
            // } else if (code.code === 250011) {
            //     this.router.navigate(['/entry/person']);
            //     return;
            // }
        } else if (code.status_code === 422) {
            let tmp = 0;
            for (let i in code.errors) {
                if (tmp == 0) {
                    [this.assist_name, this.assist_info] = ['alert', code.errors[i][0]];
                }
                tmp++;
            }
        } else if (code.status_code === 500) {
            // [this.assist_name, this.assist_info] = ['alert', code.message];
            this.router.navigate(['/error/500']);
            return;
        }
        console.log(this.assist_name, this.assist_info);
        this.assistModalService.openAssistModal(this.assist_name, this.assist_info, this.assist_handler);
    }
}
