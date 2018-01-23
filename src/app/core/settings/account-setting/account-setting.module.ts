/**
 * Created by Bonan on 2017/10/16.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BaseModule} from '../../../base.module';
import {MayihrSearchingModule} from '../../../common/mayihr-searching/mayihr-searching.module';
import {MayihrPagingModule} from '../../../common/mayihr-paging/mayihr-paging.module';
import {MayihrFilterModule} from '../../../common/mayihr-filter/mayihr-filter.module';
import {MayihrFilterStatusModule} from '../../../common/mayihr-filter-status/mayihr-filter-status.module';
import {AccountSettingTagsComponent} from './account-setting-tags/account-setting-tags/account-setting-tags.component';
import {AccountSettingsContactTagsComponent} from './account-setting-tags/account-settings-contact-tags/account-settings-contact-tags.component';
import {AccountSettingsFapiaoTagsComponent} from './account-setting-tags/account-settings-fapiao-tags/account-settings-fapiao-tags.component';
import {AccountSettingsSafeTagsComponent} from './account-setting-tags/account-settings-safe-tags/account-settings-safe-tags.component';
import {AccountSettingsSendTagsComponent} from './account-setting-tags/account-settings-send-tags/account-settings-send-tags.component';
import {AccountSettingRoutingModule} from 'app/core/settings/account-setting/account-setting-routing.module';
import {AccountSettingComponent} from './account-setting.component';
import {InvoiceSettingMModule} from '../../../modal/settings/account-settings/invoice-setting-m/invoice-setting-m.module';
import {MainSettingModule} from "../../../modal/settings/account-settings/main-setting-m/main-setting.module";
import {
    ContactSettingMModule,
} from "../../../modal/settings/account-settings/contact-setting-m/contact-setting-m.module";
import {SendSettingMModule} from "../../../modal/settings/account-settings/send-setting-m/send-setting-m.module";
import {SafeSettingMModule} from "../../../modal/settings/account-settings/safe-setting-m/safe-setting-m.module";
import {WxScanMModule} from "../../../modal/settings/account-settings/wx-scan-m/wx-scan-m.module";
import {MayihrImgUploadModule} from "../../../common/mayihr-img-upload/mayihr-img-upload.module";
@NgModule({
    imports: [
        CommonModule,
        BaseModule,
        MayihrSearchingModule,
        MayihrPagingModule,
        MayihrFilterModule,
        MayihrImgUploadModule,
        MayihrFilterStatusModule,
        AccountSettingRoutingModule,
        // -->modal部分
        MainSettingModule,
        InvoiceSettingMModule,
        ContactSettingMModule,
        SendSettingMModule,
        SafeSettingMModule,
        WxScanMModule
        // <-----
    ],
    declarations: [
        AccountSettingComponent,
        AccountSettingTagsComponent,
        AccountSettingsContactTagsComponent,
        AccountSettingsFapiaoTagsComponent,
        AccountSettingsSafeTagsComponent,
        AccountSettingsSendTagsComponent
    ]
})
export class AccountSettingModule {

}
