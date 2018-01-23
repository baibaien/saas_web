import {Component, OnDestroy, OnInit, SecurityContext} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {HttpService} from "../../../shared/service/http-service/http.service";
import {AssistCenterApiService} from "../../../shared/service/api-service/assist-center-api/assist-center-api.service";
import {GlobalFuncService} from "../../../shared/service/global-func/global-func.service";
import {DomSanitizer} from "@angular/platform-browser";
import {LoginService} from "../../../shared/service/login/login.service";

@Component({
    selector: 'app-assist-question',
    templateUrl: './assist-question.component.html',
    styleUrls: ['./assist-question.component.less']
})
export class AssistQuestionComponent implements OnInit, OnDestroy {

    public paging_url;
    public type_id;
    public question_list;
    public answer;


    public question_list_emitter;
    public pagination;

    public router_watcher;


    public router_length;


    public submit_data = {};

    public show_title;

    constructor(public activatedRoute: ActivatedRoute,
                public globalFuncService: GlobalFuncService,
                public sanitizer: DomSanitizer,
                public loginService: LoginService,
                public httpService: HttpService,
                public router: Router,
                public assistCenterApiService: AssistCenterApiService) {
        document.title = '帮助中心';


        this.type_id = this.activatedRoute.snapshot.params['id'];
        this.paging_url = this.assistCenterApiService.getQuestionList();


        this.router_watcher = this.router.events.subscribe(data => {
            if (data instanceof NavigationEnd) {
                this.router_length = data['url'].split('/').length;
                if (data.url.split('/').length == 4) {
                    if (this.type_id != this.activatedRoute.snapshot.params['id']) {
                        this.type_id = this.activatedRoute.snapshot.params['id'];
                        this.submit_data = {search: {type: this.type_id}};
                        this.getListData(this.submit_data, 1);
                    }
                }
            }
        });
    }

    ngOnInit() {
        this.loginService.checkToken();
        this.submit_data = {search: {type: this.type_id}};
        this.getListData(this.submit_data, 1);
    }

    ngOnDestroy() {
        this.router_watcher.unsubscribe();
    }

    getListData(data = {}, time = 0) {
        this.httpService.myGet(this.assistCenterApiService.getQuestionList(), data)
            .subscribe(data1 => {
                this.show_title = data1.data.meta.type.name;
                if (data1.data.data.length > 0) {
                    this.question_list = data1.data.data;
                    this.pagination = data1.data.meta.pagination;
                    if (this.router_length == 4 && time == 1) {
                        this.router.navigate([`/assist/assist-list/${this.type_id}/${this.question_list[0].id}`]);
                    }
                } else {
                    this.question_list = [];
                    this.pagination = undefined;
                    this.router.navigate([`/assist/assist-list/${this.type_id}/no-article`]);
                }
                console.log(this.question_list);
            });
    }

    openDetail(i) {
        this.router.navigate([`/assist/assist-list/${this.type_id}/${i.id}`]);
    }

    refreshPaging(event) {
        console.log(event);
        this.submit_data['search'] = Object.assign(this.submit_data['search'], event);
        console.log(this.submit_data);
        this.getListData(this.submit_data);
    }

}
