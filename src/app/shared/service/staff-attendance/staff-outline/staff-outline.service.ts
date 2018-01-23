import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Http} from "@angular/http";
import {StaffsService} from "../../api-service/staff-directory/staffs/staffs.service";
import {HttpService} from "../../http-service/http.service";

@Injectable()
export class StaffOutlineService {

    constructor(public http: Http,
                public httpService: HttpService,
                public staffsService: StaffsService) {
    }

    getStaffOutlineRequest() {
        return this.httpService.myGet(this.staffsService.getStaffOutline());
    }

    // -->是否过滤已离职
    compileData(tmp_data, filter = 1) {
        let tmp = [];
        for (let i in tmp_data) {
            if (filter === 1) {
                if (tmp_data[i].status != 2) {
                    tmp.push(tmp_data[i]);
                }
            } else {
                tmp.push(tmp_data[i]);
            }
        }
        return tmp;
    }
}
