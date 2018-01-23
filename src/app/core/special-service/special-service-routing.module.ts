import {RouterModule, Routes} from "@angular/router";
import {SpecialServiceComponent} from "./special-service/special-service.component";
import {SpecialServicePaidComponent} from "./special-service-paid/special-service-paid.component";
import {MyServiceDetailComponent} from "./my-service-detail/my-service-detail.component";
import {NgModule} from "@angular/core";
const routes: Routes = [
    {path: '', component: SpecialServiceComponent},
    {path: 'paid', component: SpecialServicePaidComponent},
    {path: ':id/detail', component: MyServiceDetailComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SpecialServiceRoutingModule {}
