import {RouterModule, Routes} from "@angular/router";
import {SalaryOutsourcingComponent} from "./salary-outsourcing.component";
import {NgModule} from "@angular/core";
const routes: Routes = [
    {path: '', component: SalaryOutsourcingComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SalaryOutsourcingRoutingModule {}