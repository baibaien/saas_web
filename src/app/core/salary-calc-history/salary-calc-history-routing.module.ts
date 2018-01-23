import {RouterModule, Routes} from "@angular/router";
import {SalaryHistoryComponent} from "./salary-history/salary-history.component";
import {SalaryHistoryDetailComponent} from "./salary-history-detail/salary-history-detail.component";
import {NgModule} from "@angular/core";
/**
 * Created by Bonan on 2017/9/5.
 */

const routes: Routes = [
    {path: '', component: SalaryHistoryComponent},
    {path: ':id', component: SalaryHistoryDetailComponent},
    {path: ':id/:date', component: SalaryHistoryDetailComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SalaryCalcHistoryRoutingModule {
}