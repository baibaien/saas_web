import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard.component";
import {NgModule} from "@angular/core";
/**
 * Created by Bonan on 2017/11/1.
 */
const routes: Routes = [
    {
        path: '', component: DashboardComponent,
    },
    {
        path: 'staff-uncompleted',
        loadChildren: './staff-uncompleted/staff-uncompleted.module#StaffUncompletedModule'
    },
    {
        path: 'withdraw',
        loadChildren: '../withdraw/withdraw.module#WithdrawModule'
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {
}