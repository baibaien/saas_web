import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from "../../../../../shared/service/http-service/http.service";
import {AccountSettingsService} from "../../../../../shared/service/api-service/account-settings/account-settings.service";
import {ModalService} from "../../../../../shared/service/modal/modal.service";
import {SettingsService} from "../../../../../shared/service/settings/settings.service";
import {AssistModalService} from "../../../../../shared/service/assist-modal-service/assist-modal.service";

@Component({
    selector: 'app-account-settings-safe-tags',
    templateUrl: './account-settings-safe-tags.component.html',
    styleUrls: ['./account-settings-safe-tags.component.css']
})
export class AccountSettingsSafeTagsComponent implements OnInit, OnDestroy {


    // -->数据
    public safe_data;
    // <-----
    // -->modal信息
    public modal_name;
    public modal_info;
    public modal_callback;
    public modal_name_emitter;
    // <-----

    // -->
    public is_bind_wechat;
    // <-----


    constructor(public httpService: HttpService,
                public accountSettingsService: AccountSettingsService,
                public assistModalService: AssistModalService,
                public modalService: ModalService,
                public settingsService: SettingsService) {
        this.modal_name_emitter = this.modalService.getModalNameEmit().subscribe(
            data => {
                this.modal_name = data;
            }
        );
    }

    ngOnInit() {
        this.httpService.myGet(this.accountSettingsService.getUserInfo())
            .subscribe(res => {
                console.log(res);
                this.safe_data = res.data.mobile;
                this.is_bind_wechat = res.data.is_bind_wechat;
            });
    }

    ngOnDestroy() {
        this.modal_name_emitter.unsubscribe();
    }

    showSafeSetting(type) {
        this.modal_name = 'safe_setting';
        this.modal_info = {
            flag: type,
            data: this.safe_data
        };
        this.modal_callback = () => {
            this.ngOnInit();
        };
    }

    showWxScan() {
        this.settingsService.getQrCode().subscribe((res) => {
            this.modal_name = 'wx_scan';
            this.modal_info = res.data;
            this.modal_callback = () => {
                this.ngOnInit();
            };
        });
    }

    unBindWechat() {
        this.assistModalService.openAssistModal('confirm', '确认解除微信绑定吗', () => {
            this.httpService.myGet(this.accountSettingsService.getUnbindWechat())
                .subscribe(data => {
                    console.log(data);
                    this.assistModalService.openAssistModal('toast', '成功解除绑定', () => {
                        this.ngOnInit();
                    });
                });
        });
    }
}
