import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SalaryCalcItemComponent} from './salary-calc-item.component';
import {SalaryItemComponent} from './salary-item/salary-item.component';
import {ReduceItemComponent} from './reduce-item/reduce-item.component';
import {BaseModule} from "../../../base.module";
import {SalaryCalcItemRoutingModule} from "./salary-calc-item-routing.module";
import {SalaryBonusMModule} from "../../../modal/salary-calc/salary-item-m/salary-item-m.module";
import {ReduceItemMModule} from "../../../modal/salary-calc/reduce-item-m/reduce-item-m.module";

@NgModule({
    imports: [
        CommonModule,
        BaseModule,
        SalaryCalcItemRoutingModule,
        SalaryBonusMModule,
        ReduceItemMModule
    ],
    declarations: [SalaryCalcItemComponent, SalaryItemComponent, ReduceItemComponent]
})
export class SalaryCalcItemModule {
}
