import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AccountSettingTagsComponent} from "./account-setting-tags/account-setting-tags/account-setting-tags.component";
import {AccountSettingsContactTagsComponent} from "./account-setting-tags/account-settings-contact-tags/account-settings-contact-tags.component";
import {AccountSettingsFapiaoTagsComponent} from "./account-setting-tags/account-settings-fapiao-tags/account-settings-fapiao-tags.component";
import {AccountSettingsSafeTagsComponent} from "./account-setting-tags/account-settings-safe-tags/account-settings-safe-tags.component";
import {AccountSettingsSendTagsComponent} from "./account-setting-tags/account-settings-send-tags/account-settings-send-tags.component";
import {AccountSettingComponent} from "./account-setting.component";

const routes: Routes = [
    {
        path: '', component: AccountSettingComponent,
        children: [
            {path: '', redirectTo: 'sign', pathMatch: 'full'},
            {path: 'sign', component: AccountSettingTagsComponent},
            {path: 'contact', component: AccountSettingsContactTagsComponent},
            {path: 'invoice', component: AccountSettingsFapiaoTagsComponent},
            {path: 'safe', component: AccountSettingsSafeTagsComponent},
            {path: 'send', component: AccountSettingsSendTagsComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountSettingRoutingModule {
}
