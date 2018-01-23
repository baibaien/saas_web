/**
 * Created by Bonan on 2017/10/19.
 */

import {NgModule} from "@angular/core";
import {SendSettingComponent} from "./send-setting.component";
import {CommonModule} from "@angular/common";
import {BaseModule} from "../../../../base.module";
import {MayihrSelectModule} from "../../../../common/mayihr-select/mayihr-select.module";
@NgModule({
    imports: [
        CommonModule,
        BaseModule,
        MayihrSelectModule
    ],
    declarations: [
        SendSettingComponent
    ],
    exports: [
        SendSettingComponent
    ]
})
export class SendSettingMModule {}