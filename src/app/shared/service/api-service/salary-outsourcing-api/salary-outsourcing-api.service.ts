import {Injectable} from '@angular/core';
import {RootApiService} from "../root-api/root-api.service";

@Injectable()
export class SalaryOutsourcingApiService {

    constructor(public rootApiService: RootApiService) {
    }

    getOutsourcingIndex() {
        return `${this.rootApiService.getRootUrl()}/pay/pay`;
    }

    getOutsourcingBack() {
        return `${this.rootApiService.getRootUrl()}/pay/pay/add`;
    }

    getOutsourcingDelete() {
        return `${this.rootApiService.getRootUrl()}/pay/pay/delBack`;
    }

    getOutsourcingEdit() {
        return `${this.rootApiService.getRootUrl()}/pay/pay/change`;
    }

    getOutsourcingActive() {
        return `${this.rootApiService.getRootUrl()}/pay/pay/active`;
    }

    getOutsourcingCreateBill() {
        return `${this.rootApiService.getRootUrl()}/pay/pay/createBill`;
    }

    getCommercialInsurance() {
        return `${this.rootApiService.getRootUrl()}/pay/commercial/index`;
    }

    getCommercialCompanyEdit() {
        return `${this.rootApiService.getRootUrl()}/pay/commercial/global-set`;
    }

    getCommercialEdit() {
        return `${this.rootApiService.getRootUrl()}/pay/commercial/set`;
    }

    // -->
    getOpenCommercial() {
        return `${this.rootApiService.getRootUrl()}/pay/commercial/open`;
    }
    getCloseCommercial() {
        return `${this.rootApiService.getRootUrl()}/pay/commercial/close`;
    }
    // <-----

    // -->modal取消弹出工资
    getCancelSalary() {
        return `${this.rootApiService.getRootUrl()}/pay/pay/cancel`;
    }
    // <-----
    // getOutSourcingActive() {
    //     return `${this.rootApiService.getRootUrl()}/pay/pay/active`;
    // }
}
