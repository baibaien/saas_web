import {Component, OnDestroy, OnInit, Sanitizer} from '@angular/core';
import {HttpService} from "../../../../shared/service/http-service/http.service";
import {AssistCenterApiService} from "../../../../shared/service/api-service/assist-center-api/assist-center-api.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {isUndefined} from "util";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    selector: 'app-assist-question-detail',
    templateUrl: './assist-question-detail.component.html',
    styleUrls: ['./assist-question-detail.component.less'],
})
export class AssistQuestionDetailComponent implements OnInit, OnDestroy {
    public router_watcher;
    public answer;

    constructor(public httpService: HttpService,
                public router: Router,
                public sanitizer: DomSanitizer,
                public assistCenterApiService: AssistCenterApiService,
                public activatedRoute: ActivatedRoute) {
        this.router_watcher = this.router.events.subscribe(data => {
            // // console.log(data);
            if (data instanceof NavigationEnd) {
                if (data.url.split('/').length == 5) {
                    console.log(data);
                    console.log(this.activatedRoute.snapshot.params['qid']);
                    this.getAnswer(this.activatedRoute.snapshot.params['qid']);
                }
            }
        });
    }

    ngOnInit() {
        // console.log(this.activatedRoute.snapshot.params['qid']);
    }

    ngOnDestroy() {
        this.router_watcher.unsubscribe();
    }


    getAnswer(id) {
        if (id === 'no-article') {
            this.answer = [];
        } else {
            this.httpService.myGet(this.assistCenterApiService.getQuestionShow(), {search: {id: id}})
                .subscribe(data1 => {
                    this.answer = data1.data.data;
                    this.answer.content = this.sanitizer.bypassSecurityTrustHtml(this.htmlDecodeByRegExp(this.answer.content));
                });
        }
    }

    htmlDecodeByRegExp(str) {
        let s = '';
        if (str.length == 0) return '';
        s = str.replace(/&amp;/g, '&');
        s = s.replace(/&lt;/g, '<');
        s = s.replace(/&gt;/g, '>');
        s = s.replace(/&nbsp;/g, ' ');
        s = s.replace(/&#39;/g, '\'');
        s = s.replace(/&quot;/g, '\'');
        s = s.replace(/\<img /g, '<img style="max-width:6.5rem!important;" ');
        return s;
    }
}
