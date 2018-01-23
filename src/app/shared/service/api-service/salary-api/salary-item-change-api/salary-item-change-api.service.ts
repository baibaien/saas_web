import {Injectable} from '@angular/core';
import {RootApiService} from "../../root-api/root-api.service";

@Injectable()
export class SalaryItemChangeApiService {

    constructor(public rootApiService: RootApiService) {
    }
    getSalaryItemUrl() {
        return `${this.rootApiService.getRootUrl()}/salary/bonus`;
    }
}
