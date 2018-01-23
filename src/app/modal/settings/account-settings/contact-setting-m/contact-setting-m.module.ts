/**
 * Created by Bonan on 2017/10/19.
 */
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BaseModule} from "../../../../base.module";
import {MayihrSelectModule} from "../../../../common/mayihr-select/mayihr-select.module";
import {ContactSettingComponent} from "./contact-setting.component";
@NgModule({
    imports: [
        CommonModule,
        BaseModule,
        MayihrSelectModule
    ],
    declarations: [
        ContactSettingComponent
    ],
    exports: [
        ContactSettingComponent
    ]
})
export class ContactSettingMModule {}