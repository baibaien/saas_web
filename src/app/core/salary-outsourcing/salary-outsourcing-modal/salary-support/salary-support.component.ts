import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from "../../../../shared/service/modal/modal.service";
import {Router} from "@angular/router";
import {HttpService} from "../../../../shared/service/http-service/http.service";
import {SalaryOutsourcingApiService} from "../../../../shared/service/api-service/salary-outsourcing-api/salary-outsourcing-api.service";
import {GlobalFuncService} from "../../../../shared/service/global-func/global-func.service";

@Component({
    selector: 'app-salary-support',
    templateUrl: './salary-support.component.html',
    styleUrls: ['./salary-support.component.css']
})
export class SalarySupportComponent implements OnInit {
    @Input()
    modal_name;
    @Input()
    modal_info;

    constructor(public modalService: ModalService,
                public router: Router,
                public httpService: HttpService,
                public salaryOutsourcingApiService: SalaryOutsourcingApiService,
                public globalFuncService: GlobalFuncService) {
    }

    ngOnInit() {
    }


    cancelModal() {
        this.modalService.setModalName('');
        this.modalService.emitModalName();
    }

    // submitModal() {
    //     this.router.navigate(['/user/settings/company-setting/salary']);
    //     this.modalService.setModalName('');
    //     this.modalService.emitModalName();
    // }
}
