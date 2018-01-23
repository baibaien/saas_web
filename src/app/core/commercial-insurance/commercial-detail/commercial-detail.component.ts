import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpService} from "../../../shared/service/http-service/http.service";
import {SalaryOutsourcingApiService} from "../../../shared/service/api-service/salary-outsourcing-api/salary-outsourcing-api.service";

@Component({
    selector: 'app-commercial-detail',
    templateUrl: './commercial-detail.component.html',
    styleUrls: ['./commercial-detail.component.css']
})
export class CommercialDetailComponent implements OnInit {
    public commercial_status;
    constructor(public router: Router,
                public httpService: HttpService,
                public salaryOutsourcingApiService: SalaryOutsourcingApiService) {
        document.title = '商保介绍与理赔说明';
        this.httpService.myGet(`${this.salaryOutsourcingApiService.getCommercialInsurance()}`)
            .subscribe(data => {
                console.log(data);
                this.commercial_status = data.data.meta.tableHeader.hr_security.type;
            });
    }

    ngOnInit() {
    }

    backToCommercial() {
        this.router.navigate(['/user/commercial-insurance']);
    }
    buyCommercial(event) {
        event.stopPropagation();
        event.preventDefault();
        if (this.commercial_status != 1) {
            this.httpService.myPost(this.salaryOutsourcingApiService.getOpenCommercial(), {})
                .subscribe(data => {
                    console.log(data);
                    this.commercial_status = 1;
                    this.router.navigate(['/user/commercial-insurance']);
                });
        }
    }
}
