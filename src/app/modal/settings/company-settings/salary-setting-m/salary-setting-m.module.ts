/**
 * Created by Bonan on 2017/10/21.
 */
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MayihrSelectModule} from "../../../../common/mayihr-select/mayihr-select.module";
import {BaseModule} from "../../../../base.module";
import {SalarySettingComponent} from "./salary-setting.component";
import {PipeModule} from "../../../../shared/pipe/pipe.module";
@NgModule({
    imports: [
        CommonModule,
        BaseModule,
        MayihrSelectModule,
        PipeModule
    ],
    declarations: [
        SalarySettingComponent
    ],
    exports: [
        SalarySettingComponent
    ]
})
export class SalarySettingMModule {}

