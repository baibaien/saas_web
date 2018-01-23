import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalService} from "../../../../../shared/service/modal/modal.service";
import {SettingsService} from "../../../../../shared/service/settings/settings.service";
import {HttpService} from "../../../../../shared/service/http-service/http.service";
import {CompanySettingsService} from "../../../../../shared/service/api-service/company-settings/company-settings.service";

@Component({
    selector: 'app-company-salary',
    templateUrl: './company-salary.component.html',
    styleUrls: ['./company-salary.component.css']
})
export class CompanySalaryComponent implements OnInit, OnDestroy {
    public modal_name;
    public modal_info;
    public modal_callback;
    public modal_name_emitter;


    public salary_data;


    constructor(public modalService: ModalService,
                public settingsService: SettingsService,
                public httpService: HttpService,
                public companySettingService: CompanySettingsService) {
        this.modal_name_emitter = this.modalService.getModalNameEmit()
            .subscribe(data => {
                this.modal_name = data;
            });
    }

    ngOnInit() {
        this.settingsService.getSalaryRule().subscribe((res) => {
            this.salary_data = res.data.data;
            console.log(this.salary_data);
        });
    }

    ngOnDestroy() {
        this.modal_name_emitter.unsubscribe();

    }


    showSalarySetting(data) {
        this.modal_name = 'salary_setting';
        this.modal_info = data;
        this.modal_callback = () => {
            this.ngOnInit();
        };
    }
}
