import {RouterModule, Routes} from "@angular/router";
import {StaffDetailComponent} from "./staff-detail/staff-detail.component";
import {NgModule} from "@angular/core";
const routes: Routes = [
    {path: '', redirectTo: ':user_id', pathMatch: 'full'},
    {path: ':user_id', component: StaffDetailComponent},
    {path: ':user_id/operate', loadChildren: './staff-detail-other-operate/staff-detail-other-operate.module#StaffDetailOtherOperateModule'}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StaffDetailRoutingModule {}
