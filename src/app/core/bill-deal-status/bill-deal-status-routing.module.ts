import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {BillDealStatusComponent} from "./bill-deal-status.component";
const routes: Routes = [
    {path: '', component: BillDealStatusComponent}
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BillDealStatusRoutingModule {
}