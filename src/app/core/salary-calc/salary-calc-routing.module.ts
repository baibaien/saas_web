import {RouterModule, Routes} from "@angular/router";
import {SalaryCalcComponent} from "./salary-calc/salary-calc.component";
import {NgModule} from "@angular/core";
/**
 * Created by Bonan on 2017/9/5.
 */

const routes: Routes = [
    {path: '', component: SalaryCalcComponent},
    {path: 'salary-calc-item/:inc_id', loadChildren: './salary-calc-item/salary-calc-item.module#SalaryCalcItemModule'}

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SalaryCalcRoutingModule {
}