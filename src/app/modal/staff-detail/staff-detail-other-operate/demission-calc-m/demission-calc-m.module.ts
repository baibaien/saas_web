/**
 * Created by Bonan on 2017/10/23.
 */
import {CommonModule} from "@angular/common";
import {BaseModule} from "../../../../base.module";
import {DemissionModalComponent} from "./demission-modal.component";
import {NgModule} from "@angular/core";
import {MayihrSelectModule} from "../../../../common/mayihr-select/mayihr-select.module";
@NgModule({
    imports: [
        CommonModule,
        BaseModule,
        MayihrSelectModule
    ],
    declarations: [
        DemissionModalComponent
    ],
    exports: [
        DemissionModalComponent
    ]
})
export class DemissionCalcMModule {}