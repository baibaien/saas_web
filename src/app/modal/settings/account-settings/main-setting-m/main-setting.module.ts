/**
 * Created by Bonan on 2017/10/19.
 */
import {NgModule} from "@angular/core";
import {BaseModule} from "../../../../base.module";
import {CommonModule} from "@angular/common";
import {MayihrSelectModule} from "../../../../common/mayihr-select/mayihr-select.module";
import {MainSettingComponent} from "./main-setting.component";
@NgModule({
    imports: [
        CommonModule,
        BaseModule,
        MayihrSelectModule
    ],
    declarations: [
        MainSettingComponent
    ],
    exports: [
        MainSettingComponent
    ]
})
export class MainSettingModule {
}
