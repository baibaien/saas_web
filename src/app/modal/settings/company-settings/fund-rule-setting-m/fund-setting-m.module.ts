/**
 * Created by Bonan on 2017/10/21.
 */
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BaseModule} from "../../../../base.module";
import {FundSettingComponent} from "./fund-setting.component";
@NgModule({
    imports: [
        CommonModule,
        BaseModule
    ],
    declarations: [
        FundSettingComponent
    ],
    exports: [
        FundSettingComponent
    ]
})
export class FundSettingMModule {}