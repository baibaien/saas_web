import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from "../../../../../shared/service/http-service/http.service";
import {AccountSettingsService} from "../../../../../shared/service/api-service/account-settings/account-settings.service";
import {ModalService} from "../../../../../shared/service/modal/modal.service";
import {SettingsService} from "../../../../../shared/service/settings/settings.service";

@Component({
    selector: 'app-account-settings-contact-tags',
    templateUrl: './account-settings-contact-tags.component.html',
    styleUrls: ['./account-settings-contact-tags.component.css']
})
export class AccountSettingsContactTagsComponent implements OnInit, OnDestroy {


    // -->发票数据
    public contact_data;
    // <-----
    // -->modal信息
    public modal_name;
    public modal_info;
    public modal_callback;
    public modal_name_emitter;
    // <-----


    constructor(public httpService: HttpService,
                public accountSettingsService: AccountSettingsService,
                public modalService: ModalService,
                public settingsService: SettingsService) {
        this.modal_name_emitter = this.modalService.getModalNameEmit().subscribe(
            data => {
                console.log(data);
                this.modal_name = data;
            }
        );
    }

    ngOnInit() {
        this.httpService.myGet(this.accountSettingsService.getUserInfo())
            .subscribe(res => {
                console.log(res);
                this.contact_data = res.data.main_contact_info;
                if (this.contact_data.gender == 1) {
                    console.log(123123);
                    this.contact_data.gender_name = '先生';
                } else if (this.contact_data.gender == 2) {
                    console.log(234234);
                    this.contact_data.gender_name = '女士';
                }
            });
    }

    ngOnDestroy() {
        this.modal_name_emitter.unsubscribe();
    }

    showContactSetting() {
        this.modal_name = 'contact_setting_m';
        this.modal_info = this.contact_data;
        this.modal_callback = () => {
            this.ngOnInit();
        };
    }
}
