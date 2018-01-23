import {RouterModule, Routes} from "@angular/router";
import {SalaryItemComponent} from "./salary-item/salary-item.component";
import {ReduceItemComponent} from "./reduce-item/reduce-item.component";
import {NgModule} from "@angular/core";
import {SalaryCalcItemComponent} from "./salary-calc-item.component";
/**
 * Created by Bonan on 2017/11/22.
 */


const routes: Routes = [
    {
        path: '', component: SalaryCalcItemComponent,
        children: [
            {path: '', redirectTo: 'bonus', pathMatch: 'full'},
            {path: 'bonus', component: SalaryItemComponent},
            {path: 'reduce', component: ReduceItemComponent}
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class SalaryCalcItemRoutingModule {

}