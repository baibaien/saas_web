import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalService} from "../../../../../shared/service/modal/modal.service";
import {SettingsService} from "../../../../../shared/service/settings/settings.service";
import {HttpService} from "../../../../../shared/service/http-service/http.service";
import {CompanySettingsService} from "../../../../../shared/service/api-service/company-settings/company-settings.service";

@Component({
    selector: 'app-company-office',
    templateUrl: './company-office.component.html',
    styleUrls: ['./company-office.component.css']
})
export class CompanyOfficeComponent implements OnInit, OnDestroy {
    public modal_name;
    public modal_info;
    public modal_callback;
    public modal_name_emitter;


    public office_data;


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
        this.httpService.myGet(this.companySettingService.getOfficeAddress())
            .subscribe(data => {
                console.log(data);
                this.office_data = data.data.data;
            });
    }

    ngOnDestroy() {
        this.modal_name_emitter.unsubscribe();

    }


    showOfficeSetting(data) {
        this.modal_name = 'office_setting';
        this.modal_info = data;
        this.modal_callback = () => {
            this.ngOnInit();
        };
    }
    showModal(...test) {

    }
}
