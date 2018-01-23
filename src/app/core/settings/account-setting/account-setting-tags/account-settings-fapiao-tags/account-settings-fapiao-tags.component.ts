import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from "../../../../../shared/service/http-service/http.service";
import {ModalService} from "../../../../../shared/service/modal/modal.service";
import {AccountSettingsService} from "../../../../../shared/service/api-service/account-settings/account-settings.service";
import {SettingsService} from "../../../../../shared/service/settings/settings.service";

@Component({
    selector: 'app-account-settings-fapiao-tags',
    templateUrl: './account-settings-fapiao-tags.component.html',
    styleUrls: ['./account-settings-fapiao-tags.component.css']
})
export class AccountSettingsFapiaoTagsComponent implements OnInit, OnDestroy {


    // -->发票数据
    public invoice_data;
    // <-----
    // -->modal信息
    public modal_name;
    public modal_info;
    public modal_callback;
    public modal_name_emitter;
    // <-----

// -->
    public show_status;
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
                this.invoice_data = res.data.fapiao_info;
                if (this.invoice_data instanceof Array) {
                    this.show_status = false;
                } else {
                    this.show_status = true;
                }
            });
    }

    ngOnDestroy() {
        this.modal_name_emitter.unsubscribe();
    }

    showInvoiceSetting() {
        this.modal_name = 'invoice_setting_m';
        this.modal_info = this.invoice_data;
        this.modal_callback = () => {
            this.ngOnInit();
        };
    }
}
