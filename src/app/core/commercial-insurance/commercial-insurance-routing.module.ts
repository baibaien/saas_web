import {RouterModule, Routes} from "@angular/router";
import {CommercialInsuranceComponent} from "./commercial-insurance/commercial-insurance.component";
import {NgModule} from "@angular/core";
import {CommercialDetailComponent} from "./commercial-detail/commercial-detail.component";

const routes: Routes = [
    {path: '', component: CommercialInsuranceComponent},
    {path: 'detail', component: CommercialDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CommercialInsuranceRoutingModule {}