import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from "../../../../../shared/service/http-service/http.service";
import {AccountSettingsService} from "../../../../../shared/service/api-service/account-settings/account-settings.service";
import {ModalService} from "../../../../../shared/service/modal/modal.service";
import {SettingsService} from "../../../../../shared/service/settings/settings.service";

@Component({
    selector: 'app-account-settings-send-tags',
    templateUrl: './account-settings-send-tags.component.html',
    styleUrls: ['./account-settings-send-tags.component.css']
})
export class AccountSettingsSendTagsComponent implements OnInit, OnDestroy {


    // -->发票数据
    public post_data;
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
                this.post_data = res.data.post_addresses;
            });
    }

    ngOnDestroy() {
        this.modal_name_emitter.unsubscribe();
    }

    showSendSetting(type, index?) {
        if (type === 'add') {
            this.modal_info = undefined;
        } else if (type === 'edit') {
            this.modal_info = this.post_data[index];
        }
        this.modal_name = 'send_setting_m';
        this.modal_callback = () => {
            this.ngOnInit();
        };
    }
}
