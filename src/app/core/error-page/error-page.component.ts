import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpService} from "../../shared/service/http-service/http.service";
import {AssistCenterApiService} from "../../shared/service/api-service/assist-center-api/assist-center-api.service";

@Component({
    selector: 'app-error-page',
    templateUrl: './error-page.component.html',
    styleUrls: ['./error-page.component.css'],
})
export class ErrorPageComponent implements OnInit {

    public status_code;

    public status_code_map = new Map();
    public show_text_obj;

    constructor(public router: Router,
                public httpService: HttpService,
                public assistCenterApiService: AssistCenterApiService,
                public activatedRoute: ActivatedRoute) {
        this.status_code_map.set('500', {
            title: '系统维护中',
            remark: '请稍后重试，如有急需请致电400-686-9915',
            url: 'assets/error/500.png'
        });
        this.status_code_map.set('permission-denied', {
            title: '您的权限不足',
            remark: '如有疑问请联系客服',
            url: 'assets/error/permission-denied.png'
        });
        this.status_code_map.set('404', {
            title: '您访问的页面不存在',
            remark: '如有疑问请联系客服',
            url: 'assets/error/404.png'
        });
        this.status_code_map.set('ie9', {
            title: '推荐使用最新版的谷歌Chrome／360／火狐等浏览器以获得最佳体验',
            url: 'assets/error/ie9.png'
        });
    }

    ngOnInit() {
        this.status_code = this.activatedRoute.snapshot.params['code'];
        this.show_text_obj = this.status_code_map.get(this.status_code);
        console.log(this.show_text_obj);
        if (this.status_code === 'permission-denied') {
            this.httpService.myGet(this.assistCenterApiService.getTelephoneNum(), {})
                .subscribe(data => {
                    console.log(data);
                    this.status_code_map.get('permission-denied')['remark'] += data.data.custom_phone;

                });
        }
        if (['500', 'ie9'].indexOf(this.status_code) === -1) {
            setTimeout(() => {
                this.router.navigate(['/user']);
            }, 8000);
        }
    }

}
