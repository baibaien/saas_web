import {StaffPersonnalChangeComponent} from "./staff-personal-change/staff-personnal-change.component";
import {StaffAttendanceLogComponent} from "./staff-attendance-log/staff-attendance-log.component";
import {StaffChangeLogComponent} from "./staff-change-log/staff-change-log.component";
import {StaffRehireComponent} from "./staff-rehire/staff-rehire.component";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
/**
 * Created by Bonan on 2017/10/23.
 */
const routes = [
    {path: '', redirectTo: 'staff-change-log', pathMatch: 'full'},
    {path: 'staff-change/:yg_name', component: StaffPersonnalChangeComponent},
    {path: 'staff-attendance-log', component: StaffAttendanceLogComponent},
    {path: 'staff-change-log', component: StaffChangeLogComponent},
    {path: 'staff-rehire', component: StaffRehireComponent},
];

@NgModule ({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StaffDetailOtherOperateRoutingModule {}