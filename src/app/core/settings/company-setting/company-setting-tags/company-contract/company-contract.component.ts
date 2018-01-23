import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalService} from "../../../../../shared/service/modal/modal.service";
import {SettingsService} from "../../../../../shared/service/settings/settings.service";
import {CompanySettingsService} from "../../../../../shared/service/api-service/company-settings/company-settings.service";
import {HttpService} from "../../../../../shared/service/http-service/http.service";

@Component({
    selector: 'app-company-contract',
    templateUrl: './company-contract.component.html',
    styleUrls: ['./company-contract.component.css']
})
export class CompanyContractComponent implements OnInit, OnDestroy {
    public modal_name;
    public modal_info;
    public modal_callback;
    public modal_name_emitter;


    public contract_data;



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
        this.httpService.myGet(this.companySettingService.getContractCompnies())
            .subscribe(data => {
                console.log(data);
                this.contract_data = data.data.data;
            });
    }

    ngOnDestroy() {
        this.modal_name_emitter.unsubscribe();

    }


    showContractSetting(data) {
        this.modal_name = 'contract_setting';
        this.modal_info = data;
        this.modal_callback = () => {
            this.ngOnInit();
        };
    }
}
