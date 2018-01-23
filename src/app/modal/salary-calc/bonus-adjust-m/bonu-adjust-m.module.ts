/**
 * Created by Bonan on 2017/11/23.
 */
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BonusAdjustMComponent} from './bonus-adjust-m.component';
import {BaseModule} from "../../../base.module";
@NgModule({
    imports: [
        CommonModule,
        BaseModule
    ],
    declarations: [BonusAdjustMComponent],
    exports: [
        BonusAdjustMComponent
    ]
})
export class BonusAdjustMModule {
}