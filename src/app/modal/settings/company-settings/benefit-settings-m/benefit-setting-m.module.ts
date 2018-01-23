/**
 * Created by Bonan on 2017/10/20.
 */
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BaseModule} from "../../../../base.module";
import {BenefitSettingComponent} from "./benefit-setting.component";
import {MayihrSelectModule} from "../../../../common/mayihr-select/mayihr-select.module";
@NgModule({
    imports: [
        CommonModule,
        BaseModule,
        MayihrSelectModule
    ],
    declarations: [
        BenefitSettingComponent
    ],
    exports: [
        BenefitSettingComponent
    ]
})
export class BenefitSettingMModule {}