import {Injectable} from '@angular/core';
import {RootApiService} from "../../root-api/root-api.service";

@Injectable()
export class SalaryHistoryApiService {

    constructor(public rootApiService: RootApiService) {
    }

    getSalaryHistory() {
        return `${this.rootApiService.getRootUrl()}/salary/salary/history`;
    }
}
