import {RouterModule, Routes} from "@angular/router";
import {OutsourcingGuideComponent} from "./outsourcing-guide.component";
import {NgModule} from "@angular/core";
const routes: Routes = [
    {path: '', component: OutsourcingGuideComponent}
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OutsourcingGuideRoutingModule {}
