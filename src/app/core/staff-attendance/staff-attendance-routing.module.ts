import {RouterModule, Routes} from "@angular/router";
import {AttendanceListComponent} from "./attendance-list/attendance-list.component";
import {StaffHolidayComponent} from "./staff-holidy/staff-holiday.component";
import {NgModule} from "@angular/core";
const routes: Routes = [
    {path: '', component: AttendanceListComponent},
    {path: 'holiday', component: StaffHolidayComponent},
    {path: 'attendance-adjust/:month/:inc_id', loadChildren: './attendance-change/attendance-change.module#AttendanceChangeModule'}
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StaffAttendanceRoutingModule {}