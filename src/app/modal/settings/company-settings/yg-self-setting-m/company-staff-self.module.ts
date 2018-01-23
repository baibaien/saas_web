/**
 * Created by Bonan on 2017/10/20.
 */
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BaseModule} from "../../../../base.module";
import {CompanyStaffSelfComponent} from "../../../../core/settings/company-setting/company-setting-tags/company-staff-self/company-staff-self.component";
import {YgselfSettingComponent} from "./ygself-setting.component";
@NgModule({
    imports: [
        CommonModule,
        BaseModule
    ],
    declarations: [
        YgselfSettingComponent
    ],
    exports: [
        YgselfSettingComponent
    ]
})
export class CompanyStaffSelfMModule {}