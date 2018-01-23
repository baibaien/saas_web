import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalService} from "../../../../../shared/service/modal/modal.service";
import {SettingsService} from "../../../../../shared/service/settings/settings.service";
import {HttpService} from "../../../../../shared/service/http-service/http.service";
import {CompanySettingsService} from "../../../../../shared/service/api-service/company-settings/company-settings.service";

@Component({
    selector: 'app-company-staff-self',
    templateUrl: './company-staff-self.component.html',
    styleUrls: ['./company-staff-self.component.css']
})
export class CompanyStaffSelfComponent implements OnInit, OnDestroy {
    public yg_self_data;


    public modal_name;
    public modal_info;
    public modal_callback;
    public modal_name_emitter;

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
        this.httpService.myPost(this.companySettingService.getYgself(), {}).subscribe(
            data => {
                console.log(data);
                this.yg_self_data = data.data.info;
            }
        );
    }

    ngOnDestroy() {
        this.modal_name_emitter.unsubscribe();

    }

    showYgSelfSetting(data) {
        this.modal_name = 'ygself_setting';
        this.modal_info = data;
        this.modal_callback = () => {
            this.ngOnInit();
        };
    }
}
