/**
 * Created by Bonan on 2017/11/23.
 */
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ReduceAdjustMComponent} from "./reduce-adjust-m.component";
import {BaseModule} from "../../../base.module";
@NgModule({
    imports: [
        CommonModule,
        BaseModule
    ],
    declarations: [
        ReduceAdjustMComponent
    ],
    exports: [
        ReduceAdjustMComponent
    ]
})
export class ReduceAdjustMModule {
}