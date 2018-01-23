import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Http} from "@angular/http";
import {RootApiService} from "../../../shared/service/api-service/root-api/root-api.service";

@Component({
    selector: 'app-ie9-test',
    templateUrl: './ie9-test.component.html',
    styleUrls: ['./ie9-test.component.css'],
})
export class Ie9TestComponent implements OnInit {

    public case_config = {
        get: Symbol(),
        post: Symbol(),
        'delete': Symbol(),
        patch: Symbol(),
        options: Symbol(),
    };


    constructor(public http: Http,
                public rootApiService: RootApiService) {
    }

    ngOnInit() {
    }


    httpTest(type) {
        // const tmp = this.rootApiService.getRootUrl();
        const tmp = 'http://saas.mayitest.cn/api-js';
        switch (type) {
            case this.case_config.get:
                this.http.get(`${tmp}/test/get`).subscribe(data => {
                    alert(data.toString());
                }, error => {
                    alert(error.toString());
                });
                break;
            case this.case_config.post:
                this.http.post(`${tmp}/test/post`, {test: 'test'}).subscribe(data => {
                    alert(data['data'].toString());
                }, error => {
                    alert(error.toString());
                });
                break;
            case this.case_config.delete:
                this.http.delete(`${tmp}/test/delete`).subscribe(data => {
                    alert(data['data'].toString());
                }, error => {
                    alert(error.toString());
                });
                break;
            case this.case_config.patch:
                this.http.patch(`${tmp}/test/patch`, {test: 'test'}).subscribe(data => {
                    alert(data['data'].toString());
                }, error => {
                    alert(error.toString());
                });
                break;
            case this.case_config.options:
                this.http.options(`${tmp}/test/options`).subscribe(data => {
                    alert(data['data'].toString());
                }, error => {
                    alert(error.toString());
                });
                break;

        }
    }

}
