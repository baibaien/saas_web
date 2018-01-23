/**
 *
 * Created by Bonan on 2017/10/20.
 */

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BaseModule} from "../../../../base.module";
import {BenefitMoneyComponent} from "./benefit-money.component";
@NgModule({
    imports: [
        CommonModule,
        BaseModule
    ],
    declarations: [
        BenefitMoneyComponent
    ],
    exports: [
        BenefitMoneyComponent
    ]
})
export class BenefitMoneyMModule {

}
