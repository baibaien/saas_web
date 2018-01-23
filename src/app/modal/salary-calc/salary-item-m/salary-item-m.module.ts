/**
 * Created by Bonan on 2017/11/22.
 */


import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BaseModule} from "../../../base.module";
import {SalaryBonusMComponent} from "./salary-bonus-m.component";
@NgModule({
    imports: [
        CommonModule,
        BaseModule
    ],
    declarations: [
        SalaryBonusMComponent
    ],
    exports: [
        SalaryBonusMComponent
    ]
})
export class SalaryBonusMModule {

}