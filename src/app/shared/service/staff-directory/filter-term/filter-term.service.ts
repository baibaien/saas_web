import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Http} from "@angular/http";
import {StaffsService} from "../../api-service/staff-directory/staffs/staffs.service";
import {UsersService} from "../../api-service/users/users.service";
import {HttpService} from "../../http-service/http.service";
@Injectable()
export class FilterTermService {

    public filter_term;
    public table_header;
    public filterTermGet: Observable<any>;
    public filterGetUrl;

    public tablePost: Observable<any>;
    public table_post_url;

    public user_table_header = [];

    constructor(public http: Http,
                public httpService: HttpService,
                public staffsService: StaffsService,
                public usersService: UsersService) {
        // 筛选条件请求设置
        // // url获取
        // this.filterGetUrl = this.staffsService.getStaffsIndexSetting();
        // // 请求流声明
        // this.filterTermGet = this.httpService.myGet(this.filterGetUrl);

        // 表单自定义
        // url获取
        this.table_post_url = this.usersService.getUsersColumns();
        // 请求流声明
    }
    tableHeaderPost() {
        // this.tablePost = this.httpService.myPost(this.table_post_url, `{columns: ${JSON.stringify(this.user_table_header)}`);
        return this.tablePost;
    }
    // 筛选条件设置
    // 获取筛选条件
    // 设置表头
    setTableHeader(data) {
        this.table_header = JSON.parse(JSON.stringify(data));
    }

    // 表头提交格式编码
    headerCommitCompile() {
        this.user_table_header = [];
        for (let i in this.table_header) {
            let current = this.table_header[i];
            this.user_table_header.push(new HeaderCommitClass(current.id, current.sort, current.display));
        }
        return this.httpService.myPost(this.table_post_url, JSON.stringify({columns: this.user_table_header}));
    }
}
export class HeaderCommitClass {
    constructor(public id: number,
                public sort: number,
                public display: number) {
    }
}