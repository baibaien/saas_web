/**
 * Created by Bonan on 2017/10/20.
 */


import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BaseModule} from "../../../../base.module";
import {PositionSettingComponent} from "./position-setting.component";
@NgModule({
    imports: [
        CommonModule,
        BaseModule
    ],
    declarations: [
        PositionSettingComponent
    ],
    exports: [
        PositionSettingComponent
    ]
})
export class  PositionSettingMModule {}